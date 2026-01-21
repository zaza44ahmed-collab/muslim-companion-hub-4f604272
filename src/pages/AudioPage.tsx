import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, Download, Heart, Clock, List } from "lucide-react";

const categories = [
  { id: "all", label: "الكل", active: true },
  { id: "quran", label: "القرآن" },
  { id: "lectures", label: "محاضرات" },
  { id: "azkar", label: "أذكار" },
];

const audioItems = [
  {
    id: 1,
    title: "سورة البقرة كاملة",
    author: "الشيخ عبد الباسط عبد الصمد",
    duration: "2:30:00",
    size: "120 MB",
    category: "quran",
    icon: "📖",
  },
  {
    id: 2,
    title: "أذكار الصباح والمساء",
    author: "الشيخ مشاري راشد",
    duration: "25:00",
    size: "15 MB",
    category: "azkar",
    icon: "🌅",
  },
  {
    id: 3,
    title: "خطبة الجمعة - الصبر",
    author: "الشيخ محمد العريفي",
    duration: "45:00",
    size: "35 MB",
    category: "lectures",
    icon: "🎤",
  },
  {
    id: 4,
    title: "سورة يس بصوت خاشع",
    author: "الشيخ ماهر المعيقلي",
    duration: "12:00",
    size: "8 MB",
    category: "quran",
    icon: "📖",
  },
];

const AudioPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(audioItems[0]);

  return (
    <div className="min-h-screen bg-background pb-36">
      <Header />
      
      <main className="container py-4">
        <h2 className="text-xl font-bold mb-4">الصوتيات الإسلامية</h2>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={cat.active ? "islamic" : "outline"}
              size="sm"
              className="shrink-0"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Audio List */}
        <div className="space-y-3">
          {audioItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentTrack(item)}
              className={`w-full bg-card rounded-2xl p-4 shadow-card-islamic text-right transition-all animate-fadeIn ${
                currentTrack.id === item.id ? "ring-2 ring-primary" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl shrink-0">
                  {item.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.author}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {item.duration}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.size}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Now Playing Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border p-3 safe-area-bottom">
        <div className="container">
          {/* Progress Bar */}
          <div className="h-1 bg-muted rounded-full mb-3 overflow-hidden">
            <div className="h-full w-1/3 bg-primary rounded-full" />
          </div>

          <div className="flex items-center gap-3">
            {/* Track Info */}
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xl shrink-0">
              {currentTrack.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{currentTrack.title}</p>
              <p className="text-xs text-muted-foreground truncate">
                {currentTrack.author}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <SkipForward className="h-5 w-5" />
              </Button>
              
              <Button
                variant="islamic"
                size="icon"
                className="h-12 w-12"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <SkipBack className="h-5 w-5" />
              </Button>
            </div>

            <Button variant="ghost" size="icon" className="h-10 w-10">
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default AudioPage;
