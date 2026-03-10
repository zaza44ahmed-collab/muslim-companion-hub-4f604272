import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, Star, Search, X, Bookmark, ExternalLink, ChevronLeft } from "lucide-react";
import { appCategories, apps } from "@/data/apps";
import AppDetailDialog from "@/components/apps/AppDetailDialog";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AppsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedUserApp, setSelectedUserApp] = useState<any | null>(null);
  const [selectedStaticApp, setSelectedStaticApp] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [userApps, setUserApps] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("appFavorites");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      localStorage.setItem("appFavorites", JSON.stringify([...n]));
      return n;
    });
    toast({ title: favorites.has(id) ? "تمت الإزالة من المحفوظات" : "تم الحفظ ✓" });
  };

  // Merge static apps + user apps
  const allApps = [
    ...apps.map(a => ({ ...a, id: String(a.id), isStatic: true })),
    ...userApps.map(a => ({ ...a, isStatic: false })),
  ];

  const filteredApps = allApps.filter((app) => {
    const matchesCategory = activeCategory === "all" || app.category === activeCategory;
    const matchesSearch = !searchQuery || app.name.includes(searchQuery) || app.description.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const fetchUserApps = async () => {
    const { data } = await supabase.from("user_apps").select("*").order("created_at", { ascending: false });
    if (data) setUserApps(data);
  };

  useEffect(() => { fetchUserApps(); }, []);

  // Featured apps (top rated static)
  const featuredApps = apps.filter(a => a.rating >= 4.8).slice(0, 4);

  return (
    <div className="min-h-screen bg-background pb-20" dir="rtl">
      <main className="container py-3 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold">التطبيقات الإسلامية</h2>
            <p className="text-xs text-muted-foreground">اكتشف أفضل التطبيقات الإسلامية</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setShowSearch(!showSearch); if (showSearch) setSearchQuery(""); }}>
            {showSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>

        {showSearch && (
          <div className="mb-3 animate-fadeIn">
            <Input placeholder="ابحث عن تطبيق..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="text-right" autoFocus />
          </div>
        )}

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto mb-4 scrollbar-hide">
          {appCategories.map((cat) => (
            <Button key={cat.id} variant={activeCategory === cat.id ? "islamic" : "outline"} size="sm" className="shrink-0 rounded-full" onClick={() => setActiveCategory(cat.id)}>
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Featured Section */}
        {activeCategory === "all" && !searchQuery && featuredApps.length > 0 && (
          <section className="mb-5">
            <div className="flex items-center gap-1.5 mb-3">
              <Star className="h-4 w-4 text-primary fill-primary" />
              <h3 className="text-sm font-bold">تطبيقات مميزة</h3>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
              {featuredApps.map((app) => (
                <div key={app.id} onClick={() => setSelectedStaticApp(app)}
                  className="min-w-[160px] bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl p-3 border border-primary/20 cursor-pointer hover:shadow-md transition-all">
                  <img src={app.icon} alt={app.name} className="h-14 w-14 rounded-2xl object-cover shadow-sm mx-auto mb-2"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                  <h4 className="text-xs font-bold text-center line-clamp-1">{app.name}</h4>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] text-muted-foreground">{app.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Apps Grid */}
        {filteredApps.length > 0 ? (
          <div className="space-y-2.5">
            {filteredApps.map((app, index) => (
              <div
                key={app.id}
                className="bg-card rounded-2xl p-3.5 border border-border/50 animate-fadeIn cursor-pointer hover:bg-accent/30 transition-all"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => app.isStatic ? setSelectedStaticApp(apps.find(a => String(a.id) === app.id)) : setSelectedUserApp(app)}
              >
                <div className="flex items-start gap-3">
                  <img src={(app as any).icon || (app as any).icon_url || "/placeholder.svg"} alt={app.name}
                    className="h-14 w-14 rounded-2xl object-cover shadow-sm shrink-0 border border-border/30"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-sm">{app.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{app.description}</p>
                      </div>
                      <button onClick={(e) => toggleFav(app.id, e)} className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted/30 shrink-0">
                        <Bookmark className={`h-4 w-4 ${favorites.has(app.id) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      {(app as any).rating && (
                        <span className="flex items-center gap-0.5 text-xs">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-muted-foreground">{(app as any).rating}</span>
                        </span>
                      )}
                      {(app as any).downloads && (
                        <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
                          <Download className="h-2.5 w-2.5 ml-0.5" />{(app as any).downloads}
                        </Badge>
                      )}
                      {(app as any).size && (
                        <span className="text-[10px] text-muted-foreground">{(app as any).size}</span>
                      )}
                      {(app as any).version && (
                        <span className="text-[10px] text-muted-foreground">v{(app as any).version}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Search className="h-10 w-10 mb-3 opacity-40" />
            <p className="font-semibold text-sm">لا توجد تطبيقات</p>
            <p className="text-xs mt-1">جرب البحث بكلمات مختلفة</p>
          </div>
        )}
      </main>

      <AppDetailDialog
        app={selectedStaticApp}
        userApp={selectedUserApp}
        open={!!selectedUserApp || !!selectedStaticApp}
        onOpenChange={(open) => { if (!open) { setSelectedUserApp(null); setSelectedStaticApp(null); } }}
      />

      <BottomNav />
    </div>
  );
};

export default AppsPage;
