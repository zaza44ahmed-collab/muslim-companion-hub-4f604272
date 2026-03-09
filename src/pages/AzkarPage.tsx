import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sun, Moon, Bed, Coffee, Utensils, Car, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { azkarData, type AzkarCategory, type Dhikr } from "@/data/azkar";

const iconMap: Record<string, React.ElementType> = { Sun, Moon, Bed, Coffee, Utensils, Car };

const AzkarPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<AzkarCategory | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [counters, setCounters] = useState<Record<string, number>>({});

  const handleTap = (catId: string, dhikr: Dhikr) => {
    const key = `${catId}-${dhikr.id}`;
    const current = counters[key] || 0;
    const next = current + 1;
    if (next >= dhikr.repeat) {
      setCompletedIds((prev) => new Set(prev).add(key));
      setCounters((prev) => ({ ...prev, [key]: dhikr.repeat }));
    } else {
      setCounters((prev) => ({ ...prev, [key]: next }));
    }
  };

  if (selectedCategory) {
    const completedCount = selectedCategory.azkar.filter(d => completedIds.has(`${selectedCategory.id}-${d.id}`)).length;
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="container flex h-14 items-center justify-between">
            <h1 className="text-lg font-bold font-amiri">{selectedCategory.title}</h1>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{completedCount}/{selectedCategory.azkar.length}</span>
              <Button variant="ghost" size="icon" onClick={() => setSelectedCategory(null)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
        <main className="container py-4 space-y-3 pb-8">
          {selectedCategory.azkar.map((dhikr, index) => {
            const key = `${selectedCategory.id}-${dhikr.id}`;
            const isCompleted = completedIds.has(key);
            const current = counters[key] || 0;
            return (
              <button key={dhikr.id} onClick={() => !isCompleted && handleTap(selectedCategory.id, dhikr)}
                className={`w-full text-right bg-card rounded-2xl p-5 shadow-card-islamic transition-all animate-fadeIn ${isCompleted ? "opacity-50" : ""}`}
                style={{ animationDelay: `${index * 60}ms` }}>
                <p className={`text-[16px] font-amiri leading-loose ${isCompleted ? "line-through" : ""}`}>{dhikr.text}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <div className="flex flex-col gap-0.5">
                    {dhikr.source && <span className="text-[11px] text-muted-foreground">📚 {dhikr.source}</span>}
                    <span className={`text-xs font-medium ${isCompleted ? "text-primary" : "text-muted-foreground"}`}>
                      {isCompleted ? "✓ تم" : `${current}/${dhikr.repeat}`}
                    </span>
                  </div>
                  <div className={`h-9 w-9 rounded-full border-2 flex items-center justify-center transition-colors ${isCompleted ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30"}`}>
                    {isCompleted ? <Check className="h-4 w-4" /> : <span className="text-xs font-bold">{dhikr.repeat - current}</span>}
                  </div>
                </div>
              </button>
            );
          })}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="text-lg font-bold font-amiri">الأذكار</h1>
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
        </div>
      </header>
      <main className="container py-6">
        <div className="grid grid-cols-2 gap-4">
          {azkarData.map((category, index) => {
            const IconComp = iconMap[category.icon] || Sun;
            return (
              <button key={category.id} onClick={() => setSelectedCategory(category)}
                className={`bg-gradient-to-br ${category.color} rounded-2xl p-5 text-white shadow-lg transition-all hover:scale-105 animate-fadeIn`}
                style={{ animationDelay: `${index * 100}ms` }}>
                <IconComp className="h-10 w-10 mb-3 opacity-90" />
                <h3 className="font-bold text-base mb-1">{category.title}</h3>
                <p className="text-sm opacity-80">{category.azkar.length} ذكر</p>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AzkarPage;
