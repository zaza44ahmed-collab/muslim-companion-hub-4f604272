import { Clock, MapPin, Loader2 } from "lucide-react";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";

const PrayerTimes = () => {
  const { prayers, currentPrayerIndex, timeToNext, locationName, loading, error } = usePrayerTimes();

  if (loading) {
    return (
      <div className="rounded-2xl bg-card border-2 border-secondary/30 p-6">
        <div className="flex flex-col items-center justify-center py-6 gap-3">
          <Loader2 className="h-7 w-7 text-secondary animate-spin" />
          <p className="text-muted-foreground text-sm">جاري تحميل أوقات الصلاة...</p>
        </div>
      </div>
    );
  }

  if (error || prayers.length === 0) {
    return (
      <div className="rounded-2xl bg-card border-2 border-secondary/30 p-6">
        <p className="text-muted-foreground text-sm text-center py-6">
          {error || "تعذر تحميل أوقات الصلاة"}
        </p>
      </div>
    );
  }

  const currentPrayer = prayers[currentPrayerIndex];

  return (
    <div className="rounded-2xl bg-card border-2 border-secondary/30 overflow-hidden">
      {/* Header with next prayer */}
      <div className="bg-gradient-to-br from-primary to-emerald-dark p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-primary-foreground/70 text-xs">
            <MapPin className="h-3.5 w-3.5" />
            <span>{locationName}</span>
          </div>
          <div className="flex items-center gap-1.5 text-primary-foreground/70 text-xs">
            <Clock className="h-3.5 w-3.5" />
            <span>أوقات الصلاة</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentPrayer.icon}</span>
            <div>
              <p className="text-primary-foreground/70 text-xs">الصلاة القادمة</p>
              <h3 className="text-primary-foreground text-xl font-bold font-cairo">
                {currentPrayer.name}
              </h3>
            </div>
          </div>

          <div className="text-left">
            <p className="text-primary-foreground/70 text-xs mb-1">المتبقي</p>
            <div className="flex items-center gap-1">
              <div className="bg-white/15 rounded-lg px-2.5 py-1">
                <span className="text-lg font-bold text-primary-foreground">
                  {String(timeToNext.hours).padStart(2, "0")}
                </span>
              </div>
              <span className="text-primary-foreground font-bold text-lg">:</span>
              <div className="bg-white/15 rounded-lg px-2.5 py-1">
                <span className="text-lg font-bold text-primary-foreground">
                  {String(timeToNext.minutes).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prayer times list */}
      <div className="divide-y divide-border/50">
        {prayers.map((prayer, index) => {
          const isCurrent = index === currentPrayerIndex;
          const isPassed = prayer.passed;

          return (
            <div
              key={prayer.name}
              className={`flex items-center justify-between px-4 py-3 transition-colors ${
                isCurrent ? "bg-secondary/10" : ""
              }`}
            >
              <span className={`text-sm font-bold tabular-nums ${
                isCurrent
                  ? "text-primary"
                  : isPassed
                    ? "text-muted-foreground/50"
                    : "text-foreground"
              }`}>
                {prayer.time}
              </span>

              <div className="flex items-center gap-2.5">
                <span className={`text-sm font-semibold ${
                  isCurrent
                    ? "text-primary"
                    : isPassed
                      ? "text-muted-foreground/50"
                      : "text-foreground"
                }`}>
                  {prayer.name}
                </span>
                <span className={`text-lg ${isPassed ? "opacity-40" : ""}`}>
                  {prayer.icon}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrayerTimes;
