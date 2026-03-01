import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Heart, Clock, Star, Search, X, Plus } from "lucide-react";
import { audioAlbums, audioCategories, type AudioAlbum } from "@/data/audio";
import AddAudioDialog from "@/components/audio/AddAudioDialog";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AudioPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [userAudio, setUserAudio] = useState<any[]>([]);

  const filteredAudio = audioAlbums.filter((a) => {
    const matchesCategory = activeCategory === "all" || a.category === activeCategory;
    const matchesSearch = !searchQuery || a.title.includes(searchQuery) || a.artist.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const filteredUserAudio = userAudio.filter((a) => {
    const matchesCategory = activeCategory === "all" || a.category === activeCategory;
    const matchesSearch = !searchQuery || a.title.includes(searchQuery) || a.artist.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const openPlayer = (album: AudioAlbum) => {
    navigate(`/audio/${album.id}`);
  };

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
    toast({
      title: favorites.includes(id) ? "تمت الإزالة من المفضلة" : "تمت الإضافة للمفضلة",
    });
  };

  const fetchUserAudio = async () => {
    const { data } = await supabase.from("user_audio").select("*").order("created_at", { ascending: false });
    if (data) setUserAudio(data);
  };

  useEffect(() => { fetchUserAudio(); }, []);

  const playUserAudio = (audio: any) => {
    if (audio.audio_url) {
      const a = new Audio(audio.audio_url);
      a.play();
      toast({ title: `جاري تشغيل: ${audio.title}` });
    } else {
      toast({ title: "لا يوجد ملف صوتي" });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20" dir="rtl">
      <main className="container py-3 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold">الصوتيات الإسلامية</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setShowSearch(!showSearch); if (showSearch) setSearchQuery(""); }}>
            {showSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>

        {showSearch && (
          <div className="mb-3 animate-fadeIn">
            <Input placeholder="ابحث عن صوتيات..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="text-right" autoFocus />
          </div>
        )}

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
          {audioCategories.map((cat) => (
            <Button key={cat.id} variant={activeCategory === cat.id ? "islamic" : "outline"} size="sm" className="shrink-0" onClick={() => setActiveCategory(cat.id)}>
              {cat.label}
            </Button>
          ))}
        </div>

        {/* User uploaded audio */}
        {filteredUserAudio.length > 0 && (
          <>
            <h3 className="font-bold text-sm mb-2">صوتيات المستخدمين</h3>
            <div className="space-y-2 mb-4">
              {filteredUserAudio.map((audio, index) => (
                <div
                  key={audio.id}
                  className="bg-card rounded-xl p-3 shadow-card-islamic animate-fadeIn cursor-pointer hover:shadow-lg transition-shadow"
                  style={{ animationDelay: `${index * 80}ms` }}
                  onClick={() => playUserAudio(audio)}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-lg bg-gradient-to-br from-primary/20 to-gold/10 flex items-center justify-center shrink-0 relative overflow-hidden">
                      {audio.cover_url ? (
                        <img src={audio.cover_url} alt="" className="h-full w-full object-cover rounded-lg" />
                      ) : (
                        <Play className="h-5 w-5 text-primary/70" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm">{audio.title}</h3>
                      <p className="text-xs text-muted-foreground">{audio.artist || "غير معروف"}</p>
                    </div>
                    <Play className="h-5 w-5 text-primary shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* All Audio List */}
        <h3 className="font-bold text-sm mb-2">جميع الصوتيات</h3>
        {filteredAudio.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Search className="h-10 w-10 mb-3 opacity-40" />
            <p className="font-semibold text-sm">لا توجد نتائج</p>
            <p className="text-xs mt-1">جرّب كلمات بحث مختلفة</p>
          </div>
        ) : (
        <div className="space-y-2">
          {filteredAudio.map((album, index) => (
            <div
              key={album.id}
              className="bg-card rounded-xl p-3 shadow-card-islamic animate-fadeIn cursor-pointer hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${index * 80}ms` }}
              onClick={() => openPlayer(album)}
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-lg bg-gradient-to-br from-primary/20 to-gold/10 flex items-center justify-center shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 islamic-pattern opacity-10" />
                  <Play className="h-5 w-5 text-primary/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm">{album.title}</h3>
                  <p className="text-xs text-muted-foreground">{album.artist}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{album.totalDuration}</span>
                    <span className="text-xs text-muted-foreground">{album.tracksCount} مقاطع</span>
                    <span className="flex items-center gap-1 text-xs text-gold"><Star className="h-3 w-3 fill-gold" />{album.rating}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0" onClick={(e) => toggleFavorite(album.id, e)}>
                  <Heart className={`h-4 w-4 ${favorites.includes(album.id) ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        )}
      </main>

      <AddAudioDialog open={showAddDialog} onOpenChange={setShowAddDialog} onAdded={fetchUserAudio} />

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

export default AudioPage;
