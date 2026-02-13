import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Heart, Star, Filter, Sparkles, ChevronLeft } from "lucide-react";
import { books, bookCategories, type BookItem } from "@/data/books";
import BookDetailDialog from "@/components/library/BookDetailDialog";

const allSuggested = books.filter((book) => book.rating >= 4.9);

const categoryLabel = (cat: string) => {
  const found = bookCategories.find((c) => c.id === cat);
  return found ? found.label : cat;
};

const LibraryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [showAllSuggested, setShowAllSuggested] = useState(false);

  const suggested = showAllSuggested ? allSuggested : allSuggested.slice(0, 4);

  const filteredBooks =
    activeCategory === "all"
      ? books
      : books.filter((book) => book.category === activeCategory);

  return (
    <div className="min-h-screen bg-background pb-20">
      

      <main className="container py-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold">المكتبة الإسلامية</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Suggested Books */}
        <section className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-gold" />
              <h3 className="font-bold text-sm">مقترحة لك</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-primary gap-1 text-[10px] px-1.5 h-7" onClick={() => setShowAllSuggested(!showAllSuggested)}>
              {showAllSuggested ? "عرض أقل" : "عرض الكل"}
              <ChevronLeft className={`h-3 w-3 transition-transform ${showAllSuggested ? "rotate-90" : ""}`} />
            </Button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {suggested.map((book) => (
              <div
                key={`suggested-${book.id}`}
                className="min-w-[110px] max-w-[110px] bg-card rounded-xl overflow-hidden shadow-card-islamic cursor-pointer hover:shadow-lg transition-shadow shrink-0"
                onClick={() => setSelectedBook(book)}
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-secondary text-secondary-foreground text-[10px] font-bold rounded">
                    {book.format}
                  </span>
                </div>
                <div className="p-2">
                  <h4 className="font-bold text-xs truncate">{book.title}</h4>
                  <p className="text-[10px] text-muted-foreground truncate">{book.author}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-2.5 w-2.5 fill-gold text-gold" />
                    <span className="text-[10px] font-semibold">{book.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
          {bookCategories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "islamic" : "outline"}
              size="sm"
              className="shrink-0"
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* All Books Grid */}
        <h3 className="font-bold text-sm mb-2">جميع الكتب</h3>
        <div className="grid grid-cols-2 gap-3">
          {filteredBooks.map((book, index) => (
            <div
              key={book.id}
              className="bg-card rounded-xl overflow-hidden shadow-card-islamic animate-fadeIn cursor-pointer hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${index * 80}ms` }}
              onClick={() => setSelectedBook(book)}
            >
              {/* Book Cover */}
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />

                {/* Format Badge */}
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-secondary text-secondary-foreground text-xs font-bold rounded">
                  {book.format}
                </span>

                {/* Favorite Button */}
                <button
                  className="absolute top-2 left-2 p-2 bg-white/80 rounded-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* Book Info */}
              <div className="p-3">
                <h3 className="font-bold text-sm line-clamp-1">{book.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{book.author}</p>

                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1 text-xs text-gold">
                    <Star className="h-3 w-3 fill-gold" />
                    {book.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {book.pages} صفحة
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="islamic"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BookOpen className="h-3 w-3 ml-1" />
                    قراءة
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BookDetailDialog
        book={selectedBook}
        open={!!selectedBook}
        onOpenChange={(open) => !open && setSelectedBook(null)}
      />

      <BottomNav />
    </div>
  );
};

export default LibraryPage;
