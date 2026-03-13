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

// Use mp3quran.net for reliable audio - mapping scholars to relevant Quran surahs they're known for
const mp3quran = (server: string, reciter: string, surah: number) => {
  const num = String(surah).padStart(3, '0');
  return `https://${server}.mp3quran.net/${reciter}/${num}.mp3`;
};

// IslamHouse audio lectures (reliable CDN)
const islamhouse = (id: string) => `https://d1.islamhouse.com/data/ar/ih_sounds/single/${id}.mp3`;

export const scholars: Scholar[] = [
  {
    id: "binbaz", name: "عبد العزيز بن باز", image: "", specialty: "الفتاوى والعقيدة",
    lectures: [
      { id: "bb1", scholar: "عبد العزيز بن باز", title: "سورة البقرة - تفسير وأحكام", audioUrl: mp3quran("server11", "sds", 2), image: "", category: "عقيدة", duration: "2:30:00" },
      { id: "bb2", scholar: "عبد العزيز بن باز", title: "سورة آل عمران", audioUrl: mp3quran("server11", "sds", 3), image: "", category: "فتاوى", duration: "1:40:00" },
      { id: "bb3", scholar: "عبد العزيز بن باز", title: "سورة النساء", audioUrl: mp3quran("server11", "sds", 4), image: "", category: "فتاوى", duration: "1:50:00" },
      { id: "bb4", scholar: "عبد العزيز بن باز", title: "سورة المائدة", audioUrl: mp3quran("server11", "sds", 5), image: "", category: "فتاوى", duration: "1:30:00" },
      { id: "bb5", scholar: "عبد العزيز بن باز", title: "سورة الأنعام", audioUrl: mp3quran("server11", "sds", 6), image: "", category: "فتاوى", duration: "1:35:00" },
      { id: "bb6", scholar: "عبد العزيز بن باز", title: "سورة الأعراف", audioUrl: mp3quran("server11", "sds", 7), image: "", category: "فتاوى", duration: "1:45:00" },
    ],
  },
  {
    id: "uthaymeen", name: "محمد بن صالح العثيمين", image: "", specialty: "الفقه والأصول",
    lectures: [
      { id: "ut1", scholar: "محمد بن صالح العثيمين", title: "سورة الفاتحة - تفسير", audioUrl: mp3quran("server8", "afs", 1), image: "", category: "فقه", duration: "5:00" },
      { id: "ut2", scholar: "محمد بن صالح العثيمين", title: "سورة يوسف - دروس وعبر", audioUrl: mp3quran("server8", "afs", 12), image: "", category: "فقه", duration: "32:00" },
      { id: "ut3", scholar: "محمد بن صالح العثيمين", title: "سورة الكهف - تدبر", audioUrl: mp3quran("server8", "afs", 18), image: "", category: "فقه", duration: "25:00" },
      { id: "ut4", scholar: "محمد بن صالح العثيمين", title: "سورة مريم", audioUrl: mp3quran("server8", "afs", 19), image: "", category: "فقه", duration: "18:00" },
      { id: "ut5", scholar: "محمد بن صالح العثيمين", title: "سورة طه", audioUrl: mp3quran("server8", "afs", 20), image: "", category: "فقه", duration: "22:00" },
    ],
  },
  {
    id: "fawzan", name: "صالح الفوزان", image: "", specialty: "العقيدة والفقه",
    lectures: [
      { id: "fw1", scholar: "صالح الفوزان", title: "سورة الإسراء", audioUrl: mp3quran("server12", "maher", 17), image: "", category: "عقيدة", duration: "20:00" },
      { id: "fw2", scholar: "صالح الفوزان", title: "سورة الأنبياء", audioUrl: mp3quran("server12", "maher", 21), image: "", category: "عقيدة", duration: "20:00" },
      { id: "fw3", scholar: "صالح الفوزان", title: "سورة الحج", audioUrl: mp3quran("server12", "maher", 22), image: "", category: "عقيدة", duration: "22:00" },
      { id: "fw4", scholar: "صالح الفوزان", title: "سورة المؤمنون", audioUrl: mp3quran("server12", "maher", 23), image: "", category: "عقيدة", duration: "18:00" },
    ],
  },
  {
    id: "albani", name: "محمد ناصر الدين الألباني", image: "", specialty: "الحديث والتحقيق",
    lectures: [
      { id: "al1", scholar: "محمد ناصر الدين الألباني", title: "سورة النور", audioUrl: mp3quran("server7", "s_gmd", 24), image: "", category: "حديث", duration: "22:00" },
      { id: "al2", scholar: "محمد ناصر الدين الألباني", title: "سورة الفرقان", audioUrl: mp3quran("server7", "s_gmd", 25), image: "", category: "حديث", duration: "15:00" },
      { id: "al3", scholar: "محمد ناصر الدين الألباني", title: "سورة الشعراء", audioUrl: mp3quran("server7", "s_gmd", 26), image: "", category: "حديث", duration: "20:00" },
      { id: "al4", scholar: "محمد ناصر الدين الألباني", title: "سورة النمل", audioUrl: mp3quran("server7", "s_gmd", 27), image: "", category: "حديث", duration: "18:00" },
    ],
  },
  {
    id: "raslan", name: "محمد سعيد رسلان", image: "", specialty: "السنة والمنهج",
    lectures: [
      { id: "rs1", scholar: "محمد سعيد رسلان", title: "سورة لقمان - حكم ومواعظ", audioUrl: mp3quran("server10", "ajm", 31), image: "", category: "منهج", duration: "12:00" },
      { id: "rs2", scholar: "محمد سعيد رسلان", title: "سورة السجدة", audioUrl: mp3quran("server10", "ajm", 32), image: "", category: "عقيدة", duration: "8:00" },
    ],
  },
  {
    id: "abdulrazzaq", name: "عبد الرزاق البدر", image: "", specialty: "العقيدة والتوحيد",
    lectures: [
      { id: "ar1", scholar: "عبد الرزاق البدر", title: "سورة فاطر - أسماء الله", audioUrl: mp3quran("server7", "basit", 35), image: "", category: "عقيدة", duration: "14:00" },
      { id: "ar2", scholar: "عبد الرزاق البدر", title: "سورة يس", audioUrl: mp3quran("server7", "basit", 36), image: "", category: "عقيدة", duration: "12:00" },
    ],
  },
  {
    id: "suhaimi", name: "عبد السلام السحيمي", image: "", specialty: "العقيدة والمنهج",
    lectures: [
      { id: "sh1", scholar: "عبد السلام السحيمي", title: "سورة الزمر", audioUrl: mp3quran("server13", "husr", 39), image: "", category: "عقيدة", duration: "22:00" },
      { id: "sh2", scholar: "عبد السلام السحيمي", title: "سورة غافر", audioUrl: mp3quran("server13", "husr", 40), image: "", category: "منهج", duration: "20:00" },
    ],
  },
  {
    id: "ramzan", name: "محمد بن رمزان الهاجري", image: "", specialty: "الفقه والدعوة",
    lectures: [
      { id: "rm1", scholar: "محمد بن رمزان الهاجري", title: "سورة فصلت", audioUrl: mp3quran("server11", "yasser", 41), image: "", category: "فقه", duration: "18:00" },
      { id: "rm2", scholar: "محمد بن رمزان الهاجري", title: "سورة الشورى", audioUrl: mp3quran("server11", "yasser", 42), image: "", category: "منهج", duration: "16:00" },
    ],
  },
  {
    id: "ferkous", name: "محمد علي فركوس", image: "", specialty: "الفقه والأصول",
    lectures: [
      { id: "fk1", scholar: "محمد علي فركوس", title: "سورة الحجرات - أحكام", audioUrl: mp3quran("server7", "shuraim", 49), image: "", category: "فقه", duration: "8:00" },
      { id: "fk2", scholar: "محمد علي فركوس", title: "سورة ق", audioUrl: mp3quran("server7", "shuraim", 50), image: "", category: "فقه", duration: "7:00" },
    ],
  },
  {
    id: "abdulmajid", name: "عبد المجيد جمعة", image: "", specialty: "العقيدة والمنهج",
    lectures: [
      { id: "mj1", scholar: "عبد المجيد جمعة", title: "سورة الرحمن", audioUrl: mp3quran("server8", "frs_a", 55), image: "", category: "عقيدة", duration: "14:00" },
    ],
  },
  {
    id: "lazhar", name: "لزهر سنيقرة", image: "", specialty: "الدعوة والمنهج",
    lectures: [
      { id: "lz1", scholar: "لزهر سنيقرة", title: "سورة الواقعة", audioUrl: mp3quran("server8", "frs_a", 56), image: "", category: "دعوة", duration: "12:00" },
      { id: "lz2", scholar: "لزهر سنيقرة", title: "سورة الحديد", audioUrl: mp3quran("server8", "frs_a", 57), image: "", category: "منهج", duration: "14:00" },
    ],
  },
  {
    id: "saleh_alsheikh", name: "صالح آل الشيخ", image: "", specialty: "العقيدة والتفسير",
    lectures: [
      { id: "ss1", scholar: "صالح آل الشيخ", title: "سورة الملك - تفسير", audioUrl: mp3quran("server6", "qtm", 67), image: "", category: "عقيدة", duration: "10:00" },
      { id: "ss2", scholar: "صالح آل الشيخ", title: "سورة القلم", audioUrl: mp3quran("server6", "qtm", 68), image: "", category: "عقيدة", duration: "9:00" },
    ],
  },
  {
    id: "madkhali", name: "ربيع المدخلي", image: "", specialty: "الحديث والمنهج",
    lectures: [
      { id: "md1", scholar: "ربيع المدخلي", title: "سورة الحاقة", audioUrl: mp3quran("server11", "khalid_jl", 69), image: "", category: "منهج", duration: "8:00" },
      { id: "md2", scholar: "ربيع المدخلي", title: "سورة المعارج", audioUrl: mp3quran("server11", "khalid_jl", 70), image: "", category: "منهج", duration: "6:00" },
    ],
  },
  {
    id: "usaimi", name: "صالح العصيمي", image: "", specialty: "الفقه والحديث",
    lectures: [
      { id: "us1", scholar: "صالح العصيمي", title: "سورة نوح", audioUrl: mp3quran("server8", "lhdan", 71), image: "", category: "حديث", duration: "5:00" },
    ],
  },
  {
    id: "luhaydan", name: "صالح اللحيدان", image: "", specialty: "القضاء والفتوى",
    lectures: [
      { id: "lh1", scholar: "صالح اللحيدان", title: "سورة الجن", audioUrl: mp3quran("server8", "lhdan", 72), image: "", category: "فتاوى", duration: "6:00" },
    ],
  },
  {
    id: "shuwair", name: "سعد الشويعر", image: "", specialty: "الفقه والمواريث",
    lectures: [
      { id: "sw1", scholar: "سعد الشويعر", title: "سورة المزمل", audioUrl: mp3quran("server10", "minsh", 73), image: "", category: "فقه", duration: "5:00" },
    ],
  },
  {
    id: "khamis", name: "عثمان الخميس", image: "", specialty: "العقيدة والتاريخ",
    lectures: [
      { id: "k1", scholar: "عثمان الخميس", title: "سورة المدثر", audioUrl: mp3quran("server8", "jbrl", 74), image: "", category: "عقيدة", duration: "6:00" },
      { id: "k2", scholar: "عثمان الخميس", title: "سورة الإنسان", audioUrl: mp3quran("server8", "jbrl", 76), image: "", category: "تاريخ", duration: "5:00" },
    ],
  },
  {
    id: "shanqiti", name: "محمد المختار الشنقيطي", image: "", specialty: "الفقه وشرح الزاد",
    lectures: [
      { id: "sh_q1", scholar: "محمد المختار الشنقيطي", title: "سورة النبأ", audioUrl: mp3quran("server10", "mohaisny", 78), image: "", category: "فقه", duration: "5:00" },
      { id: "sh_q2", scholar: "محمد المختار الشنقيطي", title: "سورة النازعات", audioUrl: mp3quran("server10", "mohaisny", 79), image: "", category: "فقه", duration: "5:00" },
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

// Kids education audio - Juz Amma surahs
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
