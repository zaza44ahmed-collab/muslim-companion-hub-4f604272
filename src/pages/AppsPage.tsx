import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Download, Star, Filter, TrendingUp, Sparkles, ChevronLeft } from "lucide-react";
import { apps, appCategories, type AppItem } from "@/data/apps";
import AppDetailDialog from "@/components/apps/AppDetailDialog";

const topDownloaded = [...apps].sort((a, b) => {
  const parseDownloads = (d: string) => {
    const num = parseFloat(d.replace(/[^0-9.]/g, ""));
    if (d.includes("M")) return num * 1000000;
    if (d.includes("K")) return num * 1000;
    return num;
  };
  return parseDownloads(b.downloads) - parseDownloads(a.downloads);
}).slice(0, 4);

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

      <main className="container py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">التطبيقات الإسلامية</h2>
          <Button variant="ghost" size="icon">
            <Filter className="h-5 w-5" />
          </Button>
        </div>

        {/* Suggested Apps */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold" />
              <h3 className="font-bold text-base">مقترحة لك</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-primary gap-1 text-xs px-2">
              عرض الكل
              <ChevronLeft className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {suggested.map((app) => (
              <div
                key={`suggested-${app.id}`}
                className="min-w-[140px] max-w-[140px] bg-card rounded-2xl p-3 shadow-card-islamic cursor-pointer hover:shadow-lg transition-shadow shrink-0"
                onClick={() => setSelectedApp(app)}
              >
                <img
                  src={app.icon}
                  alt={app.name}
                  className="h-16 w-16 rounded-2xl object-cover shadow-sm mx-auto mb-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
                <h4 className="font-bold text-sm text-center truncate">{app.name}</h4>
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

        {/* Most Downloaded */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-base">الأكثر تحميلاً</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-primary gap-1 text-xs px-2">
              عرض الكل
              <ChevronLeft className="h-3 w-3" />
            </Button>
          </div>
          <div className="space-y-3">
            {topDownloaded.map((app, index) => (
              <div
                key={`top-${app.id}`}
                className="bg-card rounded-2xl p-3 shadow-card-islamic cursor-pointer hover:shadow-lg transition-shadow flex items-center gap-3"
                onClick={() => setSelectedApp(app)}
              >
                <span className="text-2xl font-bold text-primary/30 w-8 text-center shrink-0">
                  {index + 1}
                </span>
                <img
                  src={app.icon}
                  alt={app.name}
                  className="h-12 w-12 rounded-xl object-cover shadow-sm shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate">{app.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{app.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3 fill-gold text-gold" />
                    {app.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">{app.downloads}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
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
        <h3 className="font-bold text-base mb-3">جميع التطبيقات</h3>
        <div className="space-y-4">
          {filteredApps.map((app, index) => (
            <div
              key={app.id}
              className="bg-card rounded-2xl p-4 shadow-card-islamic animate-fadeIn cursor-pointer hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${index * 80}ms` }}
              onClick={() => setSelectedApp(app)}
            >
              <div className="flex items-start gap-4">
                <img
                  src={app.icon}
                  alt={app.name}
                  className="h-16 w-16 rounded-2xl object-cover shadow-sm shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base">{app.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
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
