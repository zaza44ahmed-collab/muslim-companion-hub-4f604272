export interface AppItem {
  id: number;
  name: string;
  description: string;
  fullDescription: string;
  icon: string;
  size: string;
  downloads: string;
  rating: number;
  category: string;
  developer: string;
  version: string;
  lastUpdate: string;
  screenshots: string[];
  features: string[];
}

export const appCategories = [
  { id: "all", label: "الكل" },
  { id: "quran", label: "قرآن" },
  { id: "azkar", label: "أذكار" },
  { id: "fiqh", label: "فقه" },
  { id: "kids", label: "أطفال" },
  { id: "prayer", label: "صلاة" },
];

export const apps: AppItem[] = [
  {
    id: 1,
    name: "أذكار المسلم",
    description: "أذكار الصباح والمساء مع التنبيهات",
    fullDescription: "تطبيق أذكار المسلم هو تطبيق شامل يحتوي على أذكار الصباح والمساء وأذكار ما بعد الصلاة وأذكار النوم والاستيقاظ وغيرها الكثير. يتميز التطبيق بواجهة سهلة الاستخدام مع إمكانية ضبط التنبيهات اليومية لتذكيرك بالأذكار. يعمل بدون اتصال بالإنترنت.",
    icon: "https://play-lh.googleusercontent.com/9fNFRuaJQCNEuUaYPBqXrFPZJD1JEzb_JJi_QGOQhSMX0y_sPg0NXkGBcAVsw-PFGLo=w240-h480-rw",
    size: "12 MB",
    downloads: "10M+",
    rating: 4.9,
    category: "azkar",
    developer: "Jeeal Labs",
    version: "5.2.1",
    lastUpdate: "2026-01-15",
    screenshots: [
      "https://play-lh.googleusercontent.com/YPnKyHEjw_kV8eFFFXlvVjU_xBvT-qGgOOlhNxBqKgvJUzUeR8RqTjFEAOmkPfFXJA=w526-h296-rw",
      "https://play-lh.googleusercontent.com/7lIMXh0oqK7RcRGOXP0ZtP_h2MRw_p3Y0FdbYhIjzXoT6Mz9cVPxGm5PKlGvVKjW8g=w526-h296-rw",
    ],
    features: [
      "أذكار الصباح والمساء كاملة",
      "تنبيهات يومية قابلة للتخصيص",
      "عداد تسبيح مدمج",
      "يعمل بدون إنترنت",
      "واجهة بسيطة وسهلة",
    ],
  },
  {
    id: 2,
    name: "القرآن الكريم",
    description: "المصحف الإلكتروني بخط واضح مع التفسير والتلاوة",
    fullDescription: "تطبيق القرآن الكريم يوفر لك المصحف الشريف بخط عثماني واضح وجميل، مع إمكانية الاستماع لتلاوات أشهر القراء. يحتوي على تفسير ابن كثير والسعدي والطبري، مع خاصية البحث في القرآن والعلامات المرجعية وخطة ختم القرآن.",
    icon: "https://play-lh.googleusercontent.com/VY3KAWBAl5lS1MoJHLjYmNjXGSXv2N-Nf9FWZe5mLn7r7J-bTQAj2nMXjd6tLJWKNNg=w240-h480-rw",
    size: "85 MB",
    downloads: "50M+",
    rating: 4.9,
    category: "quran",
    developer: "Muslim Pro",
    version: "12.0.3",
    lastUpdate: "2026-01-20",
    screenshots: [
      "https://play-lh.googleusercontent.com/F9BFHJ4-G-W4pnqVYXF4lxN-i9f5NOQKJ1LNlhLFfPiGMz1hPtJUPqSFdG5L4qqNg=w526-h296-rw",
      "https://play-lh.googleusercontent.com/8Df5g1VqxN0xPgLqXYDdXKbPyNOx6C6lG4j-7w0T2kT3sSd2JrQEJVvQvM3xeK-M_A=w526-h296-rw",
    ],
    features: [
      "مصحف بخط عثماني واضح",
      "تلاوات لأشهر القراء",
      "تفاسير متعددة",
      "بحث في القرآن",
      "خطة ختم القرآن",
      "علامات مرجعية",
    ],
  },
  {
    id: 3,
    name: "تعليم الصلاة للأطفال",
    description: "تعليم الصلاة والوضوء بطريقة ممتعة ومبسطة للأطفال",
    fullDescription: "تطبيق تعليمي تفاعلي مخصص للأطفال لتعليمهم كيفية الصلاة والوضوء بطريقة ممتعة وجذابة. يحتوي على رسوم متحركة وأصوات تشجيعية ومكافآت لتحفيز الأطفال على تعلم الصلاة بشكل صحيح.",
    icon: "https://play-lh.googleusercontent.com/0MVPPOE8eXL1MZrMqcT7UQX1jrNvqJLmn6wNpT7WA1QN3RBqrgYXLXlLmP_IwBUZqQ=w240-h480-rw",
    size: "28 MB",
    downloads: "5M+",
    rating: 4.8,
    category: "kids",
    developer: "JEEAL Lab",
    version: "3.1.0",
    lastUpdate: "2025-12-10",
    screenshots: [
      "https://play-lh.googleusercontent.com/JJU8M5OgXG7n6x8uO2H3BW9WM9TjmQj0h1kPXAX-7OT0SdbIOzHZ0oGjMQFXPAH2Q=w526-h296-rw",
      "https://play-lh.googleusercontent.com/cN-K8VuOHaT_Cb0Vq9kTJBh7xTSN-M9jCPy8Oy_u6-Ng7E8u8TQEJ8s8t0FPy0x0A=w526-h296-rw",
    ],
    features: [
      "تعليم الوضوء خطوة بخطوة",
      "تعليم الصلاة بالرسوم المتحركة",
      "مكافآت تشجيعية",
      "واجهة مخصصة للأطفال",
      "أصوات وتأثيرات ممتعة",
    ],
  },
  {
    id: 4,
    name: "حصن المسلم",
    description: "جميع الأدعية والأذكار من الكتاب والسنة",
    fullDescription: "تطبيق حصن المسلم يحتوي على جميع الأذكار والأدعية المأثورة من الكتاب والسنة النبوية الشريفة. مرتب حسب المناسبات والأوقات مع إمكانية المشاركة والنسخ. يتميز بتصميم أنيق وسهل الاستخدام.",
    icon: "https://play-lh.googleusercontent.com/QLQcn_IrQ0YMOIqL__JOcJ4ecUa4xRkwJPtqWSZG8pnIPJq90Cih1sVB6maVxFNYS7g=w240-h480-rw",
    size: "8 MB",
    downloads: "10M+",
    rating: 4.9,
    category: "azkar",
    developer: "IslamHouse",
    version: "4.0.2",
    lastUpdate: "2025-11-28",
    screenshots: [
      "https://play-lh.googleusercontent.com/iRK9-E-YFcg6qjblBxhESPVN0k3RgHqFG7yyC9fOGLH4fqvLr6X8EDQQq2j3cZVVDCY=w526-h296-rw",
      "https://play-lh.googleusercontent.com/ck3KGLgJmUGPaRZXBEqsK5T-KoUY3T7P0l0dDKT3NQR_eA0tnR0jcL8XJT7jjLwL0w=w526-h296-rw",
    ],
    features: [
      "أذكار وأدعية من الكتاب والسنة",
      "مرتب حسب المناسبات",
      "إمكانية المشاركة والنسخ",
      "يعمل بدون إنترنت",
      "تصميم أنيق وبسيط",
    ],
  },
  {
    id: 5,
    name: "مواقيت الصلاة",
    description: "أوقات الصلاة الدقيقة مع الأذان والتنبيهات",
    fullDescription: "تطبيق مواقيت الصلاة يوفر لك أوقات الصلاة الدقيقة حسب موقعك الجغرافي مع إمكانية سماع الأذان بأصوات مختلفة. يحتوي على بوصلة القبلة والتقويم الهجري وتنبيهات قبل الصلاة.",
    icon: "https://play-lh.googleusercontent.com/3Gf3g7OlPG9P1m3k5bPPdWjK5iHOqTvGJGVh3y1aQHVjFkQJBJ3M7hLR0kMGvF0ZWA=w240-h480-rw",
    size: "18 MB",
    downloads: "100M+",
    rating: 4.8,
    category: "prayer",
    developer: "Athan",
    version: "7.5.0",
    lastUpdate: "2026-02-01",
    screenshots: [
      "https://play-lh.googleusercontent.com/3Y5Y7BfJUj3Pll7_MoL5N3l3Y9xJXvVJKHjm3MXJN0ZyQK1P6B5Xhv-hg7d0z5Y0w=w526-h296-rw",
      "https://play-lh.googleusercontent.com/7_GkVH5F_FpQ5pYKQ_eW8qC0S9kV6vFR7zZJTx3jA3E7WI5XsW3l_hVNWkLT0-jdxw=w526-h296-rw",
    ],
    features: [
      "أوقات صلاة دقيقة حسب الموقع",
      "أذان بأصوات متعددة",
      "بوصلة القبلة",
      "التقويم الهجري",
      "تنبيهات ما قبل الصلاة",
    ],
  },
  {
    id: 6,
    name: "الفقه الميسر",
    description: "أحكام الفقه الإسلامي بشكل مبسط وواضح",
    fullDescription: "تطبيق شامل لأحكام الفقه الإسلامي مقدم بطريقة مبسطة وسهلة الفهم. يغطي أبواب الطهارة والصلاة والزكاة والصيام والحج مع أدلة من الكتاب والسنة وأقوال العلماء.",
    icon: "https://play-lh.googleusercontent.com/LlDppNC7N6qMqFKQ1tIGJLON_PRlECPx7rg8HvBNvmppQ0ZR8GKUl1xzDrv5F4UX_w=w240-h480-rw",
    size: "15 MB",
    downloads: "1M+",
    rating: 4.7,
    category: "fiqh",
    developer: "Islamic Apps",
    version: "2.3.1",
    lastUpdate: "2025-10-15",
    screenshots: [
      "https://play-lh.googleusercontent.com/9Y5FvBd_W7eDQEZYEzLlxCFNGQN5qxfS2uH_k6LDbP3MkKP8pRDZ2xZL9j2pVz6C1g=w526-h296-rw",
    ],
    features: [
      "أحكام فقهية مبسطة",
      "أدلة من الكتاب والسنة",
      "بحث سريع في المسائل",
      "مفضلة وعلامات مرجعية",
      "يعمل بدون إنترنت",
    ],
  },
];
