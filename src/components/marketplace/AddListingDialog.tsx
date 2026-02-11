import { useState, useRef } from "react";
import { Camera, X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: "electronics", name: "إلكترونيات" },
  { id: "cars", name: "سيارات" },
  { id: "realestate", name: "عقارات" },
  { id: "furniture", name: "أثاث" },
  { id: "clothing", name: "ملابس" },
  { id: "books", name: "كتب" },
  { id: "sports", name: "رياضة" },
  { id: "services", name: "خدمات" },
];

const conditions = ["جديد", "مستعمل - ممتاز", "مستعمل - جيد جداً", "مستعمل - جيد", "خدمة"];

interface AddListingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    title: string; description: string; price: number; location: string;
    category: string; condition: string; phone: string; imageFiles: File[];
  }) => Promise<{ error: string | null }>;
}

const AddListingDialog = ({ open, onOpenChange, onSubmit }: AddListingDialogProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [form, setForm] = useState({
    title: "", description: "", price: "", location: "",
    category: "electronics", condition: "مستعمل - ممتاز", phone: "",
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      toast({ title: "الحد الأقصى 5 صور", variant: "destructive" });
      return;
    }
    const newImages = [...images, ...files];
    setImages(newImages);
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    previews.forEach(URL.revokeObjectURL);
    setForm({ title: "", description: "", price: "", location: "", category: "electronics", condition: "مستعمل - ممتاز", phone: "" });
    setImages([]);
    setPreviews([]);
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.price || !form.location.trim() || !form.phone.trim()) {
      toast({ title: "يرجى تعبئة جميع الحقول", variant: "destructive" });
      return;
    }
    if (images.length === 0) {
      toast({ title: "يرجى إضافة صورة واحدة على الأقل", variant: "destructive" });
      return;
    }
    setLoading(true);
    const result = await onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      location: form.location.trim(),
      category: form.category,
      condition: form.condition,
      phone: form.phone.trim(),
      imageFiles: images,
    });
    setLoading(false);
    if (result.error) {
      toast({ title: result.error, variant: "destructive" });
    } else {
      toast({ title: "تم نشر الإعلان بنجاح ✅" });
      resetForm();
      onOpenChange(false);
    }
  };

  const inputClass = "w-full h-10 px-3 rounded-xl border-2 border-secondary/30 bg-card text-sm focus:outline-none focus:border-primary/60 transition-colors text-right";

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); onOpenChange(v); }}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-base font-bold font-amiri text-primary">إضافة إعلان جديد</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {/* Images */}
          <div>
            <label className="text-xs font-bold text-foreground mb-1.5 block">الصور (حد أقصى 5)</label>
            <div className="flex gap-2 flex-wrap">
              {previews.map((src, i) => (
                <div key={i} className="relative h-20 w-20 rounded-xl overflow-hidden border-2 border-secondary/30">
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  <button onClick={() => removeImage(i)} className="absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-destructive/80 flex items-center justify-center">
                    <X className="h-3 w-3 text-destructive-foreground" />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="h-20 w-20 rounded-xl border-2 border-dashed border-secondary/40 flex flex-col items-center justify-center gap-1 hover:bg-secondary/5 transition-colors"
                >
                  <Camera className="h-5 w-5 text-muted-foreground" />
                  <span className="text-[9px] text-muted-foreground">إضافة</span>
                </button>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageSelect} />
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-bold text-foreground mb-1 block">عنوان الإعلان</label>
            <input className={inputClass} placeholder="مثال: آيفون 15 برو ماكس" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} maxLength={100} />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-foreground mb-1 block">الوصف</label>
            <textarea
              className="w-full h-24 px-3 py-2 rounded-xl border-2 border-secondary/30 bg-card text-sm focus:outline-none focus:border-primary/60 transition-colors text-right resize-none"
              placeholder="اكتب وصفاً تفصيلياً..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              maxLength={1000}
            />
          </div>

          {/* Price & Location */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-foreground mb-1 block">السعر (ر.س)</label>
              <input className={inputClass} type="number" placeholder="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground mb-1 block">الموقع</label>
              <input className={inputClass} placeholder="الرياض" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} maxLength={100} />
            </div>
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-foreground mb-1 block">التصنيف</label>
              <select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-foreground mb-1 block">الحالة</label>
              <select className={inputClass} value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })}>
                {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-bold text-foreground mb-1 block">رقم الجوال</label>
            <input className={inputClass} type="tel" placeholder="05XXXXXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={15} />
          </div>

          {/* Submit */}
          <Button onClick={handleSubmit} disabled={loading} className="w-full gradient-islamic text-primary-foreground font-bold">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin ml-2" /> جاري النشر...</> : "نشر الإعلان"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddListingDialog;
