import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const slides = [
  {
    emoji: "🕌",
    title: "حقيبة المسلم",
    description: "تطبيقك الإسلامي الشامل لكل ما يحتاجه المسلم في يومه",
    bg: "from-[hsl(184,37%,24%)] to-[hsl(184,42%,18%)]",
  },
  {
    emoji: "📖",
    title: "القرآن والأذكار",
    description: "اقرأ القرآن الكريم، وردد الأذكار والأدعية في أي وقت ومكان",
    bg: "from-[hsl(37,52%,63%)] to-[hsl(40,58%,74%)]",
  },
  {
    emoji: "🎬",
    title: "مجتمع إسلامي",
    description: "شاهد ريلز إسلامية، واستمع لصوتيات، وتصفح مكتبة الكتب",
    bg: "from-[hsl(174,35%,38%)] to-[hsl(184,37%,24%)]",
  },
  {
    emoji: "🚀",
    title: "ابدأ رحلتك",
    description: "انضم لملايين المسلمين واستفد من جميع المميزات المجانية",
    bg: "from-[hsl(184,37%,24%)] to-[hsl(174,35%,38%)]",
  },
];

const OnboardingPage = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const finish = () => {
    localStorage.setItem("onboarding_seen", "true");
    navigate("/");
  };

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
    else finish();
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const slide = slides[current];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${slide.bg} flex flex-col items-center justify-center p-6 transition-all duration-500`}>
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm">
        <span className="text-7xl mb-6 animate-float">{slide.emoji}</span>
        <h1 className="text-2xl font-bold text-white font-cairo mb-3">{slide.title}</h1>
        <p className="text-white/80 text-sm leading-relaxed">{slide.description}</p>
      </div>

      <div className="flex gap-2 mb-6">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-white" : "w-2 bg-white/30"}`}
          />
        ))}
      </div>

      <div className="w-full max-w-sm flex gap-3">
        {current > 0 && (
          <Button variant="outline" onClick={prev} className="flex-1 h-12 rounded-xl border-white/30 text-white bg-white/10 hover:bg-white/20">
            السابق
          </Button>
        )}
        <Button onClick={next} className="flex-1 h-12 rounded-xl bg-white text-foreground font-bold hover:bg-white/90">
          {current === slides.length - 1 ? "ابدأ الآن" : "التالي"}
        </Button>
      </div>

      {current < slides.length - 1 && (
        <button onClick={finish} className="mt-4 text-white/50 text-sm hover:text-white/80">تخطي</button>
      )}
    </div>
  );
};

export default OnboardingPage;
