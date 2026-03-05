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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <img
        src="/splash-bg.jpg"
        alt="حقيبة المسلم"
        className="w-full h-full object-cover fixed inset-0"
      />
    </div>
  );
};

export default OnboardingPage;
