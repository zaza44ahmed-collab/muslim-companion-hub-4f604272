import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import DailyQuote from "@/components/home/DailyQuote";
import PrayerTimes from "@/components/home/PrayerTimes";
import QuickActions from "@/components/home/QuickActions";
import FeaturedContent from "@/components/home/FeaturedContent";
import SeasonalBanner from "@/components/home/SeasonalBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="container py-4 space-y-6">
        {/* Daily Quote / Azkar */}
        <section className="animate-fadeIn">
          <DailyQuote />
        </section>

        {/* Quick Actions - 6 Icons */}
        <section className="animate-fadeIn" style={{ animationDelay: "100ms" }}>
          <QuickActions />
        </section>

        {/* Prayer Times */}
        <section className="animate-fadeIn" style={{ animationDelay: "200ms" }}>
          <PrayerTimes />
        </section>

        {/* Seasonal Banner */}
        <section className="animate-fadeIn" style={{ animationDelay: "300ms" }}>
          <SeasonalBanner />
        </section>

        {/* Featured Content */}
        <section className="animate-fadeIn" style={{ animationDelay: "400ms" }}>
          <FeaturedContent />
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
