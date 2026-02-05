import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sun, Plane, Heart, GraduationCap, Utensils, Baby, Share2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const duasCategories = [
  { id: "morning", title: "أدعية الصباح", icon: Sun, color: "from-amber-500 to-orange-500" },
  { id: "travel", title: "أدعية السفر", icon: Plane, color: "from-blue-500 to-cyan-500" },
  { id: "health", title: "أدعية المرض والشفاء", icon: Heart, color: "from-rose-500 to-pink-500" },
  { id: "exams", title: "أدعية الامتحانات", icon: GraduationCap, color: "from-violet-500 to-purple-500" },
  { id: "food", title: "أدعية الطعام", icon: Utensils, color: "from-emerald-500 to-teal-500" },
  { id: "children", title: "أدعية للأبناء", icon: Baby, color: "from-indigo-500 to-blue-500" },
];

const duasData: Record<string, Array<{ id: number; text: string; source: string }>> = {
  morning: [
    { id: 1, text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ", source: "رواه الترمذي" },
    { id: 2, text: "أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ ﷺ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ", source: "رواه أحمد" },
    { id: 3, text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ", source: "رواه ابن ماجه" },
  ],
  travel: [
    { id: 1, text: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ", source: "سورة الزخرف" },
    { id: 2, text: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى", source: "رواه مسلم" },
    { id: 3, text: "اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ", source: "رواه مسلم" },
  ],
  health: [
    { id: 1, text: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا", source: "متفق عليه" },
    { id: 2, text: "أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ", source: "رواه الترمذي - سبع مرات" },
    { id: 3, text: "بِسْمِ اللَّهِ أَرْقِيكَ، مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ، اللَّهُ يَشْفِيكَ", source: "رواه مسلم" },
  ],
  exams: [
    { id: 1, text: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي", source: "سورة طه" },
    { id: 2, text: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا", source: "رواه ابن حبان" },
    { id: 3, text: "اللَّهُمَّ إِنِّي أَسْتَوْدِعُكَ مَا قَرَأْتُ وَمَا حَفِظْتُ فَرُدَّهُ إِلَيَّ عِنْدَ حَاجَتِي إِلَيْهِ", source: "دعاء مأثور" },
  ],
  food: [
    { id: 1, text: "بِسْمِ اللَّهِ", source: "قبل الطعام" },
    { id: 2, text: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ", source: "رواه الترمذي" },
    { id: 3, text: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ", source: "دعاء مأثور" },
  ],
  children: [
    { id: 1, text: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ", source: "سورة الصافات" },
    { id: 2, text: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا", source: "سورة الفرقان" },
    { id: 3, text: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ", source: "سورة إبراهيم" },
  ],
};

const DuasPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleShare = async (dua: { text: string; source: string }) => {
    const shareText = `${dua.text}\n\n📚 ${dua.source}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "دعاء من حقيبة المسلم",
          text: shareText,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          copyToClipboard(shareText);
        }
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "تم النسخ",
        description: "تم نسخ الدعاء بنجاح",
      });
    } catch {
      toast({
        title: "خطأ",
        description: "لم يتم النسخ",
        variant: "destructive",
      });
    }
  };

  const handleCopy = async (dua: { id: number; text: string; source: string }) => {
    const shareText = `${dua.text}\n\n📚 ${dua.source}`;
    await copyToClipboard(shareText);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (selectedCategory) {
    const category = duasCategories.find((c) => c.id === selectedCategory);
    const duas = duasData[selectedCategory] || [];

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

        <main className="container py-4 space-y-4 pb-8">
          {duas.map((dua, index) => (
            <div
              key={dua.id}
              className="bg-card rounded-2xl p-5 shadow-card-islamic animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className="text-lg font-amiri leading-loose text-right mb-4">
                {dua.text}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">
                  📚 {dua.source}
                </span>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full"
                    onClick={() => handleCopy(dua)}
                  >
                    {copiedId === dua.id ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full"
                    onClick={() => handleShare(dua)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
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
          <h1 className="text-xl font-bold font-amiri">الأدعية</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="container py-6">
        <p className="text-center text-muted-foreground mb-6">
          اختر المناسبة للوصول إلى الأدعية المناسبة
        </p>

        <div className="grid grid-cols-2 gap-4">
          {duasCategories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`bg-gradient-to-br ${category.color} rounded-2xl p-5 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl animate-fadeIn`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <category.icon className="h-10 w-10 mb-3 opacity-90" />
              <h3 className="font-bold text-base">{category.title}</h3>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DuasPage;
