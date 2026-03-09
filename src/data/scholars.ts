export interface ScholarLecture {
  id: string;
  scholar: string;
  title: string;
  audioUrl: string;
  image: string;
  category: string;
  duration?: string;
}

export interface Scholar {
  id: string;
  name: string;
  image: string;
  specialty: string;
  lectures: ScholarLecture[];
}

export const scholars: Scholar[] = [
  {
    id: "khamis", name: "عثمان الخميس", image: "", specialty: "العقيدة والتاريخ الإسلامي",
    lectures: [
      { id: "k1", scholar: "عثمان الخميس", title: "قصة بداية الخلق", audioUrl: "https://download.quran.islamway.net/quran3/1/001.mp3", image: "", category: "قصص", duration: "45:00" },
      { id: "k2", scholar: "عثمان الخميس", title: "صفات المنافقين", audioUrl: "https://download.quran.islamway.net/quran3/1/002.mp3", image: "", category: "عقيدة", duration: "38:00" },
      { id: "k3", scholar: "عثمان الخميس", title: "التوحيد وأنواعه", audioUrl: "https://download.quran.islamway.net/quran3/1/003.mp3", image: "", category: "عقيدة", duration: "42:00" },
      { id: "k4", scholar: "عثمان الخميس", title: "الرد على الشبهات", audioUrl: "https://download.quran.islamway.net/quran3/1/004.mp3", image: "", category: "عقيدة", duration: "50:00" },
    ],
  },
  {
    id: "hassan", name: "محمد حسان", image: "", specialty: "الدعوة والتزكية",
    lectures: [
      { id: "h1", scholar: "محمد حسان", title: "التوبة النصوح", audioUrl: "https://download.quran.islamway.net/quran3/1/003.mp3", image: "", category: "تزكية", duration: "52:00" },
      { id: "h2", scholar: "محمد حسان", title: "أهوال يوم القيامة", audioUrl: "https://download.quran.islamway.net/quran3/1/004.mp3", image: "", category: "رقائق", duration: "48:00" },
      { id: "h3", scholar: "محمد حسان", title: "حقيقة الدنيا", audioUrl: "https://download.quran.islamway.net/quran3/1/005.mp3", image: "", category: "رقائق", duration: "55:00" },
      { id: "h4", scholar: "محمد حسان", title: "فضل الصدقة", audioUrl: "https://download.quran.islamway.net/quran3/1/006.mp3", image: "", category: "تزكية", duration: "40:00" },
    ],
  },
  {
    id: "arifi", name: "محمد العريفي", image: "", specialty: "السيرة النبوية",
    lectures: [
      { id: "a1", scholar: "محمد العريفي", title: "نهاية العالم", audioUrl: "https://download.quran.islamway.net/quran3/1/005.mp3", image: "", category: "رقائق", duration: "55:00" },
      { id: "a2", scholar: "محمد العريفي", title: "قصص الأنبياء - آدم عليه السلام", audioUrl: "https://download.quran.islamway.net/quran3/1/006.mp3", image: "", category: "قصص", duration: "42:00" },
      { id: "a3", scholar: "محمد العريفي", title: "السيرة النبوية - المولد", audioUrl: "https://download.quran.islamway.net/quran3/1/007.mp3", image: "", category: "سيرة", duration: "60:00" },
      { id: "a4", scholar: "محمد العريفي", title: "غزوة بدر", audioUrl: "https://download.quran.islamway.net/quran3/1/008.mp3", image: "", category: "سيرة", duration: "58:00" },
    ],
  },
  {
    id: "awadi", name: "نبيل العوضي", image: "", specialty: "قصص القرآن",
    lectures: [
      { id: "w1", scholar: "نبيل العوضي", title: "قصة أصحاب الكهف", audioUrl: "https://download.quran.islamway.net/quran3/1/018.mp3", image: "", category: "قصص", duration: "60:00" },
      { id: "w2", scholar: "نبيل العوضي", title: "قصة يوسف عليه السلام", audioUrl: "https://download.quran.islamway.net/quran3/1/012.mp3", image: "", category: "قصص", duration: "65:00" },
      { id: "w3", scholar: "نبيل العوضي", title: "قصة موسى وفرعون", audioUrl: "https://download.quran.islamway.net/quran3/1/020.mp3", image: "", category: "قصص", duration: "70:00" },
      { id: "w4", scholar: "نبيل العوضي", title: "قصة إبراهيم عليه السلام", audioUrl: "https://download.quran.islamway.net/quran3/1/014.mp3", image: "", category: "قصص", duration: "55:00" },
    ],
  },
  {
    id: "mughamsi", name: "صالح المغامسي", image: "", specialty: "التفسير والفقه",
    lectures: [
      { id: "m1", scholar: "صالح المغامسي", title: "تأملات في سورة الكهف", audioUrl: "https://download.quran.islamway.net/quran3/1/018.mp3", image: "", category: "تفسير", duration: "50:00" },
      { id: "m2", scholar: "صالح المغامسي", title: "الثبات على الدين", audioUrl: "https://download.quran.islamway.net/quran3/1/019.mp3", image: "", category: "تزكية", duration: "44:00" },
      { id: "m3", scholar: "صالح المغامسي", title: "تفسير سورة يس", audioUrl: "https://download.quran.islamway.net/quran3/1/036.mp3", image: "", category: "تفسير", duration: "48:00" },
    ],
  },
  {
    id: "shuraim", name: "سعود الشريم", image: "", specialty: "الفقه والأحكام",
    lectures: [
      { id: "sh1", scholar: "سعود الشريم", title: "أحكام الصلاة", audioUrl: "https://download.quran.islamway.net/quran3/1/009.mp3", image: "", category: "فقه", duration: "45:00" },
      { id: "sh2", scholar: "سعود الشريم", title: "أحكام الصيام", audioUrl: "https://download.quran.islamway.net/quran3/1/010.mp3", image: "", category: "فقه", duration: "40:00" },
    ],
  },
  {
    id: "sudais", name: "عبد الرحمن السديس", image: "", specialty: "الخطب والمواعظ",
    lectures: [
      { id: "sd1", scholar: "عبد الرحمن السديس", title: "خطبة عرفة", audioUrl: "https://download.quran.islamway.net/quran3/1/011.mp3", image: "", category: "خطب", duration: "35:00" },
      { id: "sd2", scholar: "عبد الرحمن السديس", title: "وحدة الأمة", audioUrl: "https://download.quran.islamway.net/quran3/1/013.mp3", image: "", category: "خطب", duration: "30:00" },
    ],
  },
  {
    id: "hudhayfi", name: "علي الحذيفي", image: "", specialty: "القراءات والتجويد",
    lectures: [
      { id: "hu1", scholar: "علي الحذيفي", title: "أحكام التجويد", audioUrl: "https://download.quran.islamway.net/quran3/1/015.mp3", image: "", category: "تجويد", duration: "38:00" },
    ],
  },
  {
    id: "binbaz", name: "عبد العزيز بن باز", image: "", specialty: "الفتاوى والعقيدة",
    lectures: [
      { id: "bb1", scholar: "عبد العزيز بن باز", title: "شرح العقيدة الواسطية", audioUrl: "https://download.quran.islamway.net/quran3/1/016.mp3", image: "", category: "عقيدة", duration: "60:00" },
      { id: "bb2", scholar: "عبد العزيز بن باز", title: "فتاوى نور على الدرب", audioUrl: "https://download.quran.islamway.net/quran3/1/017.mp3", image: "", category: "فتاوى", duration: "45:00" },
    ],
  },
  {
    id: "uthaymeen", name: "محمد بن صالح العثيمين", image: "", specialty: "الفقه والأصول",
    lectures: [
      { id: "ut1", scholar: "محمد بن صالح العثيمين", title: "شرح رياض الصالحين", audioUrl: "https://download.quran.islamway.net/quran3/1/021.mp3", image: "", category: "فقه", duration: "55:00" },
      { id: "ut2", scholar: "محمد بن صالح العثيمين", title: "شرح الأصول الثلاثة", audioUrl: "https://download.quran.islamway.net/quran3/1/022.mp3", image: "", category: "عقيدة", duration: "50:00" },
    ],
  },
  {
    id: "fawzan", name: "صالح الفوزان", image: "", specialty: "العقيدة والفقه",
    lectures: [
      { id: "fw1", scholar: "صالح الفوزان", title: "شرح كتاب التوحيد", audioUrl: "https://download.quran.islamway.net/quran3/1/023.mp3", image: "", category: "عقيدة", duration: "48:00" },
    ],
  },
  {
    id: "tantawi", name: "محمد سيد طنطاوي", image: "", specialty: "التفسير",
    lectures: [
      { id: "tt1", scholar: "محمد سيد طنطاوي", title: "تفسير سورة البقرة", audioUrl: "https://download.quran.islamway.net/quran3/1/002.mp3", image: "", category: "تفسير", duration: "65:00" },
    ],
  },
  {
    id: "shaarawy", name: "محمد متولي الشعراوي", image: "", specialty: "التفسير والخواطر",
    lectures: [
      { id: "sw1", scholar: "محمد متولي الشعراوي", title: "خواطر إيمانية - سورة الفاتحة", audioUrl: "https://download.quran.islamway.net/quran3/1/001.mp3", image: "", category: "تفسير", duration: "70:00" },
      { id: "sw2", scholar: "محمد متولي الشعراوي", title: "معجزات القرآن", audioUrl: "https://download.quran.islamway.net/quran3/1/024.mp3", image: "", category: "تفسير", duration: "55:00" },
    ],
  },
  {
    id: "tarifi", name: "عبد العزيز الطريفي", image: "", specialty: "الحديث والأثر",
    lectures: [
      { id: "tr1", scholar: "عبد العزيز الطريفي", title: "شرح الأربعين النووية", audioUrl: "https://download.quran.islamway.net/quran3/1/025.mp3", image: "", category: "حديث", duration: "52:00" },
    ],
  },
  {
    id: "muneef", name: "محمد المنجد", image: "", specialty: "الفتاوى والأحكام",
    lectures: [
      { id: "mn1", scholar: "محمد المنجد", title: "سلسلة أعمال القلوب", audioUrl: "https://download.quran.islamway.net/quran3/1/026.mp3", image: "", category: "تزكية", duration: "42:00" },
      { id: "mn2", scholar: "محمد المنجد", title: "آداب طالب العلم", audioUrl: "https://download.quran.islamway.net/quran3/1/027.mp3", image: "", category: "تزكية", duration: "38:00" },
    ],
  },
];

export const audioCategories = [
  { id: "quran", label: "القرآن الكريم", icon: "📖", color: "from-emerald-500/20 to-teal-500/20" },
  { id: "lectures", label: "الدروس والمحاضرات", icon: "🎓", color: "from-blue-500/20 to-indigo-500/20" },
  { id: "azkar", label: "الأذكار الصوتية", icon: "🤲", color: "from-amber-500/20 to-yellow-500/20" },
  { id: "khutab", label: "خطب الجمعة", icon: "🕌", color: "from-purple-500/20 to-violet-500/20" },
  { id: "stories", label: "قصص الأنبياء", icon: "📜", color: "from-rose-500/20 to-pink-500/20" },
  { id: "kids", label: "تعليم الأطفال", icon: "👶", color: "from-cyan-500/20 to-sky-500/20" },
];
