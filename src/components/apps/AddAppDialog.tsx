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
  const [link, setLink] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      setIconPreview(URL.createObjectURL(file));
    }
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
      if (iconFile) {
        const ext = iconFile.name.split(".").pop();
        const path = `${user.id}/apps/${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage.from("user-content").upload(path, iconFile);
        if (uploadErr) throw uploadErr;
        const { data: urlData } = supabase.storage.from("user-content").getPublicUrl(path);
        icon_url = urlData.publicUrl;
      }

      const { error } = await supabase.from("user_apps").insert({
        user_id: user.id,
        name: name.trim(),
        description: description.trim(),
        category,
        link: link.trim() || null,
        icon_url,
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
    setName(""); setDescription(""); setCategory("quran"); setLink("");
    setIconFile(null); setIconPreview(null);
  };

  const categories = appCategories.filter(c => c.id !== "all");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl" dir="rtl">
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
          
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>

          <Input placeholder="رابط التطبيق (اختياري)" value={link} onChange={e => setLink(e.target.value)} className="text-right" dir="ltr" />

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
