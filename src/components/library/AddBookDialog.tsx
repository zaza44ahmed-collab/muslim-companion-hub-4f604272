import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Upload, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { bookCategories } from "@/data/books";

interface AddBookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdded: () => void;
}

const AddBookDialog = ({ open, onOpenChange, onAdded }: AddBookDialogProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("fiqh");
  const [pages, setPages] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({ title: "يجب تسجيل الدخول أولاً", variant: "destructive" });
      return;
    }
    if (!title.trim() || !author.trim()) {
      toast({ title: "يرجى ملء الحقول المطلوبة", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      let cover_url: string | null = null;
      let file_url: string | null = null;

      if (coverFile) {
        const ext = coverFile.name.split(".").pop();
        const path = `${user.id}/books/cover-${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from("user-content").upload(path, coverFile);
        if (error) throw error;
        cover_url = supabase.storage.from("user-content").getPublicUrl(path).data.publicUrl;
      }

      if (pdfFile) {
        const ext = pdfFile.name.split(".").pop();
        const path = `${user.id}/books/file-${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from("user-content").upload(path, pdfFile);
        if (error) throw error;
        file_url = supabase.storage.from("user-content").getPublicUrl(path).data.publicUrl;
      }

      const { error } = await supabase.from("user_books").insert({
        user_id: user.id,
        title: title.trim(),
        author: author.trim(),
        description: description.trim(),
        category,
        pages: pages ? parseInt(pages) : 0,
        cover_url,
        file_url,
      });
      if (error) throw error;

      toast({ title: "تمت إضافة الكتاب بنجاح ✅" });
      resetForm();
      onOpenChange(false);
      onAdded();
    } catch (err: any) {
      toast({ title: "حدث خطأ", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle(""); setAuthor(""); setDescription(""); setCategory("fiqh"); setPages("");
    setCoverFile(null); setCoverPreview(null); setPdfFile(null);
  };

  const categories = bookCategories.filter(c => c.id !== "all");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center font-bold">إضافة كتاب جديد</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          {/* Cover upload */}
          <div className="flex justify-center">
            <button
              onClick={() => coverRef.current?.click()}
              className="h-28 w-20 rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden hover:border-primary transition-colors"
            >
              {coverPreview ? (
                <img src={coverPreview} className="h-full w-full object-cover" />
              ) : (
                <Image className="h-8 w-8 text-muted-foreground/40" />
              )}
            </button>
            <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
          </div>

          <Input placeholder="عنوان الكتاب *" value={title} onChange={e => setTitle(e.target.value)} className="text-right" />
          <Input placeholder="اسم المؤلف *" value={author} onChange={e => setAuthor(e.target.value)} className="text-right" />
          <Textarea placeholder="وصف الكتاب" value={description} onChange={e => setDescription(e.target.value)} className="text-right min-h-[80px]" />

          <div className="flex gap-3">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input type="number" placeholder="عدد الصفحات" value={pages} onChange={e => setPages(e.target.value)} className="w-28 text-right" />
          </div>

          {/* PDF upload */}
          <Button variant="outline" className="w-full" onClick={() => pdfRef.current?.click()}>
            <Upload className="h-4 w-4 ml-2" />
            {pdfFile ? pdfFile.name : "رفع ملف الكتاب (PDF)"}
          </Button>
          <input ref={pdfRef} type="file" accept=".pdf,.epub" className="hidden" onChange={e => setPdfFile(e.target.files?.[0] || null)} />

          <Button variant="islamic" className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : <Upload className="h-4 w-4 ml-2" />}
            {loading ? "جاري الإضافة..." : "إضافة الكتاب"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookDialog;
