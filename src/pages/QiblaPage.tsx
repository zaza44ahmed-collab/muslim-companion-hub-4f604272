import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Navigation, MapPin, Loader2, AlertCircle, LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mecca coordinates (Kaaba)
const MECCA_LAT = 21.4225;
const MECCA_LNG = 39.8262;

// Default location (Cairo)
const DEFAULT_LAT = 30.0444;
const DEFAULT_LNG = 31.2357;

const QiblaPage = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({ 
    lat: DEFAULT_LAT, 
    lng: DEFAULT_LNG 
  });
  const [qiblaDirection, setQiblaDirection] = useState<number>(135.5); // Default for Cairo
  const [compassHeading, setCompassHeading] = useState<number>(0);
  const [distance, setDistance] = useState<number>(1200); // Approximate distance from Cairo
  const [loading, setLoading] = useState(false);
  const [hasCompass, setHasCompass] = useState(false);
  const [locationStatus, setLocationStatus] = useState<"default" | "actual">("default");

  // Calculate Qibla direction from user's location
  const calculateQiblaDirection = (lat: number, lng: number) => {
    const latRad = (lat * Math.PI) / 180;
    const lngRad = (lng * Math.PI) / 180;
    const meccaLatRad = (MECCA_LAT * Math.PI) / 180;
    const meccaLngRad = (MECCA_LNG * Math.PI) / 180;

    const deltaLng = meccaLngRad - lngRad;

    const x = Math.sin(deltaLng);
    const y = Math.cos(latRad) * Math.tan(meccaLatRad) - Math.sin(latRad) * Math.cos(deltaLng);

    let qibla = Math.atan2(x, y) * (180 / Math.PI);
    qibla = (qibla + 360) % 360;

    return qibla;
  };

  // Calculate distance to Mecca (Haversine formula)
  const calculateDistance = (lat: number, lng: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((MECCA_LAT - lat) * Math.PI) / 180;
    const dLng = ((MECCA_LNG - lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat * Math.PI) / 180) *
        Math.cos((MECCA_LAT * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get user location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setQiblaDirection(calculateQiblaDirection(latitude, longitude));
        setDistance(calculateDistance(latitude, longitude));
        setLocationStatus("actual");
        setLoading(false);
      },
      () => {
        // Keep default location on error
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 3000 }
    );
  };

  // Device orientation for compass
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setHasCompass(true);
        // For iOS, we need to use webkitCompassHeading
        const heading = (event as any).webkitCompassHeading || (360 - event.alpha);
        setCompassHeading(heading);
      }
    };

    // Request permission for iOS 13+
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((response: string) => {
          if (response === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        })
        .catch(() => {
          setHasCompass(false);
        });
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  useEffect(() => {
    getUserLocation();
  }, []);

  const adjustedQiblaDirection = hasCompass ? qiblaDirection - compassHeading : qiblaDirection;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold font-amiri">اتجاه القبلة</h1>
          <Button variant="ghost" size="icon" onClick={getUserLocation}>
            <LocateFixed className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container py-6 flex flex-col items-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="text-muted-foreground">جاري تحديد موقعك...</p>
          </div>
        ) : (
          <>
            {/* Compass Section */}
            <div className="relative mb-8 animate-scaleIn">
              {/* Outer Decorative Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
              
              {/* Compass Container */}
              <div className="relative h-72 w-72 rounded-full bg-gradient-to-br from-card to-muted shadow-xl border-4 border-card">
                {/* Cardinal Directions */}
                <div className="absolute inset-4 rounded-full border-2 border-dashed border-muted-foreground/30">
                  <span className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-bold text-muted-foreground">ش</span>
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-bold text-muted-foreground">ج</span>
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">غ</span>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">ش</span>
                </div>

                {/* Degree Markers */}
                {[...Array(36)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-full w-0.5 left-1/2 -translate-x-1/2"
                    style={{ transform: `rotate(${i * 10}deg)` }}
                  >
                    <div className={`w-0.5 ${i % 3 === 0 ? 'h-3 bg-primary' : 'h-2 bg-muted-foreground/30'}`} />
                  </div>
                ))}

                {/* Qibla Arrow */}
                <div
                  className="absolute inset-8 transition-transform duration-500 ease-out"
                  style={{ transform: `rotate(${adjustedQiblaDirection}deg)` }}
                >
                  <div className="relative h-full w-full">
                    {/* Arrow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 flex flex-col items-center">
                      <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-primary" />
                      <div className="w-1 flex-1 bg-gradient-to-b from-primary to-primary/50 rounded-b" />
                    </div>
                    
                    {/* Kaaba Icon at tip */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 -translate-y-full">
                      <span className="text-2xl">🕋</span>
                    </div>
                  </div>
                </div>

                {/* Center Circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-emerald-dark shadow-lg flex items-center justify-center">
                    <Navigation className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* Direction Info */}
            <div className="text-center mb-8 animate-fadeIn" style={{ animationDelay: "200ms" }}>
              <p className="text-muted-foreground text-sm mb-2">اتجاه القبلة</p>
              <p className="text-4xl font-bold text-primary font-amiri">
                {Math.round(qiblaDirection)}°
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {hasCompass ? "البوصلة تعمل - وجّه هاتفك للاتجاه المطلوب" : "وجّه هاتفك نحو الشمال ثم اتبع السهم"}
              </p>
            </div>

            {/* Distance Card */}
            <div className="w-full max-w-sm bg-card rounded-2xl p-5 shadow-card-islamic animate-fadeIn" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-14 w-14 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <span className="text-3xl">🕋</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">المسجد الحرام</h3>
                  <p className="text-sm text-muted-foreground">مكة المكرمة</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {distance.toFixed(0)}
                  </p>
                  <p className="text-xs text-muted-foreground">كم</p>
                </div>
                <div className="bg-muted rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-secondary">
                    {(distance / 1.60934).toFixed(0)}
                  </p>
                  <p className="text-xs text-muted-foreground">ميل</p>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="w-full mt-6 animate-fadeIn" style={{ animationDelay: "400ms" }}>
              <h3 className="font-bold text-lg mb-3">موقعك على الخريطة</h3>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-card-islamic bg-card">
                <QiblaMap 
                  userLat={userLocation?.lat || 0} 
                  userLng={userLocation?.lng || 0}
                  qiblaDirection={qiblaDirection}
                />
              </div>
            </div>

            {/* Location Info */}
            {userLocation && (
              <div className="w-full mt-4 bg-muted/50 rounded-xl p-4 animate-fadeIn" style={{ animationDelay: "500ms" }}>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    موقعك: {userLocation.lat.toFixed(4)}°, {userLocation.lng.toFixed(4)}°
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

// Separate Map Component
const QiblaMap = ({ userLat, userLng }: { userLat: number; userLng: number; qiblaDirection: number }) => {
  const [leafletComponents, setLeafletComponents] = useState<{
    MapContainer: any;
    TileLayer: any;
    Marker: any;
    Popup: any;
    Polyline: any;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    // Dynamic import for leaflet components
    Promise.all([
      import("react-leaflet"),
      import("leaflet"),
      import("leaflet/dist/leaflet.css")
    ]).then(([reactLeaflet, L]) => {
      if (!isMounted) return;
      
      // Fix for default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
      
      setLeafletComponents({
        MapContainer: reactLeaflet.MapContainer,
        TileLayer: reactLeaflet.TileLayer,
        Marker: reactLeaflet.Marker,
        Popup: reactLeaflet.Popup,
        Polyline: reactLeaflet.Polyline,
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!leafletComponents) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, Polyline } = leafletComponents;
  const userPosition: [number, number] = [userLat, userLng];
  const meccaPosition: [number, number] = [MECCA_LAT, MECCA_LNG];

  return (
    <MapContainer
      center={userPosition}
      zoom={4}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={userPosition}>
        <Popup>موقعك الحالي 📍</Popup>
      </Marker>
      <Marker position={meccaPosition}>
        <Popup>🕋 الكعبة المشرفة - مكة المكرمة</Popup>
      </Marker>
      <Polyline
        positions={[userPosition, meccaPosition]}
        color="hsl(158, 64%, 32%)"
        weight={3}
        dashArray="10, 10"
      />
    </MapContainer>
  );
};

export default QiblaPage;
