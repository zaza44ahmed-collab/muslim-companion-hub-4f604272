import { useState, useEffect, useCallback } from "react";

export interface PrayerTime {
  name: string;
  time: string;
  icon: string;
  passed: boolean;
}

interface PrayerTimesState {
  prayers: PrayerTime[];
  currentPrayerIndex: number;
  timeToNext: { hours: number; minutes: number };
  progress: number;
  locationName: string;
  loading: boolean;
  error: string | null;
}

const PRAYER_ICONS: Record<string, string> = {
  Fajr: "🌙",
  Sunrise: "🌅",
  Dhuhr: "☀️",
  Asr: "🌤️",
  Maghrib: "🌇",
  Isha: "🌙",
};

const PRAYER_NAMES_AR: Record<string, string> = {
  Fajr: "الفجر",
  Sunrise: "الشروق",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};

const PRAYER_KEYS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

function parseTime(timeStr: string): Date {
  const [time] = timeStr.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  const now = new Date();
  now.setHours(hours, minutes, 0, 0);
  return now;
}

function calculateCurrentPrayer(prayers: PrayerTime[]): {
  currentIndex: number;
  timeToNext: { hours: number; minutes: number };
  progress: number;
} {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let currentIndex = -1;

  for (let i = prayers.length - 1; i >= 0; i--) {
    const [h, m] = prayers[i].time.split(":").map(Number);
    const prayerMinutes = h * 60 + m;
    if (currentMinutes >= prayerMinutes) {
      currentIndex = i;
      break;
    }
  }

  // Next prayer index
  const nextIndex = currentIndex + 1 < prayers.length ? currentIndex + 1 : 0;

  // Calculate time to next
  const [nextH, nextM] = prayers[nextIndex].time.split(":").map(Number);
  let nextPrayerMinutes = nextH * 60 + nextM;

  // If next prayer is tomorrow (wrapped around)
  if (nextIndex <= currentIndex) {
    nextPrayerMinutes += 24 * 60;
  }

  const diffMinutes = nextPrayerMinutes - currentMinutes;
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  // Calculate progress between current and next prayer
  let progress = 0;
  if (currentIndex >= 0) {
    const [curH, curM] = prayers[currentIndex].time.split(":").map(Number);
    const curPrayerMinutes = curH * 60 + curM;
    const totalInterval = nextPrayerMinutes - curPrayerMinutes;
    const elapsed = currentMinutes - curPrayerMinutes;
    progress = totalInterval > 0 ? Math.min(100, Math.max(0, (elapsed / totalInterval) * 100)) : 0;
  }

  // Mark passed prayers
  prayers.forEach((prayer, i) => {
    prayer.passed = i < (currentIndex === -1 ? 0 : currentIndex + 1) && i !== nextIndex;
  });

  return {
    currentIndex: nextIndex,
    timeToNext: { hours, minutes },
    progress,
  };
}

export function usePrayerTimes() {
  const [state, setState] = useState<PrayerTimesState>({
    prayers: [],
    currentPrayerIndex: 0,
    timeToNext: { hours: 0, minutes: 0 },
    progress: 0,
    locationName: "جاري التحديد...",
    loading: true,
    error: null,
  });

  const fetchPrayerTimes = useCallback(async (lat: number, lng: number) => {
    try {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();

      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=5`
      );

      if (!response.ok) throw new Error("فشل في جلب أوقات الصلاة");

      const data = await response.json();
      const timings = data.data.timings;

      const prayers: PrayerTime[] = PRAYER_KEYS.map((key) => ({
        name: PRAYER_NAMES_AR[key],
        time: timings[key].replace(/\s*\((.*)\)/, ""), // Remove timezone info
        icon: PRAYER_ICONS[key],
        passed: false,
      }));

      const { currentIndex, timeToNext, progress } = calculateCurrentPrayer(prayers);

      // Reverse geocode for location name
      let locationName = `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;
      try {
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=ar`
        );
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          const city =
            geoData.address?.city ||
            geoData.address?.town ||
            geoData.address?.village ||
            geoData.address?.state ||
            "";
          const country = geoData.address?.country || "";
          if (city || country) {
            locationName = [city, country].filter(Boolean).join("، ");
          }
        }
      } catch {
        // Keep coordinates as fallback
      }

      setState({
        prayers,
        currentPrayerIndex: currentIndex,
        timeToNext,
        progress,
        locationName,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "خطأ غير معروف",
      }));
    }
  }, []);

  useEffect(() => {
    // Try geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Default to Cairo
          fetchPrayerTimes(30.0444, 31.2357);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      fetchPrayerTimes(30.0444, 31.2357);
    }
  }, [fetchPrayerTimes]);

  // Update countdown every minute
  useEffect(() => {
    if (state.prayers.length === 0) return;

    const interval = setInterval(() => {
      const { currentIndex, timeToNext, progress } = calculateCurrentPrayer([...state.prayers]);
      setState((prev) => ({
        ...prev,
        currentPrayerIndex: currentIndex,
        timeToNext,
        progress,
        prayers: prev.prayers.map((p, i) => ({
          ...p,
          passed: i < currentIndex && i !== currentIndex,
        })),
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, [state.prayers]);

  return state;
}
