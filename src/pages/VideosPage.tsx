import { useState, useRef, useCallback } from "react";
import { Heart, Share2, Bookmark, MessageCircle, Music2, Plus, Loader2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/layout/BottomNav";
import AddReelDialog from "@/components/reels/AddReelDialog";
import ReelCommentsSheet from "@/components/reels/ReelCommentsSheet";
import { useReels } from "@/hooks/useReels";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const VideosPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { reels, loading, likedIds, toggleLike, createReel, deleteReel } = useReels();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedReels, setSavedReels] = useState<Set<string>>(new Set());
  const [showHeart, setShowHeart] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [commentsReelId, setCommentsReelId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const lastTapRef = useRef(0);
  const touchStartY = useRef(0);

  const currentReel = reels[currentIndex];

  const handleDoubleTap = useCallback((reelId: string) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (!likedIds.has(reelId)) {
        toggleLike(reelId);
      }
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    }
    lastTapRef.current = now;
  }, [likedIds, toggleLike]);

  const handleToggleLike = async (reelId: string) => {
    if (!user) { toast({ title: "سجل دخولك أولاً" }); navigate("/auth"); return; }
    await toggleLike(reelId);
  };

  const toggleSave = (reelId: string) => {
    setSavedReels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reelId)) newSet.delete(reelId);
      else newSet.add(reelId);
      return newSet;
    });
  };

  const handleShare = async (reel: typeof reels[0]) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: reel.title, text: reel.title, url: window.location.href });
      } catch { /* cancelled */ }
    }
  };

  const handleAddClick = () => {
    if (!user) { toast({ title: "سجل دخولك أولاً" }); navigate("/auth"); return; }
    setShowAddDialog(true);
  };

  const handleDelete = async () => {
    if (!currentReel || !user) return;
    setDeleting(true);
    const res = await deleteReel(currentReel.id);
    setDeleting(false);
    if (res.error) {
      toast({ title: res.error, variant: "destructive" });
    } else {
      toast({ title: "تم حذف الريلز 🗑️" });
      if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < reels.length - 1) setCurrentIndex(prev => prev + 1);
      else if (diff < 0 && currentIndex > 0) setCurrentIndex(prev => prev - 1);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
  };

  return (
    <div className="fixed inset-0 bg-background">
      {/* Header - no icon */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-secondary/30">
        <div className="flex items-center justify-center px-2 h-10">
          <span className="text-foreground text-[11px] font-bold">الريلز</span>
        </div>
      </header>

      <div className="h-full w-full pt-10 pb-[60px]" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : reels.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-center px-6">
            <span className="text-5xl">🎬</span>
            <h3 className="text-sm font-bold text-foreground">لا توجد ريلز بعد</h3>
            <p className="text-xs text-muted-foreground">كن أول من ينشر ريلز إسلامي!</p>
            <button onClick={handleAddClick} className="px-4 py-2 rounded-xl gradient-islamic text-primary-foreground text-xs font-bold">
              <Plus className="h-4 w-4 inline ml-1" /> إضافة ريلز
            </button>
          </div>
        ) : currentReel ? (
          <div
            className="h-full w-full relative transition-all duration-500 bg-black"
            onClick={() => handleDoubleTap(currentReel.id)}
          >
            {/* Video */}
            <video
              key={currentReel.id}
              src={currentReel.video_url}
              className="h-full w-full object-contain"
              autoPlay
              loop
              muted
              playsInline
            />

            {/* Double Tap Heart */}
            {showHeart && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
                <Heart className="h-20 w-20 text-secondary fill-secondary animate-ping" />
              </div>
            )}

            {/* Left Side Actions */}
            <div className="absolute left-2 bottom-28 flex flex-col items-center gap-3 z-30">
              <button className="flex flex-col items-center gap-0.5" onClick={(e) => { e.stopPropagation(); handleToggleLike(currentReel.id); }}>
                <Heart className={`h-5 w-5 transition-all drop-shadow-lg ${likedIds.has(currentReel.id) ? "text-destructive fill-destructive scale-110" : "text-white"}`} />
                <span className="text-white text-[9px] font-bold drop-shadow">{formatNumber(currentReel.likes_count)}</span>
              </button>

              <button className="flex flex-col items-center gap-0.5" onClick={(e) => { e.stopPropagation(); setCommentsReelId(currentReel.id); }}>
                <MessageCircle className="h-5 w-5 text-white drop-shadow-lg" />
                <span className="text-white text-[9px] font-bold drop-shadow">{formatNumber(currentReel.comments_count)}</span>
              </button>

              <button className="flex flex-col items-center gap-0.5" onClick={(e) => { e.stopPropagation(); toggleSave(currentReel.id); }}>
                <Bookmark className={`h-5 w-5 transition-all drop-shadow-lg ${savedReels.has(currentReel.id) ? "text-secondary fill-secondary" : "text-white"}`} />
                <span className="text-white text-[9px] font-bold drop-shadow">حفظ</span>
              </button>

              <button className="flex flex-col items-center gap-0.5" onClick={(e) => { e.stopPropagation(); handleShare(currentReel); }}>
                <Share2 className="h-5 w-5 text-white drop-shadow-lg" />
                <span className="text-white text-[9px] font-bold drop-shadow">{formatNumber(currentReel.shares_count)}</span>
              </button>

              {/* Delete button for owner */}
              {user && currentReel.user_id === user.id && (
                <button className="flex flex-col items-center gap-0.5" disabled={deleting}
                  onClick={(e) => { e.stopPropagation(); handleDelete(); }}>
                  {deleting ? <Loader2 className="h-5 w-5 text-white animate-spin" /> : <Trash2 className="h-5 w-5 text-destructive drop-shadow-lg" />}
                  <span className="text-white text-[9px] font-bold drop-shadow">حذف</span>
                </button>
              )}
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-14 left-2 right-3 p-2 z-30">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="h-6 w-6 rounded-full bg-card/30 backdrop-blur-sm border border-secondary/50 flex items-center justify-center text-xs overflow-hidden">
                  {currentReel.author_avatar ? (
                    <img src={currentReel.author_avatar} alt="" className="h-full w-full object-cover" />
                  ) : "👤"}
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
              {reels.map((_, index) => (
                <button key={index} onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                  className={`w-0.5 rounded-full transition-all ${index === currentIndex ? "h-5 bg-secondary" : "h-1.5 bg-white/30"}`}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* FAB - Add Reel */}
      {reels.length > 0 && (
        <button onClick={handleAddClick}
          className="fixed bottom-[76px] left-4 z-40 h-12 w-12 rounded-full gradient-islamic shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
          <Plus className="h-6 w-6 text-primary-foreground" />
        </button>
      )}

      <AddReelDialog open={showAddDialog} onOpenChange={setShowAddDialog} onSubmit={createReel} />
      <ReelCommentsSheet reelId={commentsReelId} onClose={() => { setCommentsReelId(null); }} />
      <BottomNav />
    </div>
  );
};

export default VideosPage;
