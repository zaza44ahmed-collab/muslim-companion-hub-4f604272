import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import DailyQuote from "@/components/home/DailyQuote";
import PrayerTimes from "@/components/home/PrayerTimes";
import QuickActions from "@/components/home/QuickActions";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="container py-4 space-y-5 px-4">
        <section>
          <DailyQuote />
        </section>

        <section>
          <QuickActions />
        </section>

        <section>
          <PrayerTimes />
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
