import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Pause, Heart, Clock, Star, Search, X, Download, SkipBack, SkipForward } from "lucide-react";
import { audioAlbums, audioCategories, type AudioAlbum } from "@/data/audio";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AudioPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [userAudio, setUserAudio] = useState<any[]>([]);

  // Inline player state
  const [playingAudio, setPlayingAudio] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Combined list of all audio for navigation
  const allAudioList = useRef<any[]>([]);

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
    toast({ title: favorites.includes(id) ? "تمت الإزالة من المفضلة" : "تمت الإضافة للمفضلة" });
  };

  const fetchUserAudio = async () => {
    const { data } = await supabase.from("user_audio").select("*").order("created_at", { ascending: false });
    if (data) setUserAudio(data);
  };

  useEffect(() => { fetchUserAudio(); }, []);

  useEffect(() => {
    return () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; } };
  }, []);

  // Update allAudioList when userAudio changes
  useEffect(() => {
    allAudioList.current = [...filteredUserAudio];
  }, [filteredUserAudio]);

  const playUserAudio = (audio: any) => {
    if (!audio.audio_url) {
      toast({ title: "لا يوجد ملف صوتي" });
      return;
    }

    if (playingAudio?.id === audio.id && audioRef.current) {
      if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
      else { audioRef.current.play(); setIsPlaying(true); }
      return;
    }

    if (audioRef.current) { audioRef.current.pause(); }

    const a = new Audio(audio.audio_url);
    audioRef.current = a;
    setPlayingAudio(audio);
    setAudioProgress(0);
    setAudioCurrentTime(0);

    a.addEventListener("loadedmetadata", () => setAudioDuration(a.duration));
    a.addEventListener("timeupdate", () => {
      setAudioCurrentTime(a.currentTime);
      if (a.duration) setAudioProgress((a.currentTime / a.duration) * 100);
    });
    a.addEventListener("ended", () => { setIsPlaying(false); setAudioProgress(0); setAudioCurrentTime(0); });

    a.play();
    setIsPlaying(true);
    toast({ title: `جاري تشغيل: ${audio.title}` });
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play(); setIsPlaying(true); }
  };

  const playNext = () => {
    if (!playingAudio) return;
    const list = allAudioList.current;
    const idx = list.findIndex((a: any) => a.id === playingAudio.id);
    if (idx < list.length - 1) playUserAudio(list[idx + 1]);
  };

  const playPrev = () => {
    if (!playingAudio) return;
    const list = allAudioList.current;
    const idx = list.findIndex((a: any) => a.id === playingAudio.id);
    if (idx > 0) playUserAudio(list[idx - 1]);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !audioDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = clickX / rect.width;
    audioRef.current.currentTime = pct * audioDuration;
  };

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  const downloadAudio = (audio: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (audio.audio_url) {
      const a = document.createElement("a");
      a.href = audio.audio_url;
      a.download = `${audio.title}.mp3`;
      a.click();
      toast({ title: "جاري التحميل..." });
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

        <div className="border-b border-border mb-3" />

        {showSearch && (
          <div className="mb-3 animate-fadeIn">
            <Input placeholder="ابحث عن صوتيات..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="text-right" autoFocus />
          </div>
        )}

        {/* Categories - no animated underline */}
        <div className="flex gap-2 overflow-x-auto mb-3 scrollbar-hide">
          {audioCategories.map((cat) => (
            <Button key={cat.id} variant={activeCategory === cat.id ? "islamic" : "outline"} size="sm" className="shrink-0" onClick={() => setActiveCategory(cat.id)}>
              {cat.label}
            </Button>
          ))}
        </div>

        {/* User uploaded audio - no separate title */}
        {filteredUserAudio.length > 0 && (
          <div className="space-y-2 mb-4">
            {filteredUserAudio.map((audio, index) => (
              <div
                key={audio.id}
                className={`bg-card rounded-xl p-3 shadow-card-islamic animate-fadeIn cursor-pointer hover:shadow-lg transition-shadow ${playingAudio?.id === audio.id ? "ring-2 ring-primary" : ""}`}
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
                    <div className="flex items-center gap-3 mt-1">
                      {audio.duration && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />{audio.duration}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-gold">
                        <Star className="h-3 w-3 fill-gold" />4.5
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => toggleFavorite(audio.id, e)}>
                      <Heart className={`h-4 w-4 ${favorites.includes(audio.id) ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => downloadAudio(audio, e)}>
                      <Download className="h-4 w-4" />
                    </Button>
                    {playingAudio?.id === audio.id && isPlaying ? (
                      <Pause className="h-5 w-5 text-primary shrink-0" />
                    ) : (
                      <Play className="h-5 w-5 text-primary shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* All Audio List */}
        {filteredAudio.length === 0 && filteredUserAudio.length === 0 ? (
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

      {/* Inline Audio Player with prev/next buttons */}
      {playingAudio && (
        <div className="fixed bottom-[60px] left-0 right-0 z-30 bg-card/95 backdrop-blur-lg border-t border-border shadow-lg">
          <div className="container px-4 py-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                {playingAudio.cover_url ? (
                  <img src={playingAudio.cover_url} alt="" className="h-full w-full object-cover rounded-lg" />
                ) : (
                  <Play className="h-4 w-4 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">{playingAudio.title}</p>
                <p className="text-[10px] text-muted-foreground">{playingAudio.artist || "غير معروف"}</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-muted-foreground tabular-nums">{formatTime(audioCurrentTime)}</span>
                <button onClick={playPrev} className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-muted/20">
                  <SkipForward className="h-3.5 w-3.5 text-foreground" />
                </button>
                <button onClick={togglePlayPause} className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 mr-[-1px]" />}
                </button>
                <button onClick={playNext} className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-muted/20">
                  <SkipBack className="h-3.5 w-3.5 text-foreground" />
                </button>
                <span className="text-[10px] text-muted-foreground tabular-nums">{formatTime(audioDuration)}</span>
              </div>
              <button onClick={() => { audioRef.current?.pause(); setPlayingAudio(null); setIsPlaying(false); }}>
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <div className="w-full h-1 bg-muted/30 rounded-full mt-1.5 cursor-pointer" onClick={handleSeek}>
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${audioProgress}%` }} />
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default AudioPage;
