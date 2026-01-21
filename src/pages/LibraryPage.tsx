import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Heart, Star, Filter } from "lucide-react";

const categories = [
  { id: "all", label: "الكل", active: true },
  { id: "aqeedah", label: "عقيدة" },
  { id: "fiqh", label: "فقه" },
  { id: "seerah", label: "سيرة" },
  { id: "kids", label: "أطفال" },
];

const books = [
  {
    id: 1,
    title: "رياض الصالحين",
    author: "الإمام النووي",
    pages: 650,
    format: "PDF",
    rating: 4.9,
    downloads: "50K",
    cover: "📗",
    category: "fiqh",
  },
  {
    id: 2,
    title: "العقيدة الواسطية",
    author: "ابن تيمية",
    pages: 120,
    format: "PDF",
    rating: 4.8,
    downloads: "30K",
    cover: "📘",
    category: "aqeedah",
  },
  {
    id: 3,
    title: "الرحيق المختوم",
    author: "صفي الرحمن المباركفوري",
    pages: 480,
    format: "EPUB",
    rating: 5.0,
    downloads: "100K",
    cover: "📕",
    category: "seerah",
  },
  {
    id: 4,
    title: "قصص الأنبياء للأطفال",
    author: "محمد علي قطب",
    pages: 200,
    format: "PDF",
    rating: 4.7,
    downloads: "25K",
    cover: "📙",
    category: "kids",
  },
  {
    id: 5,
    title: "فقه السنة",
    author: "السيد سابق",
    pages: 800,
    format: "PDF",
    rating: 4.9,
    downloads: "40K",
    cover: "📗",
    category: "fiqh",
  },
];

const LibraryPage = () => {
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
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={cat.active ? "islamic" : "outline"}
              size="sm"
              className="shrink-0"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 gap-4">
          {books.map((book, index) => (
            <div
              key={book.id}
              className="bg-card rounded-2xl overflow-hidden shadow-card-islamic animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Book Cover */}
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                <span className="text-6xl">{book.cover}</span>
                
                {/* Format Badge */}
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-secondary text-secondary-foreground text-xs font-bold rounded">
                  {book.format}
                </span>

                {/* Favorite Button */}
                <button className="absolute top-2 left-2 p-2 bg-white/80 rounded-full">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* Book Info */}
              <div className="p-3">
                <h3 className="font-bold text-sm line-clamp-1">{book.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1 text-xs text-secondary">
                    <Star className="h-3 w-3 fill-secondary" />
                    {book.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {book.pages} صفحة
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button variant="islamic" size="sm" className="flex-1 text-xs">
                    <BookOpen className="h-3 w-3 ml-1" />
                    قراءة
                  </Button>
                  <Button variant="outline" size="sm" className="px-2">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default LibraryPage;
