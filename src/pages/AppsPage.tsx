import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Download, Star, Filter } from "lucide-react";
import { apps, appCategories, type AppItem } from "@/data/apps";
import AppDetailDialog from "@/components/apps/AppDetailDialog";

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

        {/* Apps List */}
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
