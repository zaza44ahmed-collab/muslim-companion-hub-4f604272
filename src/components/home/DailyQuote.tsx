import { useEffect, useState } from "react";

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
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotes[currentIndex];

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
