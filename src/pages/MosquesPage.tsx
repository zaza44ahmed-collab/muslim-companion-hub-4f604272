import { useState, useEffect, useRef } from "react";
import { ArrowRight, MapPin, Navigation, RefreshCw, Locate } from "lucide-react";
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

const mosqueIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2972/2972351.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

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

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([center.lat, center.lng], 14);
    }
  }, [center.lat, center.lng]);

  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;
    markersRef.current.clearLayers();
    L.marker([center.lat, center.lng], { icon: userIcon })
      .bindPopup("<div style='text-align:center'><strong>موقعك الحالي</strong></div>")
      .addTo(markersRef.current);
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
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null);
  const [error, setError] = useState<string | null>(null);

  const defaultLocation = { lat: 30.0444, lng: 31.2357 };

  const getUserLocation = () => {
    setLoading(true);
    setError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = { lat: position.coords.latitude, lng: position.coords.longitude };
          setUserLocation(location);
          setLoading(false);
          fetchNearbyMosques(location.lat, location.lng);
        },
        () => {
          setUserLocation(defaultLocation);
          setLoading(false);
          fetchNearbyMosques(defaultLocation.lat, defaultLocation.lng);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setUserLocation(defaultLocation);
      setLoading(false);
      fetchNearbyMosques(defaultLocation.lat, defaultLocation.lng);
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
      <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-lg border-b-2 border-secondary/30">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="hover:bg-secondary/10">
                <ArrowRight className="h-6 w-6 text-secondary" />
              </Button>
            </Link>
            <h1 className="text-lg font-bold font-amiri text-foreground">
              المساجد القريبة
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={getUserLocation}
            disabled={loading || searchingMosques}
            className="hover:bg-secondary/10"
          >
            <Locate className="h-6 w-6 text-secondary" />
          </Button>
        </div>
      </header>

      <main className="container py-4 space-y-4">
        {/* Map */}
        <div className="rounded-2xl overflow-hidden border-2 border-secondary/30 shadow-card-islamic">
          <div className="h-72 relative">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-card">
                <div className="flex flex-col items-center gap-3">
                  <RefreshCw className="h-8 w-8 animate-spin text-secondary" />
                  <span className="text-sm text-muted-foreground font-cairo">جاري تحديد موقعك...</span>
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

        {/* Mosques Count */}
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-lg text-foreground font-cairo">المساجد القريبة</h3>
          <div className="flex items-center gap-2">
            {searchingMosques && <RefreshCw className="h-4 w-4 animate-spin text-secondary" />}
            <span className="text-sm text-muted-foreground font-cairo">
              {mosques.length} مسجد
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="text-center py-6 rounded-2xl border-2 border-destructive/30 bg-destructive/5">
            <p className="text-destructive font-cairo mb-2">{error}</p>
            <Button variant="outline" size="sm" onClick={getUserLocation} className="border-secondary/30">
              إعادة المحاولة
            </Button>
          </div>
        )}

        {/* Empty */}
        {!error && mosques.length === 0 && !searchingMosques && (
          <div className="text-center py-10 rounded-2xl border-2 border-secondary/20 bg-card">
            <span className="text-5xl mb-3 block">🕌</span>
            <p className="text-muted-foreground font-cairo">لم يتم العثور على مساجد قريبة</p>
          </div>
        )}

        {/* Mosques List */}
        <div className="space-y-3 pb-6">
          {mosques.map((mosque, index) => (
            <div
              key={mosque.id}
              className={`rounded-2xl border-2 transition-all duration-200 cursor-pointer overflow-hidden ${
                selectedMosque?.id === mosque.id
                  ? "border-secondary bg-secondary/5 shadow-lg"
                  : "border-secondary/20 bg-card hover:border-secondary/40 hover:shadow-md"
              }`}
              onClick={() => setSelectedMosque(mosque)}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center border border-secondary/20">
                    <span className="text-sm font-bold text-secondary">{index + 1}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-foreground text-[15px] font-cairo truncate">
                      {mosque.name}
                    </h4>
                    {mosque.address && (
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{mosque.address}</p>
                    )}
                  </div>

                  {/* Distance */}
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center gap-1 text-xs font-bold bg-secondary/15 text-secondary px-2.5 py-1 rounded-full border border-secondary/20">
                      <MapPin className="h-3 w-3" />
                      {mosque.distance < 1
                        ? `${(mosque.distance * 1000).toFixed(0)} م`
                        : `${mosque.distance.toFixed(1)} كم`}
                    </span>
                  </div>
                </div>

                {/* Action */}
                <div className="mt-3 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs h-9 rounded-xl border-secondary/30 hover:bg-secondary/10 font-cairo"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDirections(mosque);
                    }}
                  >
                    <Navigation className="h-4 w-4 ml-1.5 text-secondary" />
                    الاتجاهات
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MosquesPage;
