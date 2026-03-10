import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const surahs = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatiha", ayahs: 7, type: "مكية" },
  { number: 2, name: "البقرة", englishName: "Al-Baqarah", ayahs: 286, type: "مدنية" },
  { number: 3, name: "آل عمران", englishName: "Aal-E-Imran", ayahs: 200, type: "مدنية" },
  { number: 4, name: "النساء", englishName: "An-Nisa", ayahs: 176, type: "مدنية" },
  { number: 5, name: "المائدة", englishName: "Al-Ma'idah", ayahs: 120, type: "مدنية" },
  { number: 6, name: "الأنعام", englishName: "Al-An'am", ayahs: 165, type: "مكية" },
  { number: 7, name: "الأعراف", englishName: "Al-A'raf", ayahs: 206, type: "مكية" },
  { number: 8, name: "الأنفال", englishName: "Al-Anfal", ayahs: 75, type: "مدنية" },
  { number: 9, name: "التوبة", englishName: "At-Tawbah", ayahs: 129, type: "مدنية" },
  { number: 10, name: "يونس", englishName: "Yunus", ayahs: 109, type: "مكية" },
  { number: 11, name: "هود", englishName: "Hud", ayahs: 123, type: "مكية" },
  { number: 12, name: "يوسف", englishName: "Yusuf", ayahs: 111, type: "مكية" },
  { number: 13, name: "الرعد", englishName: "Ar-Ra'd", ayahs: 43, type: "مدنية" },
  { number: 14, name: "إبراهيم", englishName: "Ibrahim", ayahs: 52, type: "مكية" },
  { number: 15, name: "الحجر", englishName: "Al-Hijr", ayahs: 99, type: "مكية" },
  { number: 16, name: "النحل", englishName: "An-Nahl", ayahs: 128, type: "مكية" },
  { number: 17, name: "الإسراء", englishName: "Al-Isra", ayahs: 111, type: "مكية" },
  { number: 18, name: "الكهف", englishName: "Al-Kahf", ayahs: 110, type: "مكية" },
  { number: 19, name: "مريم", englishName: "Maryam", ayahs: 98, type: "مكية" },
  { number: 20, name: "طه", englishName: "Ta-Ha", ayahs: 135, type: "مكية" },
  { number: 21, name: "الأنبياء", englishName: "Al-Anbiya", ayahs: 112, type: "مكية" },
  { number: 22, name: "الحج", englishName: "Al-Hajj", ayahs: 78, type: "مدنية" },
  { number: 23, name: "المؤمنون", englishName: "Al-Mu'minun", ayahs: 118, type: "مكية" },
  { number: 24, name: "النور", englishName: "An-Nur", ayahs: 64, type: "مدنية" },
  { number: 25, name: "الفرقان", englishName: "Al-Furqan", ayahs: 77, type: "مكية" },
  { number: 26, name: "الشعراء", englishName: "Ash-Shu'ara", ayahs: 227, type: "مكية" },
  { number: 27, name: "النمل", englishName: "An-Naml", ayahs: 93, type: "مكية" },
  { number: 28, name: "القصص", englishName: "Al-Qasas", ayahs: 88, type: "مكية" },
  { number: 29, name: "العنكبوت", englishName: "Al-Ankabut", ayahs: 69, type: "مكية" },
  { number: 30, name: "الروم", englishName: "Ar-Rum", ayahs: 60, type: "مكية" },
  { number: 31, name: "لقمان", englishName: "Luqman", ayahs: 34, type: "مكية" },
  { number: 32, name: "السجدة", englishName: "As-Sajdah", ayahs: 30, type: "مكية" },
  { number: 33, name: "الأحزاب", englishName: "Al-Ahzab", ayahs: 73, type: "مدنية" },
  { number: 34, name: "سبأ", englishName: "Saba", ayahs: 54, type: "مكية" },
  { number: 35, name: "فاطر", englishName: "Fatir", ayahs: 45, type: "مكية" },
  { number: 36, name: "يس", englishName: "Ya-Sin", ayahs: 83, type: "مكية" },
  { number: 37, name: "الصافات", englishName: "As-Saffat", ayahs: 182, type: "مكية" },
  { number: 38, name: "ص", englishName: "Sad", ayahs: 88, type: "مكية" },
  { number: 39, name: "الزمر", englishName: "Az-Zumar", ayahs: 75, type: "مكية" },
  { number: 40, name: "غافر", englishName: "Ghafir", ayahs: 85, type: "مكية" },
  { number: 41, name: "فصلت", englishName: "Fussilat", ayahs: 54, type: "مكية" },
  { number: 42, name: "الشورى", englishName: "Ash-Shura", ayahs: 53, type: "مكية" },
  { number: 43, name: "الزخرف", englishName: "Az-Zukhruf", ayahs: 89, type: "مكية" },
  { number: 44, name: "الدخان", englishName: "Ad-Dukhan", ayahs: 59, type: "مكية" },
  { number: 45, name: "الجاثية", englishName: "Al-Jathiyah", ayahs: 37, type: "مكية" },
  { number: 46, name: "الأحقاف", englishName: "Al-Ahqaf", ayahs: 35, type: "مكية" },
  { number: 47, name: "محمد", englishName: "Muhammad", ayahs: 38, type: "مدنية" },
  { number: 48, name: "الفتح", englishName: "Al-Fath", ayahs: 29, type: "مدنية" },
  { number: 49, name: "الحجرات", englishName: "Al-Hujurat", ayahs: 18, type: "مدنية" },
  { number: 50, name: "ق", englishName: "Qaf", ayahs: 45, type: "مكية" },
  { number: 51, name: "الذاريات", englishName: "Adh-Dhariyat", ayahs: 60, type: "مكية" },
  { number: 52, name: "الطور", englishName: "At-Tur", ayahs: 49, type: "مكية" },
  { number: 53, name: "النجم", englishName: "An-Najm", ayahs: 62, type: "مكية" },
  { number: 54, name: "القمر", englishName: "Al-Qamar", ayahs: 55, type: "مكية" },
  { number: 55, name: "الرحمن", englishName: "Ar-Rahman", ayahs: 78, type: "مدنية" },
  { number: 56, name: "الواقعة", englishName: "Al-Waqi'ah", ayahs: 96, type: "مكية" },
  { number: 57, name: "الحديد", englishName: "Al-Hadid", ayahs: 29, type: "مدنية" },
  { number: 58, name: "المجادلة", englishName: "Al-Mujadilah", ayahs: 22, type: "مدنية" },
  { number: 59, name: "الحشر", englishName: "Al-Hashr", ayahs: 24, type: "مدنية" },
  { number: 60, name: "الممتحنة", englishName: "Al-Mumtahanah", ayahs: 13, type: "مدنية" },
  { number: 61, name: "الصف", englishName: "As-Saff", ayahs: 14, type: "مدنية" },
  { number: 62, name: "الجمعة", englishName: "Al-Jumu'ah", ayahs: 11, type: "مدنية" },
  { number: 63, name: "المنافقون", englishName: "Al-Munafiqun", ayahs: 11, type: "مدنية" },
  { number: 64, name: "التغابن", englishName: "At-Taghabun", ayahs: 18, type: "مدنية" },
  { number: 65, name: "الطلاق", englishName: "At-Talaq", ayahs: 12, type: "مدنية" },
  { number: 66, name: "التحريم", englishName: "At-Tahrim", ayahs: 12, type: "مدنية" },
  { number: 67, name: "الملك", englishName: "Al-Mulk", ayahs: 30, type: "مكية" },
  { number: 68, name: "القلم", englishName: "Al-Qalam", ayahs: 52, type: "مكية" },
  { number: 69, name: "الحاقة", englishName: "Al-Haqqah", ayahs: 52, type: "مكية" },
  { number: 70, name: "المعارج", englishName: "Al-Ma'arij", ayahs: 44, type: "مكية" },
  { number: 71, name: "نوح", englishName: "Nuh", ayahs: 28, type: "مكية" },
  { number: 72, name: "الجن", englishName: "Al-Jinn", ayahs: 28, type: "مكية" },
  { number: 73, name: "المزمل", englishName: "Al-Muzzammil", ayahs: 20, type: "مكية" },
  { number: 74, name: "المدثر", englishName: "Al-Muddaththir", ayahs: 56, type: "مكية" },
  { number: 75, name: "القيامة", englishName: "Al-Qiyamah", ayahs: 40, type: "مكية" },
  { number: 76, name: "الإنسان", englishName: "Al-Insan", ayahs: 31, type: "مدنية" },
  { number: 77, name: "المرسلات", englishName: "Al-Mursalat", ayahs: 50, type: "مكية" },
  { number: 78, name: "النبأ", englishName: "An-Naba", ayahs: 40, type: "مكية" },
  { number: 79, name: "النازعات", englishName: "An-Nazi'at", ayahs: 46, type: "مكية" },
  { number: 80, name: "عبس", englishName: "Abasa", ayahs: 42, type: "مكية" },
  { number: 81, name: "التكوير", englishName: "At-Takwir", ayahs: 29, type: "مكية" },
  { number: 82, name: "الانفطار", englishName: "Al-Infitar", ayahs: 19, type: "مكية" },
  { number: 83, name: "المطففين", englishName: "Al-Mutaffifin", ayahs: 36, type: "مكية" },
  { number: 84, name: "الانشقاق", englishName: "Al-Inshiqaq", ayahs: 25, type: "مكية" },
  { number: 85, name: "البروج", englishName: "Al-Buruj", ayahs: 22, type: "مكية" },
  { number: 86, name: "الطارق", englishName: "At-Tariq", ayahs: 17, type: "مكية" },
  { number: 87, name: "الأعلى", englishName: "Al-A'la", ayahs: 19, type: "مكية" },
  { number: 88, name: "الغاشية", englishName: "Al-Ghashiyah", ayahs: 26, type: "مكية" },
  { number: 89, name: "الفجر", englishName: "Al-Fajr", ayahs: 30, type: "مكية" },
  { number: 90, name: "البلد", englishName: "Al-Balad", ayahs: 20, type: "مكية" },
  { number: 91, name: "الشمس", englishName: "Ash-Shams", ayahs: 15, type: "مكية" },
  { number: 92, name: "الليل", englishName: "Al-Layl", ayahs: 21, type: "مكية" },
  { number: 93, name: "الضحى", englishName: "Ad-Duha", ayahs: 11, type: "مكية" },
  { number: 94, name: "الشرح", englishName: "Ash-Sharh", ayahs: 8, type: "مكية" },
  { number: 95, name: "التين", englishName: "At-Tin", ayahs: 8, type: "مكية" },
  { id: 96, number: 96, name: "العلق", englishName: "Al-Alaq", ayahs: 19, type: "مكية" },
  { number: 97, name: "القدر", englishName: "Al-Qadr", ayahs: 5, type: "مكية" },
  { number: 98, name: "البينة", englishName: "Al-Bayyinah", ayahs: 8, type: "مدنية" },
  { number: 99, name: "الزلزلة", englishName: "Az-Zalzalah", ayahs: 8, type: "مدنية" },
  { number: 100, name: "العاديات", englishName: "Al-Adiyat", ayahs: 11, type: "مكية" },
  { number: 101, name: "القارعة", englishName: "Al-Qari'ah", ayahs: 11, type: "مكية" },
  { number: 102, name: "التكاثر", englishName: "At-Takathur", ayahs: 8, type: "مكية" },
  { number: 103, name: "العصر", englishName: "Al-Asr", ayahs: 3, type: "مكية" },
  { number: 104, name: "الهمزة", englishName: "Al-Humazah", ayahs: 9, type: "مكية" },
  { number: 105, name: "الفيل", englishName: "Al-Fil", ayahs: 5, type: "مكية" },
  { number: 106, name: "قريش", englishName: "Quraysh", ayahs: 4, type: "مكية" },
  { number: 107, name: "الماعون", englishName: "Al-Ma'un", ayahs: 7, type: "مكية" },
  { number: 108, name: "الكوثر", englishName: "Al-Kawthar", ayahs: 3, type: "مكية" },
  { number: 109, name: "الكافرون", englishName: "Al-Kafirun", ayahs: 6, type: "مكية" },
  { number: 110, name: "النصر", englishName: "An-Nasr", ayahs: 3, type: "مدنية" },
  { number: 111, name: "المسد", englishName: "Al-Masad", ayahs: 5, type: "مكية" },
  { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", ayahs: 4, type: "مكية" },
  { number: 113, name: "الفلق", englishName: "Al-Falaq", ayahs: 5, type: "مكية" },
  { number: 114, name: "الناس", englishName: "An-Nas", ayahs: 6, type: "مكية" },
];

// Juz / Hizb data
const getJuzHizb = (surahNumber: number) => {
  // Simplified mapping
  if (surahNumber <= 2) return { juz: 1, hizb: 1 };
  if (surahNumber <= 3) return { juz: 3, hizb: 5 };
  if (surahNumber <= 5) return { juz: 6, hizb: 11 };
  if (surahNumber <= 7) return { juz: 8, hizb: 15 };
  if (surahNumber <= 10) return { juz: 11, hizb: 21 };
  if (surahNumber <= 15) return { juz: 14, hizb: 27 };
  if (surahNumber <= 20) return { juz: 16, hizb: 31 };
  if (surahNumber <= 25) return { juz: 19, hizb: 37 };
  if (surahNumber <= 30) return { juz: 21, hizb: 41 };
  if (surahNumber <= 36) return { juz: 23, hizb: 45 };
  if (surahNumber <= 45) return { juz: 25, hizb: 49 };
  if (surahNumber <= 55) return { juz: 27, hizb: 53 };
  if (surahNumber <= 77) return { juz: 29, hizb: 57 };
  return { juz: 30, hizb: 59 };
};

// Tajweed color legend
const tajweedLegend = [
  { color: "text-red-600", label: "مد 6 حركات لزوماً" },
  { color: "text-green-600", label: "إخفاء، ومواقع الغُنّة" },
  { color: "text-blue-600", label: "مد 2 أو 4 أو 6 جوازاً" },
  { color: "text-purple-600", label: "إدغام، وما لا يُلفظ" },
  { color: "text-cyan-600", label: "مد مشبع 6 حركات" },
  { color: "text-orange-600", label: "قلقلة" },
  { color: "text-teal-600", label: "تفخيم" },
  { color: "text-pink-600", label: "مد حركتان" },
];

const QuranPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSurah, setSelectedSurah] = useState<typeof surahs[0] | null>(null);
  const [ayahs, setAyahs] = useState<Array<{ number: number; text: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.name.includes(searchQuery) ||
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.number.toString().includes(searchQuery)
  );

  const fetchSurahText = async (surahNumber: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.uthmani`
      );
      const data = await response.json();
      if (data.code === 200) {
        setAyahs(
          data.data.ayahs.map((ayah: { numberInSurah: number; text: string }) => ({
            number: ayah.numberInSurah,
            text: ayah.text,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching surah:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSurahSelect = (surah: typeof surahs[0]) => {
    setSelectedSurah(surah);
    fetchSurahText(surah.number);
  };

  if (selectedSurah) {
    const { juz, hizb } = getJuzHizb(selectedSurah.number);
    return (
      <div className="min-h-screen bg-[#FFFDE7]" dir="rtl">
        {/* Surah Header - Tajweed Mushaf Style */}
        <header className="sticky top-0 z-50 w-full bg-[#1B5E20] text-white shadow-lg">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="text-xs font-bold">حزب {hizb}</div>
            <div className="text-center">
              <h1 className="text-lg font-bold font-amiri">سُورَةُ {selectedSurah.name}</h1>
              <p className="text-[10px] opacity-80">آياتها {selectedSurah.ayahs}</p>
            </div>
            <div className="text-xs font-bold">سورة {selectedSurah.name} {selectedSurah.number}</div>
          </div>
          <div className="flex items-center justify-between px-4 pb-1">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => setSelectedSurah(null)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <main className="px-4 py-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin h-8 w-8 border-4 border-[#1B5E20] border-t-transparent rounded-full" />
              </div>
            ) : (
              <div className="bg-[#FFFFF0] rounded-lg border-2 border-[#1B5E20]/30 p-4 shadow-md">
                {/* Bismillah - decorated */}
                {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
                  <div className="text-center mb-6 py-3 border-b-2 border-[#1B5E20]/20">
                    <p className="text-2xl font-amiri text-[#1B5E20] font-bold">
                      بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                    </p>
                  </div>
                )}
                
                {/* Ayahs in flowing text */}
                <div className="text-right leading-[3] text-xl font-amiri text-[#333]">
                  {ayahs.map((ayah) => (
                    <span key={ayah.number} className="inline">
                      <span>{ayah.text}</span>{" "}
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[#1B5E20] text-xs font-bold mx-0.5"
                        style={{ 
                          backgroundImage: 'radial-gradient(circle, rgba(27,94,32,0.1) 0%, transparent 70%)',
                          border: '1.5px solid rgba(27,94,32,0.4)'
                        }}>
                        {ayah.number}
                      </span>{" "}
                    </span>
                  ))}
                </div>

                {/* Footer info */}
                <div className="mt-6 pt-3 border-t-2 border-[#1B5E20]/20 text-center">
                  <p className="text-sm font-bold text-[#1B5E20] font-amiri">الجزء {juz} الحزب {hizb}</p>
                </div>
              </div>
            )}

            {/* Tajweed Legend */}
            <div className="mt-4 grid grid-cols-2 gap-1 text-[8px] font-bold">
              {tajweedLegend.map((item, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')}`} />
                  <span className="text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </main>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="sticky top-0 z-50 w-full bg-[#1B5E20] text-white shadow-lg">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="text-lg font-bold font-amiri">📖 مصحف التجويد</h1>
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="container py-4">
        <div className="relative mb-4">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث عن سورة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>

        <ScrollArea className="h-[calc(100vh-160px)]">
          <div className="space-y-2">
            {filteredSurahs.map((surah, index) => (
              <button
                key={surah.number}
                onClick={() => handleSurahSelect(surah)}
                className="w-full bg-card rounded-xl p-3 shadow-sm hover:shadow-md transition-all animate-fadeIn flex items-center gap-3"
                style={{ animationDelay: `${Math.min(index * 20, 400)}ms` }}
              >
                <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)' }}>
                  {surah.number}
                </div>
                
                <div className="flex-1 text-right">
                  <h3 className="font-bold text-base font-amiri">{surah.name}</h3>
                  <p className="text-xs text-muted-foreground">{surah.englishName}</p>
                </div>
                
                <div className="text-left text-xs text-muted-foreground">
                  <p>{surah.ayahs} آيات</p>
                  <p className={`text-[10px] px-1.5 py-0.5 rounded-full ${surah.type === "مكية" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {surah.type}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default QuranPage;
