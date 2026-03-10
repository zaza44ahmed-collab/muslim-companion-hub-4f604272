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
}

const allSurahs = Array.from({length:114},(_,i)=>i+1);

export const featuredReciters: ReciterInfo[] = [
  { id: 1, name: "مشاري راشد العفاسي", server: "https://server8.mp3quran.net/afs/", availableSurahs: allSurahs },
  { id: 2, name: "ماهر المعيقلي", server: "https://server12.mp3quran.net/maher/", availableSurahs: allSurahs },
  { id: 3, name: "عبد الرحمن السديس", server: "https://server11.mp3quran.net/sds/", availableSurahs: allSurahs },
  { id: 4, name: "ياسر الدوسري", server: "https://server11.mp3quran.net/yasser/", availableSurahs: allSurahs },
  { id: 5, name: "سعود الشريم", server: "https://server7.mp3quran.net/shuraim/", availableSurahs: allSurahs },
  { id: 6, name: "عبد الباسط عبد الصمد", server: "https://server7.mp3quran.net/basit/", availableSurahs: allSurahs },
  { id: 7, name: "محمود خليل الحصري", server: "https://server13.mp3quran.net/husr/", availableSurahs: allSurahs },
  { id: 8, name: "أحمد العجمي", server: "https://server10.mp3quran.net/ajm/", availableSurahs: allSurahs },
  { id: 9, name: "سعد الغامدي", server: "https://server7.mp3quran.net/s_gmd/", availableSurahs: allSurahs },
  { id: 10, name: "هاني الرفاعي", server: "https://server8.mp3quran.net/hani/", availableSurahs: allSurahs },
  { id: 11, name: "فارس عباد", server: "https://server8.mp3quran.net/frs_a/", availableSurahs: allSurahs },
  { id: 12, name: "ناصر القطامي", server: "https://server6.mp3quran.net/qtm/", availableSurahs: allSurahs },
  { id: 13, name: "خالد الجليل", server: "https://server11.mp3quran.net/khalid_jl/", availableSurahs: allSurahs },
  { id: 14, name: "عبدالله عواد الجهني", server: "https://server11.mp3quran.net/a_jhn/", availableSurahs: allSurahs },
  { id: 15, name: "محمد اللحيدان", server: "https://server8.mp3quran.net/lhdan/", availableSurahs: allSurahs },
  { id: 16, name: "إدريس أبكر", server: "https://server6.mp3quran.net/abkr/", availableSurahs: allSurahs },
  { id: 17, name: "علي الحذيفي", server: "https://server8.mp3quran.net/hthf/", availableSurahs: allSurahs },
  { id: 18, name: "محمد أيوب", server: "https://server8.mp3quran.net/ayyub/", availableSurahs: allSurahs },
  { id: 19, name: "عبدالرحمن العوسي", server: "https://server6.mp3quran.net/rwsi/", availableSurahs: allSurahs },
  { id: 20, name: "بندر بليلة", server: "https://server12.mp3quran.net/balilah/", availableSurahs: allSurahs },
  { id: 21, name: "ماجد الزامل", server: "https://server10.mp3quran.net/zamil/", availableSurahs: allSurahs },
  { id: 22, name: "مصطفى إسماعيل", server: "https://server8.mp3quran.net/mustafa/", availableSurahs: allSurahs },
  { id: 23, name: "محمد صديق المنشاوي", server: "https://server10.mp3quran.net/minsh/", availableSurahs: allSurahs },
  { id: 24, name: "عبدالله المطرود", server: "https://server8.mp3quran.net/mtrod/", availableSurahs: allSurahs },
  { id: 25, name: "يوسف الشويعي", server: "https://server6.mp3quran.net/shwai/", availableSurahs: allSurahs },
  { id: 26, name: "عبدالله بصفر", server: "https://server13.mp3quran.net/bsfr/", availableSurahs: allSurahs },
  { id: 27, name: "توفيق الصائغ", server: "https://server11.mp3quran.net/twfeeq/", availableSurahs: allSurahs },
  { id: 28, name: "محمد الطبلاوي", server: "https://server8.mp3quran.net/tblawi/", availableSurahs: allSurahs },
  { id: 29, name: "عبدالباري الثبيتي", server: "https://server7.mp3quran.net/thubti/", availableSurahs: allSurahs },
  { id: 30, name: "ماهر شخاشيرو", server: "https://server12.mp3quran.net/maher_sh/", availableSurahs: allSurahs },
  { id: 31, name: "عبدالمحسن القاسم", server: "https://server6.mp3quran.net/qasm/", availableSurahs: allSurahs },
  { id: 32, name: "أحمد نعينع", server: "https://server8.mp3quran.net/na3ena3/", availableSurahs: allSurahs },
  { id: 33, name: "محمد جبريل", server: "https://server8.mp3quran.net/jbrl/", availableSurahs: allSurahs },
  { id: 34, name: "عبدالله خياط", server: "https://server6.mp3quran.net/khyat/", availableSurahs: allSurahs },
  { id: 35, name: "إبراهيم الأخضر", server: "https://server8.mp3quran.net/akhdr/", availableSurahs: allSurahs },
  // قراء إضافيون
  { id: 36, name: "ياسين الجزائري", server: "https://server6.mp3quran.net/yassin/", availableSurahs: allSurahs },
  { id: 37, name: "علي جابر", server: "https://server11.mp3quran.net/a_jbr/", availableSurahs: allSurahs },
  { id: 38, name: "محمد المحيسني", server: "https://server10.mp3quran.net/mohaisny/", availableSurahs: allSurahs },
  { id: 39, name: "عبدالولي الأركاني", server: "https://server6.mp3quran.net/arkani/", availableSurahs: allSurahs },
  { id: 40, name: "صلاح بوخاطر", server: "https://server6.mp3quran.net/bo_khtr/", availableSurahs: allSurahs },
  { id: 41, name: "عبدالبارئ محمد", server: "https://server6.mp3quran.net/abarym/", availableSurahs: allSurahs },
  { id: 42, name: "محمود علي البنا", server: "https://server8.mp3quran.net/bna/", availableSurahs: allSurahs },
  { id: 43, name: "عماد زهير حافظ", server: "https://server8.mp3quran.net/imad/", availableSurahs: allSurahs },
  { id: 44, name: "وديع اليمني", server: "https://server6.mp3quran.net/wdee3/", availableSurahs: allSurahs },
  { id: 45, name: "نعمة الحسان", server: "https://server8.mp3quran.net/ne3ma/", availableSurahs: allSurahs },
];

export function getSurahUrl(server: string, surahNumber: number): string {
  return `${server}${String(surahNumber).padStart(3, '0')}.mp3`;
}
