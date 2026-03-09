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
      { id: "k5", scholar: "عثمان الخميس", title: "سيرة الخلفاء الراشدين", audioUrl: "https://download.quran.islamway.net/quran3/1/005.mp3", image: "", category: "تاريخ", duration: "55:00" },
      { id: "k6", scholar: "عثمان الخميس", title: "الفرق والمذاهب", audioUrl: "https://download.quran.islamway.net/quran3/1/006.mp3", image: "", category: "عقيدة", duration: "48:00" },
      { id: "k7", scholar: "عثمان الخميس", title: "أركان الإيمان", audioUrl: "https://download.quran.islamway.net/quran3/1/007.mp3", image: "", category: "عقيدة", duration: "40:00" },
      { id: "k8", scholar: "عثمان الخميس", title: "نواقض الإسلام", audioUrl: "https://download.quran.islamway.net/quran3/1/008.mp3", image: "", category: "عقيدة", duration: "35:00" },
    ],
  },
  {
    id: "hassan", name: "محمد حسان", image: "", specialty: "الدعوة والتزكية",
    lectures: [
      { id: "h1", scholar: "محمد حسان", title: "التوبة النصوح", audioUrl: "https://download.quran.islamway.net/quran3/1/003.mp3", image: "", category: "تزكية", duration: "52:00" },
      { id: "h2", scholar: "محمد حسان", title: "أهوال يوم القيامة", audioUrl: "https://download.quran.islamway.net/quran3/1/004.mp3", image: "", category: "رقائق", duration: "48:00" },
      { id: "h3", scholar: "محمد حسان", title: "حقيقة الدنيا", audioUrl: "https://download.quran.islamway.net/quran3/1/005.mp3", image: "", category: "رقائق", duration: "55:00" },
      { id: "h4", scholar: "محمد حسان", title: "فضل الصدقة", audioUrl: "https://download.quran.islamway.net/quran3/1/006.mp3", image: "", category: "تزكية", duration: "40:00" },
      { id: "h5", scholar: "محمد حسان", title: "الخشوع في الصلاة", audioUrl: "https://download.quran.islamway.net/quran3/1/007.mp3", image: "", category: "تزكية", duration: "44:00" },
      { id: "h6", scholar: "محمد حسان", title: "آداب المسلم", audioUrl: "https://download.quran.islamway.net/quran3/1/008.mp3", image: "", category: "تزكية", duration: "50:00" },
      { id: "h7", scholar: "محمد حسان", title: "فتنة القبر", audioUrl: "https://download.quran.islamway.net/quran3/1/009.mp3", image: "", category: "رقائق", duration: "46:00" },
    ],
  },
  {
    id: "arifi", name: "محمد العريفي", image: "", specialty: "السيرة النبوية",
    lectures: [
      { id: "a1", scholar: "محمد العريفي", title: "نهاية العالم", audioUrl: "https://download.quran.islamway.net/quran3/1/005.mp3", image: "", category: "رقائق", duration: "55:00" },
      { id: "a2", scholar: "محمد العريفي", title: "قصص الأنبياء - آدم عليه السلام", audioUrl: "https://download.quran.islamway.net/quran3/1/006.mp3", image: "", category: "قصص", duration: "42:00" },
      { id: "a3", scholar: "محمد العريفي", title: "السيرة النبوية - المولد", audioUrl: "https://download.quran.islamway.net/quran3/1/007.mp3", image: "", category: "سيرة", duration: "60:00" },
      { id: "a4", scholar: "محمد العريفي", title: "غزوة بدر", audioUrl: "https://download.quran.islamway.net/quran3/1/008.mp3", image: "", category: "سيرة", duration: "58:00" },
      { id: "a5", scholar: "محمد العريفي", title: "غزوة أحد", audioUrl: "https://download.quran.islamway.net/quran3/1/009.mp3", image: "", category: "سيرة", duration: "55:00" },
      { id: "a6", scholar: "محمد العريفي", title: "فتح مكة", audioUrl: "https://download.quran.islamway.net/quran3/1/010.mp3", image: "", category: "سيرة", duration: "62:00" },
      { id: "a7", scholar: "محمد العريفي", title: "غزوة الخندق", audioUrl: "https://download.quran.islamway.net/quran3/1/011.mp3", image: "", category: "سيرة", duration: "50:00" },
      { id: "a8", scholar: "محمد العريفي", title: "صلح الحديبية", audioUrl: "https://download.quran.islamway.net/quran3/1/012.mp3", image: "", category: "سيرة", duration: "48:00" },
    ],
  },
  {
    id: "awadi", name: "نبيل العوضي", image: "", specialty: "قصص القرآن",
    lectures: [
      { id: "w1", scholar: "نبيل العوضي", title: "قصة أصحاب الكهف", audioUrl: "https://download.quran.islamway.net/quran3/1/018.mp3", image: "", category: "قصص", duration: "60:00" },
      { id: "w2", scholar: "نبيل العوضي", title: "قصة يوسف عليه السلام", audioUrl: "https://download.quran.islamway.net/quran3/1/012.mp3", image: "", category: "قصص", duration: "65:00" },
      { id: "w3", scholar: "نبيل العوضي", title: "قصة موسى وفرعون", audioUrl: "https://download.quran.islamway.net/quran3/1/020.mp3", image: "", category: "قصص", duration: "70:00" },
      { id: "w4", scholar: "نبيل العوضي", title: "قصة إبراهيم عليه السلام", audioUrl: "https://download.quran.islamway.net/quran3/1/014.mp3", image: "", category: "قصص", duration: "55:00" },
      { id: "w5", scholar: "نبيل العوضي", title: "قصة نوح عليه السلام", audioUrl: "https://download.quran.islamway.net/quran3/1/071.mp3", image: "", category: "قصص", duration: "50:00" },
      { id: "w6", scholar: "نبيل العوضي", title: "قصة سليمان عليه السلام", audioUrl: "https://download.quran.islamway.net/quran3/1/027.mp3", image: "", category: "قصص", duration: "58:00" },
      { id: "w7", scholar: "نبيل العوضي", title: "قصة داود عليه السلام", audioUrl: "https://download.quran.islamway.net/quran3/1/038.mp3", image: "", category: "قصص", duration: "45:00" },
      { id: "w8", scholar: "نبيل العوضي", title: "قصة عيسى عليه السلام", audioUrl: "https://download.quran.islamway.net/quran3/1/019.mp3", image: "", category: "قصص", duration: "52:00" },
    ],
  },
  {
    id: "mughamsi", name: "صالح المغامسي", image: "", specialty: "التفسير والفقه",
    lectures: [
      { id: "m1", scholar: "صالح المغامسي", title: "تأملات في سورة الكهف", audioUrl: "https://download.quran.islamway.net/quran3/1/018.mp3", image: "", category: "تفسير", duration: "50:00" },
      { id: "m2", scholar: "صالح المغامسي", title: "الثبات على الدين", audioUrl: "https://download.quran.islamway.net/quran3/1/019.mp3", image: "", category: "تزكية", duration: "44:00" },
      { id: "m3", scholar: "صالح المغامسي", title: "تفسير سورة يس", audioUrl: "https://download.quran.islamway.net/quran3/1/036.mp3", image: "", category: "تفسير", duration: "48:00" },
      { id: "m4", scholar: "صالح المغامسي", title: "تفسير سورة الرحمن", audioUrl: "https://download.quran.islamway.net/quran3/1/055.mp3", image: "", category: "تفسير", duration: "42:00" },
      { id: "m5", scholar: "صالح المغامسي", title: "تفسير سورة الواقعة", audioUrl: "https://download.quran.islamway.net/quran3/1/056.mp3", image: "", category: "تفسير", duration: "46:00" },
      { id: "m6", scholar: "صالح المغامسي", title: "تفسير سورة الملك", audioUrl: "https://download.quran.islamway.net/quran3/1/067.mp3", image: "", category: "تفسير", duration: "38:00" },
    ],
  },
  {
    id: "shuraim", name: "سعود الشريم", image: "", specialty: "الفقه والأحكام",
    lectures: [
      { id: "sh1", scholar: "سعود الشريم", title: "أحكام الصلاة", audioUrl: "https://download.quran.islamway.net/quran3/1/009.mp3", image: "", category: "فقه", duration: "45:00" },
      { id: "sh2", scholar: "سعود الشريم", title: "أحكام الصيام", audioUrl: "https://download.quran.islamway.net/quran3/1/010.mp3", image: "", category: "فقه", duration: "40:00" },
      { id: "sh3", scholar: "سعود الشريم", title: "أحكام الحج والعمرة", audioUrl: "https://download.quran.islamway.net/quran3/1/011.mp3", image: "", category: "فقه", duration: "55:00" },
      { id: "sh4", scholar: "سعود الشريم", title: "أحكام الزكاة", audioUrl: "https://download.quran.islamway.net/quran3/1/013.mp3", image: "", category: "فقه", duration: "42:00" },
    ],
  },
  {
    id: "sudais", name: "عبد الرحمن السديس", image: "", specialty: "الخطب والمواعظ",
    lectures: [
      { id: "sd1", scholar: "عبد الرحمن السديس", title: "خطبة عرفة", audioUrl: "https://download.quran.islamway.net/quran3/1/011.mp3", image: "", category: "خطب", duration: "35:00" },
      { id: "sd2", scholar: "عبد الرحمن السديس", title: "وحدة الأمة", audioUrl: "https://download.quran.islamway.net/quran3/1/013.mp3", image: "", category: "خطب", duration: "30:00" },
      { id: "sd3", scholar: "عبد الرحمن السديس", title: "فضل مكة المكرمة", audioUrl: "https://download.quran.islamway.net/quran3/1/014.mp3", image: "", category: "خطب", duration: "32:00" },
      { id: "sd4", scholar: "عبد الرحمن السديس", title: "التمسك بالسنة", audioUrl: "https://download.quran.islamway.net/quran3/1/015.mp3", image: "", category: "خطب", duration: "28:00" },
    ],
  },
  {
    id: "hudhayfi", name: "علي الحذيفي", image: "", specialty: "القراءات والتجويد",
    lectures: [
      { id: "hu1", scholar: "علي الحذيفي", title: "أحكام التجويد", audioUrl: "https://download.quran.islamway.net/quran3/1/015.mp3", image: "", category: "تجويد", duration: "38:00" },
      { id: "hu2", scholar: "علي الحذيفي", title: "مخارج الحروف", audioUrl: "https://download.quran.islamway.net/quran3/1/016.mp3", image: "", category: "تجويد", duration: "42:00" },
      { id: "hu3", scholar: "علي الحذيفي", title: "أحكام النون الساكنة والتنوين", audioUrl: "https://download.quran.islamway.net/quran3/1/017.mp3", image: "", category: "تجويد", duration: "35:00" },
    ],
  },
  {
    id: "binbaz", name: "عبد العزيز بن باز", image: "", specialty: "الفتاوى والعقيدة",
    lectures: [
      { id: "bb1", scholar: "عبد العزيز بن باز", title: "شرح العقيدة الواسطية", audioUrl: "https://download.quran.islamway.net/quran3/1/016.mp3", image: "", category: "عقيدة", duration: "60:00" },
      { id: "bb2", scholar: "عبد العزيز بن باز", title: "فتاوى نور على الدرب", audioUrl: "https://download.quran.islamway.net/quran3/1/017.mp3", image: "", category: "فتاوى", duration: "45:00" },
      { id: "bb3", scholar: "عبد العزيز بن باز", title: "شرح كشف الشبهات", audioUrl: "https://download.quran.islamway.net/quran3/1/018.mp3", image: "", category: "عقيدة", duration: "52:00" },
      { id: "bb4", scholar: "عبد العزيز بن باز", title: "شرح الأصول الثلاثة", audioUrl: "https://download.quran.islamway.net/quran3/1/019.mp3", image: "", category: "عقيدة", duration: "48:00" },
      { id: "bb5", scholar: "عبد العزيز بن باز", title: "الدروس المهمة لعامة الأمة", audioUrl: "https://download.quran.islamway.net/quran3/1/020.mp3", image: "", category: "فقه", duration: "55:00" },
      { id: "bb6", scholar: "عبد العزيز بن باز", title: "حكم السحر والتنجيم", audioUrl: "https://download.quran.islamway.net/quran3/1/021.mp3", image: "", category: "عقيدة", duration: "38:00" },
    ],
  },
  {
    id: "uthaymeen", name: "محمد بن صالح العثيمين", image: "", specialty: "الفقه والأصول",
    lectures: [
      { id: "ut1", scholar: "محمد بن صالح العثيمين", title: "شرح رياض الصالحين", audioUrl: "https://download.quran.islamway.net/quran3/1/021.mp3", image: "", category: "فقه", duration: "55:00" },
      { id: "ut2", scholar: "محمد بن صالح العثيمين", title: "شرح الأصول الثلاثة", audioUrl: "https://download.quran.islamway.net/quran3/1/022.mp3", image: "", category: "عقيدة", duration: "50:00" },
      { id: "ut3", scholar: "محمد بن صالح العثيمين", title: "شرح العقيدة الواسطية", audioUrl: "https://download.quran.islamway.net/quran3/1/023.mp3", image: "", category: "عقيدة", duration: "65:00" },
      { id: "ut4", scholar: "محمد بن صالح العثيمين", title: "شرح بلوغ المرام", audioUrl: "https://download.quran.islamway.net/quran3/1/024.mp3", image: "", category: "حديث", duration: "58:00" },
      { id: "ut5", scholar: "محمد بن صالح العثيمين", title: "شرح زاد المستقنع", audioUrl: "https://download.quran.islamway.net/quran3/1/025.mp3", image: "", category: "فقه", duration: "70:00" },
      { id: "ut6", scholar: "محمد بن صالح العثيمين", title: "تفسير القرآن الكريم", audioUrl: "https://download.quran.islamway.net/quran3/1/026.mp3", image: "", category: "تفسير", duration: "62:00" },
      { id: "ut7", scholar: "محمد بن صالح العثيمين", title: "لقاء الباب المفتوح", audioUrl: "https://download.quran.islamway.net/quran3/1/027.mp3", image: "", category: "فتاوى", duration: "45:00" },
    ],
  },
  {
    id: "fawzan", name: "صالح الفوزان", image: "", specialty: "العقيدة والفقه",
    lectures: [
      { id: "fw1", scholar: "صالح الفوزان", title: "شرح كتاب التوحيد", audioUrl: "https://download.quran.islamway.net/quran3/1/023.mp3", image: "", category: "عقيدة", duration: "48:00" },
      { id: "fw2", scholar: "صالح الفوزان", title: "شرح لمعة الاعتقاد", audioUrl: "https://download.quran.islamway.net/quran3/1/024.mp3", image: "", category: "عقيدة", duration: "52:00" },
      { id: "fw3", scholar: "صالح الفوزان", title: "شرح الملحة في الصرف", audioUrl: "https://download.quran.islamway.net/quran3/1/025.mp3", image: "", category: "لغة", duration: "40:00" },
      { id: "fw4", scholar: "صالح الفوزان", title: "إعانة المستفيد", audioUrl: "https://download.quran.islamway.net/quran3/1/026.mp3", image: "", category: "فقه", duration: "55:00" },
    ],
  },
  {
    id: "tantawi", name: "محمد سيد طنطاوي", image: "", specialty: "التفسير",
    lectures: [
      { id: "tt1", scholar: "محمد سيد طنطاوي", title: "تفسير سورة البقرة", audioUrl: "https://download.quran.islamway.net/quran3/1/002.mp3", image: "", category: "تفسير", duration: "65:00" },
      { id: "tt2", scholar: "محمد سيد طنطاوي", title: "تفسير سورة آل عمران", audioUrl: "https://download.quran.islamway.net/quran3/1/003.mp3", image: "", category: "تفسير", duration: "58:00" },
      { id: "tt3", scholar: "محمد سيد طنطاوي", title: "تفسير سورة النساء", audioUrl: "https://download.quran.islamway.net/quran3/1/004.mp3", image: "", category: "تفسير", duration: "62:00" },
    ],
  },
  {
    id: "shaarawy", name: "محمد متولي الشعراوي", image: "", specialty: "التفسير والخواطر",
    lectures: [
      { id: "sw1", scholar: "محمد متولي الشعراوي", title: "خواطر إيمانية - سورة الفاتحة", audioUrl: "https://download.quran.islamway.net/quran3/1/001.mp3", image: "", category: "تفسير", duration: "70:00" },
      { id: "sw2", scholar: "محمد متولي الشعراوي", title: "معجزات القرآن", audioUrl: "https://download.quran.islamway.net/quran3/1/024.mp3", image: "", category: "تفسير", duration: "55:00" },
      { id: "sw3", scholar: "محمد متولي الشعراوي", title: "خواطر - سورة البقرة", audioUrl: "https://download.quran.islamway.net/quran3/1/002.mp3", image: "", category: "تفسير", duration: "75:00" },
      { id: "sw4", scholar: "محمد متولي الشعراوي", title: "خواطر - سورة يوسف", audioUrl: "https://download.quran.islamway.net/quran3/1/012.mp3", image: "", category: "تفسير", duration: "68:00" },
      { id: "sw5", scholar: "محمد متولي الشعراوي", title: "خواطر - سورة مريم", audioUrl: "https://download.quran.islamway.net/quran3/1/019.mp3", image: "", category: "تفسير", duration: "60:00" },
      { id: "sw6", scholar: "محمد متولي الشعراوي", title: "أسرار بسم الله الرحمن الرحيم", audioUrl: "https://download.quran.islamway.net/quran3/1/030.mp3", image: "", category: "تفسير", duration: "45:00" },
    ],
  },
  {
    id: "tarifi", name: "عبد العزيز الطريفي", image: "", specialty: "الحديث والأثر",
    lectures: [
      { id: "tr1", scholar: "عبد العزيز الطريفي", title: "شرح الأربعين النووية", audioUrl: "https://download.quran.islamway.net/quran3/1/025.mp3", image: "", category: "حديث", duration: "52:00" },
      { id: "tr2", scholar: "عبد العزيز الطريفي", title: "التعليق على صحيح مسلم", audioUrl: "https://download.quran.islamway.net/quran3/1/026.mp3", image: "", category: "حديث", duration: "60:00" },
      { id: "tr3", scholar: "عبد العزيز الطريفي", title: "مسائل في العقيدة", audioUrl: "https://download.quran.islamway.net/quran3/1/027.mp3", image: "", category: "عقيدة", duration: "48:00" },
    ],
  },
  {
    id: "muneef", name: "محمد المنجد", image: "", specialty: "الفتاوى والأحكام",
    lectures: [
      { id: "mn1", scholar: "محمد المنجد", title: "سلسلة أعمال القلوب", audioUrl: "https://download.quran.islamway.net/quran3/1/026.mp3", image: "", category: "تزكية", duration: "42:00" },
      { id: "mn2", scholar: "محمد المنجد", title: "آداب طالب العلم", audioUrl: "https://download.quran.islamway.net/quran3/1/027.mp3", image: "", category: "تزكية", duration: "38:00" },
      { id: "mn3", scholar: "محمد المنجد", title: "الإسلام سؤال وجواب", audioUrl: "https://download.quran.islamway.net/quran3/1/028.mp3", image: "", category: "فتاوى", duration: "50:00" },
      { id: "mn4", scholar: "محمد المنجد", title: "محاسبة النفس", audioUrl: "https://download.quran.islamway.net/quran3/1/029.mp3", image: "", category: "تزكية", duration: "44:00" },
      { id: "mn5", scholar: "محمد المنجد", title: "إدارة الوقت في الإسلام", audioUrl: "https://download.quran.islamway.net/quran3/1/030.mp3", image: "", category: "تزكية", duration: "36:00" },
    ],
  },
  {
    id: "aidh", name: "عائض القرني", image: "", specialty: "الدعوة والأدب الإسلامي",
    lectures: [
      { id: "aq1", scholar: "عائض القرني", title: "لا تحزن", audioUrl: "https://download.quran.islamway.net/quran3/1/031.mp3", image: "", category: "رقائق", duration: "55:00" },
      { id: "aq2", scholar: "عائض القرني", title: "حتى تكون أسعد الناس", audioUrl: "https://download.quran.islamway.net/quran3/1/032.mp3", image: "", category: "تزكية", duration: "48:00" },
      { id: "aq3", scholar: "عائض القرني", title: "المفلحون", audioUrl: "https://download.quran.islamway.net/quran3/1/033.mp3", image: "", category: "رقائق", duration: "42:00" },
      { id: "aq4", scholar: "عائض القرني", title: "أعظم سجين في التاريخ", audioUrl: "https://download.quran.islamway.net/quran3/1/034.mp3", image: "", category: "قصص", duration: "50:00" },
      { id: "aq5", scholar: "عائض القرني", title: "قصائد دعوية", audioUrl: "https://download.quran.islamway.net/quran3/1/035.mp3", image: "", category: "أدب", duration: "35:00" },
    ],
  },
  {
    id: "ratib", name: "محمد راتب النابلسي", image: "", specialty: "التفسير والعلم والإيمان",
    lectures: [
      { id: "rn1", scholar: "محمد راتب النابلسي", title: "العقيدة والإعجاز - الكون", audioUrl: "https://download.quran.islamway.net/quran3/1/036.mp3", image: "", category: "عقيدة", duration: "55:00" },
      { id: "rn2", scholar: "محمد راتب النابلسي", title: "أسماء الله الحسنى", audioUrl: "https://download.quran.islamway.net/quran3/1/037.mp3", image: "", category: "عقيدة", duration: "60:00" },
      { id: "rn3", scholar: "محمد راتب النابلسي", title: "تفسير سورة الحجرات", audioUrl: "https://download.quran.islamway.net/quran3/1/049.mp3", image: "", category: "تفسير", duration: "45:00" },
      { id: "rn4", scholar: "محمد راتب النابلسي", title: "التربية الإسلامية", audioUrl: "https://download.quran.islamway.net/quran3/1/038.mp3", image: "", category: "تربية", duration: "52:00" },
      { id: "rn5", scholar: "محمد راتب النابلسي", title: "الإعجاز العلمي في القرآن", audioUrl: "https://download.quran.islamway.net/quran3/1/039.mp3", image: "", category: "إعجاز", duration: "48:00" },
      { id: "rn6", scholar: "محمد راتب النابلسي", title: "موضوعات أخلاقية", audioUrl: "https://download.quran.islamway.net/quran3/1/040.mp3", image: "", category: "تزكية", duration: "40:00" },
    ],
  },
  {
    id: "omar", name: "عمر عبد الكافي", image: "", specialty: "الدعوة والقصص",
    lectures: [
      { id: "ok1", scholar: "عمر عبد الكافي", title: "الوعد الحق - القبر", audioUrl: "https://download.quran.islamway.net/quran3/1/041.mp3", image: "", category: "رقائق", duration: "55:00" },
      { id: "ok2", scholar: "عمر عبد الكافي", title: "الدار الآخرة", audioUrl: "https://download.quran.islamway.net/quran3/1/042.mp3", image: "", category: "رقائق", duration: "50:00" },
      { id: "ok3", scholar: "عمر عبد الكافي", title: "صفات عباد الرحمن", audioUrl: "https://download.quran.islamway.net/quran3/1/025.mp3", image: "", category: "تزكية", duration: "48:00" },
      { id: "ok4", scholar: "عمر عبد الكافي", title: "الطريق إلى الجنة", audioUrl: "https://download.quran.islamway.net/quran3/1/043.mp3", image: "", category: "رقائق", duration: "52:00" },
    ],
  },
  {
    id: "salman", name: "سلمان العودة", image: "", specialty: "الفكر الإسلامي",
    lectures: [
      { id: "sa1", scholar: "سلمان العودة", title: "أسئلة العصر", audioUrl: "https://download.quran.islamway.net/quran3/1/044.mp3", image: "", category: "فكر", duration: "48:00" },
      { id: "sa2", scholar: "سلمان العودة", title: "مع النبي", audioUrl: "https://download.quran.islamway.net/quran3/1/045.mp3", image: "", category: "سيرة", duration: "55:00" },
      { id: "sa3", scholar: "سلمان العودة", title: "طفولة قلب", audioUrl: "https://download.quran.islamway.net/quran3/1/046.mp3", image: "", category: "تزكية", duration: "42:00" },
    ],
  },
  {
    id: "ghamdi", name: "سعيد الغامدي", image: "", specialty: "التزكية والرقائق",
    lectures: [
      { id: "sg1", scholar: "سعيد الغامدي", title: "حصن المسلم", audioUrl: "https://download.quran.islamway.net/quran3/1/047.mp3", image: "", category: "أذكار", duration: "40:00" },
      { id: "sg2", scholar: "سعيد الغامدي", title: "الرقية الشرعية", audioUrl: "https://download.quran.islamway.net/quran3/1/048.mp3", image: "", category: "رقية", duration: "35:00" },
      { id: "sg3", scholar: "سعيد الغامدي", title: "دروس في التزكية", audioUrl: "https://download.quran.islamway.net/quran3/1/050.mp3", image: "", category: "تزكية", duration: "50:00" },
    ],
  },
  {
    id: "jibreen", name: "عبدالله الجبرين", image: "", specialty: "الفقه والفتاوى",
    lectures: [
      { id: "jb1", scholar: "عبدالله الجبرين", title: "شرح عمدة الأحكام", audioUrl: "https://download.quran.islamway.net/quran3/1/051.mp3", image: "", category: "فقه", duration: "58:00" },
      { id: "jb2", scholar: "عبدالله الجبرين", title: "فتاوى منار الإسلام", audioUrl: "https://download.quran.islamway.net/quran3/1/052.mp3", image: "", category: "فتاوى", duration: "45:00" },
    ],
  },
  {
    id: "albani", name: "محمد ناصر الدين الألباني", image: "", specialty: "الحديث والتحقيق",
    lectures: [
      { id: "al1", scholar: "محمد ناصر الدين الألباني", title: "سلسلة الهدى والنور", audioUrl: "https://download.quran.islamway.net/quran3/1/053.mp3", image: "", category: "حديث", duration: "65:00" },
      { id: "al2", scholar: "محمد ناصر الدين الألباني", title: "صفة صلاة النبي", audioUrl: "https://download.quran.islamway.net/quran3/1/054.mp3", image: "", category: "فقه", duration: "55:00" },
      { id: "al3", scholar: "محمد ناصر الدين الألباني", title: "التوسل أنواعه وأحكامه", audioUrl: "https://download.quran.islamway.net/quran3/1/055.mp3", image: "", category: "عقيدة", duration: "48:00" },
      { id: "al4", scholar: "محمد ناصر الدين الألباني", title: "أحكام الجنائز", audioUrl: "https://download.quran.islamway.net/quran3/1/056.mp3", image: "", category: "فقه", duration: "42:00" },
    ],
  },
  {
    id: "huwaini", name: "أبو إسحاق الحويني", image: "", specialty: "الحديث والسنة",
    lectures: [
      { id: "hw1", scholar: "أبو إسحاق الحويني", title: "فصل الخطاب في سيرة ابن الخطاب", audioUrl: "https://download.quran.islamway.net/quran3/1/057.mp3", image: "", category: "سيرة", duration: "62:00" },
      { id: "hw2", scholar: "أبو إسحاق الحويني", title: "بستان الأحاديث الصحيحة", audioUrl: "https://download.quran.islamway.net/quran3/1/058.mp3", image: "", category: "حديث", duration: "55:00" },
      { id: "hw3", scholar: "أبو إسحاق الحويني", title: "النهج السديد", audioUrl: "https://download.quran.islamway.net/quran3/1/059.mp3", image: "", category: "عقيدة", duration: "50:00" },
    ],
  },
  {
    id: "yaqoubi", name: "محمد الحسن الددو", image: "", specialty: "العلوم الشرعية",
    lectures: [
      { id: "dd1", scholar: "محمد الحسن الددو", title: "أصول الفقه", audioUrl: "https://download.quran.islamway.net/quran3/1/060.mp3", image: "", category: "أصول", duration: "58:00" },
      { id: "dd2", scholar: "محمد الحسن الددو", title: "علم المصطلح", audioUrl: "https://download.quran.islamway.net/quran3/1/061.mp3", image: "", category: "حديث", duration: "52:00" },
      { id: "dd3", scholar: "محمد الحسن الددو", title: "فقه المعاملات", audioUrl: "https://download.quran.islamway.net/quran3/1/062.mp3", image: "", category: "فقه", duration: "45:00" },
    ],
  },
  {
    id: "mukhtar", name: "مصطفى العدوي", image: "", specialty: "التفسير والحديث",
    lectures: [
      { id: "mw1", scholar: "مصطفى العدوي", title: "تفسير جزء عم", audioUrl: "https://download.quran.islamway.net/quran3/1/078.mp3", image: "", category: "تفسير", duration: "55:00" },
      { id: "mw2", scholar: "مصطفى العدوي", title: "سلسلة أحكام النساء", audioUrl: "https://download.quran.islamway.net/quran3/1/063.mp3", image: "", category: "فقه", duration: "48:00" },
      { id: "mw3", scholar: "مصطفى العدوي", title: "الجامع لأحكام القرآن", audioUrl: "https://download.quran.islamway.net/quran3/1/064.mp3", image: "", category: "تفسير", duration: "60:00" },
    ],
  },
  {
    id: "shanqiti", name: "محمد المختار الشنقيطي", image: "", specialty: "الفقه وشرح الزاد",
    lectures: [
      { id: "sh_q1", scholar: "محمد المختار الشنقيطي", title: "شرح زاد المستقنع - الطهارة", audioUrl: "https://download.quran.islamway.net/quran3/1/065.mp3", image: "", category: "فقه", duration: "65:00" },
      { id: "sh_q2", scholar: "محمد المختار الشنقيطي", title: "شرح زاد المستقنع - الصلاة", audioUrl: "https://download.quran.islamway.net/quran3/1/066.mp3", image: "", category: "فقه", duration: "70:00" },
      { id: "sh_q3", scholar: "محمد المختار الشنقيطي", title: "دروس في أصول الفقه", audioUrl: "https://download.quran.islamway.net/quran3/1/067.mp3", image: "", category: "أصول", duration: "55:00" },
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
