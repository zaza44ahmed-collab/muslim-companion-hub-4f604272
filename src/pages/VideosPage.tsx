import { useState, useRef, useCallback, useEffect } from "react";
import { Heart, Share2, Bookmark, MessageCircle, Music2, Plus, Loader2, Trash2, Search, Youtube, X, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/layout/BottomNav";
import AddReelDialog from "@/components/reels/AddReelDialog";
import ReelCommentsSheet from "@/components/reels/ReelCommentsSheet";
import { useReels } from "@/hooks/useReels";
import { useYouTubeVideos, type YouTubeVideo } from "@/hooks/useYouTubeVideos";
import { useAuth } from "@/hooks/useAuth";
import { useSavedItems } from "@/hooks/useSavedItems";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- YouTube Video Card ---
const YouTubeCard = ({ video, onPlay }: { video: YouTubeVideo; onPlay: (v: YouTubeVideo) => void }) => (
  <button onClick={() => onPlay(video)} className="w-full text-right">
    <div className="relative rounded-xl overflow-hidden aspect-video bg-black">
      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent flex items-end p-3">
        <div className="absolute top-2 left-2 bg-destructive/90 text-white text-[10px] px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
          <Youtube className="h-3 w-3" /> YouTube
        </div>
      </div>
    </div>
    <p className="text-xs font-bold mt-1.5 line-clamp-2 text-foreground">{video.title}</p>
    <p className="text-[10px] text-muted-foreground mt-0.5">{video.channelTitle}</p>
  </button>
);

// --- YouTube Player ---
const YouTubePlayer = ({ video, onClose }: { video: YouTubeVideo; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 bg-black flex flex-col">
    <div className="flex items-center justify-between p-3 bg-black/80">
      <button onClick={onClose} className="text-white">
        <X className="h-5 w-5" />
      </button>
      <p className="text-white text-xs font-bold flex-1 text-center truncate px-4">{video.title}</p>
      <div className="w-5" />
    </div>
    <div className="flex-1 flex items-center justify-center">
      <iframe
        src={`${video.videoUrl}?autoplay=1&rel=0`}
        className="w-full h-full max-h-[80vh]"
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
      />
    </div>
    <div className="p-3 bg-black/80" dir="rtl">
      <p className="text-white text-sm font-bold">{video.title}</p>
      <p className="text-white/60 text-xs mt-1">{video.channelTitle}</p>
    </div>
  </div>
);

// --- User Reels Full Screen ---
const ReelFullScreen = ({
  reels, currentIndex, setCurrentIndex, likedIds, toggleLike, savedItems,
  user, deleteReel, navigate, createReel
}: any) => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTapRef = useRef(0);
  const touchStartY = useRef(0);
  const [showHeart, setShowHeart] = useState(false);
  const [paused, setPaused] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [commentsReelId, setCommentsReelId] = useState<string | null>(null);

  const currentReel = reels[currentIndex];

  const handleDoubleTap = useCallback((reelId: string) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (!likedIds.has(reelId)) toggleLike(reelId);
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    } else {
      if (videoRef.current) {
        videoRef.current.paused ? (videoRef.current.play(), setPaused(false)) : (videoRef.current.pause(), setPaused(true));
      }
    }
    lastTapRef.current = now;
  }, [likedIds, toggleLike]);

  const goToNext = () => { if (currentIndex < reels.length - 1) setCurrentIndex((p: number) => p + 1); };
  const goToPrev = () => { if (currentIndex > 0) setCurrentIndex((p: number) => p - 1); };

  const handleTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) { diff > 0 ? goToNext() : goToPrev(); }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
  };

  if (!currentReel) return null;

  return (
    <>
      <div className="h-full w-full relative bg-black" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
        onWheel={(e) => { e.deltaY > 30 ? goToNext() : e.deltaY < -30 ? goToPrev() : null; }}
        onClick={() => handleDoubleTap(currentReel.id)}>
        <video ref={videoRef} key={currentReel.id} src={currentReel.video_url} className="h-full w-full object-cover" autoPlay loop playsInline
          onPlay={() => setPaused(false)} onPause={() => setPaused(true)} />
        {paused && <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="h-16 w-16 rounded-full bg-black/40 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[20px] border-l-white ml-1" />
          </div>
        </div>}
        {showHeart && <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
          <Heart className="h-20 w-20 text-secondary fill-secondary animate-ping" />
        </div>}

        {/* Actions */}
        <div className="absolute left-2 bottom-28 flex flex-col items-center gap-3 z-30">
          <button className="flex flex-col items-center gap-0.5" onClick={e => { e.stopPropagation(); if (!user) { toast({ title: "سجل دخولك أولاً" }); navigate("/auth"); return; } setShowAddDialog(true); }}>
            <div className="h-6 w-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"><Plus className="h-4 w-4 text-white" /></div>
            <span className="text-white text-[9px] font-bold drop-shadow">إضافة</span>
          </button>
          <button className="flex flex-col items-center gap-0.5" onClick={e => { e.stopPropagation(); if (!user) { toast({ title: "سجل دخولك أولاً" }); navigate("/auth"); return; } toggleLike(currentReel.id); }}>
            <Heart className={`h-5 w-5 transition-all drop-shadow-lg ${likedIds.has(currentReel.id) ? "text-destructive fill-destructive scale-110" : "text-white"}`} />
            <span className="text-white text-[9px] font-bold drop-shadow">{formatNumber(currentReel.likes_count)}</span>
          </button>
          <button className="flex flex-col items-center gap-0.5" onClick={e => { e.stopPropagation(); setCommentsReelId(currentReel.id); }}>
            <MessageCircle className="h-5 w-5 text-white drop-shadow-lg" />
            <span className="text-white text-[9px] font-bold drop-shadow">{formatNumber(currentReel.comments_count)}</span>
          </button>
          <button className="flex flex-col items-center gap-0.5" onClick={e => { e.stopPropagation(); if (!user) { toast({ title: "سجل دخولك أولاً" }); navigate("/auth"); return; } savedItems.toggleSave('reel', currentReel.id); }}>
            <Bookmark className={`h-5 w-5 transition-all drop-shadow-lg ${savedItems.isSaved('reel', currentReel.id) ? "text-secondary fill-secondary" : "text-white"}`} />
            <span className="text-white text-[9px] font-bold drop-shadow">حفظ</span>
          </button>
          <button className="flex flex-col items-center gap-0.5" onClick={e => { e.stopPropagation(); if (navigator.share) navigator.share({ title: currentReel.title, url: window.location.href }).catch(() => {}); }}>
            <Share2 className="h-5 w-5 text-white drop-shadow-lg" />
            <span className="text-white text-[9px] font-bold drop-shadow">{formatNumber(currentReel.shares_count)}</span>
          </button>
          {user && currentReel.user_id === user.id && (
            <button className="flex flex-col items-center gap-0.5" disabled={deleting} onClick={async e => {
              e.stopPropagation(); setDeleting(true);
              const res = await deleteReel(currentReel.id); setDeleting(false);
              if (res.error) toast({ title: res.error, variant: "destructive" });
              else { toast({ title: "تم حذف الريلز 🗑️" }); if (currentIndex > 0) setCurrentIndex(currentIndex - 1); }
            }}>
              {deleting ? <Loader2 className="h-5 w-5 text-white animate-spin" /> : <Trash2 className="h-5 w-5 text-white drop-shadow-lg" />}
              <span className="text-white text-[9px] font-bold drop-shadow">حذف</span>
            </button>
          )}
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-14 left-2 right-3 p-2 z-30">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="h-6 w-6 rounded-full bg-card/30 backdrop-blur-sm border border-secondary/50 flex items-center justify-center text-xs overflow-hidden">
              {currentReel.author_avatar ? <img src={currentReel.author_avatar} alt="" className="h-full w-full object-cover" /> : "👤"}
            </div>
            <span className="text-white font-bold text-[10px] drop-shadow">@{currentReel.author_name}</span>
          </div>
          <p className="text-white text-[10px] leading-3.5 mb-1.5 line-clamp-2 drop-shadow">{currentReel.title}</p>
          <div className="flex items-center gap-1">
            <Music2 className="h-3 w-3 text-white" />
            <div className="overflow-hidden max-w-[180px]">
              <p className="text-white text-[10px] whitespace-nowrap animate-marquee drop-shadow">{currentReel.audio_name}</p>
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-30">
          {reels.slice(0, 20).map((_: any, index: number) => (
            <button key={index} onClick={e => { e.stopPropagation(); setCurrentIndex(index); }}
              className={`w-0.5 rounded-full transition-all ${index === currentIndex ? "h-5 bg-secondary" : "h-1.5 bg-white/30"}`} />
          ))}
        </div>
      </div>

      <AddReelDialog open={showAddDialog} onOpenChange={setShowAddDialog} onSubmit={createReel} />
      <ReelCommentsSheet reelId={commentsReelId} onClose={() => setCommentsReelId(null)} />
    </>
  );
};

// --- Main Page ---
const VideosPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { reels, loading: reelsLoading, likedIds, toggleLike, createReel, deleteReel } = useReels();
  const { videos: ytVideos, loading: ytLoading, error: ytError, fetchVideos, loadMore, hasMore } = useYouTubeVideos();
  const savedItems = useSavedItems();

  const [activeTab, setActiveTab] = useState<"youtube" | "community">("youtube");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<YouTubeVideo | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => { fetchVideos(); }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchVideos(searchQuery + " إسلامي");
      setShowSearch(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background">
      {playingVideo && <YouTubePlayer video={playingVideo} onClose={() => setPlayingVideo(null)} />}

      <div className="h-full w-full pb-[60px] flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border px-4 py-2">
          <div className="flex items-center justify-between mb-2" dir="rtl">
            <h1 className="text-base font-bold font-amiri">الريلز والفيديوهات</h1>
            <div className="flex items-center gap-1">
              <button onClick={() => setShowSearch(!showSearch)} className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted/20">
                {showSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
              </button>
              <button onClick={() => navigate(-1)} className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted/20">
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
          </div>

          {showSearch && (
            <div className="flex gap-2 mb-2" dir="rtl">
              <Input placeholder="ابحث عن فيديو إسلامي..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()} className="text-right h-9 rounded-xl text-sm" />
              <button onClick={handleSearch} className="px-3 py-1 bg-primary text-primary-foreground rounded-xl text-xs font-bold">بحث</button>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={v => setActiveTab(v as any)}>
            <TabsList className="w-full grid grid-cols-2 h-9">
              <TabsTrigger value="youtube" className="text-xs gap-1"><Youtube className="h-3.5 w-3.5" /> يوتيوب</TabsTrigger>
              <TabsTrigger value="community" className="text-xs gap-1">🎬 ريلز المجتمع</TabsTrigger>
            </TabsList>
          </Tabs>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === "youtube" ? (
            <div className="h-full overflow-y-auto px-4 py-3">
              {ytLoading && ytVideos.length === 0 ? (
                <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
              ) : ytError ? (
                <div className="text-center py-10">
                  <Youtube className="h-12 w-12 mx-auto mb-3 text-destructive opacity-50" />
                  <p className="text-sm text-muted-foreground">{ytError}</p>
                  <button onClick={() => fetchVideos()} className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-bold">إعادة المحاولة</button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    {ytVideos.map(v => <YouTubeCard key={v.id} video={v} onPlay={setPlayingVideo} />)}
                  </div>
                  {hasMore && (
                    <button onClick={loadMore} disabled={ytLoading} className="w-full mt-4 py-2.5 bg-card border border-border rounded-xl text-xs font-bold text-primary flex items-center justify-center gap-2">
                      {ytLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "تحميل المزيد"}
                    </button>
                  )}
                </>
              )}
            </div>
          ) : (
            // Community Reels - Full screen
            reelsLoading ? (
              <div className="h-full flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : reels.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center gap-3 text-center px-6">
                <span className="text-5xl">🎬</span>
                <h3 className="text-sm font-bold text-foreground">لا توجد ريلز بعد</h3>
                <p className="text-xs text-muted-foreground">كن أول من ينشر ريلز إسلامي!</p>
                <button onClick={() => { if (!user) { toast({ title: "سجل دخولك أولاً" }); navigate("/auth"); return; } }}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold">
                  <Plus className="h-4 w-4 inline ml-1" /> إضافة ريلز
                </button>
              </div>
            ) : (
              <ReelFullScreen reels={reels} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}
                likedIds={likedIds} toggleLike={toggleLike} savedItems={savedItems}
                user={user} deleteReel={deleteReel} navigate={navigate} createReel={createReel} />
            )
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default VideosPage;
