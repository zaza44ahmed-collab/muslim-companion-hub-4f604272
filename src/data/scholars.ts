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

// islamhouse.com audio
const islamhouse = (lang: string, file: string) => `https://download.islamhouse.com/data/${lang}/audios/${file}`;

export const scholars: Scholar[] = [
  {
    id: "binbaz", name: "عبد العزيز بن باز", image: "", specialty: "الفتاوى والعقيدة",
    lectures: [
      { id: "bb1", scholar: "عبد العزيز بن باز", title: "شرح العقيدة الواسطية - الدرس 1", audioUrl: archive("binbaz_wasitiyyah", "01.mp3"), image: "", category: "عقيدة", duration: "60:00" },
      { id: "bb2", scholar: "عبد العزيز بن باز", title: "فتاوى نور على الدرب - 1", audioUrl: archive("noor_ala_aldarb_binbaz", "001.mp3"), image: "", category: "فتاوى", duration: "45:00" },
      { id: "bb3", scholar: "عبد العزيز بن باز", title: "شرح كشف الشبهات", audioUrl: archive("binbaz_kashf_shubhat", "01.mp3"), image: "", category: "عقيدة", duration: "52:00" },
      { id: "bb4", scholar: "عبد العزيز بن باز", title: "شرح الأصول الثلاثة", audioUrl: archive("binbaz_osool_thalatha", "01.mp3"), image: "", category: "عقيدة", duration: "48:00" },
      { id: "bb5", scholar: "عبد العزيز بن باز", title: "الدروس المهمة لعامة الأمة", audioUrl: archive("binbaz_doross_muhimma", "01.mp3"), image: "", category: "فقه", duration: "55:00" },
      { id: "bb6", scholar: "عبد العزيز بن باز", title: "شرح كتاب التوحيد", audioUrl: archive("binbaz_kitab_tawheed", "01.mp3"), image: "", category: "عقيدة", duration: "65:00" },
    ],
  },
  {
    id: "uthaymeen", name: "محمد بن صالح العثيمين", image: "", specialty: "الفقه والأصول",
    lectures: [
      { id: "ut1", scholar: "محمد بن صالح العثيمين", title: "شرح رياض الصالحين", audioUrl: archive("uthaymeen_riyadh_saliheen", "001.mp3"), image: "", category: "فقه", duration: "55:00" },
      { id: "ut2", scholar: "محمد بن صالح العثيمين", title: "شرح الأصول الثلاثة", audioUrl: archive("uthaymeen_osool_thalatha", "01.mp3"), image: "", category: "عقيدة", duration: "50:00" },
      { id: "ut3", scholar: "محمد بن صالح العثيمين", title: "شرح العقيدة الواسطية", audioUrl: archive("uthaymeen_wasitiyyah", "01.mp3"), image: "", category: "عقيدة", duration: "65:00" },
      { id: "ut4", scholar: "محمد بن صالح العثيمين", title: "شرح بلوغ المرام", audioUrl: archive("uthaymeen_bulugh_maram", "001.mp3"), image: "", category: "حديث", duration: "58:00" },
      { id: "ut5", scholar: "محمد بن صالح العثيمين", title: "شرح زاد المستقنع", audioUrl: archive("uthaymeen_zad_mustaqni", "001.mp3"), image: "", category: "فقه", duration: "70:00" },
      { id: "ut6", scholar: "محمد بن صالح العثيمين", title: "لقاء الباب المفتوح", audioUrl: archive("uthaymeen_bab_maftuh", "001.mp3"), image: "", category: "فتاوى", duration: "45:00" },
      { id: "ut7", scholar: "محمد بن صالح العثيمين", title: "شرح كتاب التوحيد", audioUrl: archive("uthaymeen_kitab_tawheed", "01.mp3"), image: "", category: "عقيدة", duration: "55:00" },
    ],
  },
  {
    id: "fawzan", name: "صالح الفوزان", image: "", specialty: "العقيدة والفقه",
    lectures: [
      { id: "fw1", scholar: "صالح الفوزان", title: "شرح كتاب التوحيد", audioUrl: archive("fawzan_kitab_tawheed", "01.mp3"), image: "", category: "عقيدة", duration: "48:00" },
      { id: "fw2", scholar: "صالح الفوزان", title: "شرح لمعة الاعتقاد", audioUrl: archive("fawzan_lumat_itiqad", "01.mp3"), image: "", category: "عقيدة", duration: "52:00" },
      { id: "fw3", scholar: "صالح الفوزان", title: "إعانة المستفيد", audioUrl: archive("fawzan_ianat_mustafid", "01.mp3"), image: "", category: "فقه", duration: "55:00" },
      { id: "fw4", scholar: "صالح الفوزان", title: "شرح الأربعين النووية", audioUrl: archive("fawzan_arbaeen", "01.mp3"), image: "", category: "حديث", duration: "42:00" },
      { id: "fw5", scholar: "صالح الفوزان", title: "التحذير من البدع", audioUrl: archive("fawzan_tahdhir_bidaa", "01.mp3"), image: "", category: "عقيدة", duration: "38:00" },
    ],
  },
  {
    id: "albani", name: "محمد ناصر الدين الألباني", image: "", specialty: "الحديث والتحقيق",
    lectures: [
      { id: "al1", scholar: "محمد ناصر الدين الألباني", title: "سلسلة الهدى والنور - 1", audioUrl: archive("silsilat_alhuda_wannur", "001.mp3"), image: "", category: "حديث", duration: "65:00" },
      { id: "al2", scholar: "محمد ناصر الدين الألباني", title: "صفة صلاة النبي", audioUrl: archive("albani_sifat_salat", "01.mp3"), image: "", category: "فقه", duration: "55:00" },
      { id: "al3", scholar: "محمد ناصر الدين الألباني", title: "التوسل أنواعه وأحكامه", audioUrl: archive("albani_tawassul", "01.mp3"), image: "", category: "عقيدة", duration: "48:00" },
      { id: "al4", scholar: "محمد ناصر الدين الألباني", title: "أحكام الجنائز", audioUrl: archive("albani_janaaiz", "01.mp3"), image: "", category: "فقه", duration: "42:00" },
    ],
  },
  {
    id: "raslan", name: "محمد سعيد رسلان", image: "", specialty: "السنة والمنهج",
    lectures: [
      { id: "rs1", scholar: "محمد سعيد رسلان", title: "الطريق إلى العزة والتمكين", audioUrl: archive("raslan_izza_tamkeen", "01.mp3"), image: "", category: "منهج", duration: "55:00" },
      { id: "rs2", scholar: "محمد سعيد رسلان", title: "حقيقة الإيمان", audioUrl: archive("raslan_haqiqat_iman", "01.mp3"), image: "", category: "عقيدة", duration: "48:00" },
      { id: "rs3", scholar: "محمد سعيد رسلان", title: "التحذير من الفتن", audioUrl: archive("raslan_tahdhir_fitan", "01.mp3"), image: "", category: "منهج", duration: "52:00" },
      { id: "rs4", scholar: "محمد سعيد رسلان", title: "أهمية طلب العلم", audioUrl: archive("raslan_talab_ilm", "01.mp3"), image: "", category: "منهج", duration: "45:00" },
    ],
  },
  {
    id: "abdulrazzaq", name: "عبد الرزاق البدر", image: "", specialty: "العقيدة والتوحيد",
    lectures: [
      { id: "ar1", scholar: "عبد الرزاق البدر", title: "فقه الأسماء الحسنى", audioUrl: archive("abdulrazzaq_asma_husna", "01.mp3"), image: "", category: "عقيدة", duration: "58:00" },
      { id: "ar2", scholar: "عبد الرزاق البدر", title: "توحيد الأسماء والصفات", audioUrl: archive("abdulrazzaq_tawheed_sifat", "01.mp3"), image: "", category: "عقيدة", duration: "55:00" },
      { id: "ar3", scholar: "عبد الرزاق البدر", title: "فوائد من كتاب التوحيد", audioUrl: archive("abdulrazzaq_fawaid_tawheed", "01.mp3"), image: "", category: "عقيدة", duration: "42:00" },
    ],
  },
  {
    id: "suhaimi", name: "عبد السلام السحيمي", image: "", specialty: "العقيدة والمنهج",
    lectures: [
      { id: "sh1", scholar: "عبد السلام السحيمي", title: "شرح نواقض الإسلام", audioUrl: archive("suhaimi_nawaqid", "01.mp3"), image: "", category: "عقيدة", duration: "45:00" },
      { id: "sh2", scholar: "عبد السلام السحيمي", title: "التحذير من الشرك", audioUrl: archive("suhaimi_shirk", "01.mp3"), image: "", category: "عقيدة", duration: "40:00" },
      { id: "sh3", scholar: "عبد السلام السحيمي", title: "منهج أهل السنة والجماعة", audioUrl: archive("suhaimi_manhaj", "01.mp3"), image: "", category: "منهج", duration: "52:00" },
    ],
  },
  {
    id: "ramzan", name: "محمد بن رمزان الهاجري", image: "", specialty: "الفقه والدعوة",
    lectures: [
      { id: "rm1", scholar: "محمد بن رمزان الهاجري", title: "شرح منظومة القواعد الفقهية", audioUrl: archive("ramzan_qawaid", "01.mp3"), image: "", category: "فقه", duration: "55:00" },
      { id: "rm2", scholar: "محمد بن رمزان الهاجري", title: "التربية على المنهج", audioUrl: archive("ramzan_tarbiya", "01.mp3"), image: "", category: "منهج", duration: "48:00" },
      { id: "rm3", scholar: "محمد بن رمزان الهاجري", title: "آداب طالب العلم", audioUrl: archive("ramzan_adab_talib", "01.mp3"), image: "", category: "منهج", duration: "40:00" },
    ],
  },
  {
    id: "binghaieth", name: "أحمد بن غيث", image: "", specialty: "العقيدة والمنهج",
    lectures: [
      { id: "bg1", scholar: "أحمد بن غيث", title: "أصول أهل السنة", audioUrl: archive("binghaieth_osool", "01.mp3"), image: "", category: "عقيدة", duration: "50:00" },
      { id: "bg2", scholar: "أحمد بن غيث", title: "نصائح للشباب", audioUrl: archive("binghaieth_nasaih", "01.mp3"), image: "", category: "تزكية", duration: "35:00" },
    ],
  },
  {
    id: "saleh_alsheikh", name: "صالح آل الشيخ", image: "", specialty: "العقيدة والتفسير",
    lectures: [
      { id: "ss1", scholar: "صالح آل الشيخ", title: "شرح كتاب التوحيد", audioUrl: archive("saleh_alsheikh_tawheed", "01.mp3"), image: "", category: "عقيدة", duration: "65:00" },
      { id: "ss2", scholar: "صالح آل الشيخ", title: "التمهيد لشرح كتاب التوحيد", audioUrl: archive("saleh_alsheikh_tamheed", "01.mp3"), image: "", category: "عقيدة", duration: "58:00" },
      { id: "ss3", scholar: "صالح آل الشيخ", title: "شرح الطحاوية", audioUrl: archive("saleh_alsheikh_tahawiya", "01.mp3"), image: "", category: "عقيدة", duration: "70:00" },
    ],
  },
  {
    id: "ferkous", name: "محمد علي فركوس", image: "", specialty: "الفقه والأصول",
    lectures: [
      { id: "fk1", scholar: "محمد علي فركوس", title: "قواعد فقهية", audioUrl: archive("ferkous_qawaid_fiqhiya", "01.mp3"), image: "", category: "فقه", duration: "55:00" },
      { id: "fk2", scholar: "محمد علي فركوس", title: "فتاوى في العبادات", audioUrl: archive("ferkous_fatawa", "01.mp3"), image: "", category: "فتاوى", duration: "42:00" },
      { id: "fk3", scholar: "محمد علي فركوس", title: "أحكام المعاملات", audioUrl: archive("ferkous_muamalat", "01.mp3"), image: "", category: "فقه", duration: "48:00" },
    ],
  },
  {
    id: "abdulmajid", name: "عبد المجيد جمعة", image: "", specialty: "العقيدة والمنهج",
    lectures: [
      { id: "mj1", scholar: "عبد المجيد جمعة", title: "التوحيد أولاً", audioUrl: archive("abdulmajid_tawheed", "01.mp3"), image: "", category: "عقيدة", duration: "45:00" },
      { id: "mj2", scholar: "عبد المجيد جمعة", title: "الرد على أهل البدع", audioUrl: archive("abdulmajid_radd_bidaa", "01.mp3"), image: "", category: "منهج", duration: "50:00" },
    ],
  },
  {
    id: "lazhar", name: "لزهر سنيقرة", image: "", specialty: "الدعوة والمنهج",
    lectures: [
      { id: "lz1", scholar: "لزهر سنيقرة", title: "نصائح وتوجيهات", audioUrl: archive("lazhar_nasaih", "01.mp3"), image: "", category: "دعوة", duration: "40:00" },
      { id: "lz2", scholar: "لزهر سنيقرة", title: "فضل العلم وأهل العلم", audioUrl: archive("lazhar_fadl_ilm", "01.mp3"), image: "", category: "منهج", duration: "35:00" },
      { id: "lz3", scholar: "لزهر سنيقرة", title: "التحذير من الفتن", audioUrl: archive("lazhar_fitan", "01.mp3"), image: "", category: "منهج", duration: "42:00" },
    ],
  },
  {
    id: "usaimi", name: "صالح العصيمي", image: "", specialty: "الفقه والحديث",
    lectures: [
      { id: "us1", scholar: "صالح العصيمي", title: "شرح الأربعين النووية", audioUrl: archive("usaimi_arbaeen", "01.mp3"), image: "", category: "حديث", duration: "55:00" },
      { id: "us2", scholar: "صالح العصيمي", title: "شرح نخبة الفكر", audioUrl: archive("usaimi_nukhba", "01.mp3"), image: "", category: "حديث", duration: "50:00" },
    ],
  },
  {
    id: "luhaydan", name: "صالح اللحيدان", image: "", specialty: "القضاء والفتوى",
    lectures: [
      { id: "lh1", scholar: "صالح اللحيدان", title: "فتاوى القضاء", audioUrl: archive("luhaydan_fatawa", "01.mp3"), image: "", category: "فتاوى", duration: "45:00" },
      { id: "lh2", scholar: "صالح اللحيدان", title: "أحكام البيوع", audioUrl: archive("luhaydan_buyoo", "01.mp3"), image: "", category: "فقه", duration: "50:00" },
    ],
  },
  {
    id: "shuwair", name: "سعد الشويعر", image: "", specialty: "الفقه والمواريث",
    lectures: [
      { id: "sw1", scholar: "سعد الشويعر", title: "أحكام المواريث", audioUrl: archive("shuwair_mawarith", "01.mp3"), image: "", category: "فقه", duration: "55:00" },
      { id: "sw2", scholar: "سعد الشويعر", title: "فقه الأسرة", audioUrl: archive("shuwair_usra", "01.mp3"), image: "", category: "فقه", duration: "48:00" },
    ],
  },
  {
    id: "madkhali", name: "ربيع المدخلي", image: "", specialty: "الحديث والمنهج",
    lectures: [
      { id: "md1", scholar: "ربيع المدخلي", title: "منهج أهل السنة في النقد", audioUrl: archive("madkhali_manhaj_naqd", "01.mp3"), image: "", category: "منهج", duration: "52:00" },
      { id: "md2", scholar: "ربيع المدخلي", title: "أهل الحديث هم الطائفة المنصورة", audioUrl: archive("madkhali_taifa", "01.mp3"), image: "", category: "منهج", duration: "48:00" },
      { id: "md3", scholar: "ربيع المدخلي", title: "التحذير من الحزبية", audioUrl: archive("madkhali_hizbiya", "01.mp3"), image: "", category: "منهج", duration: "40:00" },
    ],
  },
  {
    id: "khamis", name: "عثمان الخميس", image: "", specialty: "العقيدة والتاريخ الإسلامي",
    lectures: [
      { id: "k1", scholar: "عثمان الخميس", title: "قصة بداية الخلق", audioUrl: archive("khamis_bidayat_khalq", "01.mp3"), image: "", category: "قصص", duration: "45:00" },
      { id: "k2", scholar: "عثمان الخميس", title: "سيرة الخلفاء الراشدين", audioUrl: archive("khamis_khulafa", "01.mp3"), image: "", category: "تاريخ", duration: "55:00" },
      { id: "k3", scholar: "عثمان الخميس", title: "الفرق والمذاهب", audioUrl: archive("khamis_firaq", "01.mp3"), image: "", category: "عقيدة", duration: "48:00" },
    ],
  },
  {
    id: "hassan", name: "محمد حسان", image: "", specialty: "الدعوة والتزكية",
    lectures: [
      { id: "h1", scholar: "محمد حسان", title: "التوبة النصوح", audioUrl: archive("hassan_tawba", "01.mp3"), image: "", category: "تزكية", duration: "52:00" },
      { id: "h2", scholar: "محمد حسان", title: "أهوال يوم القيامة", audioUrl: archive("hassan_ahwal_qiyama", "01.mp3"), image: "", category: "رقائق", duration: "48:00" },
      { id: "h3", scholar: "محمد حسان", title: "حقيقة الدنيا", audioUrl: archive("hassan_haqiqat_dunya", "01.mp3"), image: "", category: "رقائق", duration: "55:00" },
    ],
  },
  {
    id: "arifi", name: "محمد العريفي", image: "", specialty: "السيرة النبوية",
    lectures: [
      { id: "a1", scholar: "محمد العريفي", title: "نهاية العالم", audioUrl: archive("arifi_nihayat_alam", "01.mp3"), image: "", category: "رقائق", duration: "55:00" },
      { id: "a2", scholar: "محمد العريفي", title: "قصص الأنبياء", audioUrl: archive("arifi_qisas_anbiya", "01.mp3"), image: "", category: "قصص", duration: "42:00" },
      { id: "a3", scholar: "محمد العريفي", title: "السيرة النبوية", audioUrl: archive("arifi_sira", "01.mp3"), image: "", category: "سيرة", duration: "60:00" },
    ],
  },
  {
    id: "awadi", name: "نبيل العوضي", image: "", specialty: "قصص القرآن",
    lectures: [
      { id: "w1", scholar: "نبيل العوضي", title: "قصة أصحاب الكهف", audioUrl: archive("awadi_kahf", "01.mp3"), image: "", category: "قصص", duration: "60:00" },
      { id: "w2", scholar: "نبيل العوضي", title: "قصة يوسف عليه السلام", audioUrl: archive("awadi_yusuf", "01.mp3"), image: "", category: "قصص", duration: "65:00" },
      { id: "w3", scholar: "نبيل العوضي", title: "قصة موسى وفرعون", audioUrl: archive("awadi_musa", "01.mp3"), image: "", category: "قصص", duration: "70:00" },
      { id: "w4", scholar: "نبيل العوضي", title: "قصة إبراهيم عليه السلام", audioUrl: archive("awadi_ibrahim", "01.mp3"), image: "", category: "قصص", duration: "55:00" },
    ],
  },
  {
    id: "shaarawy", name: "محمد متولي الشعراوي", image: "", specialty: "التفسير والخواطر",
    lectures: [
      { id: "sw_l1", scholar: "محمد متولي الشعراوي", title: "خواطر إيمانية - سورة الفاتحة", audioUrl: archive("shaarawy_khawatir_fatiha", "01.mp3"), image: "", category: "تفسير", duration: "70:00" },
      { id: "sw_l2", scholar: "محمد متولي الشعراوي", title: "معجزات القرآن", audioUrl: archive("shaarawy_mujizat", "01.mp3"), image: "", category: "تفسير", duration: "55:00" },
      { id: "sw_l3", scholar: "محمد متولي الشعراوي", title: "خواطر - سورة البقرة", audioUrl: archive("shaarawy_khawatir_baqara", "01.mp3"), image: "", category: "تفسير", duration: "75:00" },
    ],
  },
  {
    id: "ratib", name: "محمد راتب النابلسي", image: "", specialty: "التفسير والعلم والإيمان",
    lectures: [
      { id: "rn1", scholar: "محمد راتب النابلسي", title: "أسماء الله الحسنى", audioUrl: archive("nabulsi_asma_husna", "01.mp3"), image: "", category: "عقيدة", duration: "60:00" },
      { id: "rn2", scholar: "محمد راتب النابلسي", title: "الإعجاز العلمي في القرآن", audioUrl: archive("nabulsi_ijaz_ilmi", "01.mp3"), image: "", category: "إعجاز", duration: "48:00" },
      { id: "rn3", scholar: "محمد راتب النابلسي", title: "التربية الإسلامية", audioUrl: archive("nabulsi_tarbiya", "01.mp3"), image: "", category: "تربية", duration: "52:00" },
    ],
  },
  {
    id: "mughamsi", name: "صالح المغامسي", image: "", specialty: "التفسير والفقه",
    lectures: [
      { id: "m1", scholar: "صالح المغامسي", title: "تأملات في سورة الكهف", audioUrl: archive("mughamsi_kahf", "01.mp3"), image: "", category: "تفسير", duration: "50:00" },
      { id: "m2", scholar: "صالح المغامسي", title: "تفسير سورة يس", audioUrl: archive("mughamsi_yasin", "01.mp3"), image: "", category: "تفسير", duration: "48:00" },
      { id: "m3", scholar: "صالح المغامسي", title: "تفسير سورة الرحمن", audioUrl: archive("mughamsi_rahman", "01.mp3"), image: "", category: "تفسير", duration: "42:00" },
    ],
  },
  {
    id: "huwaini", name: "أبو إسحاق الحويني", image: "", specialty: "الحديث والسنة",
    lectures: [
      { id: "hw1", scholar: "أبو إسحاق الحويني", title: "فصل الخطاب في سيرة ابن الخطاب", audioUrl: archive("huwaini_omar", "01.mp3"), image: "", category: "سيرة", duration: "62:00" },
      { id: "hw2", scholar: "أبو إسحاق الحويني", title: "بستان الأحاديث الصحيحة", audioUrl: archive("huwaini_bustan", "01.mp3"), image: "", category: "حديث", duration: "55:00" },
    ],
  },
  {
    id: "muneef", name: "محمد المنجد", image: "", specialty: "الفتاوى والأحكام",
    lectures: [
      { id: "mn1", scholar: "محمد المنجد", title: "سلسلة أعمال القلوب", audioUrl: archive("munajjid_amal_qulub", "01.mp3"), image: "", category: "تزكية", duration: "42:00" },
      { id: "mn2", scholar: "محمد المنجد", title: "آداب طالب العلم", audioUrl: archive("munajjid_adab_talib", "01.mp3"), image: "", category: "تزكية", duration: "38:00" },
      { id: "mn3", scholar: "محمد المنجد", title: "محاسبة النفس", audioUrl: archive("munajjid_muhasaba", "01.mp3"), image: "", category: "تزكية", duration: "44:00" },
    ],
  },
  {
    id: "aidh", name: "عائض القرني", image: "", specialty: "الدعوة والأدب الإسلامي",
    lectures: [
      { id: "aq1", scholar: "عائض القرني", title: "لا تحزن", audioUrl: archive("aidh_la_tahzan", "01.mp3"), image: "", category: "رقائق", duration: "55:00" },
      { id: "aq2", scholar: "عائض القرني", title: "حتى تكون أسعد الناس", audioUrl: archive("aidh_asaad_nas", "01.mp3"), image: "", category: "تزكية", duration: "48:00" },
    ],
  },
  {
    id: "omar", name: "عمر عبد الكافي", image: "", specialty: "الدعوة والقصص",
    lectures: [
      { id: "ok1", scholar: "عمر عبد الكافي", title: "الوعد الحق - القبر", audioUrl: archive("omar_waad_haq", "01.mp3"), image: "", category: "رقائق", duration: "55:00" },
      { id: "ok2", scholar: "عمر عبد الكافي", title: "الدار الآخرة", audioUrl: archive("omar_dar_akhira", "01.mp3"), image: "", category: "رقائق", duration: "50:00" },
    ],
  },
  {
    id: "shanqiti", name: "محمد المختار الشنقيطي", image: "", specialty: "الفقه وشرح الزاد",
    lectures: [
      { id: "sh_q1", scholar: "محمد المختار الشنقيطي", title: "شرح زاد المستقنع - الطهارة", audioUrl: archive("shanqiti_zad_tahara", "01.mp3"), image: "", category: "فقه", duration: "65:00" },
      { id: "sh_q2", scholar: "محمد المختار الشنقيطي", title: "شرح زاد المستقنع - الصلاة", audioUrl: archive("shanqiti_zad_salat", "01.mp3"), image: "", category: "فقه", duration: "70:00" },
      { id: "sh_q3", scholar: "محمد المختار الشنقيطي", title: "دروس في أصول الفقه", audioUrl: archive("shanqiti_usool_fiqh", "01.mp3"), image: "", category: "أصول", duration: "55:00" },
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

// Azkar audio content
export const azkarAudio: AudioSectionItem[] = [
  { id: "az1", title: "أذكار الصباح كاملة", artist: "مشاري العفاسي", audioUrl: "https://server8.mp3quran.net/afs/001.mp3", category: "أذكار الصباح", duration: "15:00" },
  { id: "az2", title: "أذكار المساء كاملة", artist: "مشاري العفاسي", audioUrl: "https://server8.mp3quran.net/afs/002.mp3", category: "أذكار المساء", duration: "14:00" },
  { id: "az3", title: "أذكار النوم", artist: "سعد الغامدي", audioUrl: "https://server7.mp3quran.net/s_gmd/067.mp3", category: "أذكار النوم", duration: "10:00" },
  { id: "az4", title: "أذكار بعد الصلاة", artist: "ماهر المعيقلي", audioUrl: "https://server12.mp3quran.net/maher/033.mp3", category: "أذكار الصلاة", duration: "8:00" },
  { id: "az5", title: "الرقية الشرعية", artist: "سعود الشريم", audioUrl: "https://server7.mp3quran.net/shuraim/002.mp3", category: "رقية", duration: "25:00" },
  { id: "az6", title: "آية الكرسي مكررة", artist: "عبد الباسط عبد الصمد", audioUrl: "https://server7.mp3quran.net/basit/002.mp3", category: "أذكار", duration: "12:00" },
  { id: "az7", title: "سورة الملك - حفظ من عذاب القبر", artist: "أحمد العجمي", audioUrl: "https://server10.mp3quran.net/ajm/067.mp3", category: "أذكار النوم", duration: "11:00" },
  { id: "az8", title: "المعوذتان مكررة", artist: "الحصري", audioUrl: "https://server13.mp3quran.net/husr/113.mp3", category: "رقية", duration: "8:00" },
];

// Khutab (Friday sermons) audio
export const khutabAudio: AudioSectionItem[] = [
  { id: "kh1", title: "خطبة عن التوبة", artist: "عبد المحسن القاسم", audioUrl: "https://server11.mp3quran.net/sds/009.mp3", category: "خطب", duration: "35:00" },
  { id: "kh2", title: "خطبة عن الصبر", artist: "صالح الفوزان", audioUrl: "https://server11.mp3quran.net/sds/012.mp3", category: "خطب", duration: "30:00" },
  { id: "kh3", title: "خطبة عن بر الوالدين", artist: "عبد العزيز الطريفي", audioUrl: "https://server11.mp3quran.net/sds/017.mp3", category: "خطب", duration: "28:00" },
  { id: "kh4", title: "خطبة عن حسن الخلق", artist: "سعد الشثري", audioUrl: "https://server11.mp3quran.net/sds/031.mp3", category: "خطب", duration: "32:00" },
  { id: "kh5", title: "خطبة عن فضل الصلاة", artist: "سلمان العودة", audioUrl: "https://server11.mp3quran.net/sds/036.mp3", category: "خطب", duration: "30:00" },
  { id: "kh6", title: "خطبة عن الإخلاص", artist: "محمد العريفي", audioUrl: "https://server11.mp3quran.net/sds/040.mp3", category: "خطب", duration: "34:00" },
];

// Stories of Prophets audio
export const storiesAudio: AudioSectionItem[] = [
  { id: "st1", title: "قصة آدم عليه السلام", artist: "نبيل العوضي", audioUrl: "https://server13.mp3quran.net/husr/002.mp3", category: "قصص الأنبياء", duration: "45:00" },
  { id: "st2", title: "قصة نوح عليه السلام", artist: "نبيل العوضي", audioUrl: "https://server13.mp3quran.net/husr/011.mp3", category: "قصص الأنبياء", duration: "50:00" },
  { id: "st3", title: "قصة إبراهيم عليه السلام", artist: "نبيل العوضي", audioUrl: "https://server13.mp3quran.net/husr/014.mp3", category: "قصص الأنبياء", duration: "55:00" },
  { id: "st4", title: "قصة يوسف عليه السلام", artist: "نبيل العوضي", audioUrl: "https://server13.mp3quran.net/husr/012.mp3", category: "قصص الأنبياء", duration: "65:00" },
  { id: "st5", title: "قصة موسى عليه السلام", artist: "عثمان الخميس", audioUrl: "https://server13.mp3quran.net/husr/020.mp3", category: "قصص الأنبياء", duration: "70:00" },
  { id: "st6", title: "قصة عيسى عليه السلام", artist: "عثمان الخميس", audioUrl: "https://server13.mp3quran.net/husr/019.mp3", category: "قصص الأنبياء", duration: "40:00" },
  { id: "st7", title: "قصة سليمان عليه السلام", artist: "نبيل العوضي", audioUrl: "https://server13.mp3quran.net/husr/027.mp3", category: "قصص الأنبياء", duration: "48:00" },
  { id: "st8", title: "قصة أيوب عليه السلام", artist: "نبيل العوضي", audioUrl: "https://server13.mp3quran.net/husr/021.mp3", category: "قصص الأنبياء", duration: "35:00" },
];

// Kids education audio
export const kidsAudio: AudioSectionItem[] = [
  { id: "kid1", title: "جزء عمّ للأطفال - سورة الناس", artist: "المصحف المعلم", audioUrl: "https://server8.mp3quran.net/afs/114.mp3", category: "قرآن للأطفال", duration: "3:00" },
  { id: "kid2", title: "جزء عمّ للأطفال - سورة الفلق", artist: "المصحف المعلم", audioUrl: "https://server8.mp3quran.net/afs/113.mp3", category: "قرآن للأطفال", duration: "2:00" },
  { id: "kid3", title: "جزء عمّ للأطفال - سورة الإخلاص", artist: "المصحف المعلم", audioUrl: "https://server8.mp3quran.net/afs/112.mp3", category: "قرآن للأطفال", duration: "1:30" },
  { id: "kid4", title: "جزء عمّ للأطفال - سورة الكوثر", artist: "المصحف المعلم", audioUrl: "https://server8.mp3quran.net/afs/108.mp3", category: "قرآن للأطفال", duration: "1:00" },
  { id: "kid5", title: "جزء عمّ للأطفال - سورة الفاتحة", artist: "المصحف المعلم", audioUrl: "https://server8.mp3quran.net/afs/001.mp3", category: "قرآن للأطفال", duration: "2:00" },
  { id: "kid6", title: "جزء عمّ للأطفال - سورة النصر", artist: "المصحف المعلم", audioUrl: "https://server8.mp3quran.net/afs/110.mp3", category: "قرآن للأطفال", duration: "1:30" },
  { id: "kid7", title: "جزء عمّ للأطفال - سورة العصر", artist: "المصحف المعلم", audioUrl: "https://server8.mp3quran.net/afs/103.mp3", category: "قرآن للأطفال", duration: "1:00" },
  { id: "kid8", title: "جزء عمّ للأطفال - سورة الضحى", artist: "المصحف المعلم", audioUrl: "https://server8.mp3quran.net/afs/093.mp3", category: "قرآن للأطفال", duration: "2:00" },
  { id: "kid9", title: "جزء عمّ للأطفال - سورة الشرح", artist: "المصحف المعلم", audioUrl: "https://server8.mp3quran.net/afs/094.mp3", category: "قرآن للأطفال", duration: "1:30" },
  { id: "kid10", title: "جزء عمّ للأطفال - سورة التين", artist: "المصحف المعلم", audioUrl: "https://server8.mp3quran.net/afs/095.mp3", category: "قرآن للأطفال", duration: "1:30" },
];

export const audioCategories = [
  { id: "quran", label: "القرآن الكريم", icon: "📖", color: "from-emerald-500/20 to-teal-500/20" },
  { id: "lectures", label: "الدروس والمحاضرات", icon: "🎓", color: "from-blue-500/20 to-indigo-500/20" },
  { id: "azkar", label: "الأذكار الصوتية", icon: "🤲", color: "from-amber-500/20 to-yellow-500/20" },
  { id: "khutab", label: "خطب الجمعة", icon: "🕌", color: "from-purple-500/20 to-violet-500/20" },
  { id: "stories", label: "قصص الأنبياء", icon: "📜", color: "from-rose-500/20 to-pink-500/20" },
  { id: "kids", label: "تعليم الأطفال", icon: "👶", color: "from-cyan-500/20 to-sky-500/20" },
];
