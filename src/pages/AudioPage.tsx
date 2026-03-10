import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Play, Pause, Bookmark, Search, X, Download, SkipBack, SkipForward,
  ArrowLeft, Share2, ChevronLeft, Clock, Timer, Music,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { surahs, featuredReciters, getSurahUrl, type ReciterInfo } from "@/data/surahs";
import { scholars, audioCategories, azkarAudio, khutabAudio, storiesAudio, kidsAudio, type Scholar, type AudioSectionItem } from "@/data/scholars";
import { useAudioPlayer, type AudioTrackInfo } from "@/hooks/useAudioPlayer";
import { useSavedItems } from "@/hooks/useSavedItems";

// --- Sub Views ---

const CategoryCard = ({ cat, onClick }: { cat: typeof audioCategories[0]; onClick: () => void }) => (
  <button onClick={onClick} className={`rounded-2xl bg-gradient-to-br ${cat.color} border border-border/50 p-4 text-center hover:shadow-md transition-all`}>
    <span className="text-3xl block mb-2">{cat.icon}</span>
    <span className="text-xs font-bold text-foreground">{cat.label}</span>
  </button>
);

// --- Generic Audio List Section ---
const AudioListSection = ({ title, items, player }: { title: string; items: AudioSectionItem[]; player: ReturnType<typeof useAudioPlayer> }) => {
  const savedItems = useSavedItems('audio');

  const toggleFav = (id: string) => {
    savedItems.toggleSave('audio', id);
  };

  const playlist: AudioTrackInfo[] = items.map(item => ({
    id: item.id, title: item.title, artist: item.artist, url: item.audioUrl,
  }));

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-foreground text-right">{title}</h3>
      <div className="space-y-2">
        {items.map(item => {
          const isActive = player.currentTrack?.id === item.id;
          return (
            <div key={item.id} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${isActive ? "bg-primary/10 ring-1 ring-primary" : "bg-card border border-border/50 hover:bg-accent/50"}`}
              dir="rtl" onClick={() => player.play({ id: item.id, title: item.title, artist: item.artist, url: item.audioUrl }, playlist)}>
              <div className="flex-1">
                <p className="text-sm font-bold">{item.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{item.artist}</span>
                  {item.duration && <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{item.duration}</span>}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={e => { e.stopPropagation(); toggleFav(item.id); }} className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-muted/30">
                  <Bookmark className={`h-3.5 w-3.5 ${savedItems.isSaved('audio', item.id) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                </button>
                <button onClick={e => { e.stopPropagation(); const a = document.createElement("a"); a.href = item.audioUrl; a.download = `${item.title}.mp3`; a.target = "_blank"; a.click(); toast({ title: "جاري التحميل..." }); }}
                  className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-muted/30">
                  <Download className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                {isActive && player.isPlaying ? <Pause className="h-4 w-4 text-primary" /> : <Play className="h-4 w-4 text-primary" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Quran Section ---
const QuranRecitersView = ({ onSelectReciter }: { onSelectReciter: (r: ReciterInfo) => void }) => (
  <div className="space-y-3">
    <h3 className="text-sm font-bold text-foreground text-right">اختر القارئ</h3>
    <div className="space-y-2">
      {featuredReciters.map((r) => (
        <button key={r.id} onClick={() => onSelectReciter(r)}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-card border border-border/50 hover:bg-accent/50 transition-colors" dir="rtl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Music className="h-5 w-5 text-primary" />
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.availableSurahs.length} سورة</p>
            </div>
          </div>
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        </button>
      ))}
    </div>
  </div>
);

const SurahListView = ({ reciter, player }: { reciter: ReciterInfo; player: ReturnType<typeof useAudioPlayer> }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const savedItems = useSavedItems('audio');

  const toggleFav = (num: number) => {
    savedItems.toggleSave('audio', `surah-${reciter.id}-${num}`);
  };

  const filteredSurahs = useMemo(() => {
    return reciter.availableSurahs
      .map(num => ({ num, name: surahs[num - 1] }))
      .filter(s => !searchQuery || s.name.includes(searchQuery) || String(s.num).includes(searchQuery));
  }, [reciter, searchQuery]);

  const playlist: AudioTrackInfo[] = useMemo(() =>
    reciter.availableSurahs.map(num => ({
      id: `${reciter.id}-${num}`,
      title: `سورة ${surahs[num - 1]}`,
      artist: reciter.name,
      url: getSurahUrl(reciter.server, num),
    })), [reciter]);

  const playSurah = (num: number) => {
    const track: AudioTrackInfo = {
      id: `${reciter.id}-${num}`,
      title: `سورة ${surahs[num - 1]}`,
      artist: reciter.name,
      url: getSurahUrl(reciter.server, num),
    };
    player.play(track, playlist);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2" dir="rtl">
        <h3 className="text-sm font-bold flex-1">{reciter.name}</h3>
      </div>
      <Input placeholder="ابحث عن سورة..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
        className="text-right h-10 rounded-xl" dir="rtl" />
      <div className="space-y-1.5 max-h-[60vh] overflow-y-auto">
        {filteredSurahs.map(({ num, name }) => {
          const isActive = player.currentTrack?.id === `${reciter.id}-${num}`;
          return (
            <div key={num} className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${isActive ? "bg-primary/10 ring-1 ring-primary" : "hover:bg-accent/50"}`}
              dir="rtl" onClick={() => playSurah(num)}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted-foreground w-7 text-center">{num}</span>
                <span className="text-sm font-semibold">{name}</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={e => { e.stopPropagation(); toggleFav(num); }} className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-muted/30">
                  <Bookmark className={`h-3.5 w-3.5 ${savedItems.isSaved('audio', `surah-${reciter.id}-${num}`) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                </button>
                <button onClick={e => { e.stopPropagation(); const a = document.createElement("a"); a.href = getSurahUrl(reciter.server, num); a.download = `${name}.mp3`; a.target = "_blank"; a.click(); toast({ title: "جاري التحميل..." }); }}
                  className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-muted/30">
                  <Download className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                {isActive && player.isPlaying ? (
                  <Pause className="h-4 w-4 text-primary" />
                ) : (
                  <Play className="h-4 w-4 text-primary" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Lectures Section ---
const LecturesView = ({ player }: { player: ReturnType<typeof useAudioPlayer> }) => {
  const [selectedScholar, setSelectedScholar] = useState<Scholar | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredScholars = useMemo(() => {
    if (!searchQuery) return scholars;
    return scholars.filter(s => s.name.includes(searchQuery) || s.specialty.includes(searchQuery));
  }, [searchQuery]);

  if (selectedScholar) {
    const playlist: AudioTrackInfo[] = selectedScholar.lectures.map(l => ({
      id: l.id, title: l.title, artist: l.scholar, url: l.audioUrl,
    }));
    return (
      <div className="space-y-3">
        <button onClick={() => setSelectedScholar(null)} className="flex items-center gap-2 text-sm text-primary font-bold" dir="rtl">
          <ArrowLeft className="h-4 w-4" /> رجوع للعلماء
        </button>
        <h3 className="text-sm font-bold text-right">{selectedScholar.name}</h3>
        <p className="text-xs text-muted-foreground text-right">{selectedScholar.specialty}</p>
        <div className="space-y-2">
          {selectedScholar.lectures.map(l => {
            const isActive = player.currentTrack?.id === l.id;
            return (
              <div key={l.id} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${isActive ? "bg-primary/10 ring-1 ring-primary" : "bg-card border border-border/50 hover:bg-accent/50"}`}
                dir="rtl" onClick={() => player.play({ id: l.id, title: l.title, artist: l.scholar, url: l.audioUrl }, playlist)}>
                <div className="flex-1">
                  <p className="text-sm font-bold">{l.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{l.category}</span>
                    {l.duration && <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{l.duration}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={e => { e.stopPropagation(); const a = document.createElement("a"); a.href = l.audioUrl; a.download = `${l.title}.mp3`; a.target = "_blank"; a.click(); toast({ title: "جاري التحميل..." }); }}
                    className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-muted/30">
                    <Download className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                  {isActive && player.isPlaying ? <Pause className="h-4 w-4 text-primary" /> : <Play className="h-4 w-4 text-primary" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-foreground text-right">العلماء والدعاة</h3>
      <Input placeholder="ابحث عن عالم أو داعية..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
        className="text-right h-10 rounded-xl" dir="rtl" />
      <div className="space-y-2">
        {filteredScholars.map(s => (
          <button key={s.id} onClick={() => setSelectedScholar(s)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-card border border-border/50 hover:bg-accent/50 transition-colors" dir="rtl">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-lg">🎓</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.specialty} • {s.lectures.length} درس</p>
              </div>
            </div>
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
        {filteredScholars.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">لا توجد نتائج</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Audio Page ---
const AudioPage = () => {
  const player = useAudioPlayer();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedReciter, setSelectedReciter] = useState<ReciterInfo | null>(null);
  const [showSleepTimer, setShowSleepTimer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleBack = () => {
    if (selectedReciter) { setSelectedReciter(null); return; }
    setActiveSection(null);
  };

  const renderContent = () => {
    if (!activeSection) {
      return (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-foreground text-right">أقسام الصوتيات</h3>
          <div className="grid grid-cols-2 gap-3">
            {audioCategories.map(cat => (
              <CategoryCard key={cat.id} cat={cat} onClick={() => setActiveSection(cat.id)} />
            ))}
          </div>
          {(() => {
            const last = localStorage.getItem("lastPlayed");
            if (!last) return null;
            const track: AudioTrackInfo = JSON.parse(last);
            return (
              <div className="mt-4">
                <h3 className="text-sm font-bold text-foreground text-right mb-2">آخر ما استمعت إليه</h3>
                <button onClick={() => player.play(track)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-card border border-border/50 hover:bg-accent/50" dir="rtl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Play className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{track.title}</p>
                      <p className="text-xs text-muted-foreground">{track.artist}</p>
                    </div>
                  </div>
                  <Play className="h-4 w-4 text-primary" />
                </button>
              </div>
            );
          })()}
        </div>
      );
    }

    if (activeSection === "quran") {
      if (selectedReciter) return <SurahListView reciter={selectedReciter} player={player} />;
      return <QuranRecitersView onSelectReciter={setSelectedReciter} />;
    }

    if (activeSection === "lectures") return <LecturesView player={player} />;
    if (activeSection === "azkar") return <AudioListSection title="الأذكار الصوتية" items={azkarAudio} player={player} />;
    if (activeSection === "khutab") return <AudioListSection title="خطب الجمعة" items={khutabAudio} player={player} />;
    if (activeSection === "stories") return <AudioListSection title="قصص الأنبياء" items={storiesAudio} player={player} />;
    if (activeSection === "kids") return <AudioListSection title="تعليم الأطفال - جزء عمّ" items={kidsAudio} player={player} />;

    return null;
  };

  return (
    <div className="min-h-screen bg-background pb-20" dir="rtl">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="text-lg font-bold font-amiri text-foreground">الصوتيات الإسلامية</h1>
          <div className="flex items-center gap-1">
            {activeSection && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setShowSearch(!showSearch); if (showSearch) setSearchQuery(""); }}>
                {showSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
              </Button>
            )}
            {player.currentTrack && (
              <button onClick={() => setShowSleepTimer(!showSleepTimer)} className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-muted/20">
                <Timer className={`h-4 w-4 ${player.sleepTimer ? "text-primary" : "text-muted-foreground"}`} />
              </button>
            )}
            {activeSection ? (
              <Button variant="ghost" size="icon" onClick={handleBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
            ) : (
              <Link to="/">
                <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {showSleepTimer && (
        <div className="container px-4 py-2">
          <div className="bg-card rounded-xl p-3 border border-border/50 flex items-center gap-2 flex-wrap" dir="rtl">
            <span className="text-xs font-bold">مؤقت الإيقاف:</span>
            {[5, 10, 15, 30, 60].map(m => (
              <button key={m} onClick={() => { player.setSleepTimerMinutes(m); setShowSleepTimer(false); toast({ title: `سيتوقف بعد ${m} دقيقة` }); }}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${player.sleepTimer === m ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent"}`}>
                {m} د
              </button>
            ))}
            {player.sleepTimer && (
              <button onClick={() => { player.setSleepTimerMinutes(null); setShowSleepTimer(false); }}
                className="px-2.5 py-1 rounded-full text-xs font-semibold bg-destructive/10 text-destructive">إلغاء</button>
            )}
          </div>
        </div>
      )}

      <main className="container py-3 px-4">
        {renderContent()}
      </main>

      {player.currentTrack && (
        <div className="fixed bottom-[60px] left-0 right-0 z-30 bg-card/95 backdrop-blur-lg border-t border-border shadow-lg">
          <div className="container px-4 py-2">
            <div className="flex items-center gap-3" dir="rtl">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Music className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">{player.currentTrack.title}</p>
                <p className="text-[10px] text-muted-foreground">{player.currentTrack.artist}</p>
              </div>
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] text-muted-foreground tabular-nums">{player.formatTime(player.currentTime)}</span>
                <button onClick={player.playPrev} className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-muted/20">
                  <SkipForward className="h-3.5 w-3.5" />
                </button>
                <button onClick={player.togglePlayPause} className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  {player.isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 mr-[-1px]" />}
                </button>
                <button onClick={player.playNext} className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-muted/20">
                  <SkipBack className="h-3.5 w-3.5" />
                </button>
                <span className="text-[10px] text-muted-foreground tabular-nums">{player.formatTime(player.duration)}</span>
              </div>
              <div className="flex items-center gap-0.5">
                <button onClick={player.download} className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-muted/20">
                  <Download className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <button onClick={player.share} className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-muted/20">
                  <Share2 className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <button onClick={player.stop}>
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
            <div className="w-full h-1 bg-muted/30 rounded-full mt-1.5 cursor-pointer" onClick={player.seek}>
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${player.progress}%` }} />
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default AudioPage;
