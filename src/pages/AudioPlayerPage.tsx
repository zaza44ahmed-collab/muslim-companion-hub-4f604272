import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  ArrowRight,
  Heart,
  Download,
  Repeat,
  Shuffle,
  Share2,
  ListMusic,
  Volume2,
  ChevronUp,
} from "lucide-react";
import { audioAlbums, type AudioTrack } from "@/data/audio";

const AudioPlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const album = audioAlbums.find((a) => a.id === Number(id));

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const currentTrack = album?.tracks[currentTrackIndex];

  // Simulate playback progress
  useEffect(() => {
    if (!isPlaying || !currentTrack) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 1;
        if (next >= currentTrack.durationSeconds) {
          handleNext();
          return 0;
        }
        setProgress((next / currentTrack.durationSeconds) * 100);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, currentTrackIndex, currentTrack]);

  const handleNext = useCallback(() => {
    if (!album) return;
    if (isShuffle) {
      setCurrentTrackIndex(Math.floor(Math.random() * album.tracks.length));
    } else if (currentTrackIndex < album.tracks.length - 1) {
      setCurrentTrackIndex((prev) => prev + 1);
    } else if (isRepeat) {
      setCurrentTrackIndex(0);
    } else {
      setIsPlaying(false);
    }
    setProgress(0);
    setCurrentTime(0);
  }, [album, currentTrackIndex, isRepeat, isShuffle]);

  const handlePrev = () => {
    if (currentTime > 5) {
      setProgress(0);
      setCurrentTime(0);
    } else {
      setCurrentTrackIndex((prev) => (prev > 0 ? prev - 1 : prev));
      setProgress(0);
      setCurrentTime(0);
    }
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(true);
    setShowPlaylist(false);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentTrack) return;
    const rect = e.currentTarget.getBoundingClientRect();
    // RTL: right is start
    const clickX = rect.right - e.clientX;
    const pct = (clickX / rect.width) * 100;
    setProgress(pct);
    setCurrentTime(Math.floor((pct / 100) * currentTrack.durationSeconds));
  };

  if (!album || !currentTrack) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">لم يتم العثور على الصوتية</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/15 via-background to-background flex flex-col relative overflow-hidden">
      {/* Background blur effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "hsl(var(--primary))" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-10 blur-3xl"
          style={{ background: "hsl(var(--gold))" }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 pt-4 pb-2">
        <Button variant="ghost" size="icon" onClick={() => navigate("/audio")}>
          <ArrowRight className="h-5 w-5" />
        </Button>
        <h1 className="text-sm font-bold text-foreground">الآن يستمع</h1>
        <Button variant="ghost" size="icon" onClick={() => setShowPlaylist(!showPlaylist)}>
          <ListMusic className="h-5 w-5" />
        </Button>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-6 pt-4">
        {/* Album Art */}
        <div className={`w-64 h-64 rounded-3xl overflow-hidden shadow-xl mb-6 transition-transform duration-500 ${isPlaying ? "scale-100" : "scale-95"}`}>
          <div className="w-full h-full bg-gradient-to-br from-primary/30 via-primary/10 to-gold/20 flex items-center justify-center relative">
            <div className="absolute inset-0 islamic-pattern opacity-20" />
            <div className="text-center z-10 px-4">
              <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Volume2 className="h-10 w-10 text-primary" />
              </div>
              <p className="font-bold text-foreground text-sm">{album.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{album.artist}</p>
            </div>
          </div>
        </div>

        {/* Track Info */}
        <div className="text-center w-full max-w-sm mb-4">
          <h2 className="font-bold text-lg text-foreground truncate">{currentTrack.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{album.artist}</p>
          {currentTrack.surah && (
            <span className="inline-block mt-2 px-3 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
              {currentTrack.surah}
            </span>
          )}
        </div>

        {/* Actions Row */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="transition-transform active:scale-90"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"}`}
            />
          </button>
          <button className="transition-transform active:scale-90">
            <Download className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="transition-transform active:scale-90">
            <Share2 className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-sm mb-2">
          <div
            className="h-2 bg-muted/40 rounded-full cursor-pointer overflow-hidden relative"
            onClick={handleSeek}
          >
            <div
              className="absolute top-0 right-0 h-full bg-gradient-to-l from-primary to-primary/70 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-md border-2 border-background transition-all duration-300"
              style={{ right: `calc(${progress}% - 8px)` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>{formatTime(currentTrack.durationSeconds - currentTime)}</span>
            <span>{formatTime(currentTime)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 w-full max-w-sm mt-2 mb-6">
          <button
            onClick={() => setIsShuffle(!isShuffle)}
            className={`p-2 rounded-full transition-colors ${isShuffle ? "text-primary" : "text-muted-foreground"}`}
          >
            <Shuffle className="h-5 w-5" />
          </button>

          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12"
            onClick={handlePrev}
          >
            <SkipForward className="h-6 w-6" />
          </Button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-90 transition-all active:scale-95"
          >
            {isPlaying ? (
              <Pause className="h-7 w-7" />
            ) : (
              <Play className="h-7 w-7 mr-[-2px]" />
            )}
          </button>

          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12"
            onClick={() => handleNext()}
          >
            <SkipBack className="h-6 w-6" />
          </Button>

          <button
            onClick={() => setIsRepeat(!isRepeat)}
            className={`p-2 rounded-full transition-colors ${isRepeat ? "text-primary" : "text-muted-foreground"}`}
          >
            <Repeat className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Playlist Panel */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-card/98 backdrop-blur-xl rounded-t-3xl z-20 transition-transform duration-500 ease-out ${
          showPlaylist ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "65vh" }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base">قائمة التشغيل ({album.tracks.length})</h3>
            <button onClick={() => setShowPlaylist(false)}>
              <ChevronUp className="h-5 w-5 text-muted-foreground rotate-180" />
            </button>
          </div>
          <div className="space-y-1 overflow-y-auto" style={{ maxHeight: "50vh" }}>
            {album.tracks.map((track, index) => (
              <button
                key={track.id}
                onClick={() => handleTrackSelect(index)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-right transition-all ${
                  currentTrackIndex === index
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted/30"
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                    currentTrackIndex === index
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/30 text-muted-foreground"
                  }`}
                >
                  {currentTrackIndex === index && isPlaying ? (
                    <span className="flex gap-0.5 items-end h-3">
                      <span className="w-0.5 bg-primary-foreground animate-pulse" style={{ height: "60%" }} />
                      <span className="w-0.5 bg-primary-foreground animate-pulse" style={{ height: "100%", animationDelay: "0.2s" }} />
                      <span className="w-0.5 bg-primary-foreground animate-pulse" style={{ height: "40%", animationDelay: "0.4s" }} />
                    </span>
                  ) : (
                    index + 1
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${currentTrackIndex === index ? "text-primary" : ""}`}>
                    {track.title}
                  </p>
                  {track.surah && (
                    <p className="text-xs text-muted-foreground">سورة {track.surah}</p>
                  )}
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{track.duration}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Playlist toggle hint */}
      {!showPlaylist && album.tracks.length > 1 && (
        <div className="relative z-10 pb-6 px-6">
          <button
            onClick={() => setShowPlaylist(true)}
            className="w-full bg-card/80 backdrop-blur-sm rounded-2xl p-3 flex items-center justify-between shadow-card-islamic"
          >
            <div className="flex items-center gap-3">
              <ListMusic className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">
                المقطع {currentTrackIndex + 1} من {album.tracks.length}
              </span>
            </div>
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioPlayerPage;
