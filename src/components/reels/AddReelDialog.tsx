import { useState, useRef } from "react";
import { Video, X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AddReelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    title: string; description: string; videoFile: File; audioName: string;
  }) => Promise<{ error: string | null }>;
}

const AddReelDialog = ({ open, onOpenChange, onSubmit }: AddReelDialogProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", audioName: "" });

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) {
      toast({ title: "الحد الأقصى 50 ميجابايت", variant: "destructive" });
      return;
    }
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setForm({ title: "", description: "", audioName: "" });
    setVideoFile(null);
    setVideoPreview(null);
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast({ title: "يرجى كتابة عنوان", variant: "destructive" });
      return;
    }
    if (!videoFile) {
      toast({ title: "يرجى اختيار فيديو", variant: "destructive" });
      return;
    }
    setLoading(true);
    const result = await onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      videoFile,
      audioName: form.audioName.trim() || "الصوت الأصلي",
    });
    setLoading(false);
    if (result.error) {
      toast({ title: result.error, variant: "destructive" });
    } else {
      toast({ title: "تم نشر الريلز بنجاح ✅" });
      resetForm();
      onOpenChange(false);
    }
  };

  const inputClass = "w-full h-10 px-3 rounded-xl border-2 border-secondary/30 bg-card text-sm focus:outline-none focus:border-primary/60 transition-colors text-right";

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); onOpenChange(v); }}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-base font-bold font-amiri text-primary">إضافة ريلز جديد</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {/* Video */}
          <div>
            <label className="text-xs font-bold text-foreground mb-1.5 block">الفيديو (حد أقصى 50 ميجا)</label>
            {videoPreview ? (
              <div className="relative rounded-xl overflow-hidden border-2 border-secondary/30">
                <video src={videoPreview} className="w-full h-40 object-cover" controls />
                <button onClick={() => { if (videoPreview) URL.revokeObjectURL(videoPreview); setVideoFile(null); setVideoPreview(null); }}
                  className="absolute top-1 right-1 h-6 w-6 rounded-full bg-destructive/80 flex items-center justify-center">
                  <X className="h-3 w-3 text-destructive-foreground" />
                </button>
              </div>
            ) : (
              <button onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 rounded-xl border-2 border-dashed border-secondary/40 flex flex-col items-center justify-center gap-2 hover:bg-secondary/5 transition-colors">
                <Video className="h-8 w-8 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">اختر فيديو</span>
              </button>
            )}
            <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoSelect} />
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-bold text-foreground mb-1 block">العنوان</label>
            <input className={inputClass} placeholder="اكتب عنواناً جذاباً..." value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} maxLength={150} />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-foreground mb-1 block">الوصف (اختياري)</label>
            <textarea
              className="w-full h-20 px-3 py-2 rounded-xl border-2 border-secondary/30 bg-card text-sm focus:outline-none focus:border-primary/60 transition-colors text-right resize-none"
              placeholder="أضف وصفاً..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              maxLength={500}
            />
          </div>

          {/* Audio name */}
          <div>
            <label className="text-xs font-bold text-foreground mb-1 block">اسم الصوت (اختياري)</label>
            <input className={inputClass} placeholder="الصوت الأصلي" value={form.audioName} onChange={(e) => setForm({ ...form, audioName: e.target.value })} maxLength={100} />
          </div>

          {/* Submit */}
          <Button onClick={handleSubmit} disabled={loading} className="w-full gradient-islamic text-primary-foreground font-bold">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin ml-2" /> جاري الرفع...</> : "نشر الريلز"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddReelDialog;
