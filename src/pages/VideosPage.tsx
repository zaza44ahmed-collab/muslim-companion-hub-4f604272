import { useState, useRef, useCallback } from "react";
import { Heart, Share2, Bookmark, MessageCircle, Music2, Plus, Search } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";

const reels = [
  {
    id: 1,
    title: "سبحان الله وبحمده سبحان الله العظيم ✨",
    author: "نور الإسلام",
    avatar: "🕌",
    likes: 450000,
    comments: 12400,
    shares: 8900,
    emoji: "📖",
    audio: "تلاوة الشيخ السديس - سورة يس",
  },
  {
    id: 2,
    title: "أذكار الصباح 🌅 ابدأ يومك بذكر الله",
    author: "أذكاري",
    avatar: "🌙",
    likes: 890000,
    comments: 34200,
    shares: 45000,
    emoji: "🌅",
    audio: "أذكار الصباح - مشاري العفاسي",
  },
  {
    id: 3,
    title: "هل تعلم؟ قصة سيدنا يوسف عليه السلام 🌟",
    author: "قصص الأنبياء",
    avatar: "📚",
    likes: 320000,
    comments: 8700,
    shares: 15600,
    emoji: "🌙",
    audio: "الصوت الأصلي - قصص الأنبياء",
  },
  {
    id: 4,
    title: "فضل الصلاة على النبي ﷺ",
    author: "طريق الجنة",
    avatar: "💚",
    likes: 650000,
    comments: 21300,
    shares: 32000,
    emoji: "✨",
    audio: "نشيد - طريق الجنة",
  },
  {
    id: 5,
    title: "دعاء يريح القلب ❤️ اللهم إني أسألك العافية",
    author: "أدعية مأثورة",
    avatar: "🤲",
    likes: 720000,
    comments: 18900,
    shares: 27000,
    emoji: "🤲",
    audio: "الصوت الأصلي - أدعية مأثورة",
  },
  {
    id: 6,
    title: "سورة الملك - تلاوة تريح النفس 🎧",
    author: "تلاوات خاشعة",
    avatar: "🎧",
    likes: 2000000,
    comments: 67000,
    shares: 89000,
    emoji: "📖",
    audio: "سورة الملك - عبدالباسط عبدالصمد",
  },
];

const VideosPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedReels, setLikedReels] = useState<Set<number>>(new Set());
  const [savedReels, setSavedReels] = useState<Set<number>>(new Set());
  const [showHeart, setShowHeart] = useState(false);
  const [followedAuthors, setFollowedAuthors] = useState<Set<string>>(new Set());
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(
    Object.fromEntries(reels.map(r => [r.id, r.likes]))
  );
  const lastTapRef = useRef(0);
  const touchStartY = useRef(0);

  const handleDoubleTap = useCallback((reelId: number) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (!likedReels.has(reelId)) {
        setLikedReels(prev => new Set([...prev, reelId]));
        setLikeCounts(prev => ({ ...prev, [reelId]: prev[reelId] + 1 }));
      }
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    }
    lastTapRef.current = now;
  }, [likedReels]);

  const toggleLike = (reelId: number) => {
    if (likedReels.has(reelId)) {
      setLikedReels(prev => {
        const newSet = new Set(prev);
        newSet.delete(reelId);
        return newSet;
      });
      setLikeCounts(prev => ({ ...prev, [reelId]: prev[reelId] - 1 }));
    } else {
      setLikedReels(prev => new Set([...prev, reelId]));
      setLikeCounts(prev => ({ ...prev, [reelId]: prev[reelId] + 1 }));
    }
  };

  const toggleSave = (reelId: number) => {
    setSavedReels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reelId)) newSet.delete(reelId);
      else newSet.add(reelId);
      return newSet;
    });
  };

  const toggleFollow = (author: string) => {
    setFollowedAuthors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(author)) newSet.delete(author);
      else newSet.add(author);
      return newSet;
    });
  };

  const handleShare = async (reel: typeof reels[0]) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: reel.title,
          text: `${reel.title} - ${reel.author}`,
          url: window.location.href,
        });
      } catch { /* cancelled */ }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < reels.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
  };

  const currentReel = reels[currentIndex];
  const isFollowing = followedAuthors.has(currentReel.author);

  return (
    <div className="fixed inset-0 bg-background">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-secondary/30">
        <div className="flex items-center justify-between px-2 h-10">
          <button className="p-1">
            <Search className="h-4 w-4 text-foreground/70" />
          </button>
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground text-[10px] font-semibold">متابَعون</button>
            <div className="flex flex-col items-center">
              <button className="text-foreground text-[10px] font-bold">لك</button>
              <div className="w-4 h-0.5 bg-secondary rounded-full mt-0.5" />
            </div>
          </div>
          <button className="p-1">
            <Plus className="h-4 w-4 text-foreground/70" />
          </button>
        </div>
      </header>

      <div
        className="h-full w-full pt-10 pb-[60px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="h-full w-full bg-gradient-to-br from-primary/90 via-primary to-primary/80 flex items-center justify-center relative transition-all duration-500"
          onClick={() => handleDoubleTap(currentReel.id)}
        >
          {/* Islamic Pattern Overlay */}
          <div className="absolute inset-0 islamic-pattern opacity-30" />

          {/* Background Emoji */}
          <span className="text-[100px] opacity-15 select-none">{currentReel.emoji}</span>

          {/* Double Tap Heart */}
          {showHeart && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
              <Heart className="h-20 w-20 text-secondary fill-secondary animate-ping" />
            </div>
          )}

          {/* Right Side Actions */}
          <div className="absolute right-2 bottom-28 flex flex-col items-center gap-3 z-30">
            {/* Avatar */}
            <div className="flex flex-col items-center relative mb-1">
              <div className="h-8 w-8 rounded-full bg-card/30 backdrop-blur-sm border border-secondary/50 flex items-center justify-center text-base">
                {currentReel.avatar}
              </div>
              {!isFollowing && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFollow(currentReel.author);
                  }}
                  className="absolute -bottom-1.5 bg-secondary rounded-full w-3.5 h-3.5 flex items-center justify-center"
                >
                  <Plus className="h-2.5 w-2.5 text-secondary-foreground" />
                </button>
              )}
            </div>

            {/* Like */}
            <button
              className="flex flex-col items-center gap-0.5"
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(currentReel.id);
              }}
            >
              <Heart className={`h-5 w-5 transition-all drop-shadow-lg ${
                likedReels.has(currentReel.id) 
                  ? "text-destructive fill-destructive scale-110" 
                  : "text-primary-foreground"
              }`} />
              <span className="text-primary-foreground text-[9px] font-bold drop-shadow">
                {formatNumber(likeCounts[currentReel.id])}
              </span>
            </button>

            {/* Comment */}
            <button
              className="flex flex-col items-center gap-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle className="h-5 w-5 text-primary-foreground drop-shadow-lg" />
              <span className="text-primary-foreground text-[9px] font-bold drop-shadow">
                {formatNumber(currentReel.comments)}
              </span>
            </button>

            {/* Save */}
            <button
              className="flex flex-col items-center gap-0.5"
              onClick={(e) => {
                e.stopPropagation();
                toggleSave(currentReel.id);
              }}
            >
              <Bookmark className={`h-5 w-5 transition-all drop-shadow-lg ${
                savedReels.has(currentReel.id) 
                  ? "text-secondary fill-secondary" 
                  : "text-primary-foreground"
              }`} />
              <span className="text-primary-foreground text-[9px] font-bold drop-shadow">حفظ</span>
            </button>

            {/* Share */}
            <button
              className="flex flex-col items-center gap-0.5"
              onClick={(e) => {
                e.stopPropagation();
                handleShare(currentReel);
              }}
            >
              <Share2 className="h-5 w-5 text-primary-foreground drop-shadow-lg" />
              <span className="text-primary-foreground text-[9px] font-bold drop-shadow">
                {formatNumber(currentReel.shares)}
              </span>
            </button>

            {/* Spinning disc */}
            <div className="h-7 w-7 rounded-full border border-secondary/40 bg-primary/80 flex items-center justify-center animate-[spin_3s_linear_infinite] shadow-lg">
              <div className="h-3 w-3 rounded-full bg-secondary/80" />
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-14 left-12 right-3 p-2 z-30">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-primary-foreground font-bold text-[10px]">@{currentReel.author}</span>
              {isFollowing ? (
                <span className="text-[9px] text-primary-foreground/60 border border-primary-foreground/30 rounded px-1 py-0.5">متابَع</span>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFollow(currentReel.author);
                  }}
                  className="text-[9px] text-secondary-foreground bg-secondary rounded px-1 py-0.5 font-semibold"
                >
                  متابعة
                </button>
              )}
            </div>
            <p className="text-primary-foreground text-[10px] leading-3.5 mb-1.5 line-clamp-2">
              {currentReel.title}
            </p>
            <div className="flex items-center gap-1">
              <Music2 className="h-3 w-3 text-primary-foreground" />
              <div className="overflow-hidden max-w-[180px]">
                <p className="text-primary-foreground text-[10px] whitespace-nowrap animate-marquee">
                  {currentReel.audio}
                </p>
              </div>
            </div>
          </div>

          {/* Progress dots - right side */}
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-30">
            {reels.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`w-0.5 rounded-full transition-all ${
                  index === currentIndex 
                    ? "h-5 bg-secondary" 
                    : "h-1.5 bg-primary-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default VideosPage;
