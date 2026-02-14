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
      const dd = today.getDate();
      const mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=5`
      );
      
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        throw new Error("API returned non-JSON response");
      }
      
      const data = await response.json();
      
      if (data.code !== 200 || !data.data?.timings) {
        throw new Error("Invalid API response");
      }
      
      const timings = data.data.timings;
      const prayersList: PrayerTime[] = PRAYER_KEYS.map((key) => {
        const rawTime = timings[key];
        const cleanTime = rawTime.split(" ")[0]; // Remove timezone suffix
        return {
          name: PRAYER_NAMES_AR[key] || key,
          time: cleanTime,
          icon: PRAYER_ICONS[key] || "🕌",
          passed: false,
        };
      });
      
      const { currentIndex, timeToNext, progress } = calculateCurrentPrayer(prayersList);
      
      // Reverse geocode for location name
      let locName = "موقعك الحالي";
      try {
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=ar`
        );
        const geoData = await geoRes.json();
        locName = geoData.address?.city || geoData.address?.town || geoData.address?.state || locName;
      } catch {}
      
      setState({
        prayers: prayersList,
        currentPrayerIndex: currentIndex,
        timeToNext,
        progress,
        locationName: locName,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      console.error("Prayer times fetch error:", err);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "تعذر تحميل أوقات الصلاة، حاول مرة أخرى",
      }));
    }
  }, []);

  const saveLocation = useCallback((lat: number, lng: number) => {
    localStorage.setItem("prayer_location", JSON.stringify({ lat, lng }));
  }, []);

  const requestLocation = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          saveLocation(latitude, longitude);
          fetchPrayerTimes(latitude, longitude);
        },
        () => {
          const saved = localStorage.getItem("prayer_location");
          if (saved) {
            const { lat, lng } = JSON.parse(saved);
            fetchPrayerTimes(lat, lng);
          } else {
            fetchPrayerTimes(30.0444, 31.2357);
          }
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      const saved = localStorage.getItem("prayer_location");
      if (saved) {
        const { lat, lng } = JSON.parse(saved);
        fetchPrayerTimes(lat, lng);
      } else {
        fetchPrayerTimes(30.0444, 31.2357);
      }
    }
  }, [fetchPrayerTimes, saveLocation]);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

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

  return { ...state, requestLocation };
}
