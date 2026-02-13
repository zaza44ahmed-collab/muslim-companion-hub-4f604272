import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

type Quote = { text: string; source: string };

const fallbackQuotes: Quote[] = [
  { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ", source: "ذكر" },
  { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ", source: "دعاء" },
  { text: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", source: "توحيد" },
  { text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", source: "حمد" },
  { text: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ وَأَتُوبُ إِلَيْهِ", source: "استغفار" },
  { text: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ", source: "صلاة على النبي" },
];

const DailyQuote = () => {
  const [quotes, setQuotes] = useState<Quote[]>(fallbackQuotes);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("daily-quotes");
        if (!error && data?.quotes?.length) {
          setQuotes(data.quotes);
        }
      } catch (e) {
        console.error("Failed to fetch daily quotes:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
        setIsAnimating(false);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  const currentQuote = quotes[currentIndex];

  if (loading) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-emerald-dark p-5 space-y-3">
        <Skeleton className="h-4 w-16 bg-white/20" />
        <Skeleton className="h-6 w-full bg-white/20" />
        <Skeleton className="h-6 w-3/4 bg-white/20" />
        <div className="flex justify-center gap-1.5 mt-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-1.5 w-1.5 rounded-full bg-white/20" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-emerald-dark p-5">
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute top-4 right-4 w-20 h-20 border border-white rounded-full" />
        <div className="absolute bottom-3 left-6 w-14 h-14 border border-white rounded-full" />
      </div>

      <div className="relative z-10">
        <span className="inline-block text-[10px] font-semibold text-white/60 bg-white/10 rounded-full px-2.5 py-0.5 mb-3">
          {currentQuote.source}
        </span>

        <p
          className={`text-[15px] font-amiri text-white leading-7 transition-all duration-400 ${
            isAnimating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
          }`}
        >
          {currentQuote.text}
        </p>

        {/* Progress Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-5 bg-white"
                  : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyQuote;
