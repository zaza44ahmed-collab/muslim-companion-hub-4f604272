import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Download, Bookmark, Star, Search, X } from "lucide-react";
import { bookCategories } from "@/data/books";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import UserBookDetailDialog from "@/components/library/UserBookDetailDialog";

const LibraryPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("bookFavorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [userBooks, setUserBooks] = useState<any[]>([]);
  const [selectedUserBook, setSelectedUserBook] = useState<any | null>(null);

  const filteredUserBooks = userBooks.filter((book) => {
    const matchesCategory = activeCategory === "all" || book.category === activeCategory;
    const matchesSearch = !searchQuery || book.title.includes(searchQuery) || book.author.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleRead = (book: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (book.file_url) {
      navigate(`/book-reader?url=${encodeURIComponent(book.file_url)}&title=${encodeURIComponent(book.title)}`);
    } else {
      const q = encodeURIComponent(`${book.title} ${book.author} PDF`);
      window.open(`https://www.google.com/search?q=${q}`, "_blank");
    }
  };

  const handleDownload = (book: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (book.file_url) {
      const a = document.createElement("a");
      a.href = book.file_url;
      a.download = `${book.title}.pdf`;
      a.click();
      toast({ title: "جاري التحميل..." });
    } else {
      const q = encodeURIComponent(`${book.title} ${book.author || ""} تحميل PDF`);
      window.open(`https://www.google.com/search?q=${q}`, "_blank");
    }
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem("bookFavorites", JSON.stringify(next));
      return next;
    });
    toast({ title: favorites.includes(id) ? "تمت الإزالة من المحفوظات" : "تم الحفظ ✓" });
  };

  const fetchUserBooks = async () => {
    const { data } = await supabase.from("user_books").select("*").order("created_at", { ascending: false });
    if (data) setUserBooks(data);
  };

  useEffect(() => { fetchUserBooks(); }, []);

  return (
    <div className="min-h-screen bg-background pb-20" dir="rtl">
      <main className="container py-3 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold">المكتبة الإسلامية</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setShowSearch(!showSearch); if (showSearch) setSearchQuery(""); }}>
            {showSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>

        <div className="border-b border-border mb-3" />

        {showSearch && (
          <div className="mb-3 animate-fadeIn">
            <Input placeholder="ابحث عن كتاب..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="text-right" autoFocus />
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto mb-3 scrollbar-hide">
          {bookCategories.map((cat) => (
            <Button key={cat.id} variant={activeCategory === cat.id ? "islamic" : "outline"} size="sm" className="shrink-0" onClick={() => setActiveCategory(cat.id)}>
              {cat.label}
            </Button>
          ))}
        </div>

        {filteredUserBooks.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredUserBooks.map((book, index) => (
              <div
                key={book.id}
                className="bg-card rounded-xl overflow-hidden shadow-card-islamic animate-fadeIn cursor-pointer hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 80}ms` }}
                onClick={() => setSelectedUserBook(book)}
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                  {book.cover_url ? (
                    <img src={book.cover_url} alt={book.title} className="h-full w-full object-contain p-1"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                  ) : (
                    <BookOpen className="h-10 w-10 text-muted-foreground/30" />
                  )}
                  <button className="absolute top-2 left-2 p-2 bg-white/80 dark:bg-black/50 rounded-full" onClick={(e) => toggleFavorite(book.id, e)}>
                    <Bookmark className={`h-4 w-4 ${favorites.includes(book.id) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm line-clamp-1">{book.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center gap-1 text-xs text-gold">
                      <Star className="h-3 w-3 fill-gold" />4.5
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {book.pages > 0 ? `${book.pages} صفحة` : ""}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="islamic" size="sm" className="flex-1 text-xs" onClick={(e) => handleRead(book, e)}>
                      <BookOpen className="h-3 w-3 ml-1" />قراءة
                    </Button>
                    <Button variant="outline" size="sm" className="px-2" onClick={(e) => handleDownload(book, e)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Search className="h-10 w-10 mb-3 opacity-40" />
            <p className="font-semibold text-sm">لا توجد كتب بعد</p>
            <p className="text-xs mt-1">أضف كتباً لتظهر هنا</p>
          </div>
        )}
      </main>

      <UserBookDetailDialog
        book={selectedUserBook}
        open={!!selectedUserBook}
        onOpenChange={(open) => !open && setSelectedUserBook(null)}
      />

      <BottomNav />
    </div>
  );
};

export default LibraryPage;
