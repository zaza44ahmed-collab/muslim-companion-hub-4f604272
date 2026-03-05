import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Star, Search, X } from "lucide-react";
import { appCategories } from "@/data/apps";
import AppDetailDialog from "@/components/apps/AppDetailDialog";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AppsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedUserApp, setSelectedUserApp] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [userApps, setUserApps] = useState<any[]>([]);

  const filteredUserApps = userApps.filter((app) => {
    const matchesCategory = activeCategory === "all" || app.category === activeCategory;
    const matchesSearch = !searchQuery || app.name.includes(searchQuery) || app.description.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

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

        <div className="border-b border-border mb-3" />

        {showSearch && (
          <div className="mb-3 animate-fadeIn">
            <Input placeholder="ابحث عن تطبيق..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="text-right" autoFocus />
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto mb-3 scrollbar-hide">
          {appCategories.map((cat) => (
            <Button key={cat.id} variant={activeCategory === cat.id ? "islamic" : "outline"} size="sm" className="shrink-0" onClick={() => setActiveCategory(cat.id)}>
              {cat.label}
            </Button>
          ))}
        </div>

        {filteredUserApps.length > 0 ? (
          <div className="space-y-2.5">
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
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Search className="h-10 w-10 mb-3 opacity-40" />
            <p className="font-semibold text-sm">لا توجد تطبيقات بعد</p>
            <p className="text-xs mt-1">أضف تطبيقات لتظهر هنا</p>
          </div>
        )}
      </main>

      <AppDetailDialog
        app={null}
        userApp={selectedUserApp}
        open={!!selectedUserApp}
        onOpenChange={(open) => !open && setSelectedUserApp(null)}
      />

      <BottomNav />
    </div>
  );
};

export default AppsPage;
