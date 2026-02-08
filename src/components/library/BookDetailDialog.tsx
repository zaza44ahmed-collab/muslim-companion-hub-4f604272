import { Star, Download, ArrowRight, Share2, BookOpen, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { BookItem } from "@/data/books";

interface BookDetailDialogProps {
  book: BookItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookDetailDialog = ({ book, open, onOpenChange }: BookDetailDialogProps) => {
  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 max-h-[90vh] overflow-hidden rounded-2xl">
        <ScrollArea className="max-h-[90vh]">
          {/* Hero Cover */}
          <div className="relative bg-gradient-to-b from-primary/10 to-background pt-6 pb-4 px-5">
            <DialogHeader className="items-center">
              <img
                src={book.cover}
                alt={book.title}
                className="h-52 w-36 rounded-xl object-cover shadow-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
              <DialogTitle className="text-lg font-bold font-cairo mt-3 text-center">
                {book.title}
              </DialogTitle>
              <p className="text-sm text-primary font-semibold">{book.author}</p>
            </DialogHeader>

            {/* Stats Row */}
            <div className="flex items-center justify-center gap-6 mt-3 text-xs text-muted-foreground">
              <div className="flex flex-col items-center">
                <span className="flex items-center gap-1 font-bold text-foreground text-sm">
                  <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                  {book.rating}
                </span>
                <span>التقييم</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex flex-col items-center">
                <span className="font-bold text-foreground text-sm">{book.pages}</span>
                <span>صفحة</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex flex-col items-center">
                <span className="font-bold text-foreground text-sm">{book.downloads}</span>
                <span>تحميل</span>
              </div>
            </div>
          </div>

          <div className="px-5 pt-4">
            {/* Action Buttons */}
            <div className="flex gap-3 mb-5">
              <Button variant="islamic" className="flex-1 font-bold text-sm h-11">
                <BookOpen className="h-4 w-4 ml-2" />
                قراءة الكتاب
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11 shrink-0">
                <Download className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11 shrink-0">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* About */}
            <div className="mb-5">
              <h3 className="text-base font-bold font-cairo mb-2 flex items-center gap-2">
                عن الكتاب
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {book.fullDescription}
              </p>
            </div>

            {/* Table of Contents */}
            <div className="mb-5">
              <h3 className="text-base font-bold font-cairo mb-3">فهرس الكتاب</h3>
              <div className="space-y-2">
                {book.tableOfContents.map((chapter, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-muted/10 rounded-xl px-4 py-2.5"
                  >
                    <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <span className="text-sm text-foreground">{chapter}</span>
                  </div>
                ))}
              </div>
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
                  <span className="text-muted-foreground">الناشر</span>
                  <p className="font-semibold">{book.publisher}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">سنة النشر</span>
                  <p className="font-semibold">{book.year}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">الصيغة</span>
                  <p className="font-semibold">{book.format}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">عدد الصفحات</span>
                  <p className="font-semibold">{book.pages}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">اللغة</span>
                  <p className="font-semibold">{book.language}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailDialog;
