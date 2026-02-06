import { Clock, MapPin, Moon, Sun, Bell } from "lucide-react";
import { useEffect, useState } from "react";

const prayerData = [
  { name: "الفجر", time: "05:23", icon: "🌙", passed: true },
  { name: "الشروق", time: "06:45", icon: "🌅", passed: true },
  { name: "الظهر", time: "12:15", icon: "☀️", passed: false },
  { name: "العصر", time: "15:30", icon: "🌤️", passed: false },
  { name: "المغرب", time: "18:02", icon: "🌇", passed: false },
  { name: "العشاء", time: "19:30", icon: "🌙", passed: false },
];

const PrayerTimes = () => {
  const [currentPrayer, setCurrentPrayer] = useState(2);
  const [timeToNext, setTimeToNext] = useState({ hours: 2, minutes: 15 });
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('theme');
    
    if (savedMode === 'dark' || (!savedMode && darkModePreference)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeToNext(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59 };
        }
        return prev;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent rounded-3xl p-5 shadow-lg">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary rounded-full blur-2xl" />
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">أوقات الصلاة</h3>
            <div className="flex items-center gap-1 text-xs text-white/70">
              <MapPin className="h-3 w-3" />
              <span>القاهرة، مصر</span>
            </div>
          </div>
        </div>
        
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all"
          aria-label="تبديل الوضع الليلي"
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-secondary" />
          ) : (
            <Moon className="h-5 w-5 text-white" />
          )}
        </button>
      </div>

      {/* Next Prayer Card */}
      <div className="relative bg-white/15 backdrop-blur-md rounded-2xl p-4 mb-4 border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{prayerData[currentPrayer].icon}</div>
            <div>
              <span className="text-xs text-white/70 block mb-0.5">الصلاة القادمة</span>
              <h4 className="font-bold text-white text-xl font-amiri">
                {prayerData[currentPrayer].name}
              </h4>
              <p className="text-white/80 text-sm">{prayerData[currentPrayer].time}</p>
            </div>
          </div>
          
          <div className="text-center">
            <span className="text-xs text-white/70 block mb-1">المتبقي</span>
            <div className="flex items-center gap-1">
              <div className="bg-white/20 rounded-lg px-2 py-1">
                <span className="text-xl font-bold text-white">{String(timeToNext.hours).padStart(2, '0')}</span>
              </div>
              <span className="text-white text-xl font-bold">:</span>
              <div className="bg-white/20 rounded-lg px-2 py-1">
                <span className="text-xl font-bold text-white">{String(timeToNext.minutes).padStart(2, '0')}</span>
              </div>
            </div>
            <div className="flex gap-4 text-[10px] text-white/60 mt-1">
              <span>ساعة</span>
              <span>دقيقة</span>
            </div>
          </div>
        </div>

        {/* Notification Button */}
        <button className="absolute -top-2 -left-2 p-2 bg-secondary rounded-full shadow-lg hover:scale-110 transition-transform">
          <Bell className="h-4 w-4 text-secondary-foreground" />
        </button>
      </div>

      {/* Prayer Times Grid */}
      <div className="grid grid-cols-6 gap-2">
        {prayerData.map((prayer, index) => {
          const isCurrent = index === currentPrayer;
          const isPassed = index < currentPrayer;
          
          return (
            <div
              key={prayer.name}
              className={`relative text-center p-2 rounded-xl transition-all duration-300 ${
                isCurrent
                  ? "bg-white text-primary shadow-lg scale-105"
                  : isPassed
                    ? "bg-white/10 text-white/50"
                    : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {isCurrent && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-secondary rounded-full animate-pulse" />
              )}
              <span className="text-lg block mb-0.5">{prayer.icon}</span>
              <p className={`text-[10px] font-medium ${isCurrent ? "text-primary" : ""}`}>
                {prayer.name}
              </p>
              <p className={`font-bold text-xs ${isCurrent ? "text-primary" : ""}`}>
                {prayer.time}
              </p>
              {isPassed && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-[1px] bg-white/30 rotate-[-20deg]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-secondary to-secondary/70 rounded-full transition-all duration-1000"
          style={{ width: `${((currentPrayer + 1) / prayerData.length) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-[10px] text-white/60">
        <span>الفجر</span>
        <span>العشاء</span>
      </div>
    </div>
  );
};

export default PrayerTimes;
