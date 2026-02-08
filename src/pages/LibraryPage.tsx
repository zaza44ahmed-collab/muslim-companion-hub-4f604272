import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Heart, Star, Filter } from "lucide-react";
import { books, bookCategories, type BookItem } from "@/data/books";
import BookDetailDialog from "@/components/library/BookDetailDialog";

const LibraryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

  const filteredBooks =
    activeCategory === "all"
      ? books
      : books.filter((book) => book.category === activeCategory);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="container py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">المكتبة الإسلامية</h2>
          <Button variant="ghost" size="icon">
            <Filter className="h-5 w-5" />
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
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

        {/* Books Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredBooks.map((book, index) => (
            <div
              key={book.id}
              className="bg-card rounded-2xl overflow-hidden shadow-card-islamic animate-fadeIn cursor-pointer hover:shadow-lg transition-shadow"
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
