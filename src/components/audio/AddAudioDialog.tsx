import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Upload, Image, Music } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { audioCategories } from "@/data/audio";

interface AddAudioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdded: () => void;
}

const AddAudioDialog = ({ open, onOpenChange, onAdded }: AddAudioDialogProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("quran");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLInputElement>(null);

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
    if (!title.trim()) {
      toast({ title: "يرجى ملء الحقول المطلوبة", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      let cover_url: string | null = null;
      let audio_url: string | null = null;

      if (coverFile) {
        const ext = coverFile.name.split(".").pop();
        const path = `${user.id}/audio/cover-${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from("user-content").upload(path, coverFile);
        if (error) throw error;
        cover_url = supabase.storage.from("user-content").getPublicUrl(path).data.publicUrl;
      }

      if (audioFile) {
        const ext = audioFile.name.split(".").pop();
        const path = `${user.id}/audio/file-${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from("user-content").upload(path, audioFile);
        if (error) throw error;
        audio_url = supabase.storage.from("user-content").getPublicUrl(path).data.publicUrl;
      }

      const { error } = await supabase.from("user_audio").insert({
        user_id: user.id,
        title: title.trim(),
        artist: artist.trim(),
        description: description.trim(),
        category,
        cover_url,
        audio_url,
      });
      if (error) throw error;

      toast({ title: "تمت إضافة الصوتية بنجاح ✅" });
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
    setTitle(""); setArtist(""); setDescription(""); setCategory("quran");
    setCoverFile(null); setCoverPreview(null); setAudioFile(null);
  };

  const categories = audioCategories.filter(c => c.id !== "all");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center font-bold">إضافة صوتية جديدة</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          {/* Cover upload */}
          <div className="flex justify-center">
            <button
              onClick={() => coverRef.current?.click()}
              className="h-20 w-20 rounded-2xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden hover:border-primary transition-colors"
            >
              {coverPreview ? (
                <img src={coverPreview} className="h-full w-full object-cover" />
              ) : (
                <Image className="h-8 w-8 text-muted-foreground/40" />
              )}
            </button>
            <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
          </div>

          <Input placeholder="عنوان الصوتية *" value={title} onChange={e => setTitle(e.target.value)} className="text-right" />
          <Input placeholder="اسم القارئ / المنشد" value={artist} onChange={e => setArtist(e.target.value)} className="text-right" />
          <Textarea placeholder="وصف الصوتية" value={description} onChange={e => setDescription(e.target.value)} className="text-right min-h-[80px]" />

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>

          {/* Audio upload */}
          <Button variant="outline" className="w-full" onClick={() => audioRef.current?.click()}>
            <Music className="h-4 w-4 ml-2" />
            {audioFile ? audioFile.name : "رفع ملف صوتي (MP3)"}
          </Button>
          <input ref={audioRef} type="file" accept="audio/*" className="hidden" onChange={e => setAudioFile(e.target.files?.[0] || null)} />

          <Button variant="islamic" className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : <Upload className="h-4 w-4 ml-2" />}
            {loading ? "جاري الإضافة..." : "إضافة الصوتية"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAudioDialog;
