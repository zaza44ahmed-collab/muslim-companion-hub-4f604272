import { useState, useMemo } from "react";
import {
  Store, Search, Filter, MapPin, Heart, Clock, Plus,
  ArrowRight, X, Phone, MessageCircle, Share2, Eye,
  ChevronDown, Tag, Flame, Star, SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/layout/BottomNav";

const categories = [
  { id: "all", name: "الكل", emoji: "🏪" },
  { id: "electronics", name: "إلكترونيات", emoji: "📱" },
  { id: "cars", name: "سيارات", emoji: "🚗" },
  { id: "realestate", name: "عقارات", emoji: "🏠" },
  { id: "furniture", name: "أثاث", emoji: "🪑" },
  { id: "clothing", name: "ملابس", emoji: "👕" },
  { id: "books", name: "كتب", emoji: "📚" },
  { id: "sports", name: "رياضة", emoji: "⚽" },
  { id: "services", name: "خدمات", emoji: "🔧" },
];

interface Listing {
  id: number;
  title: string;
  description: string;
  price: string;
  priceNum: number;
  location: string;
  image: string;
  category: string;
  seller: string;
  sellerAvatar: string;
  phone: string;
  views: number;
  timeAgo: string;
  condition: string;
  isFeatured?: boolean;
  images: string[];
}

const listings: Listing[] = [
  {
    id: 1, title: "آيفون 15 برو ماكس 256GB", description: "جهاز نظيف جداً، استخدام شهرين فقط، مع جميع الملحقات الأصلية والكرتون. الضمان ساري لمدة 10 أشهر.", price: "3,500 ر.س", priceNum: 3500, location: "الرياض - حي النرجس", image: "📱", category: "electronics",
    seller: "أحمد محمد", sellerAvatar: "👨", phone: "0551234567", views: 234, timeAgo: "منذ ساعتين", condition: "مستعمل - ممتاز", isFeatured: true, images: ["📱", "📦", "🔌"],
  },
  {
    id: 2, title: "كنب مودرن 3 قطع - رمادي", description: "كنب عصري أنيق، 3 قطع كبيرة + 2 طاولة جانبية. القماش مقاوم للبقع. استخدام سنة واحدة فقط.", price: "2,200 ر.س", priceNum: 2200, location: "جدة - حي الروضة", image: "🛋️", category: "furniture",
    seller: "سارة أحمد", sellerAvatar: "👩", phone: "0559876543", views: 156, timeAgo: "منذ 5 ساعات", condition: "مستعمل - جيد جداً", images: ["🛋️", "🪑", "🏠"],
  },
  {
    id: 3, title: "تويوتا كامري 2023 - فل كامل", description: "كامري موديل 2023 فل كامل، ماشي 15,000 كم فقط. لون أبيض لؤلؤي، فتحة سقف، كاميرا 360.", price: "95,000 ر.س", priceNum: 95000, location: "الدمام - حي الفيصلية", image: "🚗", category: "cars",
    seller: "خالد العمري", sellerAvatar: "👨‍💼", phone: "0541112233", views: 589, timeAgo: "منذ يوم", condition: "مستعمل - ممتاز", isFeatured: true, images: ["🚗", "🏎️", "🔑"],
  },
  {
    id: 4, title: "ماك بوك برو M3 - 14 بوصة", description: "ماك بوك برو شريحة M3، رام 18GB، تخزين 512GB. بطارية ممتازة، استخدام خفيف للبرمجة والتصميم.", price: "5,800 ر.س", priceNum: 5800, location: "الرياض - حي العليا", image: "💻", category: "electronics",
    seller: "عبدالله سعد", sellerAvatar: "🧑‍💻", phone: "0567778899", views: 312, timeAgo: "منذ 3 ساعات", condition: "مستعمل - ممتاز", images: ["💻", "⌨️", "🖥️"],
  },
  {
    id: 5, title: "شقة للإيجار 3 غرف وصالة", description: "شقة واسعة 3 غرف نوم + صالة كبيرة + مطبخ راكب + 2 حمام. الدور الثاني، موقف سيارة خاص.", price: "2,500 ر.س/شهر", priceNum: 2500, location: "مكة - حي الشوقية", image: "🏠", category: "realestate",
    seller: "مكتب الأمان العقاري", sellerAvatar: "🏢", phone: "0123456789", views: 445, timeAgo: "منذ يومين", condition: "جديد", images: ["🏠", "🛏️", "🍳"],
  },
  {
    id: 6, title: "دراجة رياضية احترافية", description: "دراجة هوائية احترافية للطرق، ماركة Giant، إطار كربون خفيف. مقاس L، 22 سرعة.", price: "800 ر.س", priceNum: 800, location: "المدينة - حي السلام", image: "🚴", category: "sports",
    seller: "فهد الحربي", sellerAvatar: "🏃", phone: "0533334444", views: 87, timeAgo: "منذ 4 ساعات", condition: "مستعمل - جيد", images: ["🚴", "⚙️", "🔧"],
  },
  {
    id: 7, title: "طقم ثوب رجالي فاخر", description: "طقم ثوب سعودي فاخر من قماش ياباني أصلي مع شماغ وعقال. مقاسات متوفرة من M إلى XXL.", price: "450 ر.س", priceNum: 450, location: "الرياض - البطحاء", image: "👔", category: "clothing",
    seller: "متجر الأناقة", sellerAvatar: "🏬", phone: "0112223344", views: 198, timeAgo: "منذ 6 ساعات", condition: "جديد", isFeatured: true, images: ["👔", "🧵", "👕"],
  },
  {
    id: 8, title: "مجموعة كتب تطوير الذات", description: "مجموعة 10 كتب في تطوير الذات والنجاح، تشمل: العادات الذرية، قوة العقل الباطن، فن اللامبالاة، وغيرها.", price: "150 ر.س", priceNum: 150, location: "أبها", image: "📚", category: "books",
    seller: "مكتبة النور", sellerAvatar: "📖", phone: "0544445555", views: 67, timeAgo: "منذ 8 ساعات", condition: "مستعمل - جيد جداً", images: ["📚", "📖", "📕"],
  },
  {
    id: 9, title: "خدمة تصميم شعارات احترافية", description: "تصميم شعار احترافي لشركتك أو مشروعك. يشمل 3 مقترحات + تعديلات غير محدودة + ملفات مصدرية.", price: "300 ر.س", priceNum: 300, location: "عن بُعد", image: "🎨", category: "services",
    seller: "ستوديو إبداع", sellerAvatar: "🎯", phone: "0555556666", views: 124, timeAgo: "منذ 12 ساعة", condition: "خدمة", images: ["🎨", "🖌️", "✨"],
  },
  {
    id: 10, title: "بلايستيشن 5 مع يدين", description: "بلايستيشن 5 نسخة القرص مع يدتين أصليتين و 3 ألعاب. حالة ممتازة، استخدام قليل.", price: "1,800 ر.س", priceNum: 1800, location: "تبوك", image: "🎮", category: "electronics",
    seller: "ماجد السلمي", sellerAvatar: "🎮", phone: "0577778888", views: 276, timeAgo: "منذ ساعة", condition: "مستعمل - ممتاز", images: ["🎮", "🕹️", "📀"],
  },
];

type SortOption = "newest" | "price_low" | "price_high" | "popular";

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filteredListings = useMemo(() => {
    let result = listings.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.title.includes(searchQuery) ||
        item.description.includes(searchQuery) ||
        item.location.includes(searchQuery);
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "price_low":
        result = [...result].sort((a, b) => a.priceNum - b.priceNum);
        break;
      case "price_high":
        result = [...result].sort((a, b) => b.priceNum - a.priceNum);
        break;
      case "popular":
        result = [...result].sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const featuredListings = listings.filter((l) => l.isFeatured);

  const formatNumber = (n: number) => n.toLocaleString("ar-SA");

  return (
    <div className="min-h-screen bg-background pb-20" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-lg border-b-2 border-secondary/30">
        <div className="container flex h-12 items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-secondary" />
            <h1 className="text-base font-bold font-amiri text-primary">ماركت بلايس</h1>
          </div>
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="container py-3 space-y-3">
        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن منتج، خدمة، أو مكان..."
              className="w-full h-10 pr-9 pl-3 rounded-xl border-2 border-secondary/30 bg-card text-sm focus:outline-none focus:border-primary/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`h-10 w-10 rounded-xl border-2 flex items-center justify-center transition-colors ${
              showFilters
                ? "border-primary bg-primary/10 text-primary"
                : "border-secondary/30 bg-card text-muted-foreground"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Sort Options */}
        {showFilters && (
          <div className="animate-fadeIn flex gap-2 flex-wrap">
            {[
              { value: "newest" as SortOption, label: "الأحدث", icon: Clock },
              { value: "price_low" as SortOption, label: "الأرخص", icon: Tag },
              { value: "price_high" as SortOption, label: "الأغلى", icon: Tag },
              { value: "popular" as SortOption, label: "الأكثر مشاهدة", icon: Flame },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                  sortBy === opt.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-secondary/20 text-foreground/70"
                }`}
              >
                <opt.icon className="h-3 w-3" />
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center gap-1 min-w-[56px] py-2 px-2.5 rounded-xl border transition-all ${
                selectedCategory === cat.id
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-secondary/20 bg-card hover:bg-secondary/10"
              }`}
            >
              <span className="text-lg">{cat.emoji}</span>
              <span
                className={`text-[9px] font-semibold whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "text-primary"
                    : "text-foreground/70"
                }`}
              >
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        {/* Featured Section */}
        {selectedCategory === "all" && searchQuery === "" && (
          <section>
            <div className="flex items-center gap-1.5 mb-2">
              <Star className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold text-foreground">إعلانات مميزة</h2>
            </div>
            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
              {featuredListings.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setSelectedListing(item); setSelectedImageIndex(0); }}
                  className="min-w-[200px] rounded-2xl border-2 border-primary/30 bg-card overflow-hidden hover:border-primary/50 transition-all text-right"
                >
                  <div className="relative h-24 bg-primary/5 flex items-center justify-center text-3xl">
                    {item.image}
                    <Badge className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground text-[8px] px-1.5 py-0.5">
                      <Star className="h-2.5 w-2.5 ml-0.5" /> مميز
                    </Badge>
                  </div>
                  <div className="p-2 space-y-0.5">
                    <h3 className="text-[11px] font-bold text-foreground line-clamp-1">{item.title}</h3>
                    <p className="text-xs font-bold text-primary">{item.price}</p>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-2.5 w-2.5" />
                      <span className="text-[9px] line-clamp-1">{item.location}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-muted-foreground font-semibold">
            {filteredListings.length} إعلان
          </p>
        </div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-2 gap-2.5">
            {filteredListings.map((item) => (
              <button
                key={item.id}
                onClick={() => { setSelectedListing(item); setSelectedImageIndex(0); }}
                className="rounded-2xl border-2 border-secondary/20 bg-card overflow-hidden hover:border-secondary/40 transition-all text-right group"
              >
                <div className="relative h-28 bg-secondary/5 flex items-center justify-center text-4xl">
                  {item.image}
                  {item.isFeatured && (
                    <Badge className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground text-[7px] px-1 py-0">
                      مميز
                    </Badge>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                    className="absolute top-1.5 left-1.5 h-7 w-7 rounded-full bg-card/70 backdrop-blur-sm flex items-center justify-center"
                  >
                    <Heart
                      className={`h-3.5 w-3.5 transition-colors ${
                        favorites.includes(item.id)
                          ? "fill-destructive text-destructive"
                          : "text-foreground/50"
                      }`}
                    />
                  </button>
                  <div className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5 bg-card/70 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                    <Eye className="h-2.5 w-2.5 text-muted-foreground" />
                    <span className="text-[8px] text-muted-foreground font-semibold">{formatNumber(item.views)}</span>
                  </div>
                </div>
                <div className="p-2.5 space-y-1">
                  <h3 className="text-[11px] font-bold text-foreground line-clamp-1">{item.title}</h3>
                  <p className="text-sm font-bold text-primary">{item.price}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-2.5 w-2.5" />
                      <span className="text-[9px] line-clamp-1">{item.location.split(" - ")[0]}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-muted-foreground">
                      <Clock className="h-2.5 w-2.5" />
                      <span className="text-[8px]">{item.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-5xl mb-3">🔍</span>
            <h3 className="text-sm font-bold text-foreground mb-1">لا توجد نتائج</h3>
            <p className="text-xs text-muted-foreground">جرّب تغيير كلمات البحث أو التصنيف</p>
          </div>
        )}
      </main>

      {/* FAB - Add Listing */}
      <button className="fixed bottom-[76px] left-4 z-40 h-12 w-12 rounded-full gradient-islamic shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
        <Plus className="h-6 w-6 text-primary-foreground" />
      </button>

      {/* Listing Detail Dialog */}
      <Dialog open={!!selectedListing} onOpenChange={() => setSelectedListing(null)}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0 gap-0" dir="rtl">
          {selectedListing && (
            <>
              {/* Image Gallery */}
              <div className="relative h-52 bg-secondary/5 flex items-center justify-center text-6xl">
                {selectedListing.images[selectedImageIndex]}
                <button
                  onClick={() => toggleFavorite(selectedListing.id)}
                  className="absolute top-3 left-3 h-9 w-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      favorites.includes(selectedListing.id)
                        ? "fill-destructive text-destructive"
                        : "text-foreground/50"
                    }`}
                  />
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: selectedListing.title, text: selectedListing.description });
                    }
                  }}
                  className="absolute top-3 left-14 h-9 w-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
                >
                  <Share2 className="h-4 w-4 text-foreground/60" />
                </button>
                {selectedListing.isFeatured && (
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px]">
                    <Star className="h-3 w-3 ml-1" /> إعلان مميز
                  </Badge>
                )}
                {/* Image dots */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {selectedListing.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === selectedImageIndex ? "w-4 bg-primary" : "w-1.5 bg-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-4 space-y-4">
                {/* Title & Price */}
                <div>
                  <h2 className="text-base font-bold text-foreground">{selectedListing.title}</h2>
                  <p className="text-xl font-bold text-primary mt-1">{selectedListing.price}</p>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-[10px] gap-1">
                    <MapPin className="h-3 w-3" /> {selectedListing.location}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] gap-1">
                    <Clock className="h-3 w-3" /> {selectedListing.timeAgo}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] gap-1">
                    <Eye className="h-3 w-3" /> {formatNumber(selectedListing.views)} مشاهدة
                  </Badge>
                  <Badge variant="outline" className="text-[10px] gap-1">
                    <Tag className="h-3 w-3" /> {selectedListing.condition}
                  </Badge>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xs font-bold text-foreground mb-1">الوصف</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selectedListing.description}
                  </p>
                </div>

                {/* Seller Info */}
                <div className="rounded-xl border-2 border-secondary/20 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-lg">
                      {selectedListing.sellerAvatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-foreground">{selectedListing.seller}</h4>
                      <p className="text-[10px] text-muted-foreground">عضو منذ 2024</p>
                    </div>
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="flex gap-2">
                  <a
                    href={`tel:${selectedListing.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-islamic text-primary-foreground font-semibold text-sm"
                  >
                    <Phone className="h-4 w-4" />
                    اتصال
                  </a>
                  <a
                    href={`https://wa.me/966${selectedListing.phone.slice(1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-primary-foreground font-semibold text-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    واتساب
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default MarketplacePage;
