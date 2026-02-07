import { useState, useEffect, useRef } from "react";
import { ArrowRight, MapPin, Navigation, Clock, RefreshCw, Locate } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom mosque icon
const mosqueIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2972/2972351.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// User location icon
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface Mosque {
  id: number;
  name: string;
  lat: number;
  lng: number;
  distance: number;
  address?: string;
}

interface PrayerTimesData {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

// Calculate distance between two points using Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Leaflet Map Component using plain leaflet
const MosquesMap = ({
  center,
  mosques,
  onMosqueClick,
  onDirections,
}: {
  center: { lat: number; lng: number };
  mosques: Mosque[];
  onMosqueClick: (mosque: Mosque) => void;
  onDirections: (mosque: Mosque) => void;
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [center.lat, center.lng],
      zoom: 14,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = null;
    };
  }, []);

  // Update center
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([center.lat, center.lng], 14);
    }
  }, [center.lat, center.lng]);

  // Update markers
  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;

    markersRef.current.clearLayers();

    // User marker
    L.marker([center.lat, center.lng], { icon: userIcon })
      .bindPopup("<div style='text-align:center'><strong>موقعك الحالي</strong></div>")
      .addTo(markersRef.current);

    // Mosque markers
    mosques.forEach((mosque) => {
      const marker = L.marker([mosque.lat, mosque.lng], { icon: mosqueIcon })
        .bindPopup(
          `<div style="text-align:center;min-width:150px">
            <strong style="display:block;margin-bottom:4px">${mosque.name}</strong>
            <span style="font-size:12px;color:#666">${mosque.distance.toFixed(2)} كم</span>
          </div>`
        )
        .addTo(markersRef.current!);

      marker.on("click", () => onMosqueClick(mosque));
    });
  }, [center, mosques, onMosqueClick, onDirections]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

const MosquesPage = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchingMosques, setSearchingMosques] = useState(false);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null);
  const [error, setError] = useState<string | null>(null);

  const defaultLocation = { lat: 30.0444, lng: 31.2357 };

  const getUserLocation = () => {
    setLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setLoading(false);
          fetchNearbyMosques(location.lat, location.lng);
          fetchPrayerTimes(location.lat, location.lng);
        },
        () => {
          setUserLocation(defaultLocation);
          setLoading(false);
          fetchNearbyMosques(defaultLocation.lat, defaultLocation.lng);
          fetchPrayerTimes(defaultLocation.lat, defaultLocation.lng);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setUserLocation(defaultLocation);
      setLoading(false);
      fetchNearbyMosques(defaultLocation.lat, defaultLocation.lng);
      fetchPrayerTimes(defaultLocation.lat, defaultLocation.lng);
    }
  };

  const fetchNearbyMosques = async (lat: number, lng: number) => {
    setSearchingMosques(true);
    try {
      const radius = 5000;
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lng});
          way["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lng});
          node["building"="mosque"](around:${radius},${lat},${lng});
          way["building"="mosque"](around:${radius},${lat},${lng});
        );
        out center;
      `;

      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });

      if (!response.ok) throw new Error("Failed to fetch mosques");

      const data = await response.json();

      const mosquesData: Mosque[] = data.elements
        .map((element: any, index: number) => {
          const mosqueLat = element.lat || element.center?.lat;
          const mosqueLng = element.lon || element.center?.lon;

          if (!mosqueLat || !mosqueLng) return null;

          return {
            id: element.id || index,
            name: element.tags?.name || element.tags?.["name:ar"] || "مسجد",
            lat: mosqueLat,
            lng: mosqueLng,
            distance: calculateDistance(lat, lng, mosqueLat, mosqueLng),
            address: element.tags?.["addr:street"] || element.tags?.["addr:city"] || "",
          };
        })
        .filter((m: Mosque | null): m is Mosque => m !== null)
        .sort((a: Mosque, b: Mosque) => a.distance - b.distance)
        .slice(0, 20);

      setMosques(mosquesData);
    } catch (err) {
      console.error("Error fetching mosques:", err);
      setError("تعذر جلب المساجد القريبة");
    } finally {
      setSearchingMosques(false);
    }
  };

  const fetchPrayerTimes = async (lat: number, lng: number) => {
    try {
      const today = new Date();
      const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${date}?latitude=${lat}&longitude=${lng}&method=5`
      );

      if (!response.ok) throw new Error("Failed to fetch prayer times");

      const data = await response.json();
      setPrayerTimes(data.data.timings);
    } catch (err) {
      console.error("Error fetching prayer times:", err);
    }
  };

  const openDirections = (mosque: Mosque) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${mosque.lat},${mosque.lng}`;
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const currentLocation = userLocation || defaultLocation;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold font-amiri text-gradient-islamic">
              🕌 المساجد القريبة
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={getUserLocation}
            disabled={loading || searchingMosques}
          >
            <Locate className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container py-4 space-y-4">
        {/* Prayer Times Card */}
        {prayerTimes && (
          <div className="bg-card rounded-2xl p-4 shadow-card-islamic">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-bold">أوقات الصلاة اليوم</h3>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { name: "الفجر", time: prayerTimes.Fajr },
                { name: "الشروق", time: prayerTimes.Sunrise },
                { name: "الظهر", time: prayerTimes.Dhuhr },
                { name: "العصر", time: prayerTimes.Asr },
                { name: "المغرب", time: prayerTimes.Maghrib },
                { name: "العشاء", time: prayerTimes.Isha },
              ].map((prayer) => (
                <div key={prayer.name} className="bg-muted rounded-xl p-2">
                  <p className="text-xs text-muted-foreground">{prayer.name}</p>
                  <p className="font-bold text-sm">{prayer.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Map */}
        <div className="bg-card rounded-2xl overflow-hidden shadow-card-islamic">
          <div className="h-64 relative">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">جاري تحديد موقعك...</span>
                </div>
              </div>
            ) : (
              <MosquesMap
                center={currentLocation}
                mosques={mosques}
                onMosqueClick={setSelectedMosque}
                onDirections={openDirections}
              />
            )}
          </div>
        </div>

        {/* Mosques List */}
        <div className="bg-card rounded-2xl p-4 shadow-card-islamic">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-bold">المساجد القريبة</h3>
            </div>
            {searchingMosques && (
              <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>

          {error && (
            <div className="text-center py-4 text-destructive">
              <p>{error}</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={getUserLocation}>
                إعادة المحاولة
              </Button>
            </div>
          )}

          {!error && mosques.length === 0 && !searchingMosques && (
            <div className="text-center py-8 text-muted-foreground">
              <p>لم يتم العثور على مساجد قريبة</p>
            </div>
          )}

          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {mosques.map((mosque) => (
              <div
                key={mosque.id}
                className={`p-3 rounded-xl transition-all cursor-pointer ${
                  selectedMosque?.id === mosque.id
                    ? "bg-primary/10 border-2 border-primary"
                    : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => setSelectedMosque(mosque)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{mosque.name}</h4>
                    {mosque.address && (
                      <p className="text-xs text-muted-foreground mt-1">{mosque.address}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {mosque.distance < 1
                        ? `${(mosque.distance * 1000).toFixed(0)} م`
                        : `${mosque.distance.toFixed(2)} كم`}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDirections(mosque);
                    }}
                  >
                    <Navigation className="h-3 w-3 ml-1" />
                    الاتجاهات
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MosquesPage;
