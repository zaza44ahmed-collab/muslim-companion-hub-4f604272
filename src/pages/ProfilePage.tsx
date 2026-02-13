import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Camera, ArrowRight, Save, User, Mail, Loader2, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import BottomNav from "@/components/layout/BottomNav";

const ProfilePage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }
    if (user) {
      fetchProfile();
    }
  }, [user, authLoading]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setDisplayName(data.display_name || "");
      setEmail(data.email || user.email || "");
      setAvatarUrl(data.avatar_url);
    }
    setLoading(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "خطأ", description: "يرجى اختيار صورة", variant: "destructive" });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "خطأ", description: "حجم الصورة يجب أن يكون أقل من 2 ميجابايت", variant: "destructive" });
      return;
    }

    setUploadingAvatar(true);
    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast({ title: "خطأ في رفع الصورة", description: uploadError.message, variant: "destructive" });
      setUploadingAvatar(false);
      return;
    }

    const { data: publicUrl } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const newUrl = `${publicUrl.publicUrl}?t=${Date.now()}`;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: newUrl })
      .eq("id", user.id);

    if (updateError) {
      toast({ title: "خطأ", description: updateError.message, variant: "destructive" });
    } else {
      setAvatarUrl(newUrl);
      toast({ title: "تم تحديث الصورة بنجاح" });
    }
    setUploadingAvatar(false);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName.trim() })
      .eq("id", user.id);

    if (error) {
      toast({ title: "خطأ في الحفظ", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "تم حفظ التغييرات بنجاح" });
    }
    setSaving(false);
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "خطأ", description: "كلمة المرور يجب أن تكون 6 أحرف على الأقل", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "خطأ", description: "كلمتا المرور غير متطابقتين", variant: "destructive" });
      return;
    }

    setChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      toast({ title: "خطأ في تغيير كلمة المرور", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "تم تغيير كلمة المرور بنجاح" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    setChangingPassword(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b-2 border-secondary/30">
        <div className="container flex h-14 items-center justify-between">
          <div className="w-10" />
          <h1 className="text-lg font-bold font-amiri text-gradient-islamic">الملف الشخصي</h1>
          <Link to="/settings">
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="container py-6 px-4 space-y-6 max-w-md mx-auto">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-3 animate-fadeIn">
          <div className="relative">
            <div className="h-28 w-28 rounded-full border-4 border-secondary/40 overflow-hidden bg-muted flex items-center justify-center shadow-lg">
              {avatarUrl ? (
                <img src={avatarUrl} alt="الصورة الشخصية" className="h-full w-full object-cover" />
              ) : (
                <User className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingAvatar}
              className="absolute bottom-0 left-0 h-9 w-9 rounded-full gradient-islamic flex items-center justify-center border-2 border-background shadow-md hover:scale-110 transition-transform"
            >
              {uploadingAvatar ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary-foreground" />
              ) : (
                <Camera className="h-4 w-4 text-primary-foreground" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>
          <p className="text-xs text-muted-foreground">اضغط على الكاميرا لتغيير الصورة</p>
        </div>

        {/* Form */}
        <div className="space-y-4 animate-fadeIn" style={{ animationDelay: "100ms" }}>
          <div className="rounded-2xl border-2 border-secondary/30 bg-card p-5 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground font-cairo flex items-center gap-2">
                <User className="h-4 w-4 text-secondary" />
                الاسم الكامل
              </label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="أدخل اسمك الكامل"
                className="text-right h-12 rounded-xl border-2 border-secondary/20 focus:border-primary bg-background text-base"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground font-cairo flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary" />
                البريد الإلكتروني
              </label>
              <Input
                value={email}
                disabled
                className="text-right h-12 rounded-xl border-2 border-secondary/20 bg-muted text-base text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground">لا يمكن تغيير البريد الإلكتروني</p>
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full h-12 rounded-xl gradient-islamic text-primary-foreground font-semibold text-base gap-2"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
          </Button>
        </div>

        {/* Password Change */}
        <div className="space-y-4 animate-fadeIn" style={{ animationDelay: "200ms" }}>
          <div className="rounded-2xl border-2 border-secondary/30 bg-card p-5 space-y-4">
            <h3 className="text-sm font-bold text-foreground font-cairo flex items-center gap-2">
              <Lock className="h-4 w-4 text-secondary" />
              تغيير كلمة المرور
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">كلمة المرور الجديدة</label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور الجديدة"
                  className="text-right h-12 rounded-xl border-2 border-secondary/20 focus:border-primary bg-background text-base pl-10"
                />
                <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">تأكيد كلمة المرور</label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="أعد إدخال كلمة المرور"
                  className="text-right h-12 rounded-xl border-2 border-secondary/20 focus:border-primary bg-background text-base pl-10"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <Button
            onClick={handleChangePassword}
            disabled={changingPassword}
            variant="outline"
            className="w-full h-12 rounded-xl font-semibold text-base gap-2 border-2 border-secondary/30"
          >
            {changingPassword ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Lock className="h-4 w-4" />
            )}
            {changingPassword ? "جاري التغيير..." : "تغيير كلمة المرور"}
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
