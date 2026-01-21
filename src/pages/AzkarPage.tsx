import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sun, Moon, Bed, Coffee, Utensils, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

const azkarCategories = [
  { id: "morning", title: "أذكار الصباح", icon: Sun, color: "from-amber-500 to-orange-500", count: 27 },
  { id: "evening", title: "أذكار المساء", icon: Moon, color: "from-indigo-500 to-purple-600", count: 25 },
  { id: "sleep", title: "أذكار النوم", icon: Bed, color: "from-blue-500 to-cyan-500", count: 15 },
  { id: "wakeup", title: "أذكار الاستيقاظ", icon: Coffee, color: "from-emerald-500 to-teal-500", count: 8 },
  { id: "food", title: "أذكار الطعام", icon: Utensils, color: "from-rose-500 to-pink-500", count: 6 },
  { id: "travel", title: "أذكار السفر", icon: Car, color: "from-violet-500 to-purple-500", count: 10 },
];

const sampleAzkar = [
  {
    id: 1,
    text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    repeat: 1,
    completed: false,
  },
  {
    id: 2,
    text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
    repeat: 1,
    completed: false,
  },
  {
    id: 3,
    text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    repeat: 100,
    completed: false,
  },
];

const AzkarPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [azkarList, setAzkarList] = useState(sampleAzkar);

  const toggleComplete = (id: number) => {
    setAzkarList((prev) =>
      prev.map((dhikr) =>
        dhikr.id === id ? { ...dhikr, completed: !dhikr.completed } : dhikr
      )
    );
  };

  if (selectedCategory) {
    const category = azkarCategories.find((c) => c.id === selectedCategory);
    
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="container flex h-16 items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => setSelectedCategory(null)}>
              <ArrowRight className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold font-amiri">{category?.title}</h1>
            <div className="w-10" />
          </div>
        </header>

        <main className="container py-4 space-y-4">
          {azkarList.map((dhikr, index) => (
            <button
              key={dhikr.id}
              onClick={() => toggleComplete(dhikr.id)}
              className={`w-full text-right bg-card rounded-2xl p-5 shadow-card-islamic transition-all animate-fadeIn ${
                dhikr.completed ? "opacity-50" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className={`text-lg font-amiri leading-loose ${
                dhikr.completed ? "line-through" : ""
              }`}>
                {dhikr.text}
              </p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className={`text-sm font-medium ${
                  dhikr.completed ? "text-primary" : "text-muted-foreground"
                }`}>
                  {dhikr.completed ? "✓ تم" : `التكرار: ${dhikr.repeat} مرة`}
                </span>
                <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                  dhikr.completed 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : "border-muted-foreground"
                }`}>
                  {dhikr.completed && "✓"}
                </div>
              </div>
            </button>
          ))}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold font-amiri">الأذكار</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="container py-6">
        <div className="grid grid-cols-2 gap-4">
          {azkarCategories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`bg-gradient-to-br ${category.color} rounded-2xl p-5 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl animate-fadeIn`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <category.icon className="h-10 w-10 mb-3 opacity-90" />
              <h3 className="font-bold text-base mb-1">{category.title}</h3>
              <p className="text-sm opacity-80">{category.count} ذكر</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AzkarPage;
