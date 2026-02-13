import { MapPin, Loader2 } from "lucide-react";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";

const PrayerTimes = () => {
  const { prayers, currentPrayerIndex, timeToNext, progress, locationName, loading, error } = usePrayerTimes();

  if (loading) {
    return (
      <div className="rounded-2xl bg-card p-6">
        <div className="flex flex-col items-center justify-center py-6 gap-3">
          <Loader2 className="h-6 w-6 text-primary animate-spin" />
          <p className="text-muted-foreground/70 text-xs">جاري تحميل أوقات الصلاة...</p>
        </div>
      </div>
    );
  }

  if (error || prayers.length === 0) {
    return (
      <div className="rounded-2xl bg-card p-6">
        <p className="text-muted-foreground/70 text-xs text-center py-6">
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
      {/* Title + Location */}
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="font-bold text-sm text-foreground">مواقيت الصلاة</h3>
        <div className="flex items-center gap-1 text-muted-foreground/60 text-[11px]">
          <MapPin className="h-3 w-3" />
          <span>{locationName}</span>
        </div>
      </div>

      <div className="rounded-2xl bg-card overflow-hidden">
        {/* Current prayer + countdown */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-foreground text-base font-bold">{currentPrayer.name}</h3>
            <div className="flex items-center gap-1.5 text-muted-foreground/70 text-xs">
              <span>{timeLabel}</span>
              <span className="font-bold text-foreground tabular-nums text-sm">
                {String(timeToNext.hours).padStart(2, "0")}:{String(timeToNext.minutes).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-muted/15 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border/30 mx-4" />

        {/* All prayers row */}
        <div className="px-3 py-3 flex items-center justify-around">
          {prayers.map((prayer, index) => {
            const isCurrent = index === currentPrayerIndex;
            const isPrayerPassed = prayer.passed;

            return (
              <div key={prayer.name} className="flex flex-col items-center gap-1">
                <span className={`text-[11px] font-semibold ${
                  isCurrent ? "text-primary" : isPrayerPassed ? "text-muted-foreground/40" : "text-foreground/70"
                }`}>
                  {prayer.name}
                </span>
                <span className={`text-[11px] font-bold tabular-nums px-2 py-0.5 rounded-md ${
                  isCurrent
                    ? "bg-primary text-primary-foreground"
                    : isPrayerPassed
                      ? "text-muted-foreground/40"
                      : "text-foreground/70"
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
