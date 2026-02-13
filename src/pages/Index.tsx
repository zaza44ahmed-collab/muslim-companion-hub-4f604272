import { useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import DailyQuote from "@/components/home/DailyQuote";
import PrayerTimes from "@/components/home/PrayerTimes";
import QuickActions from "@/components/home/QuickActions";

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-4");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-4 transition-all duration-500 ease-out"
    >
      {children}
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="container py-4 space-y-5 px-4">
        <AnimatedSection delay={0}>
          <DailyQuote />
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <QuickActions />
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <PrayerTimes />
        </AnimatedSection>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
