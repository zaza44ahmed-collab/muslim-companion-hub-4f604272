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
    id: "khamis",
    name: "عثمان الخميس",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png",
    specialty: "العقيدة والتاريخ الإسلامي",
    lectures: [
      { id: "k1", scholar: "عثمان الخميس", title: "قصة بداية الخلق", audioUrl: "https://download.quran.islamway.net/quran3/1/001.mp3", image: "", category: "قصص", duration: "45:00" },
      { id: "k2", scholar: "عثمان الخميس", title: "صفات المنافقين", audioUrl: "https://download.quran.islamway.net/quran3/1/002.mp3", image: "", category: "عقيدة", duration: "38:00" },
    ],
  },
  {
    id: "hassan",
    name: "محمد حسان",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png",
    specialty: "الدعوة والتزكية",
    lectures: [
      { id: "h1", scholar: "محمد حسان", title: "التوبة النصوح", audioUrl: "https://download.quran.islamway.net/quran3/1/003.mp3", image: "", category: "تزكية", duration: "52:00" },
      { id: "h2", scholar: "محمد حسان", title: "أهوال يوم القيامة", audioUrl: "https://download.quran.islamway.net/quran3/1/004.mp3", image: "", category: "رقائق", duration: "48:00" },
    ],
  },
  {
    id: "arifi",
    name: "محمد العريفي",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png",
    specialty: "السيرة النبوية",
    lectures: [
      { id: "a1", scholar: "محمد العريفي", title: "نهاية العالم", audioUrl: "https://download.quran.islamway.net/quran3/1/005.mp3", image: "", category: "رقائق", duration: "55:00" },
      { id: "a2", scholar: "محمد العريفي", title: "قصص الأنبياء - آدم عليه السلام", audioUrl: "https://download.quran.islamway.net/quran3/1/006.mp3", image: "", category: "قصص", duration: "42:00" },
    ],
  },
  {
    id: "awadi",
    name: "نبيل العوضي",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png",
    specialty: "قصص القرآن",
    lectures: [
      { id: "w1", scholar: "نبيل العوضي", title: "قصة أصحاب الكهف", audioUrl: "https://download.quran.islamway.net/quran3/1/018.mp3", image: "", category: "قصص", duration: "60:00" },
      { id: "w2", scholar: "نبيل العوضي", title: "قصة يوسف عليه السلام", audioUrl: "https://download.quran.islamway.net/quran3/1/012.mp3", image: "", category: "قصص", duration: "65:00" },
    ],
  },
  {
    id: "mughamsi",
    name: "صالح المغامسي",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png",
    specialty: "التفسير والفقه",
    lectures: [
      { id: "m1", scholar: "صالح المغامسي", title: "تأملات في سورة الكهف", audioUrl: "https://download.quran.islamway.net/quran3/1/018.mp3", image: "", category: "تفسير", duration: "50:00" },
      { id: "m2", scholar: "صالح المغامسي", title: "الثبات على الدين", audioUrl: "https://download.quran.islamway.net/quran3/1/019.mp3", image: "", category: "تزكية", duration: "44:00" },
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
