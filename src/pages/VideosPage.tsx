import { useState, useRef, useCallback, useEffect } from "react";
import { Heart, Share2, Bookmark, MessageCircle, Music2, Plus, Loader2, Trash2, ChevronLeft, RefreshCw, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/layout/BottomNav";
import AddReelDialog from "@/components/reels/AddReelDialog";
import ReelCommentsSheet from "@/components/reels/ReelCommentsSheet";
import { useReels } from "@/hooks/useReels";
import { useYouTubeVideos, CHANNEL_NAMES } from "@/hooks/useYouTubeVideos";
import { useAuth } from "@/hooks/useAuth";
import { useSavedItems } from "@/hooks/useSavedItems";
import { useToast } from "@/hooks/use-toast";

interface ReelItem {
  id: string;
  type: "youtube" | "community";
  title: string;
  description?: string;
  channelTitle?: string;
  channelHandle?: string;
  videoUrl?: string;
  thumbnail?: string;
  video_url?: string;
  audio_name?: string;
  author_name?: string;
  author_avatar?: string;
  likes_count?: number;
  comments_count?: number;
  shares_count?: number;
  user_id?: string;
}

const ReelViewer = ({
  items, currentIndex, setCurrentIndex, likedIds, toggleLike,
  savedItems, user, deleteReel, navigate, createReel
}: {
  items: ReelItem[];
  currentIndex: number;
  setCurrentIndex: (v: number | ((p: number) => number)) => void;
  likedIds: Set<string>;
  toggleLike: (id: string) => void;
  savedItems: any;
  user: any;
  deleteReel: any;
  navigate: any;
  createReel: any;
}) => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTapRef = useRef(0);
  const touchStartY = useRef(0);
  const [showHeart, setShowHeart] = useState(false);
  const [paused, setPaused] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [commentsReelId, setCommentsReelId] = useState<string | null>(null);

  const current = items[currentIndex];

  const handleDoubleTap = useCallback((item: ReelItem) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (item.type === "community" && !likedIds.has(item.id)) {
        toggleLike(item.id);
      }
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    } else {
      if (item.type === "community" && videoRef.current) {
        videoRef.current.paused ? (videoRef.current.play(), setPaused(false)) : (videoRef.current.pause(), setPaused(true));
      }
    }
    lastTapRef.current = now;
  }, [likedIds, toggleLike]);

  const goToNext = () => { if (currentIndex < items.length - 1) setCurrentIndex((p: number) => p + 1); };
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

  if (!current) return null;

  return (
    <>
      <div className="h-full w-full relative bg-black" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
        onWheel={(e) => { e.deltaY > 30 ? goToNext() : e.deltaY < -30 ? goToPrev() : null; }}
        onClick={() => handleDoubleTap(current)}>

        {current.type === "youtube" ? (
          <iframe
            key={current.id}
            src={`${current.videoUrl}?autoplay=1&rel=0&controls=0&modestbranding=1&playsinline=1&loop=1&playlist=${current.id}&showinfo=0&iv_load_policy=3`}
            className="h-full w-full"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            style={{ border: 'none' }}
          />
        ) : (
          <>
            <video ref={videoRef} key={current.id} src={current.video_url} className="h-full w-full object-cover" autoPlay loop playsInline
              onPlay={() => setPaused(false)} onPause={() => setPaused(true)} />
            {paused && <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
              <div className="h-16 w-16 rounded-full bg-black/40 flex items-center justify-center">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[20px] border-l-white ml-1" />
              </div>
            </div>}
          </>
        )}

        {showHeart && <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
          <Heart className="h-20 w-20 text-secondary fill-secondary animate-ping" />
        </div>}

        {/* Actions sidebar */}
        <div className="absolute left-2 bottom-28 flex flex-col items-center gap-3 z-30">
          {current.type === "community" && (
            <>
              <button className="flex flex-col items-center gap-0.5" onClick={e => { e.stopPropagation(); if (!user) { toast({ title: "سجل دخولك أولاً" }); navigate("/auth"); return; } setShowAddDialog(true); }}>
                <div className="h-6 w-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"><Plus className="h-4 w-4 text-white" /></div>
                <span className="text-white text-[9px] font-bold drop-shadow">إضافة</span>
              </button>
              <button className="flex flex-col items-center gap-0.5" onClick={e => { e.stopPropagation(); if (!user) { toast({ title: "سجل دخولك أولاً" }); navigate("/auth"); return; } toggleLike(current.id); }}>
                <Heart className={`h-5 w-5 transition-all drop-shadow-lg ${likedIds.has(current.id) ? "text-destructive fill-destructive scale-110" : "text-white"}`} />
                <span className="text-white text-[9px] font-bold drop-shadow">{formatNumber(current.likes_count || 0)}</span>
              </button>
              <button className="flex flex-col items-center gap-0.5" onClick={e => { e.stopPropagation(); setCommentsReelId(current.id); }}>
                <MessageCircle className="h-5 w-5 text-white drop-shadow-lg" />
                <span className="text-white text-[9px] font-bold drop-shadow">{formatNumber(current.comments_count || 0)}</span>
              </button>
            </>
          )}
          <button className="flex flex-col items-center gap-0.5" onClick={e => { e.stopPropagation(); if (!user) { toast({ title: "سجل دخولك أولاً" }); navigate("/auth"); return; } savedItems.toggleSave('reel', current.id); }}>
            <Bookmark className={`h-5 w-5 transition-all drop-shadow-lg ${savedItems.isSaved('reel', current.id) ? "text-secondary fill-secondary" : "text-white"}`} />
            <span className="text-white text-[9px] font-bold drop-shadow">حفظ</span>
          </button>
          <button className="flex flex-col items-center gap-0.5" onClick={e => { e.stopPropagation(); if (navigator.share) navigator.share({ title: current.title, url: current.type === "youtube" ? `https://youtube.com/shorts/${current.id}` : window.location.href }).catch(() => {}); }}>
            <Share2 className="h-5 w-5 text-white drop-shadow-lg" />
            <span className="text-white text-[9px] font-bold drop-shadow">مشاركة</span>
          </button>
          {current.type === "community" && user && current.user_id === user.id && (
            <button className="flex flex-col items-center gap-0.5" disabled={deleting} onClick={async e => {
              e.stopPropagation(); setDeleting(true);
              const res = await deleteReel(current.id); setDeleting(false);
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
            {current.type === "community" ? (
              <>
                <div className="h-6 w-6 rounded-full bg-card/30 backdrop-blur-sm border border-secondary/50 flex items-center justify-center text-xs overflow-hidden">
                  {current.author_avatar ? <img src={current.author_avatar} alt="" className="h-full w-full object-cover" /> : "👤"}
                </div>
                <span className="text-white font-bold text-[10px] drop-shadow">@{current.author_name}</span>
              </>
            ) : (
              <>
                <div className="h-6 w-6 rounded-full bg-primary/30 backdrop-blur-sm flex items-center justify-center text-xs">🎬</div>
                <span className="text-white font-bold text-[10px] drop-shadow">{current.channelTitle}</span>
              </>
            )}
          </div>
          <p className="text-white text-[10px] leading-3.5 mb-1.5 line-clamp-2 drop-shadow">{current.title}</p>
          {current.type === "community" && current.audio_name && (
            <div className="flex items-center gap-1">
              <Music2 className="h-3 w-3 text-white" />
              <div className="overflow-hidden max-w-[180px]">
                <p className="text-white text-[10px] whitespace-nowrap animate-marquee drop-shadow">{current.audio_name}</p>
              </div>
            </div>
          )}
        </div>

        {/* Progress dots */}
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-30">
          {items.slice(0, 30).map((_: any, index: number) => (
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

const VideosPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { reels, loading: reelsLoading, likedIds, toggleLike, createReel, deleteReel } = useReels();
  const { videos: ytVideos, loading: ytLoading, error: ytError, fetchVideos } = useYouTubeVideos();
  const savedItems = useSavedItems();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [channelFilter, setChannelFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => { fetchVideos(); }, []);

  const handleChannelFilter = (handle: string | null) => {
    setChannelFilter(handle);
    setShowFilters(false);
    setCurrentIndex(0);
    if (handle) {
      fetchVideos(handle);
    } else {
      fetchVideos();
    }
  };

  const allItems: ReelItem[] = [
    ...ytVideos.map(v => ({
      id: v.id,
      type: "youtube" as const,
      title: v.title,
      description: v.description,
      channelTitle: v.channelTitle,
      channelHandle: v.channelHandle,
      videoUrl: v.videoUrl,
      thumbnail: v.thumbnail,
    })),
    ...(!channelFilter ? reels.map((r: any) => ({
      id: r.id,
      type: "community" as const,
      title: r.title,
      description: r.description,
      video_url: r.video_url,
      audio_name: r.audio_name,
      author_name: r.author_name,
      author_avatar: r.author_avatar,
      likes_count: r.likes_count,
      comments_count: r.comments_count,
      shares_count: r.shares_count,
      user_id: r.user_id,
    })) : []),
  ];

  const isLoading = ytLoading && reelsLoading;

  return (
    <div className="fixed inset-0 bg-black">
      <div className="h-full w-full pb-[60px] flex flex-col">
        <header className="absolute top-0 left-0 right-0 z-40 px-4 pt-3 pb-2 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center justify-between" dir="rtl">
            <h1 className="text-sm font-bold text-white font-amiri drop-shadow">الريلز</h1>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowFilters(!showFilters)} className={`h-8 w-8 rounded-full backdrop-blur-sm flex items-center justify-center ${channelFilter ? 'bg-primary/60' : 'bg-white/10'}`}>
                <Filter className="h-4 w-4 text-white" />
              </button>
              <button onClick={() => { fetchVideos(channelFilter || undefined); }} className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <RefreshCw className={`h-4 w-4 text-white ${ytLoading ? 'animate-spin' : ''}`} />
              </button>
              <button onClick={() => navigate(-1)} className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Channel Filter Dropdown */}
          {showFilters && (
            <div className="mt-2 bg-black/80 backdrop-blur-lg rounded-xl p-2 max-h-60 overflow-y-auto" dir="rtl">
              <button onClick={() => handleChannelFilter(null)}
                className={`w-full text-right px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${!channelFilter ? 'bg-primary text-primary-foreground' : 'text-white hover:bg-white/10'}`}>
                الكل
              </button>
              {Object.entries(CHANNEL_NAMES).map(([handle, name]) => (
                <button key={handle} onClick={() => handleChannelFilter(handle)}
                  className={`w-full text-right px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${channelFilter === handle ? 'bg-primary text-primary-foreground' : 'text-white hover:bg-white/10'}`}>
                  {name}
                </button>
              ))}
            </div>
          )}
        </header>

        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          ) : allItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-center px-6">
              <span className="text-5xl">🎬</span>
              <h3 className="text-sm font-bold text-white">لا توجد ريلز بعد</h3>
              {ytError && <p className="text-xs text-white/60">{ytError}</p>}
              <button onClick={() => fetchVideos()} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold">
                إعادة المحاولة
              </button>
            </div>
          ) : (
            <ReelViewer
              items={allItems}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              likedIds={likedIds}
              toggleLike={toggleLike}
              savedItems={savedItems}
              user={user}
              deleteReel={deleteReel}
              navigate={navigate}
              createReel={createReel}
            />
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default VideosPage;
