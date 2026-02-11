import { Store, Search, Filter, MapPin, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/layout/BottomNav";

const categories = [
  { id: 1, name: "سيارات", emoji: "🚗" },
  { id: 2, name: "عقارات", emoji: "🏠" },
  { id: 3, name: "إلكترونيات", emoji: "📱" },
  { id: 4, name: "أثاث", emoji: "🪑" },
  { id: 5, name: "ملابس", emoji: "👕" },
  { id: 6, name: "كتب", emoji: "📚" },
  { id: 7, name: "رياضة", emoji: "⚽" },
  { id: 8, name: "أخرى", emoji: "📦" },
];

const listings = [
  { id: 1, title: "آيفون 15 برو ماكس", price: "3,500 ر.س", location: "الرياض", image: "📱", category: "إلكترونيات" },
  { id: 2, title: "كنب مودرن 3 قطع", price: "2,200 ر.س", location: "جدة", image: "🛋️", category: "أثاث" },
  { id: 3, title: "تويوتا كامري 2023", price: "95,000 ر.س", location: "الدمام", image: "🚗", category: "سيارات" },
  { id: 4, title: "لابتوب ماك بوك برو", price: "5,800 ر.س", location: "الرياض", image: "💻", category: "إلكترونيات" },
  { id: 5, title: "شقة للإيجار 3 غرف", price: "2,500 ر.س/شهر", location: "مكة", image: "🏠", category: "عقارات" },
  { id: 6, title: "دراجة رياضية", price: "800 ر.س", location: "المدينة", image: "🚴", category: "رياضة" },
];

const MarketplacePage = () => {
  return (
    <div className="min-h-screen bg-background pb-20" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-lg border-b-2 border-secondary/30">
        <div className="container flex h-12 items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-secondary" />
            <h1 className="text-base font-bold font-amiri text-primary">ماركت بلايس</h1>
          </div>
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5 rotate-180" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="container py-3 space-y-4">
        {/* Search */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="ابحث في ماركت بلايس..."
              className="w-full h-10 pr-9 pl-3 rounded-xl border-2 border-secondary/30 bg-card text-sm focus:outline-none focus:border-secondary/60"
            />
          </div>
          <button className="h-10 w-10 rounded-xl border-2 border-secondary/30 bg-card flex items-center justify-center">
            <Filter className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="flex flex-col items-center gap-1 min-w-[60px] py-2 px-3 rounded-xl border border-secondary/20 bg-card hover:bg-secondary/10 transition-colors"
            >
              <span className="text-xl">{cat.emoji}</span>
              <span className="text-[10px] font-semibold text-foreground/80 whitespace-nowrap">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {listings.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border-2 border-secondary/20 bg-card overflow-hidden hover:border-secondary/40 transition-colors"
            >
              <div className="h-28 bg-secondary/5 flex items-center justify-center text-4xl">
                {item.image}
              </div>
              <div className="p-2.5 space-y-1">
                <h3 className="text-xs font-bold text-foreground line-clamp-1">{item.title}</h3>
                <p className="text-sm font-bold text-secondary">{item.price}</p>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="text-[10px]">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default MarketplacePage;
