import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, RotateCcw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const adhkarOptions = [
  { id: 1, text: "سبحان الله", target: 33 },
  { id: 2, text: "الحمد لله", target: 33 },
  { id: 3, text: "الله أكبر", target: 34 },
  { id: 4, text: "لا إله إلا الله", target: 100 },
  { id: 5, text: "استغفر الله", target: 100 },
];

const TasbihPage = () => {
  const [count, setCount] = useState(0);
  const [selectedDhikr, setSelectedDhikr] = useState(adhkarOptions[0]);
  const [totalCount, setTotalCount] = useState(0);

  const handleTap = () => {
    setCount((prev) => prev + 1);
    setTotalCount((prev) => prev + 1);
    
    // Vibration feedback (if supported)
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const handleReset = () => {
    setCount(0);
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
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
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
