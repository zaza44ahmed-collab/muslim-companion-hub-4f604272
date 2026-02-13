import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Download, Star, Filter, Sparkles, ChevronLeft } from "lucide-react";
import { apps, appCategories, type AppItem } from "@/data/apps";
import AppDetailDialog from "@/components/apps/AppDetailDialog";

const suggested = apps.filter((app) => app.rating >= 4.8).slice(0, 4);

const AppsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);

  const filteredApps =
    activeCategory === "all"
      ? apps
      : apps.filter((app) => app.category === activeCategory);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="container py-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold">التطبيقات الإسلامية</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Suggested Apps */}
        <section className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-gold" />
              <h3 className="font-bold text-sm">مقترحة لك</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-primary gap-1 text-[10px] px-1.5 h-7">
              عرض الكل
              <ChevronLeft className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {suggested.map((app) => (
              <div
                key={`suggested-${app.id}`}
                className="min-w-[120px] max-w-[120px] bg-card rounded-xl p-2.5 shadow-card-islamic cursor-pointer hover:shadow-lg transition-shadow shrink-0"
                onClick={() => setSelectedApp(app)}
              >
                <img
                  src={app.icon}
                  alt={app.name}
                  className="h-12 w-12 rounded-xl object-cover shadow-sm mx-auto mb-1.5"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
                <h4 className="font-bold text-xs text-center truncate">{app.name}</h4>
                <p className="text-xs text-muted-foreground text-center truncate mt-0.5">
                  {app.category === "quran" ? "قرآن" : app.category === "azkar" ? "أذكار" : app.category === "prayer" ? "صلاة" : app.category === "kids" ? "أطفال" : "فقه"}
                </p>
                <div className="flex items-center justify-center gap-1 mt-1.5">
                  <Star className="h-3 w-3 fill-gold text-gold" />
                  <span className="text-xs font-semibold">{app.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
          {appCategories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "islamic" : "outline"}
              size="sm"
              className="shrink-0"
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* All Apps List */}
        <h3 className="font-bold text-sm mb-2">جميع التطبيقات</h3>
        <div className="space-y-2.5">
          {filteredApps.map((app, index) => (
            <div
              key={app.id}
              className="bg-card rounded-xl p-3 shadow-card-islamic animate-fadeIn cursor-pointer hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${index * 80}ms` }}
              onClick={() => setSelectedApp(app)}
            >
              <div className="flex items-start gap-3">
                <img
                  src={app.icon}
                  alt={app.name}
                  className="h-12 w-12 rounded-xl object-cover shadow-sm shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm">{app.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {app.description}
                  </p>

                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-xs text-gold">
                      <Star className="h-3 w-3 fill-gold" />
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

                <Button
                  variant="islamic"
                  size="sm"
                  className="shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Download className="h-4 w-4 ml-1" />
                  تحميل
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <AppDetailDialog
        app={selectedApp}
        open={!!selectedApp}
        onOpenChange={(open) => !open && setSelectedApp(null)}
      />

      <BottomNav />
    </div>
  );
};

export default AppsPage;
