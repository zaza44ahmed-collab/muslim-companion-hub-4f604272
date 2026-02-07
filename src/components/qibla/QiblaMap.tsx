import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Loader2 } from "lucide-react";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MECCA_LAT = 21.4225;
const MECCA_LNG = 39.8262;

interface QiblaMapProps {
  userLat: number;
  userLng: number;
}

const QiblaMap = ({ userLat, userLng }: QiblaMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const userPosition: L.LatLngTuple = [userLat, userLng];
    const meccaPosition: L.LatLngTuple = [MECCA_LAT, MECCA_LNG];

    const map = L.map(mapContainerRef.current, {
      center: userPosition,
      zoom: 4,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.marker(userPosition).addTo(map).bindPopup("موقعك الحالي 📍");
    L.marker(meccaPosition).addTo(map).bindPopup("🕋 الكعبة المشرفة - مكة المكرمة");

    L.polyline([userPosition, meccaPosition], {
      color: "hsl(158, 64%, 32%)",
      weight: 3,
      dashArray: "10, 10",
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [userLat, userLng]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default QiblaMap;
