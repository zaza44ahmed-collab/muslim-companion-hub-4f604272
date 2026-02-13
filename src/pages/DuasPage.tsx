import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sun, Plane, Heart, GraduationCap, Utensils, Baby, Share2, Copy, Check, Shield, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { duasFullData, type DuaCategory } from "@/data/duas";

const iconMap: Record<string, React.ElementType> = {
  Sun, Plane, Heart, GraduationCap, Utensils, Baby, Shield, Sparkles, BookOpen, Coins: Sparkles,
};

const DuasPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<DuaCategory | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleShare = async (dua: { text: string; source: string }) => {
    const shareText = `${dua.text}\n\n📚 ${dua.source}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "دعاء من حقيبة المسلم", text: shareText });
      } catch (err) {
        if ((err as Error).name !== "AbortError") copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "تم النسخ", description: "تم نسخ الدعاء بنجاح" });
    } catch {
      toast({ title: "خطأ", description: "لم يتم النسخ", variant: "destructive" });
    }
  };

  const handleCopy = async (dua: { id: number; text: string; source: string }) => {
    await copyToClipboard(`${dua.text}\n\n📚 ${dua.source}`);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="container flex h-16 items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => setSelectedCategory(null)}>
              <ArrowRight className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold font-amiri">{selectedCategory.title}</h1>
            <div className="w-10" />
          </div>
        </header>

        <main className="container py-4 space-y-4 pb-8">
          {selectedCategory.duas.map((dua, index) => (
            <div
              key={dua.id}
              className="bg-card rounded-2xl p-5 shadow-card-islamic animate-fadeIn"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <p className="text-[16px] font-amiri leading-loose text-right mb-4">{dua.text}</p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-[11px] text-muted-foreground">📚 {dua.source}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={() => handleCopy(dua)}>
                    {copiedId === dua.id ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={() => handleShare(dua)}>
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
        <p className="text-center text-muted-foreground mb-6">اختر المناسبة للوصول إلى الأدعية المناسبة</p>
        <div className="grid grid-cols-2 gap-4">
          {duasFullData.map((category, index) => {
            const IconComp = iconMap[category.icon] || Sun;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category)}
                className={`bg-gradient-to-br ${category.color} rounded-2xl p-5 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl animate-fadeIn`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <IconComp className="h-10 w-10 mb-3 opacity-90" />
                <h3 className="font-bold text-base mb-1">{category.title}</h3>
                <p className="text-sm opacity-80">{category.duas.length} دعاء</p>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default DuasPage;
