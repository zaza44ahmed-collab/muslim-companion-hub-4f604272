import { useState } from "react";
import { Star, Download, BookOpen, Heart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UserBookDetailDialogProps {
  book: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserBookDetailDialog = ({ book, open, onOpenChange }: UserBookDetailDialogProps) => {
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);
  const [userRating, setUserRating] = useState(0);

  if (!book) return null;

  const handleRead = () => {
    if (book.file_url) {
      navigate(`/book-reader?url=${encodeURIComponent(book.file_url)}&title=${encodeURIComponent(book.title)}`);
      onOpenChange(false);
    } else {
      const q = encodeURIComponent(`${book.title} ${book.author} PDF`);
      window.open(`https://www.google.com/search?q=${q}`, "_blank");
    }
  };

  const handleDownload = () => {
    if (book.file_url) {
      const a = document.createElement("a");
      a.href = book.file_url;
      a.download = `${book.title}.pdf`;
      a.click();
      toast({ title: "جاري التحميل..." });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 max-h-[90vh] overflow-hidden rounded-2xl" dir="rtl">
        <ScrollArea className="max-h-[90vh]">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border px-4 py-3 flex items-center justify-between">
            <h2 className="text-base font-bold font-cairo">{book.title}</h2>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Cover */}
          <div className="relative bg-gradient-to-b from-primary/10 to-background pt-6 pb-4 px-5">
            <div className="flex justify-center">
              <img
                src={book.cover_url || "/placeholder.svg"}
                alt={book.title}
                className="h-52 w-36 rounded-xl object-contain shadow-lg"
                onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
              />
            </div>
            <div className="text-center mt-3">
              <p className="text-sm text-primary font-semibold">{book.author}</p>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-center gap-6 mt-3 text-xs text-muted-foreground">
              <div className="flex flex-col items-center">
                <span className="flex items-center gap-1 font-bold text-foreground text-sm">
                  <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                  {userRating || "4.5"}
                </span>
                <span>التقييم</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex flex-col items-center">
                <span className="font-bold text-foreground text-sm">{book.pages || "—"}</span>
                <span>صفحة</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex flex-col items-center">
                <span className="font-bold text-foreground text-sm">{book.category}</span>
                <span>التصنيف</span>
              </div>
            </div>
          </div>

          <div className="px-5 pt-4">
            {/* Action Buttons */}
            <div className="flex gap-3 mb-5">
              <Button variant="islamic" className="flex-1 font-bold text-sm h-11" onClick={handleRead}>
                <BookOpen className="h-4 w-4 ml-2" />
                قراءة الكتاب
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11 shrink-0" onClick={handleDownload}>
                <Download className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11 shrink-0" onClick={() => setIsFav(!isFav)}>
                <Heart className={`h-5 w-5 ${isFav ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {/* Rating */}
            <div className="mb-5">
              <h3 className="text-base font-bold font-cairo mb-2">التقييم</h3>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} onClick={() => setUserRating(s)}>
                    <Star className={`h-6 w-6 ${s <= userRating ? "fill-gold text-gold" : "text-muted-foreground/30"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="mb-5">
              <h3 className="text-base font-bold font-cairo mb-2">عن الكتاب</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {book.description || "لا يوجد وصف متاح"}
              </p>
            </div>

            {/* Book Info */}
            <div className="mb-6 bg-muted/10 rounded-xl p-4">
              <h3 className="text-base font-bold font-cairo mb-3">معلومات الكتاب</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">المؤلف</span>
                  <p className="font-semibold">{book.author}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">التصنيف</span>
                  <p className="font-semibold">{book.category}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">عدد الصفحات</span>
                  <p className="font-semibold">{book.pages || "—"}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default UserBookDetailDialog;
