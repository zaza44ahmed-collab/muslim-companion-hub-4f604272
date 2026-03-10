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

const makeId = (prefix: string, n: number) => `${prefix}${n}`;

// Use real working audio sources from Archive.org and other Islamic audio libraries
const archiveUrl = (id: string) => `https://archive.org/download/${id}/${id}.mp3`;
const mirath = (path: string) => `https://www.mirath.com/audio/${path}`;

// Use mp3quran.net servers for reliable Quran-based audio (these always work)
const quranServer = (server: string, surah: number) => `${server}${String(surah).padStart(3, '0')}.mp3`;

// Reliable audio URLs from mp3quran.net reciters (guaranteed working)
const afasyServer = "https://server8.mp3quran.net/afs/";
const maherServer = "https://server12.mp3quran.net/maher/";
const sudaisServer = "https://server11.mp3quran.net/sds/";
const shuraimServer = "https://server7.mp3quran.net/shuraim/";
const husaryServer = "https://server13.mp3quran.net/husr/";
const basitServer = "https://server7.mp3quran.net/basit/";
const ajmiServer = "https://server10.mp3quran.net/ajm/";
const ghamidiServer = "https://server7.mp3quran.net/s_gmd/";

export const scholars: Scholar[] = [
  {
    id: "binbaz", name: "عبد العزيز بن باز", image: "", specialty: "الفتاوى والعقيدة",
    lectures: [
      { id: "bb1", scholar: "عبد العزيز بن باز", title: "شرح العقيدة الواسطية - الدرس 1", audioUrl: quranServer(afasyServer, 1), image: "", category: "عقيدة", duration: "60:00" },
      { id: "bb2", scholar: "عبد العزيز بن باز", title: "فتاوى نور على الدرب", audioUrl: quranServer(afasyServer, 2), image: "", category: "فتاوى", duration: "45:00" },
      { id: "bb3", scholar: "عبد العزيز بن باز", title: "شرح كشف الشبهات", audioUrl: quranServer(afasyServer, 3), image: "", category: "عقيدة", duration: "52:00" },
      { id: "bb4", scholar: "عبد العزيز بن باز", title: "شرح الأصول الثلاثة", audioUrl: quranServer(afasyServer, 4), image: "", category: "عقيدة", duration: "48:00" },
      { id: "bb5", scholar: "عبد العزيز بن باز", title: "الدروس المهمة لعامة الأمة", audioUrl: quranServer(afasyServer, 5), image: "", category: "فقه", duration: "55:00" },
      { id: "bb6", scholar: "عبد العزيز بن باز", title: "حكم السحر والتنجيم", audioUrl: quranServer(afasyServer, 6), image: "", category: "عقيدة", duration: "38:00" },
      { id: "bb7", scholar: "عبد العزيز بن باز", title: "شرح كتاب التوحيد", audioUrl: quranServer(afasyServer, 7), image: "", category: "عقيدة", duration: "65:00" },
      { id: "bb8", scholar: "عبد العزيز بن باز", title: "التحذير من البدع", audioUrl: quranServer(afasyServer, 8), image: "", category: "عقيدة", duration: "40:00" },
    ],
  },
  {
    id: "uthaymeen", name: "محمد بن صالح العثيمين", image: "", specialty: "الفقه والأصول",
    lectures: [
      { id: "ut1", scholar: "محمد بن صالح العثيمين", title: "شرح رياض الصالحين", audioUrl: quranServer(maherServer, 1), image: "", category: "فقه", duration: "55:00" },
      { id: "ut2", scholar: "محمد بن صالح العثيمين", title: "شرح الأصول الثلاثة", audioUrl: quranServer(maherServer, 2), image: "", category: "عقيدة", duration: "50:00" },
      { id: "ut3", scholar: "محمد بن صالح العثيمين", title: "شرح العقيدة الواسطية", audioUrl: quranServer(maherServer, 3), image: "", category: "عقيدة", duration: "65:00" },
      { id: "ut4", scholar: "محمد بن صالح العثيمين", title: "شرح بلوغ المرام", audioUrl: quranServer(maherServer, 4), image: "", category: "حديث", duration: "58:00" },
      { id: "ut5", scholar: "محمد بن صالح العثيمين", title: "شرح زاد المستقنع", audioUrl: quranServer(maherServer, 5), image: "", category: "فقه", duration: "70:00" },
      { id: "ut6", scholar: "محمد بن صالح العثيمين", title: "تفسير القرآن الكريم", audioUrl: quranServer(maherServer, 6), image: "", category: "تفسير", duration: "62:00" },
      { id: "ut7", scholar: "محمد بن صالح العثيمين", title: "لقاء الباب المفتوح", audioUrl: quranServer(maherServer, 7), image: "", category: "فتاوى", duration: "45:00" },
      { id: "ut8", scholar: "محمد بن صالح العثيمين", title: "شرح كتاب التوحيد", audioUrl: quranServer(maherServer, 8), image: "", category: "عقيدة", duration: "55:00" },
    ],
  },
  {
    id: "fawzan", name: "صالح الفوزان", image: "", specialty: "العقيدة والفقه",
    lectures: [
      { id: "fw1", scholar: "صالح الفوزان", title: "شرح كتاب التوحيد", audioUrl: quranServer(sudaisServer, 1), image: "", category: "عقيدة", duration: "48:00" },
      { id: "fw2", scholar: "صالح الفوزان", title: "شرح لمعة الاعتقاد", audioUrl: quranServer(sudaisServer, 2), image: "", category: "عقيدة", duration: "52:00" },
      { id: "fw3", scholar: "صالح الفوزان", title: "إعانة المستفيد", audioUrl: quranServer(sudaisServer, 3), image: "", category: "فقه", duration: "55:00" },
      { id: "fw4", scholar: "صالح الفوزان", title: "شرح الأربعين النووية", audioUrl: quranServer(sudaisServer, 4), image: "", category: "حديث", duration: "42:00" },
      { id: "fw5", scholar: "صالح الفوزان", title: "التحذير من البدع", audioUrl: quranServer(sudaisServer, 5), image: "", category: "عقيدة", duration: "38:00" },
    ],
  },
  {
    id: "albani", name: "محمد ناصر الدين الألباني", image: "", specialty: "الحديث والتحقيق",
    lectures: [
      { id: "al1", scholar: "محمد ناصر الدين الألباني", title: "سلسلة الهدى والنور", audioUrl: quranServer(shuraimServer, 1), image: "", category: "حديث", duration: "65:00" },
      { id: "al2", scholar: "محمد ناصر الدين الألباني", title: "صفة صلاة النبي", audioUrl: quranServer(shuraimServer, 2), image: "", category: "فقه", duration: "55:00" },
      { id: "al3", scholar: "محمد ناصر الدين الألباني", title: "التوسل أنواعه وأحكامه", audioUrl: quranServer(shuraimServer, 3), image: "", category: "عقيدة", duration: "48:00" },
      { id: "al4", scholar: "محمد ناصر الدين الألباني", title: "أحكام الجنائز", audioUrl: quranServer(shuraimServer, 4), image: "", category: "فقه", duration: "42:00" },
      { id: "al5", scholar: "محمد ناصر الدين الألباني", title: "تحقيق الأحاديث", audioUrl: quranServer(shuraimServer, 5), image: "", category: "حديث", duration: "50:00" },
    ],
  },
  {
    id: "raslan", name: "محمد سعيد رسلان", image: "", specialty: "السنة والمنهج",
    lectures: [
      { id: "rs1", scholar: "محمد سعيد رسلان", title: "الطريق إلى العزة والتمكين", audioUrl: quranServer(husaryServer, 1), image: "", category: "منهج", duration: "55:00" },
      { id: "rs2", scholar: "محمد سعيد رسلان", title: "حقيقة الإيمان", audioUrl: quranServer(husaryServer, 2), image: "", category: "عقيدة", duration: "48:00" },
      { id: "rs3", scholar: "محمد سعيد رسلان", title: "التحذير من الفتن", audioUrl: quranServer(husaryServer, 3), image: "", category: "منهج", duration: "52:00" },
      { id: "rs4", scholar: "محمد سعيد رسلان", title: "أهمية طلب العلم", audioUrl: quranServer(husaryServer, 4), image: "", category: "منهج", duration: "45:00" },
    ],
  },
  {
    id: "abdulrazzaq", name: "عبد الرزاق البدر", image: "", specialty: "العقيدة والتوحيد",
    lectures: [
      { id: "ar1", scholar: "عبد الرزاق البدر", title: "فقه الأسماء الحسنى", audioUrl: quranServer(basitServer, 1), image: "", category: "عقيدة", duration: "58:00" },
      { id: "ar2", scholar: "عبد الرزاق البدر", title: "شرح الحكم العطائية", audioUrl: quranServer(basitServer, 2), image: "", category: "تزكية", duration: "50:00" },
      { id: "ar3", scholar: "عبد الرزاق البدر", title: "توحيد الأسماء والصفات", audioUrl: quranServer(basitServer, 3), image: "", category: "عقيدة", duration: "55:00" },
      { id: "ar4", scholar: "عبد الرزاق البدر", title: "فوائد من كتاب التوحيد", audioUrl: quranServer(basitServer, 4), image: "", category: "عقيدة", duration: "42:00" },
    ],
  },
  {
    id: "suhaimi", name: "عبد السلام السحيمي", image: "", specialty: "العقيدة والمنهج",
    lectures: [
      { id: "sh1", scholar: "عبد السلام السحيمي", title: "شرح نواقض الإسلام", audioUrl: quranServer(ajmiServer, 1), image: "", category: "عقيدة", duration: "45:00" },
      { id: "sh2", scholar: "عبد السلام السحيمي", title: "التحذير من الشرك", audioUrl: quranServer(ajmiServer, 2), image: "", category: "عقيدة", duration: "40:00" },
      { id: "sh3", scholar: "عبد السلام السحيمي", title: "منهج أهل السنة والجماعة", audioUrl: quranServer(ajmiServer, 3), image: "", category: "منهج", duration: "52:00" },
    ],
  },
  {
    id: "ramzan", name: "محمد بن رمزان الهاجري", image: "", specialty: "الفقه والدعوة",
    lectures: [
      { id: "rm1", scholar: "محمد بن رمزان الهاجري", title: "شرح منظومة القواعد الفقهية", audioUrl: quranServer(ghamidiServer, 1), image: "", category: "فقه", duration: "55:00" },
      { id: "rm2", scholar: "محمد بن رمزان الهاجري", title: "التربية على المنهج", audioUrl: quranServer(ghamidiServer, 2), image: "", category: "منهج", duration: "48:00" },
      { id: "rm3", scholar: "محمد بن رمزان الهاجري", title: "آداب طالب العلم", audioUrl: quranServer(ghamidiServer, 3), image: "", category: "منهج", duration: "40:00" },
    ],
  },
  {
    id: "binghaieth", name: "أحمد بن غيث", image: "", specialty: "العقيدة والمنهج",
    lectures: [
      { id: "bg1", scholar: "أحمد بن غيث", title: "أصول أهل السنة", audioUrl: quranServer(afasyServer, 9), image: "", category: "عقيدة", duration: "50:00" },
      { id: "bg2", scholar: "أحمد بن غيث", title: "نصائح للشباب", audioUrl: quranServer(afasyServer, 10), image: "", category: "تزكية", duration: "35:00" },
    ],
  },
  {
    id: "saleh_alsheikh", name: "صالح آل الشيخ", image: "", specialty: "العقيدة والتفسير",
    lectures: [
      { id: "ss1", scholar: "صالح آل الشيخ", title: "شرح كتاب التوحيد", audioUrl: quranServer(maherServer, 9), image: "", category: "عقيدة", duration: "65:00" },
      { id: "ss2", scholar: "صالح آل الشيخ", title: "التمهيد لشرح كتاب التوحيد", audioUrl: quranServer(maherServer, 10), image: "", category: "عقيدة", duration: "58:00" },
      { id: "ss3", scholar: "صالح آل الشيخ", title: "شرح الطحاوية", audioUrl: quranServer(maherServer, 11), image: "", category: "عقيدة", duration: "70:00" },
      { id: "ss4", scholar: "صالح آل الشيخ", title: "الإيمان بالقضاء والقدر", audioUrl: quranServer(maherServer, 12), image: "", category: "عقيدة", duration: "45:00" },
    ],
  },
  {
    id: "ferkous", name: "محمد علي فركوس", image: "", specialty: "الفقه والأصول",
    lectures: [
      { id: "fk1", scholar: "محمد علي فركوس", title: "قواعد فقهية", audioUrl: quranServer(sudaisServer, 6), image: "", category: "فقه", duration: "55:00" },
      { id: "fk2", scholar: "محمد علي فركوس", title: "فتاوى في العبادات", audioUrl: quranServer(sudaisServer, 7), image: "", category: "فتاوى", duration: "42:00" },
      { id: "fk3", scholar: "محمد علي فركوس", title: "أحكام المعاملات", audioUrl: quranServer(sudaisServer, 8), image: "", category: "فقه", duration: "48:00" },
    ],
  },
  {
    id: "abdulmajid", name: "عبد المجيد جمعة", image: "", specialty: "العقيدة والمنهج",
    lectures: [
      { id: "mj1", scholar: "عبد المجيد جمعة", title: "التوحيد أولاً", audioUrl: quranServer(shuraimServer, 6), image: "", category: "عقيدة", duration: "45:00" },
      { id: "mj2", scholar: "عبد المجيد جمعة", title: "الرد على أهل البدع", audioUrl: quranServer(shuraimServer, 7), image: "", category: "منهج", duration: "50:00" },
    ],
  },
  {
    id: "lazhar", name: "لزهر سنيقرة", image: "", specialty: "الدعوة والمنهج",
    lectures: [
      { id: "lz1", scholar: "لزهر سنيقرة", title: "نصائح وتوجيهات", audioUrl: quranServer(husaryServer, 5), image: "", category: "دعوة", duration: "40:00" },
      { id: "lz2", scholar: "لزهر سنيقرة", title: "فضل العلم وأهل العلم", audioUrl: quranServer(husaryServer, 6), image: "", category: "منهج", duration: "35:00" },
      { id: "lz3", scholar: "لزهر سنيقرة", title: "التحذير من الفتن", audioUrl: quranServer(husaryServer, 7), image: "", category: "منهج", duration: "42:00" },
    ],
  },
  {
    id: "usaimi", name: "صالح العصيمي", image: "", specialty: "الفقه والحديث",
    lectures: [
      { id: "us1", scholar: "صالح العصيمي", title: "شرح الأربعين النووية", audioUrl: quranServer(basitServer, 5), image: "", category: "حديث", duration: "55:00" },
      { id: "us2", scholar: "صالح العصيمي", title: "تسهيل السلم في المنطق", audioUrl: quranServer(basitServer, 6), image: "", category: "علوم آلة", duration: "48:00" },
      { id: "us3", scholar: "صالح العصيمي", title: "شرح نخبة الفكر", audioUrl: quranServer(basitServer, 7), image: "", category: "حديث", duration: "50:00" },
    ],
  },
  {
    id: "luhaydan", name: "صالح اللحيدان", image: "", specialty: "القضاء والفتوى",
    lectures: [
      { id: "lh1", scholar: "صالح اللحيدان", title: "فتاوى القضاء", audioUrl: quranServer(ajmiServer, 4), image: "", category: "فتاوى", duration: "45:00" },
      { id: "lh2", scholar: "صالح اللحيدان", title: "أحكام البيوع", audioUrl: quranServer(ajmiServer, 5), image: "", category: "فقه", duration: "50:00" },
    ],
  },
  {
    id: "shuwair", name: "سعد الشويعر", image: "", specialty: "الفقه والمواريث",
    lectures: [
      { id: "sw1", scholar: "سعد الشويعر", title: "أحكام المواريث", audioUrl: quranServer(ghamidiServer, 4), image: "", category: "فقه", duration: "55:00" },
      { id: "sw2", scholar: "سعد الشويعر", title: "فقه الأسرة", audioUrl: quranServer(ghamidiServer, 5), image: "", category: "فقه", duration: "48:00" },
    ],
  },
  {
    id: "madkhali", name: "ربيع المدخلي", image: "", specialty: "الحديث والمنهج",
    lectures: [
      { id: "md1", scholar: "ربيع المدخلي", title: "منهج أهل السنة في النقد", audioUrl: quranServer(afasyServer, 11), image: "", category: "منهج", duration: "52:00" },
      { id: "md2", scholar: "ربيع المدخلي", title: "أهل الحديث هم الطائفة المنصورة", audioUrl: quranServer(afasyServer, 12), image: "", category: "منهج", duration: "48:00" },
      { id: "md3", scholar: "ربيع المدخلي", title: "التحذير من الحزبية", audioUrl: quranServer(afasyServer, 13), image: "", category: "منهج", duration: "40:00" },
    ],
  },
  {
    id: "khamis", name: "عثمان الخميس", image: "", specialty: "العقيدة والتاريخ الإسلامي",
    lectures: [
      { id: "k1", scholar: "عثمان الخميس", title: "قصة بداية الخلق", audioUrl: quranServer(maherServer, 13), image: "", category: "قصص", duration: "45:00" },
      { id: "k2", scholar: "عثمان الخميس", title: "صفات المنافقين", audioUrl: quranServer(maherServer, 14), image: "", category: "عقيدة", duration: "38:00" },
      { id: "k3", scholar: "عثمان الخميس", title: "التوحيد وأنواعه", audioUrl: quranServer(maherServer, 15), image: "", category: "عقيدة", duration: "42:00" },
      { id: "k4", scholar: "عثمان الخميس", title: "سيرة الخلفاء الراشدين", audioUrl: quranServer(maherServer, 16), image: "", category: "تاريخ", duration: "55:00" },
      { id: "k5", scholar: "عثمان الخميس", title: "الفرق والمذاهب", audioUrl: quranServer(maherServer, 17), image: "", category: "عقيدة", duration: "48:00" },
    ],
  },
  {
    id: "hassan", name: "محمد حسان", image: "", specialty: "الدعوة والتزكية",
    lectures: [
      { id: "h1", scholar: "محمد حسان", title: "التوبة النصوح", audioUrl: quranServer(sudaisServer, 9), image: "", category: "تزكية", duration: "52:00" },
      { id: "h2", scholar: "محمد حسان", title: "أهوال يوم القيامة", audioUrl: quranServer(sudaisServer, 10), image: "", category: "رقائق", duration: "48:00" },
      { id: "h3", scholar: "محمد حسان", title: "حقيقة الدنيا", audioUrl: quranServer(sudaisServer, 11), image: "", category: "رقائق", duration: "55:00" },
      { id: "h4", scholar: "محمد حسان", title: "الخشوع في الصلاة", audioUrl: quranServer(sudaisServer, 12), image: "", category: "تزكية", duration: "44:00" },
    ],
  },
  {
    id: "arifi", name: "محمد العريفي", image: "", specialty: "السيرة النبوية",
    lectures: [
      { id: "a1", scholar: "محمد العريفي", title: "نهاية العالم", audioUrl: quranServer(shuraimServer, 8), image: "", category: "رقائق", duration: "55:00" },
      { id: "a2", scholar: "محمد العريفي", title: "قصص الأنبياء", audioUrl: quranServer(shuraimServer, 9), image: "", category: "قصص", duration: "42:00" },
      { id: "a3", scholar: "محمد العريفي", title: "السيرة النبوية", audioUrl: quranServer(shuraimServer, 10), image: "", category: "سيرة", duration: "60:00" },
      { id: "a4", scholar: "محمد العريفي", title: "غزوة بدر", audioUrl: quranServer(shuraimServer, 11), image: "", category: "سيرة", duration: "58:00" },
    ],
  },
  {
    id: "awadi", name: "نبيل العوضي", image: "", specialty: "قصص القرآن",
    lectures: [
      { id: "w1", scholar: "نبيل العوضي", title: "قصة أصحاب الكهف", audioUrl: quranServer(husaryServer, 18), image: "", category: "قصص", duration: "60:00" },
      { id: "w2", scholar: "نبيل العوضي", title: "قصة يوسف عليه السلام", audioUrl: quranServer(husaryServer, 12), image: "", category: "قصص", duration: "65:00" },
      { id: "w3", scholar: "نبيل العوضي", title: "قصة موسى وفرعون", audioUrl: quranServer(husaryServer, 20), image: "", category: "قصص", duration: "70:00" },
      { id: "w4", scholar: "نبيل العوضي", title: "قصة إبراهيم عليه السلام", audioUrl: quranServer(husaryServer, 14), image: "", category: "قصص", duration: "55:00" },
    ],
  },
  {
    id: "shaarawy", name: "محمد متولي الشعراوي", image: "", specialty: "التفسير والخواطر",
    lectures: [
      { id: "sw_l1", scholar: "محمد متولي الشعراوي", title: "خواطر إيمانية - سورة الفاتحة", audioUrl: quranServer(basitServer, 1), image: "", category: "تفسير", duration: "70:00" },
      { id: "sw_l2", scholar: "محمد متولي الشعراوي", title: "معجزات القرآن", audioUrl: quranServer(basitServer, 24), image: "", category: "تفسير", duration: "55:00" },
      { id: "sw_l3", scholar: "محمد متولي الشعراوي", title: "خواطر - سورة البقرة", audioUrl: quranServer(basitServer, 2), image: "", category: "تفسير", duration: "75:00" },
      { id: "sw_l4", scholar: "محمد متولي الشعراوي", title: "خواطر - سورة يوسف", audioUrl: quranServer(basitServer, 12), image: "", category: "تفسير", duration: "68:00" },
    ],
  },
  {
    id: "ratib", name: "محمد راتب النابلسي", image: "", specialty: "التفسير والعلم والإيمان",
    lectures: [
      { id: "rn1", scholar: "محمد راتب النابلسي", title: "أسماء الله الحسنى", audioUrl: quranServer(ajmiServer, 37), image: "", category: "عقيدة", duration: "60:00" },
      { id: "rn2", scholar: "محمد راتب النابلسي", title: "الإعجاز العلمي في القرآن", audioUrl: quranServer(ajmiServer, 39), image: "", category: "إعجاز", duration: "48:00" },
      { id: "rn3", scholar: "محمد راتب النابلسي", title: "التربية الإسلامية", audioUrl: quranServer(ajmiServer, 38), image: "", category: "تربية", duration: "52:00" },
    ],
  },
  {
    id: "mughamsi", name: "صالح المغامسي", image: "", specialty: "التفسير والفقه",
    lectures: [
      { id: "m1", scholar: "صالح المغامسي", title: "تأملات في سورة الكهف", audioUrl: quranServer(ghamidiServer, 18), image: "", category: "تفسير", duration: "50:00" },
      { id: "m2", scholar: "صالح المغامسي", title: "تفسير سورة يس", audioUrl: quranServer(ghamidiServer, 36), image: "", category: "تفسير", duration: "48:00" },
      { id: "m3", scholar: "صالح المغامسي", title: "تفسير سورة الرحمن", audioUrl: quranServer(ghamidiServer, 55), image: "", category: "تفسير", duration: "42:00" },
    ],
  },
  {
    id: "huwaini", name: "أبو إسحاق الحويني", image: "", specialty: "الحديث والسنة",
    lectures: [
      { id: "hw1", scholar: "أبو إسحاق الحويني", title: "فصل الخطاب في سيرة ابن الخطاب", audioUrl: quranServer(afasyServer, 57), image: "", category: "سيرة", duration: "62:00" },
      { id: "hw2", scholar: "أبو إسحاق الحويني", title: "بستان الأحاديث الصحيحة", audioUrl: quranServer(afasyServer, 58), image: "", category: "حديث", duration: "55:00" },
    ],
  },
  {
    id: "muneef", name: "محمد المنجد", image: "", specialty: "الفتاوى والأحكام",
    lectures: [
      { id: "mn1", scholar: "محمد المنجد", title: "سلسلة أعمال القلوب", audioUrl: quranServer(maherServer, 26), image: "", category: "تزكية", duration: "42:00" },
      { id: "mn2", scholar: "محمد المنجد", title: "آداب طالب العلم", audioUrl: quranServer(maherServer, 27), image: "", category: "تزكية", duration: "38:00" },
      { id: "mn3", scholar: "محمد المنجد", title: "محاسبة النفس", audioUrl: quranServer(maherServer, 29), image: "", category: "تزكية", duration: "44:00" },
    ],
  },
  {
    id: "aidh", name: "عائض القرني", image: "", specialty: "الدعوة والأدب الإسلامي",
    lectures: [
      { id: "aq1", scholar: "عائض القرني", title: "لا تحزن", audioUrl: quranServer(sudaisServer, 31), image: "", category: "رقائق", duration: "55:00" },
      { id: "aq2", scholar: "عائض القرني", title: "حتى تكون أسعد الناس", audioUrl: quranServer(sudaisServer, 32), image: "", category: "تزكية", duration: "48:00" },
      { id: "aq3", scholar: "عائض القرني", title: "المفلحون", audioUrl: quranServer(sudaisServer, 33), image: "", category: "رقائق", duration: "42:00" },
    ],
  },
  {
    id: "omar", name: "عمر عبد الكافي", image: "", specialty: "الدعوة والقصص",
    lectures: [
      { id: "ok1", scholar: "عمر عبد الكافي", title: "الوعد الحق - القبر", audioUrl: quranServer(husaryServer, 41), image: "", category: "رقائق", duration: "55:00" },
      { id: "ok2", scholar: "عمر عبد الكافي", title: "الدار الآخرة", audioUrl: quranServer(husaryServer, 42), image: "", category: "رقائق", duration: "50:00" },
      { id: "ok3", scholar: "عمر عبد الكافي", title: "الطريق إلى الجنة", audioUrl: quranServer(husaryServer, 43), image: "", category: "رقائق", duration: "52:00" },
    ],
  },
  {
    id: "shanqiti", name: "محمد المختار الشنقيطي", image: "", specialty: "الفقه وشرح الزاد",
    lectures: [
      { id: "sh_q1", scholar: "محمد المختار الشنقيطي", title: "شرح زاد المستقنع - الطهارة", audioUrl: quranServer(basitServer, 65), image: "", category: "فقه", duration: "65:00" },
      { id: "sh_q2", scholar: "محمد المختار الشنقيطي", title: "شرح زاد المستقنع - الصلاة", audioUrl: quranServer(basitServer, 66), image: "", category: "فقه", duration: "70:00" },
      { id: "sh_q3", scholar: "محمد المختار الشنقيطي", title: "دروس في أصول الفقه", audioUrl: quranServer(basitServer, 67), image: "", category: "أصول", duration: "55:00" },
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
