import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Bookmark, Play, Volume2 } from "lucide-react";

const reels = [
  {
    id: 1,
    title: "فضل الصلاة على النبي ﷺ",
    author: "الشيخ محمد العريفي",
    views: "250K",
    likes: "15K",
    thumbnail: "🕌",
    duration: "0:45",
  },
  {
    id: 2,
    title: "دعاء تفريج الهموم",
    author: "الشيخ نبيل العوضي",
    views: "180K",
    likes: "12K",
    thumbnail: "🤲",
    duration: "1:20",
  },
  {
    id: 3,
    title: "قصة أصحاب الكهف",
    author: "د. عمر عبد الكافي",
    views: "320K",
    likes: "25K",
    thumbnail: "📚",
    duration: "2:00",
  },
  {
    id: 4,
    title: "أسماء الله الحسنى",
    author: "الشيخ مشاري راشد",
    views: "500K",
    likes: "40K",
    thumbnail: "✨",
    duration: "1:30",
  },
];

const VideosPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="container py-4">
        <h2 className="text-xl font-bold mb-4">فيديوهات وريلز إسلامية</h2>

        {/* Featured Reel */}
        <div className="relative aspect-[9/16] max-h-[500px] bg-gradient-to-br from-emerald-dark to-primary rounded-3xl overflow-hidden mb-6 shadow-lg">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl opacity-30">{reels[activeIndex].thumbnail}</span>
          </div>
          
          {/* Play Button */}
          <button className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110">
              <Play className="h-10 w-10 text-white fill-white" />
            </div>
          </button>

          {/* Duration */}
          <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 rounded-lg text-white text-xs">
            {reels[activeIndex].duration}
          </div>

          {/* Volume */}
          <button className="absolute top-4 left-4 p-2 bg-black/50 rounded-full">
            <Volume2 className="h-4 w-4 text-white" />
          </button>

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white font-bold text-lg mb-1">
              {reels[activeIndex].title}
            </h3>
            <p className="text-white/80 text-sm">
              {reels[activeIndex].author}
            </p>
            <div className="flex items-center gap-4 mt-2 text-white/60 text-xs">
              <span>{reels[activeIndex].views} مشاهدة</span>
              <span>{reels[activeIndex].likes} إعجاب</span>
            </div>
          </div>

          {/* Side Actions */}
          <div className="absolute left-4 bottom-24 flex flex-col gap-4">
            <button className="flex flex-col items-center gap-1">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-white text-xs">{reels[activeIndex].likes}</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                <Bookmark className="h-6 w-6 text-white" />
              </div>
              <span className="text-white text-xs">حفظ</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                <Share2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-white text-xs">مشاركة</span>
            </button>
          </div>
        </div>

        {/* Reels Grid */}
        <h3 className="font-bold text-lg mb-3">المزيد من الفيديوهات</h3>
        <div className="grid grid-cols-2 gap-3">
          {reels.map((reel, index) => (
            <button
              key={reel.id}
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-[9/16] rounded-2xl overflow-hidden transition-all ${
                index === activeIndex ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-light to-primary flex items-center justify-center">
                <span className="text-4xl opacity-50">{reel.thumbnail}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-xs font-medium line-clamp-2">
                  {reel.title}
                </p>
              </div>
              <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/50 rounded text-white text-[10px]">
                {reel.duration}
              </div>
            </button>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default VideosPage;
