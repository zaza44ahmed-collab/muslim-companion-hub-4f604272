import { useState, useMemo } from "react";
import {
  Store, Search, MapPin, Bookmark, Clock,
  X, Phone, MessageCircle, Share2, Eye,
  Tag, Star, Loader2, ImageIcon,
  Pencil, Trash2, Plus, ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/layout/BottomNav";
import AddListingDialog from "@/components/marketplace/AddListingDialog";
import { useListings } from "@/hooks/useListings";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: "all", name: "الكل", emoji: "🕌" },
  { id: "quran", name: "مصاحف", emoji: "📖" },
  { id: "books", name: "كتب إسلامية", emoji: "📚" },
  { id: "clothing", name: "ملابس شرعية", emoji: "🧕" },
  { id: "prayer", name: "مستلزمات صلاة", emoji: "🕋" },
  { id: "perfume", name: "عطور و بخور", emoji: "🪔" },
  { id: "tasbih", name: "سبح و أذكار", emoji: "📿" },
  { id: "gifts", name: "هدايا إسلامية", emoji: "🎁" },
  { id: "decor", name: "ديكور إسلامي", emoji: "🏮" },
];

const MarketplacePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { listings, loading, favoriteIds, toggleFavorite, createListing, updateListing, deleteListing } = useListings();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedListing, setSelectedListing] = useState<typeof listings[0] | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingListing, setEditingListing] = useState<typeof listings[0] | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleToggleFavorite = async (id: string) => {
    if (!user) { toast({ title: "سجل دخولك أولاً" }); navigate("/auth"); return; }
    await toggleFavorite(id);
  };

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const matchesSearch = searchQuery === "" || item.title.includes(searchQuery) || item.description.includes(searchQuery) || item.location.includes(searchQuery);
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, listings]);

  const featuredListings = listings.filter((l) => l.is_featured);
  const formatNumber = (n: number) => n.toLocaleString("ar-SA");
  const formatPrice = (n: number) => n.toLocaleString("ar-SA");

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `منذ ${mins} دقيقة`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `منذ ${hrs} ساعة`;
    const days = Math.floor(hrs / 24);
    return `منذ ${days} يوم`;
  };

  return (
    <div className="min-h-screen bg-background pb-20" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-lg border-b border-border">
        <div className="container flex h-12 items-center justify-between gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <Store className="h-5 w-5 text-secondary" />
            <h1 className="text-base font-bold font-amiri text-primary">متجر إسلامي</h1>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setShowSearch(!showSearch); if (showSearch) setSearchQuery(""); }}>
            {showSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <main className="container py-3 space-y-3">
        {showSearch && (
          <div className="animate-fadeIn">
            <Input placeholder="بحث..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="text-right" autoFocus />
          </div>
        )}

        {/* Categories - no borders, no underlines */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center gap-1 min-w-[56px] py-2 px-2.5 transition-all ${selectedCategory === cat.id ? "bg-primary/10" : "bg-card hover:bg-secondary/10"}`}
            >
              <span className="text-lg">{cat.emoji}</span>
              <span className={`text-[9px] font-semibold whitespace-nowrap ${selectedCategory === cat.id ? "text-primary" : "text-foreground/70"}`}>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Featured */}
        {selectedCategory === "all" && searchQuery === "" && featuredListings.length > 0 && (
          <section>
            <div className="flex items-center gap-1.5 mb-2">
              <Star className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold text-foreground">إعلانات مميزة</h2>
            </div>
            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
              {featuredListings.map((item) => (
                <button key={item.id} onClick={() => { setSelectedListing(item); setSelectedImageIndex(0); }}
                  className="min-w-[200px] bg-card overflow-hidden hover:shadow-md transition-all text-right"
                >
                  <div className="relative h-24 bg-primary/5 flex items-center justify-center">
                    {item.images[0] ? (
                      <img src={item.images[0]} alt={item.title} className="h-full w-full object-contain p-1" />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
                    )}
                    <Badge className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground text-[8px] px-1.5 py-0.5">
                      <Star className="h-2.5 w-2.5 ml-0.5" /> مميز
                    </Badge>
                  </div>
                  <div className="p-2 space-y-0.5">
                    <h3 className="text-[11px] font-bold text-foreground line-clamp-1">{item.title}</h3>
                    <p className="text-xs font-bold text-primary">{formatPrice(item.price)} {item.currency}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        <div className="flex items-center justify-between">
          <p className="text-[11px] text-muted-foreground font-semibold">{filteredListings.length} إعلان</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="grid grid-cols-2 gap-2.5">
            {filteredListings.map((item) => (
              <button key={item.id} onClick={() => { setSelectedListing(item); setSelectedImageIndex(0); }}
                className="bg-card overflow-hidden hover:shadow-md transition-all text-right group"
              >
                <div className="relative h-28 bg-secondary/5 flex items-center justify-center">
                  {item.images[0] ? (
                    <img src={item.images[0]} alt={item.title} className="h-full w-full object-contain p-2" />
                  ) : (
                    <ImageIcon className="h-10 w-10 text-muted-foreground/20" />
                  )}
                  {item.is_featured && (
                    <Badge className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground text-[7px] px-1 py-0">مميز</Badge>
                  )}
                  <button onClick={(e) => { e.stopPropagation(); handleToggleFavorite(item.id); }}
                    className="absolute top-1.5 left-1.5 h-7 w-7 rounded-full bg-card/70 backdrop-blur-sm flex items-center justify-center"
                  >
                    <Heart className={`h-3.5 w-3.5 transition-colors ${favoriteIds.has(item.id) ? "fill-destructive text-destructive" : "text-foreground/50"}`} />
                  </button>
                  <div className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5 bg-card/70 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                    <Eye className="h-2.5 w-2.5 text-muted-foreground" />
                    <span className="text-[8px] text-muted-foreground font-semibold">{formatNumber(item.views)}</span>
                  </div>
                </div>
                <div className="p-2.5 space-y-1">
                  <h3 className="text-[11px] font-bold text-foreground line-clamp-1">{item.title}</h3>
                  <p className="text-sm font-bold text-primary">{formatPrice(item.price)} {item.currency}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-2.5 w-2.5" />
                      <span className="text-[9px] line-clamp-1">{item.location.split(" - ")[0]}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-muted-foreground">
                      <Clock className="h-2.5 w-2.5" />
                      <span className="text-[8px]">{timeAgo(item.created_at)}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-5xl mb-3">🔍</span>
            <h3 className="text-sm font-bold text-foreground mb-1">لا توجد إعلانات</h3>
          </div>
        )}
      </main>

      {/* Detail Dialog - fullscreen */}
      <Dialog open={!!selectedListing} onOpenChange={() => setSelectedListing(null)}>
        <DialogContent className="max-w-[100vw] w-full h-[100vh] max-h-[100vh] p-0 gap-0 rounded-none border-none overflow-y-auto" dir="rtl">
          {selectedListing && (
            <>
              {/* Back button */}
              <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border px-4 py-3 flex items-center justify-between">
                <h2 className="text-base font-bold font-cairo">{selectedListing.title}</h2>
                <Button variant="ghost" size="icon" onClick={() => setSelectedListing(null)}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </div>

              <div className="relative h-52 bg-secondary/5 flex items-center justify-center">
                {selectedListing.images[selectedImageIndex] ? (
                  <img src={selectedListing.images[selectedImageIndex]} alt="" className="h-full w-full object-contain" />
                ) : (
                  <ImageIcon className="h-16 w-16 text-muted-foreground/20" />
                )}
                <button onClick={() => handleToggleFavorite(selectedListing.id)}
                  className="absolute top-3 left-3 h-9 w-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
                >
                  <Heart className={`h-5 w-5 ${favoriteIds.has(selectedListing.id) ? "fill-destructive text-destructive" : "text-foreground/50"}`} />
                </button>
                <button onClick={() => { if (navigator.share) navigator.share({ title: selectedListing.title, text: selectedListing.description }); }}
                  className="absolute top-3 left-14 h-9 w-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
                >
                  <Share2 className="h-4 w-4 text-foreground/60" />
                </button>
                {selectedListing.images.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {selectedListing.images.map((_: string, i: number) => (
                      <button key={i} onClick={() => setSelectedImageIndex(i)}
                        className={`h-1.5 rounded-full transition-all ${i === selectedImageIndex ? "w-4 bg-primary" : "w-1.5 bg-foreground/30"}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <h2 className="text-base font-bold text-foreground">{selectedListing.title}</h2>
                  <p className="text-xl font-bold text-primary mt-1">{formatPrice(selectedListing.price)} {selectedListing.currency}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-[10px] gap-1"><MapPin className="h-3 w-3" /> {selectedListing.location}</Badge>
                  <Badge variant="outline" className="text-[10px] gap-1"><Clock className="h-3 w-3" /> {timeAgo(selectedListing.created_at)}</Badge>
                  <Badge variant="outline" className="text-[10px] gap-1"><Eye className="h-3 w-3" /> {formatNumber(selectedListing.views)} مشاهدة</Badge>
                  <Badge variant="outline" className="text-[10px] gap-1"><Tag className="h-3 w-3" /> {selectedListing.condition}</Badge>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-foreground mb-1">الوصف</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{selectedListing.description}</p>
                </div>

                <div className="rounded-xl border-2 border-secondary/20 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-lg">
                      {selectedListing.seller_avatar ? (
                        <img src={selectedListing.seller_avatar} alt="" className="h-full w-full rounded-full object-cover" />
                      ) : "👤"}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-foreground">{selectedListing.seller_name}</h4>
                      <p className="text-[10px] text-muted-foreground">صاحب الإعلان</p>
                    </div>
                  </div>
                </div>

                {user && selectedListing.user_id === user.id && (
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 text-xs gap-1.5" onClick={() => { setEditingListing(selectedListing); setSelectedListing(null); }}>
                      <Pencil className="h-3.5 w-3.5" /> تعديل
                    </Button>
                    <Button variant="destructive" className="flex-1 text-xs gap-1.5" disabled={deleting}
                      onClick={async () => {
                        setDeleting(true);
                        const res = await deleteListing(selectedListing.id);
                        setDeleting(false);
                        if (res.error) { toast({ title: res.error, variant: "destructive" }); }
                        else { toast({ title: "تم حذف المنتج بنجاح 🗑️" }); setSelectedListing(null); }
                      }}
                    >
                      {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />} حذف
                    </Button>
                  </div>
                )}

                <div className="flex gap-2">
                  <a href={`tel:${selectedListing.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-islamic text-primary-foreground font-semibold text-sm"
                  >
                    <Phone className="h-4 w-4" /> اتصال
                  </a>
                  <a href={`https://wa.me/966${selectedListing.phone.replace(/^0/, '')}`} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[hsl(var(--emerald))] text-primary-foreground font-semibold text-sm"
                  >
                    <MessageCircle className="h-4 w-4" /> واتساب
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AddListingDialog open={showAddDialog} onOpenChange={setShowAddDialog} onSubmit={createListing} />

      <AddListingDialog
        open={!!editingListing}
        onOpenChange={(v) => { if (!v) setEditingListing(null); }}
        onSubmit={async (data) => {
          if (!editingListing) return { error: 'خطأ' };
          return updateListing(editingListing.id, {
            title: data.title, description: data.description, price: data.price,
            location: data.location, category: data.category, condition: data.condition, phone: data.phone,
          });
        }}
        initialData={editingListing ? {
          title: editingListing.title, description: editingListing.description,
          price: String(editingListing.price), location: editingListing.location,
          category: editingListing.category, condition: editingListing.condition, phone: editingListing.phone,
        } : undefined}
        editMode
      />

      <BottomNav />
    </div>
  );
};

export default MarketplacePage;
