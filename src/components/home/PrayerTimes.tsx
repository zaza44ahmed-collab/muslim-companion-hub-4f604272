import { MapPin, Loader2 } from "lucide-react";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";

const PrayerTimes = () => {
  const { prayers, currentPrayerIndex, timeToNext, progress, locationName, loading, error } = usePrayerTimes();

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
  const isPassed = currentPrayer.passed;
  const timeLabel = isPassed ? "منذ" : "المتبقي";

  return (
    <div>
      {/* Title + Location outside the card */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-bold text-base text-foreground font-cairo">مواقيت الصلاة</h3>
        <div className="flex items-center gap-1 text-muted-foreground text-xs">
          <MapPin className="h-3.5 w-3.5 text-secondary" />
          <span className="font-cairo font-semibold">{locationName}</span>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border-2 border-secondary/30">
        {/* Current prayer + countdown + progress */}
        <div className="bg-card px-3 pt-3 pb-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-foreground text-base font-bold font-cairo">
              {currentPrayer.name}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground text-xs font-cairo">
              <span>{timeLabel}</span>
              <span className="font-bold text-foreground tabular-nums text-sm">
                {String(timeToNext.hours).padStart(2, "0")}:{String(timeToNext.minutes).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-l from-destructive to-primary transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-border/50" />

        {/* All prayers in horizontal row */}
        <div className="bg-card px-2 py-2 flex items-center justify-around">
          {prayers.map((prayer, index) => {
            const isCurrent = index === currentPrayerIndex;
            const isPrayerPassed = prayer.passed;

            return (
              <div key={prayer.name} className="flex flex-col items-center gap-1">
                <span className={`text-xs font-semibold font-cairo ${
                  isCurrent
                    ? "text-primary"
                    : isPrayerPassed
                      ? "text-muted-foreground/50"
                      : "text-foreground"
                }`}>
                  {prayer.name}
                </span>
                <span className={`text-xs font-bold tabular-nums rounded-md px-1.5 py-0.5 ${
                  isCurrent
                    ? "bg-primary text-primary-foreground"
                    : isPrayerPassed
                      ? "bg-destructive/80 text-destructive-foreground"
                      : "text-foreground"
                }`}>
                  {prayer.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;
