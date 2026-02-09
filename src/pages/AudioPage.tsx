import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Play, Download, Heart, Clock, Star, Filter, TrendingUp, Sparkles, ChevronLeft } from "lucide-react";
import { audioAlbums, audioCategories, type AudioAlbum } from "@/data/audio";

const topDownloaded = [...audioAlbums].sort((a, b) => {
  const parse = (d: string) => {
    const num = parseFloat(d.replace(/[^0-9.]/g, ""));
    if (d.includes("M")) return num * 1000000;
    if (d.includes("K")) return num * 1000;
    return num;
  };
  return parse(b.downloads) - parse(a.downloads);
}).slice(0, 4);

const suggested = audioAlbums.filter((a) => a.rating >= 4.9).slice(0, 4);

const AudioPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredAudio =
    activeCategory === "all"
      ? audioAlbums
      : audioAlbums.filter((a) => a.category === activeCategory);

  const openPlayer = (album: AudioAlbum) => {
    navigate(`/audio/${album.id}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="container py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">الصوتيات الإسلامية</h2>
          <Button variant="ghost" size="icon">
            <Filter className="h-5 w-5" />
          </Button>
        </div>

        {/* Suggested */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold" />
              <h3 className="font-bold text-base">مقترحة لك</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-primary gap-1 text-xs px-2">
              عرض الكل
              <ChevronLeft className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {suggested.map((album) => (
              <div
                key={`sug-${album.id}`}
                className="min-w-[140px] max-w-[140px] bg-card rounded-2xl p-3 shadow-card-islamic cursor-pointer hover:shadow-lg transition-shadow shrink-0"
                onClick={() => openPlayer(album)}
              >
                <div className="h-24 w-full rounded-xl bg-gradient-to-br from-primary/20 to-gold/10 flex items-center justify-center mb-2 relative overflow-hidden">
                  <div className="absolute inset-0 islamic-pattern opacity-15" />
                  <Play className="h-8 w-8 text-primary/60" />
                </div>
                <h4 className="font-bold text-xs text-center truncate">{album.title}</h4>
                <p className="text-[10px] text-muted-foreground text-center truncate mt-0.5">
                  {album.artist}
                </p>
                <div className="flex items-center justify-center gap-1 mt-1.5">
                  <Star className="h-2.5 w-2.5 fill-gold text-gold" />
                  <span className="text-[10px] font-semibold">{album.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Most Downloaded */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-base">الأكثر استماعاً</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-primary gap-1 text-xs px-2">
              عرض الكل
              <ChevronLeft className="h-3 w-3" />
            </Button>
          </div>
          <div className="space-y-3">
            {topDownloaded.map((album, index) => (
              <div
                key={`top-${album.id}`}
                className="bg-card rounded-2xl p-3 shadow-card-islamic cursor-pointer hover:shadow-lg transition-shadow flex items-center gap-3"
                onClick={() => openPlayer(album)}
              >
                <span className="text-2xl font-bold text-primary/30 w-8 text-center shrink-0">
                  {index + 1}
                </span>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-gold/10 flex items-center justify-center shrink-0">
                  <Play className="h-5 w-5 text-primary/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate">{album.title}</h4>
                  <p className="text-xs text-muted-foreground truncate">{album.artist}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3 fill-gold text-gold" />
                    {album.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">{album.downloads}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          {audioCategories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "islamic" : "outline"}
              size="sm"
              className="shrink-0"
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* All Audio List */}
        <h3 className="font-bold text-base mb-3">جميع الصوتيات</h3>
        <div className="space-y-3">
          {filteredAudio.map((album, index) => (
            <div
              key={album.id}
              className="bg-card rounded-2xl p-4 shadow-card-islamic animate-fadeIn cursor-pointer hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${index * 80}ms` }}
              onClick={() => openPlayer(album)}
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-gold/10 flex items-center justify-center shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 islamic-pattern opacity-10" />
                  <Play className="h-6 w-6 text-primary/70" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm">{album.title}</h3>
                  <p className="text-xs text-muted-foreground">{album.artist}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {album.totalDuration}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {album.tracksCount} مقاطع
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gold">
                      <Star className="h-3 w-3 fill-gold" />
                      {album.rating}
                    </span>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default AudioPage;
