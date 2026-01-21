import { Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const prayerData = [
  { name: "الفجر", time: "05:23", icon: "🌙" },
  { name: "الشروق", time: "06:45", icon: "🌅" },
  { name: "الظهر", time: "12:15", icon: "☀️" },
  { name: "العصر", time: "15:30", icon: "🌤️" },
  { name: "المغرب", time: "18:02", icon: "🌇" },
  { name: "العشاء", time: "19:30", icon: "🌙" },
];

const PrayerTimes = () => {
  const [currentPrayer, setCurrentPrayer] = useState(2);
  const [timeToNext, setTimeToNext] = useState("2:15");

  useEffect(() => {
    // Simulate time calculation
    const interval = setInterval(() => {
      // This would normally calculate based on actual time
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card rounded-2xl p-5 shadow-card-islamic">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-lg">أوقات الصلاة</h3>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>القاهرة</span>
        </div>
      </div>

      {/* Next Prayer Alert */}
      <div className="bg-primary/10 rounded-xl p-3 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-muted-foreground">الصلاة القادمة</span>
            <h4 className="font-bold text-primary text-lg">
              {prayerData[currentPrayer].name}
            </h4>
          </div>
          <div className="text-left">
            <span className="text-sm text-muted-foreground">متبقي</span>
            <p className="font-bold text-secondary text-lg">{timeToNext}</p>
          </div>
        </div>
      </div>

      {/* Prayer Times Grid */}
      <div className="grid grid-cols-3 gap-3">
        {prayerData.map((prayer, index) => (
          <div
            key={prayer.name}
            className={`text-center p-3 rounded-xl transition-all duration-300 ${
              index === currentPrayer
                ? "bg-primary text-primary-foreground shadow-islamic"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            <span className="text-xl mb-1 block">{prayer.icon}</span>
            <p className={`text-xs font-medium ${
              index === currentPrayer ? "text-primary-foreground/80" : "text-muted-foreground"
            }`}>
              {prayer.name}
            </p>
            <p className={`font-bold text-sm ${
              index === currentPrayer ? "text-primary-foreground" : ""
            }`}>
              {prayer.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerTimes;
