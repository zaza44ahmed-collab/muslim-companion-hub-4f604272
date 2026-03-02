import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Star, Search, X, Plus } from "lucide-react";
import { apps, appCategories, type AppItem } from "@/data/apps";
import AppDetailDialog from "@/components/apps/AppDetailDialog";
import AddAppDialog from "@/components/apps/AddAppDialog";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AppsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [selectedUserApp, setSelectedUserApp] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [userApps, setUserApps] = useState<any[]>([]);

  const filteredApps = apps.filter((app) => {
    const matchesCategory = activeCategory === "all" || app.category === activeCategory;
    const matchesSearch = !searchQuery || app.name.includes(searchQuery) || app.description.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const filteredUserApps = userApps.filter((app) => {
    const matchesCategory = activeCategory === "all" || app.category === activeCategory;
    const matchesSearch = !searchQuery || app.name.includes(searchQuery) || app.description.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (app: AppItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const searchQuery = encodeURIComponent(app.name);
    window.open(`https://play.google.com/store/search?q=${searchQuery}&c=apps`, "_blank");
    toast({ title: "جاري فتح المتجر", description: `البحث عن "${app.name}" في متجر Google Play` });
  };

  const fetchUserApps = async () => {
    const { data } = await supabase.from("user_apps").select("*").order("created_at", { ascending: false });
    if (data) setUserApps(data);
  };

  useEffect(() => { fetchUserApps(); }, []);

  return (
    <div className="min-h-screen bg-background pb-20" dir="rtl">
      <main className="container py-3 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold">التطبيقات الإسلامية</h2>
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
        <div className="flex gap-2 overflow-x-auto mb-2 scrollbar-hide">
          {appCategories.map((cat) => (
            <Button key={cat.id} variant={activeCategory === cat.id ? "islamic" : "outline"} size="sm" className="shrink-0" onClick={() => setActiveCategory(cat.id)}>
              {cat.label}
            </Button>
          ))}
        </div>

        {/* User uploaded apps */}
        {filteredUserApps.length > 0 && (
          <>
            <h3 className="font-bold text-sm mb-2">تطبيقات المستخدمين</h3>
            <div className="space-y-2.5 mb-4">
              {filteredUserApps.map((app, index) => (
                <div
                  key={app.id}
                  className="bg-card rounded-xl p-3 shadow-card-islamic animate-fadeIn cursor-pointer hover:shadow-lg transition-shadow"
                  style={{ animationDelay: `${index * 80}ms` }}
                  onClick={() => setSelectedUserApp(app)}
                >
                  <div className="flex items-start gap-3">
                    <img src={app.icon_url || "/placeholder.svg"} alt={app.name} className="h-12 w-12 rounded-xl object-cover shadow-sm shrink-0" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm">{app.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">{app.description}</p>
                      {app.version && <span className="text-xs text-muted-foreground">v{app.version}</span>}
                    </div>
                    {app.app_file_url && (
                      <Button variant="islamic" size="sm" className="shrink-0" onClick={(e) => { e.stopPropagation(); setSelectedUserApp(app); }}>
                        <Download className="h-4 w-4 ml-1" />
                        تحميل
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

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
                <img src={app.icon} alt={app.name} className="h-12 w-12 rounded-xl object-cover shadow-sm shrink-0" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm">{app.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{app.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-xs text-gold"><Star className="h-3 w-3 fill-gold" />{app.rating}</span>
                    <span className="text-xs text-muted-foreground">{app.size}</span>
                    <span className="text-xs text-muted-foreground">{app.downloads}</span>
                  </div>
                </div>
                <Button variant="islamic" size="sm" className="shrink-0" onClick={(e) => handleDownload(app, e)}>
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

      <AppDetailDialog
        app={null}
        userApp={selectedUserApp}
        open={!!selectedUserApp}
        onOpenChange={(open) => !open && setSelectedUserApp(null)}
      />

      <AddAppDialog open={showAddDialog} onOpenChange={setShowAddDialog} onAdded={fetchUserApps} />

      {/* FAB */}
      <button
        onClick={() => setShowAddDialog(true)}
        className="fixed bottom-24 left-5 z-40 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center active:scale-95 transition-transform"
      >
        <Plus className="h-6 w-6" />
      </button>

      <BottomNav />
    </div>
  );
};

export default AppsPage;
