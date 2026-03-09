export const surahs = [
  "الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال","التوبة","يونس",
  "هود","يوسف","الرعد","إبراهيم","الحجر","النحل","الإسراء","الكهف","مريم","طه",
  "الأنبياء","الحج","المؤمنون","النور","الفرقان","الشعراء","النمل","القصص","العنكبوت","الروم",
  "لقمان","السجدة","الأحزاب","سبأ","فاطر","يس","الصافات","ص","الزمر","غافر",
  "فصلت","الشورى","الزخرف","الدخان","الجاثية","الأحقاف","محمد","الفتح","الحجرات","ق",
  "الذاريات","الطور","النجم","القمر","الرحمن","الواقعة","الحديد","المجادلة","الحشر","الممتحنة",
  "الصف","الجمعة","المنافقون","التغابن","الطلاق","التحريم","الملك","القلم","الحاقة","المعارج",
  "نوح","الجن","المزمل","المدثر","القيامة","الإنسان","المرسلات","النبأ","النازعات","عبس",
  "التكوير","الانفطار","المطففين","الانشقاق","البروج","الطارق","الأعلى","الغاشية","الفجر","البلد",
  "الشمس","الليل","الضحى","الشرح","التين","العلق","القدر","البينة","الزلزلة","العاديات",
  "القارعة","التكاثر","العصر","الهمزة","الفيل","قريش","الماعون","الكوثر","الكافرون","النصر",
  "المسد","الإخلاص","الفلق","الناس"
];

export interface ReciterInfo {
  id: number;
  name: string;
  server: string;
  availableSurahs: number[];
  rewpiaya?: string;
}

export const featuredReciters: ReciterInfo[] = [
  { id: 1, name: "مشاري راشد العفاسي", server: "https://server8.mp3quran.net/afs/", availableSurahs: Array.from({length:114},(_,i)=>i+1) },
  { id: 2, name: "ماهر المعيقلي", server: "https://server12.mp3quran.net/maher/", availableSurahs: Array.from({length:114},(_,i)=>i+1) },
  { id: 3, name: "عبد الرحمن السديس", server: "https://server11.mp3quran.net/sds/", availableSurahs: Array.from({length:114},(_,i)=>i+1) },
  { id: 4, name: "ياسر الدوسري", server: "https://server11.mp3quran.net/yasser/", availableSurahs: Array.from({length:114},(_,i)=>i+1) },
  { id: 5, name: "سعود الشريم", server: "https://server7.mp3quran.net/shuraim/", availableSurahs: Array.from({length:114},(_,i)=>i+1) },
];

export function getSurahUrl(server: string, surahNumber: number): string {
  return `${server}${String(surahNumber).padStart(3, '0')}.mp3`;
}
