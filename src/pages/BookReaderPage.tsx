import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const BookReaderPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const url = searchParams.get("url");
  const title = searchParams.get("title") || "كتاب";

  if (!url) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">لا يوجد ملف للقراءة</p>
      </div>
    );
  }

  localStorage.setItem("last_read_book", JSON.stringify({ url, title, timestamp: Date.now() }));

  return (
    <div className="h-screen flex flex-col bg-background" dir="rtl">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex h-12 items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowRight className="h-5 w-5" />
          </Button>
          <h1 className="text-sm font-bold truncate flex-1">{title}</h1>
          <Button variant="ghost" size="icon" onClick={() => window.open(url, "_blank")}>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </header>
      <iframe
        src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
        className="flex-1 w-full border-0"
        title={title}
      />
    </div>
  );
};

export default BookReaderPage;
