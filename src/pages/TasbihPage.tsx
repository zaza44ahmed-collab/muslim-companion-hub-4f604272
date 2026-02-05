import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, RotateCcw, Settings, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const adhkarOptions = [
  { id: 1, text: "سبحان الله", target: 33 },
  { id: 2, text: "الحمد لله", target: 33 },
  { id: 3, text: "الله أكبر", target: 34 },
  { id: 4, text: "لا إله إلا الله", target: 100 },
  { id: 5, text: "استغفر الله", target: 100 },
  { id: 6, text: "سبحان الله وبحمده", target: 100 },
  { id: 7, text: "لا حول ولا قوة إلا بالله", target: 100 },
];

const TasbihPage = () => {
  const [count, setCount] = useState(0);
  const [selectedDhikr, setSelectedDhikr] = useState(adhkarOptions[0]);
  const [totalCount, setTotalCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showRipple, setShowRipple] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Create click sound using Web Audio API
  const playClickSound = useCallback(() => {
    if (!soundEnabled) return;

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch (error) {
      console.log("Audio not supported");
    }
  }, [soundEnabled]);

  // Play completion sound
  const playCompleteSound = useCallback(() => {
    if (!soundEnabled) return;

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioContextRef.current;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 chord

      notes.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.5);

        oscillator.start(ctx.currentTime + i * 0.1);
        oscillator.stop(ctx.currentTime + i * 0.1 + 0.5);
      });
    } catch (error) {
      console.log("Audio not supported");
    }
  }, [soundEnabled]);

  const handleTap = () => {
    const newCount = count + 1;
    setCount(newCount);
    setTotalCount((prev) => prev + 1);
    
    // Visual feedback
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 300);
    
    // Sound feedback
    if (newCount === selectedDhikr.target) {
      playCompleteSound();
    } else {
      playClickSound();
    }
    
    // Vibration feedback (if supported)
    if (navigator.vibrate) {
      navigator.vibrate(newCount === selectedDhikr.target ? [50, 50, 50] : 10);
    }
  };

  const handleReset = () => {
    setCount(0);
    playClickSound();
  };

  const progress = (count / selectedDhikr.target) * 100;
  const isComplete = count >= selectedDhikr.target;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold font-amiri">المسبحة الإلكترونية</h1>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <main className="flex-1 container py-6 flex flex-col items-center justify-between">
        {/* Dhikr Selection */}
        <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-2 min-w-max px-2">
            {adhkarOptions.map((dhikr) => (
              <button
                key={dhikr.id}
                onClick={() => {
                  setSelectedDhikr(dhikr);
                  setCount(0);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedDhikr.id === dhikr.id
                    ? "bg-primary text-primary-foreground shadow-islamic"
                    : "bg-card text-foreground hover:bg-muted"
                }`}
              >
                {dhikr.text}
              </button>
            ))}
          </div>
        </div>

        {/* Main Counter */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Current Dhikr */}
          <h2 className="text-3xl font-amiri font-bold text-primary mb-2">
            {selectedDhikr.text}
          </h2>
          <p className="text-muted-foreground mb-8">
            الهدف: {selectedDhikr.target}
          </p>

          {/* Tasbih Bead */}
          <button
            onClick={handleTap}
            className={`relative h-56 w-56 rounded-full transition-all duration-200 active:scale-95 ${
              isComplete
                ? "bg-gradient-to-br from-secondary to-secondary/80 glow-gold"
                : "bg-gradient-to-br from-primary to-emerald-dark shadow-islamic"
            }`}
          >
            {/* Ripple Effect */}
            {showRipple && (
              <div className="absolute inset-0 rounded-full animate-ping bg-white/20" />
            )}
            {/* Progress Ring */}
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-white/20"
              />
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={`${progress * 2.89} 289`}
                className={isComplete ? "text-white" : "text-secondary"}
                strokeLinecap="round"
              />
            </svg>

            {/* Count Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <span className="text-6xl font-bold">{count}</span>
              <span className="text-sm opacity-80">
                {isComplete ? "✓ تم" : `/ ${selectedDhikr.target}`}
              </span>
            </div>
          </button>

          {/* Tap Hint */}
          <p className="text-muted-foreground mt-6 text-sm animate-pulse">
            اضغط للتسبيح
          </p>
        </div>

        {/* Bottom Stats */}
        <div className="w-full">
          <div className="bg-card rounded-2xl p-4 shadow-card-islamic mb-4">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{totalCount}</p>
                <p className="text-xs text-muted-foreground">إجمالي اليوم</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">{count}</p>
                <p className="text-xs text-muted-foreground">الحالي</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold">{selectedDhikr.target - count > 0 ? selectedDhikr.target - count : 0}</p>
                <p className="text-xs text-muted-foreground">المتبقي</p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleReset}
          >
            <RotateCcw className="h-4 w-4 ml-2" />
            إعادة العداد
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TasbihPage;
