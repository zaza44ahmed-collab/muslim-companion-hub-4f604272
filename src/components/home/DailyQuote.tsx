import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const quotes = [
  { text: "سبحان الله وبحمده، سبحان الله العظيم", source: "ذكر" },
  { text: "اللهم إني أسألك العفو والعافية في الدنيا والآخرة", source: "دعاء" },
  { text: "لا إله إلا الله وحده لا شريك له", source: "توحيد" },
  { text: "الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور", source: "دعاء الاستيقاظ" },
  { text: "اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك", source: "سيد الاستغفار" },
  { text: "رب اغفر لي وتب علي إنك أنت التواب الرحيم", source: "استغفار" },
];

const DailyQuote = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotes[currentIndex];

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-emerald-dark p-3 shadow-islamic border border-secondary/30">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 right-2 w-16 h-16 border-2 border-primary-foreground/30 rounded-full" />
        <div className="absolute bottom-2 left-2 w-12 h-12 border-2 border-primary-foreground/30 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-primary-foreground/20 rotate-45" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Sparkles className="h-3.5 w-3.5 text-secondary animate-pulse" />
          <span className="text-[10px] font-medium text-primary-foreground/80">
            {currentQuote.source}
          </span>
        </div>

        <p
          className={`text-sm font-amiri text-primary-foreground leading-relaxed transition-all duration-500 ${
            isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          {currentQuote.text}
        </p>

        {/* Progress Dots */}
        <div className="flex justify-center gap-1 mt-2">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-6 bg-secondary"
                  : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyQuote;
