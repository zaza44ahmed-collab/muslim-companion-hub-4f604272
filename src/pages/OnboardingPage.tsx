import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OnboardingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("onboarding_seen", "true");
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(184,37%,24%)] to-[hsl(204,37%,14%)] flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center justify-center text-center max-w-sm animate-fadeIn">
        <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl mb-6 border-4 border-white/20">
          <img src="/logo-app.png" alt="حقيبة المسلم" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-3xl font-bold text-white font-cairo mb-3">حقيبة المسلم</h1>
        <p className="text-white/70 text-sm leading-relaxed">تطبيقك الإسلامي الشامل</p>
        <div className="mt-8 flex gap-1">
          <div className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: "0.2s" }} />
          <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
