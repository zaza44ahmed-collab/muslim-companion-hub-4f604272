import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Download, Heart, Star, Search, X, Plus } from "lucide-react";
import { books, bookCategories, type BookItem } from "@/data/books";
import BookDetailDialog from "@/components/library/BookDetailDialog";
import AddBookDialog from "@/components/library/AddBookDialog";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const LibraryPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [userBooks, setUserBooks] = useState<any[]>([]);

  const filteredBooks = books.filter((book) => {
    const matchesCategory = activeCategory === "all" || book.category === activeCategory;
    const matchesSearch = !searchQuery || book.title.includes(searchQuery) || book.author.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

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
      toast({ title: "جاري البحث عن الكتاب" });
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
      toast({ title: "جاري البحث عن التحميل" });
    }
  };

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    toast({ title: favorites.includes(id) ? "تمت الإزالة من المفضلة" : "تمت الإضافة للمفضلة" });
  };

  const fetchUserBooks = async () => {
    const { data } = await supabase.from("user_books").select("*").order("created_at", { ascending: false });
    if (data) setUserBooks(data);
  };

  useEffect(() => { fetchUserBooks(); }, []);

  const renderBookCard = (book: any, index: number, isUser: boolean) => (
    <div
      key={book.id}
      className="bg-card rounded-xl overflow-hidden shadow-card-islamic animate-fadeIn cursor-pointer hover:shadow-lg transition-shadow"
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={() => isUser ? (book.file_url ? handleRead(book, { stopPropagation: () => {} } as any) : null) : setSelectedBook(book)}
    >
      <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
        {(isUser ? book.cover_url : book.cover) ? (
          <img
            src={isUser ? book.cover_url : book.cover}
            alt={book.title}
            className="h-full w-full object-contain p-1"
            onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
          />
        ) : (
          <BookOpen className="h-10 w-10 text-muted-foreground/30" />
        )}
        {!isUser && (
          <span className="absolute top-2 right-2 px-2 py-0.5 bg-secondary text-secondary-foreground text-xs font-bold rounded">
            {book.format}
          </span>
        )}
        <button className="absolute top-2 left-2 p-2 bg-white/80 rounded-full" onClick={(e) => toggleFavorite(book.id, e)}>
          <Heart className={`h-4 w-4 ${favorites.includes(book.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm line-clamp-1">{book.title}</h3>
        <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center gap-1 text-xs text-gold">
            <Star className="h-3 w-3 fill-gold" />{isUser ? "4.5" : book.rating}
          </span>
          <span className="text-xs text-muted-foreground">
            {(isUser ? book.pages : book.pages) > 0 ? `${book.pages} صفحة` : ""}
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
  );

  return (
    <div className="min-h-screen bg-background pb-20" dir="rtl">
      <main className="container py-3 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold">المكتبة الإسلامية</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setShowSearch(!showSearch); if (showSearch) setSearchQuery(""); }}>
            {showSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>

        {showSearch && (
          <div className="mb-3 animate-fadeIn">
            <Input placeholder="ابحث عن كتاب..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="text-right" autoFocus />
          </div>
        )}

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto mb-2 scrollbar-hide">
          {bookCategories.map((cat) => (
            <Button key={cat.id} variant={activeCategory === cat.id ? "islamic" : "outline"} size="sm" className="shrink-0" onClick={() => setActiveCategory(cat.id)}>
              {cat.label}
            </Button>
          ))}
        </div>

        {/* User uploaded books */}
        {filteredUserBooks.length > 0 && (
          <>
            <h3 className="font-bold text-sm mb-2">كتب المستخدمين</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {filteredUserBooks.map((book, index) => renderBookCard(book, index, true))}
            </div>
          </>
        )}

        {/* All Books Grid */}
        <h3 className="font-bold text-sm mb-2">جميع الكتب</h3>
        {filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Search className="h-10 w-10 mb-3 opacity-40" />
            <p className="font-semibold text-sm">لا توجد نتائج</p>
            <p className="text-xs mt-1">جرّب كلمات بحث مختلفة</p>
          </div>
        ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredBooks.map((book, index) => renderBookCard(book, index, false))}
        </div>
        )}
      </main>

      <BookDetailDialog book={selectedBook} open={!!selectedBook} onOpenChange={(open) => !open && setSelectedBook(null)} />
      <AddBookDialog open={showAddDialog} onOpenChange={setShowAddDialog} onAdded={fetchUserBooks} />

      <button
        onClick={() => setShowAddDialog(true)}
        className="fixed bottom-24 left-5 z-40 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center active:scale-95 transition-transform"
      >
        <Plus className="h-6 w-6" />
      </button>

      <BottomNav />
    </div>
  );
};

export default LibraryPage;
