import { useState, useRef, useCallback, useEffect } from 'react';

export interface AudioTrackInfo {
  id: string;
  title: string;
  artist: string;
  url: string;
  coverUrl?: string;
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<AudioTrackInfo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState<AudioTrackInfo[]>([]);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null);
  const sleepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
    };
  }, []);

  // Save last played
  useEffect(() => {
    if (currentTrack) {
      localStorage.setItem('lastPlayed', JSON.stringify(currentTrack));
    }
  }, [currentTrack]);

  const play = useCallback((track: AudioTrackInfo, list?: AudioTrackInfo[]) => {
    if (list) setPlaylist(list);

    if (currentTrack?.id === track.id && audioRef.current) {
      if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
      else { audioRef.current.play(); setIsPlaying(true); }
      return;
    }

    if (audioRef.current) { audioRef.current.pause(); }

    const a = new Audio(track.url);
    audioRef.current = a;
    setCurrentTrack(track);
    setProgress(0);
    setCurrentTime(0);

    a.addEventListener("loadedmetadata", () => setDuration(a.duration));
    a.addEventListener("timeupdate", () => {
      setCurrentTime(a.currentTime);
      if (a.duration) setProgress((a.currentTime / a.duration) * 100);
    });
    a.addEventListener("ended", () => {
      // Auto-play next
      const currentList = list || playlist;
      const idx = currentList.findIndex(t => t.id === track.id);
      if (idx < currentList.length - 1) {
        play(currentList[idx + 1], currentList);
      } else {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      }
    });

    a.play();
    setIsPlaying(true);
  }, [currentTrack, isPlaying, playlist]);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play(); setIsPlaying(true); }
  }, [isPlaying]);

  const playNext = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;
    const idx = playlist.findIndex(t => t.id === currentTrack.id);
    if (idx < playlist.length - 1) play(playlist[idx + 1], playlist);
  }, [currentTrack, playlist, play]);

  const playPrev = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;
    const idx = playlist.findIndex(t => t.id === currentTrack.id);
    if (idx > 0) play(playlist[idx - 1], playlist);
  }, [currentTrack, playlist, play]);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * duration;
  }, [duration]);

  const stop = useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setCurrentTrack(null);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  }, []);

  const setSleepTimerMinutes = useCallback((minutes: number | null) => {
    if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
    setSleepTimer(minutes);
    if (minutes) {
      sleepTimerRef.current = setTimeout(() => {
        if (audioRef.current) { audioRef.current.pause(); setIsPlaying(false); }
        setSleepTimer(null);
      }, minutes * 60 * 1000);
    }
  }, []);

  const share = useCallback(async () => {
    if (!currentTrack) return;
    if (navigator.share) {
      try { await navigator.share({ title: currentTrack.title, text: `${currentTrack.title} - ${currentTrack.artist}`, url: currentTrack.url }); } catch {}
    }
  }, [currentTrack]);

  const download = useCallback(() => {
    if (!currentTrack) return;
    const a = document.createElement("a");
    a.href = currentTrack.url;
    a.download = `${currentTrack.title}.mp3`;
    a.target = "_blank";
    a.click();
  }, [currentTrack]);

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  return {
    currentTrack, isPlaying, progress, currentTime, duration,
    playlist, sleepTimer,
    play, togglePlayPause, playNext, playPrev, seek, stop,
    setSleepTimerMinutes, share, download, formatTime,
  };
}
