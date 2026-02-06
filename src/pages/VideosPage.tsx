import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Share2, Bookmark, Play, Pause, Volume2, VolumeX, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const reels = [
  {
    id: 1,
    title: "فضل الصلاة على النبي ﷺ",
    author: "الشيخ محمد العريفي",
    views: "250K",
    likes: 15000,
    thumbnail: "🕌",
    duration: "0:45",
    gradient: "from-emerald-900 via-emerald-800 to-teal-900",
  },
  {
    id: 2,
    title: "دعاء تفريج الهموم",
    author: "الشيخ نبيل العوضي",
    views: "180K",
    likes: 12000,
    thumbnail: "🤲",
    duration: "1:20",
    gradient: "from-indigo-900 via-purple-900 to-violet-900",
  },
  {
    id: 3,
    title: "قصة أصحاب الكهف",
    author: "د. عمر عبد الكافي",
    views: "320K",
    likes: 25000,
    thumbnail: "📚",
    duration: "2:00",
    gradient: "from-amber-900 via-orange-900 to-red-900",
  },
  {
    id: 4,
    title: "أسماء الله الحسنى",
    author: "الشيخ مشاري راشد",
    views: "500K",
    likes: 40000,
    thumbnail: "✨",
    duration: "1:30",
    gradient: "from-cyan-900 via-blue-900 to-indigo-900",
  },
  {
    id: 5,
    title: "قصة سيدنا يوسف عليه السلام",
    author: "الشيخ طارق السويدان",
    views: "420K",
    likes: 35000,
    thumbnail: "🌙",
    duration: "3:00",
    gradient: "from-rose-900 via-pink-900 to-fuchsia-900",
  },
];

const VideosPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likedReels, setLikedReels] = useState<Set<number>>(new Set());
  const [savedReels, setSavedReels] = useState<Set<number>>(new Set());
  const [showHeart, setShowHeart] = useState(false);
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(
    Object.fromEntries(reels.map(r => [r.id, r.likes]))
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef(0);
  const touchStartY = useRef(0);

  const handleDoubleTap = useCallback((reelId: number) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      // Double tap detected
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
    if (savedReels.has(reelId)) {
      setSavedReels(prev => {
        const newSet = new Set(prev);
        newSet.delete(reelId);
        return newSet;
      });
    } else {
      setSavedReels(prev => new Set([...prev, reelId]));
    }
  };

  const handleShare = async (reel: typeof reels[0]) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: reel.title,
          text: `${reel.title} - ${reel.author}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < reels.length - 1) {
        // Swipe up - next
        setCurrentIndex(prev => prev + 1);
      } else if (diff < 0 && currentIndex > 0) {
        // Swipe down - previous
        setCurrentIndex(prev => prev - 1);
      }
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const currentReel = reels[currentIndex];

  return (
    <div className="fixed inset-0 bg-black">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold text-white font-amiri">ريلز إسلامية</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Reels Container */}
      <div
        ref={containerRef}
        className="h-full w-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Current Reel */}
        <div
          className={`h-full w-full bg-gradient-to-br ${currentReel.gradient} flex items-center justify-center relative transition-all duration-300`}
          onClick={() => handleDoubleTap(currentReel.id)}
        >
          {/* Background Icon */}
          <span className="text-[180px] opacity-20 select-none">{currentReel.thumbnail}</span>

          {/* Double Tap Heart Animation */}
          {showHeart && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Heart className="h-32 w-32 text-red-500 fill-red-500 animate-[scale-in_0.3s_ease-out,fade-out_0.5s_ease-out_0.3s]" />
            </div>
          )}

          {/* Play/Pause Overlay */}
          <button
            className="absolute inset-0 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
          >
            {!isPlaying && (
              <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Play className="h-10 w-10 text-white fill-white" />
              </div>
            )}
          </button>

          {/* Duration Badge */}
          <div className="absolute top-20 right-4 px-2 py-1 bg-black/50 rounded-lg text-white text-xs">
            {currentReel.duration}
          </div>

          {/* Mute Button */}
          <button
            className="absolute top-20 left-4 p-2 bg-black/50 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-white" />
            ) : (
              <Volume2 className="h-4 w-4 text-white" />
            )}
          </button>

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-16 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-xl">{currentReel.thumbnail}</span>
              </div>
              <div>
                <p className="text-white font-bold text-sm">{currentReel.author}</p>
                <p className="text-white/60 text-xs">متابعة</p>
              </div>
            </div>
            <h3 className="text-white font-bold text-lg mb-2 font-amiri">
              {currentReel.title}
            </h3>
            <div className="flex items-center gap-4 text-white/60 text-xs">
              <span>{currentReel.views} مشاهدة</span>
            </div>
          </div>

          {/* Side Actions */}
          <div className="absolute right-3 bottom-32 flex flex-col gap-5">
            {/* Like */}
            <button
              className="flex flex-col items-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(currentReel.id);
              }}
            >
              <div className={`p-3 rounded-full transition-all ${
                likedReels.has(currentReel.id) 
                  ? "bg-red-500/20" 
                  : "bg-white/20 backdrop-blur-sm"
              }`}>
                <Heart className={`h-7 w-7 transition-all ${
                  likedReels.has(currentReel.id) 
                    ? "text-red-500 fill-red-500 scale-110" 
                    : "text-white"
                }`} />
              </div>
              <span className="text-white text-xs font-medium">
                {formatNumber(likeCounts[currentReel.id])}
              </span>
            </button>

            {/* Comment */}
            <button className="flex flex-col items-center gap-1">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                <MessageCircle className="h-7 w-7 text-white" />
              </div>
              <span className="text-white text-xs">1.2K</span>
            </button>

            {/* Save */}
            <button
              className="flex flex-col items-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                toggleSave(currentReel.id);
              }}
            >
              <div className={`p-3 rounded-full transition-all ${
                savedReels.has(currentReel.id) 
                  ? "bg-amber-500/20" 
                  : "bg-white/20 backdrop-blur-sm"
              }`}>
                <Bookmark className={`h-7 w-7 transition-all ${
                  savedReels.has(currentReel.id) 
                    ? "text-amber-500 fill-amber-500" 
                    : "text-white"
                }`} />
              </div>
              <span className="text-white text-xs">حفظ</span>
            </button>

            {/* Share */}
            <button
              className="flex flex-col items-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                handleShare(currentReel);
              }}
            >
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                <Share2 className="h-7 w-7 text-white" />
              </div>
              <span className="text-white text-xs">مشاركة</span>
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
            {reels.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`w-1 rounded-full transition-all ${
                  index === currentIndex 
                    ? "h-6 bg-white" 
                    : "h-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Progress Bar at Top */}
          <div className="absolute top-14 left-4 right-4 flex gap-1">
            {reels.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-0.5 rounded-full overflow-hidden bg-white/30"
              >
                <div
                  className={`h-full bg-white transition-all duration-300 ${
                    index < currentIndex 
                      ? "w-full" 
                      : index === currentIndex 
                        ? "w-full animate-[progress_5s_linear]" 
                        : "w-0"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Navigation Hints */}
          {currentIndex > 0 && (
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-white/40 text-xs animate-bounce">
              ↑ اسحب للسابق
            </div>
          )}
          {currentIndex < reels.length - 1 && (
            <div className="absolute bottom-36 left-1/2 -translate-x-1/2 text-white/40 text-xs animate-bounce">
              ↓ اسحب للتالي
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
