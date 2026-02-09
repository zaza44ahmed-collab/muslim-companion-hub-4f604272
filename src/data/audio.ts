export interface AudioTrack {
  id: number;
  title: string;
  surah?: string;
  duration: string;
  durationSeconds: number;
}

export interface AudioAlbum {
  id: number;
  title: string;
  artist: string;
  description: string;
  cover: string;
  category: string;
  totalDuration: string;
  totalSize: string;
  tracksCount: number;
  downloads: string;
  rating: number;
  tracks: AudioTrack[];
}

export const audioCategories = [
  { id: "all", label: "الكل" },
  { id: "quran", label: "القرآن" },
  { id: "lectures", label: "محاضرات" },
  { id: "azkar", label: "أذكار" },
  { id: "nasheed", label: "أناشيد" },
];

export const audioAlbums: AudioAlbum[] = [
  {
    id: 1,
    title: "سورة البقرة كاملة",
    artist: "الشيخ عبد الباسط عبد الصمد",
    description: "تلاوة خاشعة ومؤثرة لسورة البقرة كاملة بصوت الشيخ عبد الباسط عبد الصمد رحمه الله، من أروع التلاوات المسجلة.",
    cover: "https://i.scdn.co/image/ab67616d0000b273c5e8c1fa45a3e8a3d0f7c1e0",
    category: "quran",
    totalDuration: "2:30:00",
    totalSize: "120 MB",
    tracksCount: 4,
    downloads: "2M+",
    rating: 4.9,
    tracks: [
      { id: 1, title: "سورة البقرة - الجزء الأول", surah: "البقرة", duration: "38:20", durationSeconds: 2300 },
      { id: 2, title: "سورة البقرة - الجزء الثاني", surah: "البقرة", duration: "36:15", durationSeconds: 2175 },
      { id: 3, title: "سورة البقرة - الجزء الثالث", surah: "البقرة", duration: "39:45", durationSeconds: 2385 },
      { id: 4, title: "سورة البقرة - الجزء الرابع", surah: "البقرة", duration: "35:40", durationSeconds: 2140 },
    ],
  },
  {
    id: 2,
    title: "أذكار الصباح والمساء",
    artist: "الشيخ مشاري راشد العفاسي",
    description: "أذكار الصباح والمساء بصوت الشيخ مشاري راشد العفاسي، تلاوة واضحة مع التكرار لسهولة الحفظ والمتابعة.",
    cover: "https://i.scdn.co/image/ab67616d0000b2733f5c3b3b3b3b3b3b3b3b3b3b",
    category: "azkar",
    totalDuration: "45:00",
    totalSize: "32 MB",
    tracksCount: 6,
    downloads: "5M+",
    rating: 5.0,
    tracks: [
      { id: 1, title: "آية الكرسي", duration: "2:30", durationSeconds: 150 },
      { id: 2, title: "أذكار الصباح", duration: "12:00", durationSeconds: 720 },
      { id: 3, title: "أذكار المساء", duration: "11:30", durationSeconds: 690 },
      { id: 4, title: "أذكار النوم", duration: "8:00", durationSeconds: 480 },
      { id: 5, title: "أذكار الاستيقاظ", duration: "5:00", durationSeconds: 300 },
      { id: 6, title: "أذكار بعد الصلاة", duration: "6:00", durationSeconds: 360 },
    ],
  },
  {
    id: 3,
    title: "خطبة عن الصبر والتوكل",
    artist: "الشيخ محمد العريفي",
    description: "خطبة مؤثرة عن الصبر على البلاء والتوكل على الله، مليئة بالقصص والعبر من السيرة النبوية.",
    cover: "https://i.scdn.co/image/ab67616d0000b2734f4f4f4f4f4f4f4f4f4f4f4f",
    category: "lectures",
    totalDuration: "45:00",
    totalSize: "35 MB",
    tracksCount: 3,
    downloads: "800K+",
    rating: 4.8,
    tracks: [
      { id: 1, title: "مقدمة - معنى الصبر", duration: "12:00", durationSeconds: 720 },
      { id: 2, title: "قصص من صبر الأنبياء", duration: "18:00", durationSeconds: 1080 },
      { id: 3, title: "ثمرات الصبر والتوكل", duration: "15:00", durationSeconds: 900 },
    ],
  },
  {
    id: 4,
    title: "سورة يس - تلاوة خاشعة",
    artist: "الشيخ ماهر المعيقلي",
    description: "تلاوة خاشعة ومرتلة لسورة يس بصوت الشيخ ماهر المعيقلي، إمام المسجد الحرام.",
    cover: "https://i.scdn.co/image/ab67616d0000b2735a5a5a5a5a5a5a5a5a5a5a5a",
    category: "quran",
    totalDuration: "12:00",
    totalSize: "8 MB",
    tracksCount: 1,
    downloads: "3M+",
    rating: 4.9,
    tracks: [
      { id: 1, title: "سورة يس كاملة", surah: "يس", duration: "12:00", durationSeconds: 720 },
    ],
  },
  {
    id: 5,
    title: "الرقية الشرعية الكاملة",
    artist: "الشيخ سعود الشريم",
    description: "الرقية الشرعية الكاملة من القرآن الكريم والسنة النبوية بصوت الشيخ سعود الشريم.",
    cover: "https://i.scdn.co/image/ab67616d0000b2736b6b6b6b6b6b6b6b6b6b6b6b",
    category: "quran",
    totalDuration: "55:00",
    totalSize: "40 MB",
    tracksCount: 5,
    downloads: "4M+",
    rating: 4.9,
    tracks: [
      { id: 1, title: "سورة الفاتحة مكررة", surah: "الفاتحة", duration: "8:00", durationSeconds: 480 },
      { id: 2, title: "آية الكرسي مكررة", duration: "10:00", durationSeconds: 600 },
      { id: 3, title: "سورة الإخلاص والمعوذتين", surah: "الإخلاص", duration: "12:00", durationSeconds: 720 },
      { id: 4, title: "آيات الرقية من البقرة", surah: "البقرة", duration: "15:00", durationSeconds: 900 },
      { id: 5, title: "أدعية الرقية النبوية", duration: "10:00", durationSeconds: 600 },
    ],
  },
  {
    id: 6,
    title: "طلع البدر علينا",
    artist: "أناشيد إسلامية",
    description: "مجموعة من أجمل الأناشيد الإسلامية بدون موسيقى، تشمل أناشيد في مدح النبي صلى الله عليه وسلم.",
    cover: "https://i.scdn.co/image/ab67616d0000b2737c7c7c7c7c7c7c7c7c7c7c7c",
    category: "nasheed",
    totalDuration: "35:00",
    totalSize: "25 MB",
    tracksCount: 4,
    downloads: "1M+",
    rating: 4.7,
    tracks: [
      { id: 1, title: "طلع البدر علينا", duration: "8:00", durationSeconds: 480 },
      { id: 2, title: "ماهر زين - إن شاء الله", duration: "9:00", durationSeconds: 540 },
      { id: 3, title: "يا نبي سلام عليك", duration: "10:00", durationSeconds: 600 },
      { id: 4, title: "تعلمنا يا رسول الله", duration: "8:00", durationSeconds: 480 },
    ],
  },
];
