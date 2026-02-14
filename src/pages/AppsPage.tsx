import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Star, Search, X } from "lucide-react";
import { apps, appCategories, type AppItem } from "@/data/apps";
import AppDetailDialog from "@/components/apps/AppDetailDialog";

const AppsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filteredApps = apps.filter((app) => {
    const matchesCategory = activeCategory === "all" || app.category === activeCategory;
    const matchesSearch = !searchQuery || app.name.includes(searchQuery) || app.description.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      

      <main className="container py-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold">التطبيقات الإسلامية</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setShowSearch(!showSearch); if (showSearch) setSearchQuery(""); }}>
            {showSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>

        {showSearch && (
          <div className="mb-3 animate-fadeIn">
            <Input
              placeholder="ابحث عن تطبيق..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-right"
              autoFocus
            />
          </div>
        )}

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
        {filteredApps.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Search className="h-10 w-10 mb-3 opacity-40" />
            <p className="font-semibold text-sm">لا توجد نتائج</p>
            <p className="text-xs mt-1">جرّب كلمات بحث مختلفة</p>
          </div>
        ) : (
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
        )}
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
