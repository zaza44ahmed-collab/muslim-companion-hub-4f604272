import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
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

export default QiblaMap;
