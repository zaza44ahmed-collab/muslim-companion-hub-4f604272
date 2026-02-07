import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Share2, Bookmark, Play, Volume2, VolumeX, MessageCircle, X, PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/layout/BottomNav";

const reels = [
  {
    id: 1,
    title: "سورة يس - الشيخ عبدالرحمن السديس",
    author: "قناة القرآن الكريم",
    views: "15M",
    likes: 450000,
    thumbnail: "📖",
    duration: "23:45",
    gradient: "from-emerald-900 via-emerald-800 to-teal-900",
    youtubeId: "aJPFJQDZxnc",
  },
  {
    id: 2,
    title: "أذكار الصباح كاملة - مشاري راشد العفاسي",
    author: "قناة العفاسي",
    views: "50M",
    likes: 890000,
    thumbnail: "🌅",
    duration: "32:00",
    gradient: "from-amber-900 via-orange-900 to-yellow-900",
    youtubeId: "5Kytp9vQ3jc",
  },
  {
    id: 3,
    title: "قصة سيدنا يوسف عليه السلام",
    author: "د. طارق السويدان",
    views: "8M",
    likes: 320000,
    thumbnail: "🌙",
    duration: "45:00",
    gradient: "from-indigo-900 via-purple-900 to-violet-900",
    youtubeId: "GQk7jM5cHPE",
  },
  {
    id: 4,
    title: "سورة الملك - عبدالباسط عبدالصمد",
    author: "قناة القرآن الكريم",
    views: "25M",
    likes: 650000,
    thumbnail: "✨",
    duration: "12:30",
    gradient: "from-cyan-900 via-blue-900 to-indigo-900",
    youtubeId: "JEqr89S5hxc",
  },
  {
    id: 5,
    title: "أذكار المساء كاملة - سعد الغامدي",
    author: "قناة الشيخ سعد الغامدي",
    views: "30M",
    likes: 720000,
    thumbnail: "🌙",
    duration: "28:00",
    gradient: "from-rose-900 via-pink-900 to-fuchsia-900",
    youtubeId: "k5N5F0OkjrI",
  },
  {
    id: 6,
    title: "سورة البقرة كاملة - ماهر المعيقلي",
    author: "قناة الشيخ ماهر المعيقلي",
    views: "100M",
    likes: 2000000,
    thumbnail: "📚",
    duration: "2:02:00",
    gradient: "from-teal-900 via-emerald-900 to-green-900",
    youtubeId: "pDLliGwGLHM",
  },
];

const VideosPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [likedReels, setLikedReels] = useState<Set<number>>(new Set());
  const [savedReels, setSavedReels] = useState<Set<number>>(new Set());
  const [showHeart, setShowHeart] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(
    Object.fromEntries(reels.map(r => [r.id, r.likes]))
  );
  const containerRef = useRef<HTMLDivElement>(null);
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
    const youtubeUrl = `https://www.youtube.com/watch?v=${reel.youtubeId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: reel.title,
          text: `${reel.title} - ${reel.author}`,
          url: youtubeUrl,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(youtubeUrl);
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
        setCurrentIndex(prev => prev + 1);
        setShowVideo(false);
        setIsPlaying(false);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
        setShowVideo(false);
        setIsPlaying(false);
      }
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const handlePlayVideo = () => {
    setShowVideo(true);
    setIsPlaying(true);
  };

  const currentReel = reels[currentIndex];

  return (
    <div className="fixed inset-0 bg-black pb-[72px]">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold text-white font-amiri">ريلز إسلامية</h1>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <PlusSquare className="h-5 w-5" />
          </Button>
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
          onClick={() => !showVideo && handleDoubleTap(currentReel.id)}
        >
          {/* YouTube Video Embed */}
          {showVideo ? (
            <div className="absolute inset-0 z-10">
              <iframe
                src={`https://www.youtube.com/embed/${currentReel.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&playsinline=1&rel=0&modestbranding=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={currentReel.title}
              />
              {/* Close Video Button */}
              <button
                className="absolute top-20 right-4 p-2 bg-black/70 rounded-full z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowVideo(false);
                  setIsPlaying(false);
                }}
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          ) : (
            <>
              {/* YouTube Thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${currentReel.youtubeId}/maxresdefault.jpg`}
                alt={currentReel.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                onError={(e) => {
                  // Fallback to hqdefault if maxresdefault doesn't exist
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${currentReel.youtubeId}/hqdefault.jpg`;
                }}
              />

              {/* Background Icon Overlay */}
              <span className="text-[120px] opacity-30 select-none z-10">{currentReel.thumbnail}</span>

              {/* Double Tap Heart Animation */}
              {showHeart && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <Heart className="h-32 w-32 text-red-500 fill-red-500 animate-[scale-in_0.3s_ease-out,fade-out_0.5s_ease-out_0.3s]" />
                </div>
              )}

              {/* Play Button Overlay */}
              <button
                className="absolute inset-0 flex items-center justify-center z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayVideo();
                }}
              >
                <div className="h-24 w-24 rounded-full bg-red-600/90 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110 shadow-2xl">
                  <Play className="h-12 w-12 text-white fill-white ml-1" />
                </div>
              </button>

              {/* YouTube Badge */}
              <div className="absolute top-20 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-red-600 rounded-lg text-white text-xs font-bold flex items-center gap-1.5">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube
              </div>

              {/* Duration Badge */}
              <div className="absolute top-20 right-4 px-2 py-1 bg-black/70 rounded-lg text-white text-xs font-medium">
                {currentReel.duration}
              </div>
            </>
          )}

          {/* Info Overlay */}
          <div className={`absolute bottom-20 left-16 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-30 ${showVideo ? 'opacity-50' : ''}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-xl">{currentReel.thumbnail}</span>
              </div>
              <div>
                <p className="text-white font-bold text-sm">{currentReel.author}</p>
                <p className="text-white/60 text-xs">قناة YouTube</p>
              </div>
            </div>
            <h3 className="text-white font-bold text-lg mb-2 font-amiri line-clamp-2">
              {currentReel.title}
            </h3>
            <div className="flex items-center gap-4 text-white/60 text-xs">
              <span>{currentReel.views} مشاهدة</span>
            </div>
          </div>

          {/* Side Actions - Left Side */}
          <div className={`absolute left-3 bottom-52 flex flex-col gap-5 z-30 ${showVideo ? 'opacity-50' : ''}`}>
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
                  ? "bg-red-500/30" 
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
            <a
              href={`https://www.youtube.com/watch?v=${currentReel.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                <MessageCircle className="h-7 w-7 text-white" />
              </div>
              <span className="text-white text-xs">تعليق</span>
            </a>

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
                  ? "bg-amber-500/30" 
                  : "bg-white/20 backdrop-blur-sm"
              }`}>
                <Bookmark className={`h-7 w-7 transition-all ${
                  savedReels.has(currentReel.id) 
                    ? "text-amber-400 fill-amber-400" 
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
          {/* Progress Indicator - Right Side */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-30">
            {reels.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                  setShowVideo(false);
                  setIsPlaying(false);
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
          <div className="absolute top-14 left-4 right-4 flex gap-1 z-30">
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
                        ? "w-full" 
                        : "w-0"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Navigation Hints - only show when video is not playing */}
          {!showVideo && (
            <>
              {currentIndex > 0 && (
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-white/40 text-xs animate-bounce z-20">
                  ↑ اسحب للسابق
                </div>
              )}
              {currentIndex < reels.length - 1 && (
                <div className="absolute bottom-36 left-1/2 -translate-x-1/2 text-white/40 text-xs animate-bounce z-20">
                  ↓ اسحب للتالي
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default VideosPage;