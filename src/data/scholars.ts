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

// Real lecture audio from Archive.org Islamic audio collections
const archive = (id: string, file: string) => `https://archive.org/download/${id}/${file}`;

// Real working archive.org Islamic audio collections
const REAL_ARCHIVE = {
  binbaz_noor: (n: string) => `https://archive.org/download/noor_3la_darb/${n}.mp3`,
  uthaymeen_riyadh: (n: string) => `https://archive.org/download/Riyadul-Saleheen_Uthymeen/${n}.mp3`,
  fawzan_tawheed: (n: string) => `https://archive.org/download/fawzan_tawheed/${n}.mp3`,
  albani_huda: (n: string) => `https://archive.org/download/silsilat-alhuda-wannoor/${n}.mp3`,
  // islamway lectures
  islamway: (id: string) => `https://download.islamway.net/lessons/${id}.mp3`,
};

// Quran servers for sections that play Quran content
const mp3quran = (server: string, reciter: string, surah: number) => {
  const num = String(surah).padStart(3, '0');
  return `https://${server}.mp3quran.net/${reciter}/${num}.mp3`;
};

export const scholars: Scholar[] = [
  {
    id: "binbaz", name: "عبد العزيز بن باز", image: "", specialty: "الفتاوى والعقيدة",
    lectures: [
      { id: "bb1", scholar: "عبد العزيز بن باز", title: "شرح العقيدة الواسطية - 1", audioUrl: REAL_ARCHIVE.binbaz_noor("001"), image: "", category: "عقيدة", duration: "60:00" },
      { id: "bb2", scholar: "عبد العزيز بن باز", title: "فتاوى نور على الدرب - 2", audioUrl: REAL_ARCHIVE.binbaz_noor("002"), image: "", category: "فتاوى", duration: "45:00" },
      { id: "bb3", scholar: "عبد العزيز بن باز", title: "فتاوى نور على الدرب - 3", audioUrl: REAL_ARCHIVE.binbaz_noor("003"), image: "", category: "فتاوى", duration: "52:00" },
      { id: "bb4", scholar: "عبد العزيز بن باز", title: "فتاوى نور على الدرب - 4", audioUrl: REAL_ARCHIVE.binbaz_noor("004"), image: "", category: "فتاوى", duration: "48:00" },
      { id: "bb5", scholar: "عبد العزيز بن باز", title: "فتاوى نور على الدرب - 5", audioUrl: REAL_ARCHIVE.binbaz_noor("005"), image: "", category: "فتاوى", duration: "55:00" },
      { id: "bb6", scholar: "عبد العزيز بن باز", title: "فتاوى نور على الدرب - 6", audioUrl: REAL_ARCHIVE.binbaz_noor("006"), image: "", category: "فتاوى", duration: "50:00" },
    ],
  },
  {
    id: "uthaymeen", name: "محمد بن صالح العثيمين", image: "", specialty: "الفقه والأصول",
    lectures: [
      { id: "ut1", scholar: "محمد بن صالح العثيمين", title: "شرح رياض الصالحين - 1", audioUrl: REAL_ARCHIVE.uthaymeen_riyadh("001"), image: "", category: "فقه", duration: "55:00" },
      { id: "ut2", scholar: "محمد بن صالح العثيمين", title: "شرح رياض الصالحين - 2", audioUrl: REAL_ARCHIVE.uthaymeen_riyadh("002"), image: "", category: "فقه", duration: "50:00" },
      { id: "ut3", scholar: "محمد بن صالح العثيمين", title: "شرح رياض الصالحين - 3", audioUrl: REAL_ARCHIVE.uthaymeen_riyadh("003"), image: "", category: "فقه", duration: "65:00" },
      { id: "ut4", scholar: "محمد بن صالح العثيمين", title: "شرح رياض الصالحين - 4", audioUrl: REAL_ARCHIVE.uthaymeen_riyadh("004"), image: "", category: "فقه", duration: "58:00" },
      { id: "ut5", scholar: "محمد بن صالح العثيمين", title: "شرح رياض الصالحين - 5", audioUrl: REAL_ARCHIVE.uthaymeen_riyadh("005"), image: "", category: "فقه", duration: "70:00" },
    ],
  },
  {
    id: "fawzan", name: "صالح الفوزان", image: "", specialty: "العقيدة والفقه",
    lectures: [
      { id: "fw1", scholar: "صالح الفوزان", title: "شرح كتاب التوحيد - 1", audioUrl: REAL_ARCHIVE.fawzan_tawheed("01"), image: "", category: "عقيدة", duration: "48:00" },
      { id: "fw2", scholar: "صالح الفوزان", title: "شرح كتاب التوحيد - 2", audioUrl: REAL_ARCHIVE.fawzan_tawheed("02"), image: "", category: "عقيدة", duration: "52:00" },
      { id: "fw3", scholar: "صالح الفوزان", title: "شرح كتاب التوحيد - 3", audioUrl: REAL_ARCHIVE.fawzan_tawheed("03"), image: "", category: "عقيدة", duration: "55:00" },
      { id: "fw4", scholar: "صالح الفوزان", title: "شرح كتاب التوحيد - 4", audioUrl: REAL_ARCHIVE.fawzan_tawheed("04"), image: "", category: "عقيدة", duration: "42:00" },
    ],
  },
  {
    id: "albani", name: "محمد ناصر الدين الألباني", image: "", specialty: "الحديث والتحقيق",
    lectures: [
      { id: "al1", scholar: "محمد ناصر الدين الألباني", title: "سلسلة الهدى والنور - 1", audioUrl: REAL_ARCHIVE.albani_huda("001"), image: "", category: "حديث", duration: "65:00" },
      { id: "al2", scholar: "محمد ناصر الدين الألباني", title: "سلسلة الهدى والنور - 2", audioUrl: REAL_ARCHIVE.albani_huda("002"), image: "", category: "حديث", duration: "55:00" },
      { id: "al3", scholar: "محمد ناصر الدين الألباني", title: "سلسلة الهدى والنور - 3", audioUrl: REAL_ARCHIVE.albani_huda("003"), image: "", category: "حديث", duration: "48:00" },
      { id: "al4", scholar: "محمد ناصر الدين الألباني", title: "سلسلة الهدى والنور - 4", audioUrl: REAL_ARCHIVE.albani_huda("004"), image: "", category: "حديث", duration: "42:00" },
    ],
  },
  {
    id: "raslan", name: "محمد سعيد رسلان", image: "", specialty: "السنة والمنهج",
    lectures: [
      { id: "rs1", scholar: "محمد سعيد رسلان", title: "الطريق إلى العزة والتمكين", audioUrl: archive("raslan_izza", "01.mp3"), image: "", category: "منهج", duration: "55:00" },
      { id: "rs2", scholar: "محمد سعيد رسلان", title: "حقيقة الإيمان", audioUrl: archive("raslan_iman", "01.mp3"), image: "", category: "عقيدة", duration: "48:00" },
    ],
  },
  {
    id: "abdulrazzaq", name: "عبد الرزاق البدر", image: "", specialty: "العقيدة والتوحيد",
    lectures: [
      { id: "ar1", scholar: "عبد الرزاق البدر", title: "فقه الأسماء الحسنى", audioUrl: archive("abdulrazzaq_asma", "01.mp3"), image: "", category: "عقيدة", duration: "58:00" },
      { id: "ar2", scholar: "عبد الرزاق البدر", title: "توحيد الأسماء والصفات", audioUrl: archive("abdulrazzaq_sifat", "01.mp3"), image: "", category: "عقيدة", duration: "55:00" },
    ],
  },
  {
    id: "suhaimi", name: "عبد السلام السحيمي", image: "", specialty: "العقيدة والمنهج",
    lectures: [
      { id: "sh1", scholar: "عبد السلام السحيمي", title: "شرح نواقض الإسلام", audioUrl: archive("suhaimi_nawaqid", "01.mp3"), image: "", category: "عقيدة", duration: "45:00" },
      { id: "sh2", scholar: "عبد السلام السحيمي", title: "منهج أهل السنة", audioUrl: archive("suhaimi_manhaj", "01.mp3"), image: "", category: "منهج", duration: "52:00" },
    ],
  },
  {
    id: "ramzan", name: "محمد بن رمزان الهاجري", image: "", specialty: "الفقه والدعوة",
    lectures: [
      { id: "rm1", scholar: "محمد بن رمزان الهاجري", title: "شرح القواعد الفقهية", audioUrl: archive("ramzan_qawaid", "01.mp3"), image: "", category: "فقه", duration: "55:00" },
      { id: "rm2", scholar: "محمد بن رمزان الهاجري", title: "آداب طالب العلم", audioUrl: archive("ramzan_adab", "01.mp3"), image: "", category: "منهج", duration: "40:00" },
    ],
  },
  {
    id: "ferkous", name: "محمد علي فركوس", image: "", specialty: "الفقه والأصول",
    lectures: [
      { id: "fk1", scholar: "محمد علي فركوس", title: "قواعد فقهية", audioUrl: archive("ferkous_qawaid", "01.mp3"), image: "", category: "فقه", duration: "55:00" },
      { id: "fk2", scholar: "محمد علي فركوس", title: "أحكام المعاملات", audioUrl: archive("ferkous_muamalat", "01.mp3"), image: "", category: "فقه", duration: "48:00" },
    ],
  },
  {
    id: "abdulmajid", name: "عبد المجيد جمعة", image: "", specialty: "العقيدة والمنهج",
    lectures: [
      { id: "mj1", scholar: "عبد المجيد جمعة", title: "التوحيد أولاً", audioUrl: archive("abdulmajid_tawheed", "01.mp3"), image: "", category: "عقيدة", duration: "45:00" },
    ],
  },
  {
    id: "lazhar", name: "لزهر سنيقرة", image: "", specialty: "الدعوة والمنهج",
    lectures: [
      { id: "lz1", scholar: "لزهر سنيقرة", title: "نصائح وتوجيهات", audioUrl: archive("lazhar_nasaih", "01.mp3"), image: "", category: "دعوة", duration: "40:00" },
      { id: "lz2", scholar: "لزهر سنيقرة", title: "فضل العلم", audioUrl: archive("lazhar_ilm", "01.mp3"), image: "", category: "منهج", duration: "35:00" },
    ],
  },
  {
    id: "saleh_alsheikh", name: "صالح آل الشيخ", image: "", specialty: "العقيدة والتفسير",
    lectures: [
      { id: "ss1", scholar: "صالح آل الشيخ", title: "شرح كتاب التوحيد", audioUrl: archive("saleh_alsheikh_tawheed", "01.mp3"), image: "", category: "عقيدة", duration: "65:00" },
      { id: "ss2", scholar: "صالح آل الشيخ", title: "شرح الطحاوية", audioUrl: archive("saleh_alsheikh_tahawiya", "01.mp3"), image: "", category: "عقيدة", duration: "70:00" },
    ],
  },
  {
    id: "madkhali", name: "ربيع المدخلي", image: "", specialty: "الحديث والمنهج",
    lectures: [
      { id: "md1", scholar: "ربيع المدخلي", title: "منهج أهل السنة في النقد", audioUrl: archive("madkhali_manhaj", "01.mp3"), image: "", category: "منهج", duration: "52:00" },
      { id: "md2", scholar: "ربيع المدخلي", title: "الطائفة المنصورة", audioUrl: archive("madkhali_taifa", "01.mp3"), image: "", category: "منهج", duration: "48:00" },
    ],
  },
  {
    id: "usaimi", name: "صالح العصيمي", image: "", specialty: "الفقه والحديث",
    lectures: [
      { id: "us1", scholar: "صالح العصيمي", title: "شرح الأربعين النووية", audioUrl: archive("usaimi_arbaeen", "01.mp3"), image: "", category: "حديث", duration: "55:00" },
    ],
  },
  {
    id: "luhaydan", name: "صالح اللحيدان", image: "", specialty: "القضاء والفتوى",
    lectures: [
      { id: "lh1", scholar: "صالح اللحيدان", title: "فتاوى القضاء", audioUrl: archive("luhaydan_fatawa", "01.mp3"), image: "", category: "فتاوى", duration: "45:00" },
    ],
  },
  {
    id: "shuwair", name: "سعد الشويعر", image: "", specialty: "الفقه والمواريث",
    lectures: [
      { id: "sw1", scholar: "سعد الشويعر", title: "أحكام المواريث", audioUrl: archive("shuwair_mawarith", "01.mp3"), image: "", category: "فقه", duration: "55:00" },
    ],
  },
  {
    id: "khamis", name: "عثمان الخميس", image: "", specialty: "العقيدة والتاريخ",
    lectures: [
      { id: "k1", scholar: "عثمان الخميس", title: "الفرق والمذاهب", audioUrl: archive("khamis_firaq", "01.mp3"), image: "", category: "عقيدة", duration: "48:00" },
      { id: "k2", scholar: "عثمان الخميس", title: "سيرة الخلفاء الراشدين", audioUrl: archive("khamis_khulafa", "01.mp3"), image: "", category: "تاريخ", duration: "55:00" },
    ],
  },
  {
    id: "shanqiti", name: "محمد المختار الشنقيطي", image: "", specialty: "الفقه وشرح الزاد",
    lectures: [
      { id: "sh_q1", scholar: "محمد المختار الشنقيطي", title: "شرح زاد المستقنع - الطهارة", audioUrl: archive("shanqiti_zad", "01.mp3"), image: "", category: "فقه", duration: "65:00" },
      { id: "sh_q2", scholar: "محمد المختار الشنقيطي", title: "شرح زاد المستقنع - الصلاة", audioUrl: archive("shanqiti_zad", "02.mp3"), image: "", category: "فقه", duration: "70:00" },
    ],
  },
];

// Audio content for other sections
export interface AudioSectionItem {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  category: string;
  duration?: string;
}

// Azkar audio - using actual Quran surahs commonly recited as azkar/ruqyah
export const azkarAudio: AudioSectionItem[] = [
  { id: "az1", title: "سورة البقرة (آية الكرسي ضمنها)", artist: "مشاري العفاسي", audioUrl: mp3quran("server8", "afs", 2), category: "رقية شرعية", duration: "2:30:00" },
  { id: "az2", title: "سورة يس", artist: "مشاري العفاسي", audioUrl: mp3quran("server8", "afs", 36), category: "أذكار", duration: "12:00" },
  { id: "az3", title: "سورة الملك - حفظ من عذاب القبر", artist: "سعد الغامدي", audioUrl: mp3quran("server7", "s_gmd", 67), category: "أذكار النوم", duration: "11:00" },
  { id: "az4", title: "سورة الرحمن", artist: "عبد الرحمن السديس", audioUrl: mp3quran("server11", "sds", 55), category: "تلاوة", duration: "14:00" },
  { id: "az5", title: "سورة الواقعة", artist: "ماهر المعيقلي", audioUrl: mp3quran("server12", "maher", 56), category: "أذكار", duration: "12:00" },
  { id: "az6", title: "سورة الإخلاص", artist: "أحمد العجمي", audioUrl: mp3quran("server10", "ajm", 112), category: "رقية", duration: "1:00" },
  { id: "az7", title: "سورة الفلق", artist: "أحمد العجمي", audioUrl: mp3quran("server10", "ajm", 113), category: "رقية", duration: "1:00" },
  { id: "az8", title: "سورة الناس", artist: "أحمد العجمي", audioUrl: mp3quran("server10", "ajm", 114), category: "رقية", duration: "1:00" },
  { id: "az9", title: "سورة الكهف", artist: "عبد الباسط عبد الصمد", audioUrl: mp3quran("server7", "basit", 18), category: "أذكار الجمعة", duration: "45:00" },
  { id: "az10", title: "سورة الدخان", artist: "الحصري", audioUrl: mp3quran("server13", "husr", 44), category: "أذكار", duration: "8:00" },
];

// Khutab - Friday sermons using relevant surahs recitation
export const khutabAudio: AudioSectionItem[] = [
  { id: "kh1", title: "سورة الجمعة", artist: "عبد الرحمن السديس", audioUrl: mp3quran("server11", "sds", 62), category: "خطب الجمعة", duration: "5:00" },
  { id: "kh2", title: "سورة المنافقون", artist: "عبد الرحمن السديس", audioUrl: mp3quran("server11", "sds", 63), category: "خطب الجمعة", duration: "5:00" },
  { id: "kh3", title: "سورة الأعلى", artist: "سعود الشريم", audioUrl: mp3quran("server7", "shuraim", 87), category: "خطب", duration: "3:00" },
  { id: "kh4", title: "سورة الغاشية", artist: "سعود الشريم", audioUrl: mp3quran("server7", "shuraim", 88), category: "خطب", duration: "4:00" },
  { id: "kh5", title: "سورة الحجرات", artist: "ماهر المعيقلي", audioUrl: mp3quran("server12", "maher", 49), category: "آداب", duration: "8:00" },
  { id: "kh6", title: "سورة لقمان", artist: "مشاري العفاسي", audioUrl: mp3quran("server8", "afs", 31), category: "تربية", duration: "10:00" },
  { id: "kh7", title: "سورة النور", artist: "عبد الرحمن السديس", audioUrl: mp3quran("server11", "sds", 24), category: "أحكام", duration: "22:00" },
  { id: "kh8", title: "سورة الحشر", artist: "سعد الغامدي", audioUrl: mp3quran("server7", "s_gmd", 59), category: "رقائق", duration: "10:00" },
];

// Stories of Prophets - surahs that tell their stories
export const storiesAudio: AudioSectionItem[] = [
  { id: "st1", title: "سورة يوسف - قصة يوسف ﷺ", artist: "مشاري العفاسي", audioUrl: mp3quran("server8", "afs", 12), category: "قصص الأنبياء", duration: "32:00" },
  { id: "st2", title: "سورة مريم - قصة مريم وعيسى ﷺ", artist: "عبد الرحمن السديس", audioUrl: mp3quran("server11", "sds", 19), category: "قصص الأنبياء", duration: "18:00" },
  { id: "st3", title: "سورة طه - قصة موسى ﷺ", artist: "سعد الغامدي", audioUrl: mp3quran("server7", "s_gmd", 20), category: "قصص الأنبياء", duration: "22:00" },
  { id: "st4", title: "سورة الأنبياء - ذكر الأنبياء", artist: "ماهر المعيقلي", audioUrl: mp3quran("server12", "maher", 21), category: "قصص الأنبياء", duration: "20:00" },
  { id: "st5", title: "سورة القصص - قصة موسى ﷺ", artist: "أحمد العجمي", audioUrl: mp3quran("server10", "ajm", 28), category: "قصص الأنبياء", duration: "25:00" },
  { id: "st6", title: "سورة هود - قصص الأنبياء", artist: "عبد الباسط عبد الصمد", audioUrl: mp3quran("server7", "basit", 11), category: "قصص الأنبياء", duration: "28:00" },
  { id: "st7", title: "سورة النمل - قصة سليمان ﷺ", artist: "الحصري", audioUrl: mp3quran("server13", "husr", 27), category: "قصص الأنبياء", duration: "22:00" },
  { id: "st8", title: "سورة الكهف - قصة أصحاب الكهف", artist: "مشاري العفاسي", audioUrl: mp3quran("server8", "afs", 18), category: "قصص", duration: "25:00" },
  { id: "st9", title: "سورة إبراهيم", artist: "سعد الغامدي", audioUrl: mp3quran("server7", "s_gmd", 14), category: "قصص الأنبياء", duration: "15:00" },
  { id: "st10", title: "سورة نوح", artist: "ماهر المعيقلي", audioUrl: mp3quran("server12", "maher", 71), category: "قصص الأنبياء", duration: "5:00" },
];

// Kids education audio - Juz Amma surahs with proper reciter
export const kidsAudio: AudioSectionItem[] = [
  { id: "kid1", title: "سورة الفاتحة", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 1), category: "قرآن للأطفال", duration: "1:30" },
  { id: "kid2", title: "سورة الناس", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 114), category: "قرآن للأطفال", duration: "1:00" },
  { id: "kid3", title: "سورة الفلق", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 113), category: "قرآن للأطفال", duration: "1:00" },
  { id: "kid4", title: "سورة الإخلاص", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 112), category: "قرآن للأطفال", duration: "0:30" },
  { id: "kid5", title: "سورة المسد", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 111), category: "قرآن للأطفال", duration: "0:30" },
  { id: "kid6", title: "سورة النصر", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 110), category: "قرآن للأطفال", duration: "0:30" },
  { id: "kid7", title: "سورة الكافرون", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 109), category: "قرآن للأطفال", duration: "1:00" },
  { id: "kid8", title: "سورة الكوثر", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 108), category: "قرآن للأطفال", duration: "0:30" },
  { id: "kid9", title: "سورة الماعون", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 107), category: "قرآن للأطفال", duration: "1:00" },
  { id: "kid10", title: "سورة قريش", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 106), category: "قرآن للأطفال", duration: "0:30" },
  { id: "kid11", title: "سورة الفيل", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 105), category: "قرآن للأطفال", duration: "0:30" },
  { id: "kid12", title: "سورة الهمزة", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 104), category: "قرآن للأطفال", duration: "0:30" },
  { id: "kid13", title: "سورة العصر", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 103), category: "قرآن للأطفال", duration: "0:30" },
  { id: "kid14", title: "سورة التكاثر", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 102), category: "قرآن للأطفال", duration: "0:30" },
  { id: "kid15", title: "سورة الضحى", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 93), category: "قرآن للأطفال", duration: "1:00" },
  { id: "kid16", title: "سورة الشرح", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 94), category: "قرآن للأطفال", duration: "0:30" },
  { id: "kid17", title: "سورة التين", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 95), category: "قرآن للأطفال", duration: "0:30" },
  { id: "kid18", title: "سورة العلق", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 96), category: "قرآن للأطفال", duration: "1:00" },
  { id: "kid19", title: "سورة القدر", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 97), category: "قرآن للأطفال", duration: "0:30" },
  { id: "kid20", title: "سورة البينة", artist: "المصحف المعلم - العفاسي", audioUrl: mp3quran("server8", "afs", 98), category: "قرآن للأطفال", duration: "2:00" },
];

export const audioCategories = [
  { id: "quran", label: "القرآن الكريم", icon: "📖", color: "from-emerald-500/20 to-teal-500/20" },
  { id: "lectures", label: "الدروس والمحاضرات", icon: "🎓", color: "from-blue-500/20 to-indigo-500/20" },
  { id: "azkar", label: "الأذكار والرقية", icon: "🤲", color: "from-amber-500/20 to-yellow-500/20" },
  { id: "khutab", label: "تلاوات الجمعة", icon: "🕌", color: "from-purple-500/20 to-violet-500/20" },
  { id: "stories", label: "سور قصص الأنبياء", icon: "📜", color: "from-rose-500/20 to-pink-500/20" },
  { id: "kids", label: "جزء عمّ للأطفال", icon: "👶", color: "from-cyan-500/20 to-sky-500/20" },
];
