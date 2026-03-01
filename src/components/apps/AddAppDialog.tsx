import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Upload, Image, X, Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { appCategories } from "@/data/apps";

interface AddAppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdded: () => void;
}

const AddAppDialog = ({ open, onOpenChange, onAdded }: AddAppDialogProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("quran");
  const [version, setVersion] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [appFile, setAppFile] = useState<File | null>(null);
  const [screenshotFiles, setScreenshotFiles] = useState<File[]>([]);
  const [screenshotPreviews, setScreenshotPreviews] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const appFileRef = useRef<HTMLInputElement>(null);
  const screenshotRef = useRef<HTMLInputElement>(null);

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      setIconPreview(URL.createObjectURL(file));
    }
  };

  const handleScreenshotAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (screenshotFiles.length + files.length > 5) {
      toast({ title: "الحد الأقصى 5 صور", variant: "destructive" });
      return;
    }
    setScreenshotFiles(prev => [...prev, ...files]);
    setScreenshotPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
  };

  const removeScreenshot = (index: number) => {
    URL.revokeObjectURL(screenshotPreviews[index]);
    setScreenshotFiles(prev => prev.filter((_, i) => i !== index));
    setScreenshotPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({ title: "يجب تسجيل الدخول أولاً", variant: "destructive" });
      return;
    }
    if (!name.trim() || !description.trim()) {
      toast({ title: "يرجى ملء الحقول المطلوبة", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      let icon_url: string | null = null;
      let app_file_url: string | null = null;
      const screenshots: string[] = [];

      if (iconFile) {
        const ext = iconFile.name.split(".").pop();
        const path = `${user.id}/apps/${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage.from("user-content").upload(path, iconFile);
        if (uploadErr) throw uploadErr;
        icon_url = supabase.storage.from("user-content").getPublicUrl(path).data.publicUrl;
      }

      if (appFile) {
        const ext = appFile.name.split(".").pop();
        const path = `${user.id}/apps/apk-${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage.from("user-content").upload(path, appFile);
        if (uploadErr) throw uploadErr;
        app_file_url = supabase.storage.from("user-content").getPublicUrl(path).data.publicUrl;
      }

      for (const file of screenshotFiles) {
        const ext = file.name.split(".").pop();
        const path = `${user.id}/apps/screenshot-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadErr } = await supabase.storage.from("user-content").upload(path, file);
        if (uploadErr) throw uploadErr;
        screenshots.push(supabase.storage.from("user-content").getPublicUrl(path).data.publicUrl);
      }

      const { error } = await supabase.from("user_apps").insert({
        user_id: user.id,
        name: name.trim(),
        description: description.trim(),
        category,
        icon_url,
        app_file_url,
        screenshots,
        version: version.trim(),
      });
      if (error) throw error;

      toast({ title: "تمت إضافة التطبيق بنجاح ✅" });
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
    setName(""); setDescription(""); setCategory("quran"); setVersion("");
    setIconFile(null); setIconPreview(null); setAppFile(null);
    screenshotPreviews.forEach(URL.revokeObjectURL);
    setScreenshotFiles([]); setScreenshotPreviews([]);
  };

  const categories = appCategories.filter(c => c.id !== "all");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center font-bold">إضافة تطبيق جديد</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          {/* Icon upload */}
          <div className="flex justify-center">
            <button
              onClick={() => fileRef.current?.click()}
              className="h-20 w-20 rounded-2xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden hover:border-primary transition-colors"
            >
              {iconPreview ? (
                <img src={iconPreview} className="h-full w-full object-cover" />
              ) : (
                <Image className="h-8 w-8 text-muted-foreground/40" />
              )}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleIconChange} />
          </div>

          <Input placeholder="اسم التطبيق *" value={name} onChange={e => setName(e.target.value)} className="text-right" />
          <Textarea placeholder="وصف التطبيق *" value={description} onChange={e => setDescription(e.target.value)} className="text-right min-h-[80px]" />

          <div className="flex gap-3">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input placeholder="الإصدار" value={version} onChange={e => setVersion(e.target.value)} className="w-28 text-right" />
          </div>

          {/* App file upload */}
          <Button variant="outline" className="w-full" onClick={() => appFileRef.current?.click()}>
            <Smartphone className="h-4 w-4 ml-2" />
            {appFile ? appFile.name : "رفع ملف التطبيق (APK)"}
          </Button>
          <input ref={appFileRef} type="file" accept=".apk,.xapk,.aab" className="hidden" onChange={e => setAppFile(e.target.files?.[0] || null)} />

          {/* Screenshots */}
          <div>
            <label className="text-xs font-bold text-foreground mb-1.5 block">صور التطبيق (حد أقصى 5)</label>
            <div className="flex gap-2 flex-wrap">
              {screenshotPreviews.map((src, i) => (
                <div key={i} className="relative h-20 w-14 rounded-lg overflow-hidden border-2 border-muted-foreground/20">
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  <button onClick={() => removeScreenshot(i)} className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-destructive/80 flex items-center justify-center">
                    <X className="h-2.5 w-2.5 text-destructive-foreground" />
                  </button>
                </div>
              ))}
              {screenshotFiles.length < 5 && (
                <button
                  onClick={() => screenshotRef.current?.click()}
                  className="h-20 w-14 rounded-lg border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-1 hover:border-primary transition-colors"
                >
                  <Image className="h-4 w-4 text-muted-foreground/40" />
                  <span className="text-[8px] text-muted-foreground">إضافة</span>
                </button>
              )}
            </div>
            <input ref={screenshotRef} type="file" accept="image/*" multiple className="hidden" onChange={handleScreenshotAdd} />
          </div>

          <Button variant="islamic" className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : <Upload className="h-4 w-4 ml-2" />}
            {loading ? "جاري الإضافة..." : "إضافة التطبيق"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAppDialog;
