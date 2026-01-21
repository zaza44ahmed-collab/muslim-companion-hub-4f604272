import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Download, Star, Filter } from "lucide-react";

const categories = [
  { id: "all", label: "الكل", active: true },
  { id: "quran", label: "قرآن" },
  { id: "azkar", label: "أذكار" },
  { id: "fiqh", label: "فقه" },
  { id: "kids", label: "أطفال" },
];

const apps = [
  {
    id: 1,
    name: "تطبيق أذكار المسلم",
    description: "أذكار الصباح والمساء مع التنبيهات",
    icon: "📿",
    size: "12 MB",
    downloads: "100K+",
    rating: 4.9,
    category: "azkar",
  },
  {
    id: 2,
    name: "المصحف الإلكتروني",
    description: "القرآن الكريم بخط واضح مع التفسير",
    icon: "📖",
    size: "45 MB",
    downloads: "500K+",
    rating: 5.0,
    category: "quran",
  },
  {
    id: 3,
    name: "تعليم الصلاة للأطفال",
    description: "تعليم الصلاة بطريقة ممتعة ومبسطة",
    icon: "🧒",
    size: "28 MB",
    downloads: "50K+",
    rating: 4.8,
    category: "kids",
  },
  {
    id: 4,
    name: "حصن المسلم",
    description: "جميع أذكار المسلم اليومية",
    icon: "🏰",
    size: "8 MB",
    downloads: "200K+",
    rating: 4.9,
    category: "azkar",
  },
  {
    id: 5,
    name: "الفقه الميسر",
    description: "أحكام الفقه الإسلامي بشكل مبسط",
    icon: "⚖️",
    size: "15 MB",
    downloads: "30K+",
    rating: 4.7,
    category: "fiqh",
  },
];

const AppsPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="container py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">التطبيقات الإسلامية</h2>
          <Button variant="ghost" size="icon">
            <Filter className="h-5 w-5" />
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={cat.active ? "islamic" : "outline"}
              size="sm"
              className="shrink-0"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Apps Grid */}
        <div className="space-y-4">
          {apps.map((app, index) => (
            <div
              key={app.id}
              className="bg-card rounded-2xl p-4 shadow-card-islamic animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl shrink-0">
                  {app.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base">{app.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {app.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-xs text-secondary">
                      <Star className="h-3 w-3 fill-secondary" />
                      {app.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {app.size}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {app.downloads}
                    </span>
                  </div>
                </div>

                <Button variant="islamic" size="sm" className="shrink-0">
                  <Download className="h-4 w-4 ml-1" />
                  تحميل
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default AppsPage;
