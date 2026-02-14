import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Camera, ArrowRight, User, Mail, Loader2, Edit3,
  BookOpen, Headphones, Film, Upload, Heart, Trophy,
  Award, Flame, Star, ChevronLeft, Smartphone, Library,
  Music, Video, Package, Shield, Moon, Sun, Bell, Globe,
  Lock, LogOut, Info, Share2, HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { usePreferences } from "@/hooks/usePreferences";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import BottomNav from "@/components/layout/BottomNav";

// --- Sub-components ---

const ProfileHeader = ({
  avatarUrl,
  displayName,
  email,
  bio,
  level,
  onEditClick,
  onAvatarClick,
  uploadingAvatar,
}: {
  avatarUrl: string | null;
  displayName: string;
  email: string;
  bio: string;
  level: string;
  onEditClick: () => void;
  onAvatarClick: () => void;
  uploadingAvatar: boolean;
}) => {
  const levelConfig: Record<string, { color: string; icon: string }> = {
    "مبتدئ": { color: "bg-muted text-muted-foreground", icon: "🌱" },
    "طالب علم": { color: "bg-secondary/20 text-secondary", icon: "📖" },
    "حافظ قرآن": { color: "bg-primary/20 text-primary", icon: "🏅" },
  };
  const cfg = levelConfig[level] || levelConfig["مبتدئ"];

  return (
    <section className="animate-fadeIn">
      <div className="relative overflow-hidden rounded-2xl gradient-islamic p-6 border-2 border-secondary/30">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-24 h-24 border-2 border-primary-foreground/20 rounded-full" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-primary-foreground/10 rounded-full" />
        </div>

        <div className="relative flex flex-col items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <div
              className="h-24 w-24 rounded-full border-4 border-primary-foreground/30 overflow-hidden bg-primary-foreground/10 flex items-center justify-center shadow-lg cursor-pointer"
              onClick={onAvatarClick}
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="الصورة الشخصية" className="h-full w-full object-cover" />
              ) : (
                <User className="h-10 w-10 text-primary-foreground" />
              )}
            </div>
            <button
              onClick={onAvatarClick}
              disabled={uploadingAvatar}
              className="absolute bottom-0 left-0 h-8 w-8 rounded-full bg-secondary flex items-center justify-center border-2 border-background shadow-md hover:scale-110 transition-transform"
            >
              {uploadingAvatar ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-secondary-foreground" />
              ) : (
                <Camera className="h-3.5 w-3.5 text-secondary-foreground" />
              )}
            </button>
          </div>

          {/* Name & Email */}
          <div className="text-center">
            <h2 className="text-lg font-bold text-primary-foreground font-cairo">
              {displayName || "مستخدم"}
            </h2>
            <p className="text-primary-foreground/60 text-xs mt-0.5">{email}</p>
          </div>

          {/* Bio */}
          {bio && (
            <p className="text-primary-foreground/80 text-xs text-center max-w-[250px] leading-relaxed">
              {bio}
            </p>
          )}

          {/* Level Badge */}
          <Badge className={`${cfg.color} text-xs font-semibold px-3 py-1 rounded-full border-0`}>
            {cfg.icon} {level}
          </Badge>

          {/* Edit Button */}
          <button
            onClick={onEditClick}
            className="mt-1 py-2 px-5 rounded-xl bg-primary-foreground/15 border border-primary-foreground/30 text-primary-foreground font-semibold text-xs hover:bg-primary-foreground/25 transition-all flex items-center gap-1.5"
          >
            <Edit3 className="h-3.5 w-3.5" />
            تعديل الملف الشخصي
          </button>
        </div>
      </div>
    </section>
  );
};

const StatsSection = ({ stats }: { stats: { label: string; value: number; icon: React.ElementType }[] }) => (
  <section className="animate-fadeIn" style={{ animationDelay: "100ms" }}>
    <h3 className="text-xs font-bold text-muted-foreground mb-2 px-2 uppercase tracking-wide text-right">
      📊 الإحصائيات
    </h3>
    <div className="grid grid-cols-3 gap-2">
      {stats.map((s, i) => (
        <div key={i} className="rounded-2xl border-2 border-secondary/30 bg-card p-3 text-center">
          <s.icon className="h-5 w-5 text-secondary mx-auto mb-1" />
          <p className="text-lg font-bold text-foreground">{s.value}</p>
          <p className="text-[10px] text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  </section>
);

const SectionItem = ({
  icon: Icon,
  label,
  count,
  to,
}: {
  icon: React.ElementType;
  label: string;
  count?: number;
  to?: string;
}) => {
  const content = (
    <div className="flex items-center justify-between py-3.5 px-5 transition-colors hover:bg-accent/50 cursor-pointer group" dir="rtl">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-secondary/10 flex items-center justify-center">
          <Icon className="h-4.5 w-4.5 text-secondary" />
        </div>
        <span className="text-sm font-semibold text-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {count !== undefined && (
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{count}</span>
        )}
        <ChevronLeft className="h-4 w-4 text-muted-foreground group-hover:text-secondary transition-colors" />
      </div>
    </div>
  );
  if (to) return <Link to={to}>{content}</Link>;
  return content;
};

const GamificationSection = ({ points, badges, streak }: { points: number; badges: string[]; streak: number }) => (
  <section className="animate-fadeIn" style={{ animationDelay: "300ms" }}>
    <h3 className="text-xs font-bold text-muted-foreground mb-2 px-2 uppercase tracking-wide text-right">
      🏆 نظام التحفيز
    </h3>
    <div className="rounded-2xl border-2 border-secondary/30 bg-card overflow-hidden p-4 space-y-4">
      {/* Points */}
      <div className="flex items-center justify-between" dir="rtl">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <span className="text-sm font-bold text-foreground">النقاط</span>
        </div>
        <span className="text-lg font-bold text-primary">{points}</span>
      </div>
      <Progress value={Math.min((points / 1000) * 100, 100)} className="h-2" />
      <p className="text-[10px] text-muted-foreground text-right">
        {1000 - points > 0 ? `${1000 - points} نقطة للمستوى التالي` : "أحسنت! وصلت للمستوى التالي"}
      </p>

      {/* Streak */}
      <div className="flex items-center justify-between border-t border-border/50 pt-3" dir="rtl">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="text-sm font-bold text-foreground">سلسلة النشاط</span>
        </div>
        <span className="text-sm font-bold text-foreground">{streak} يوم 🔥</span>
      </div>

      {/* Badges */}
      <div className="border-t border-border/50 pt-3">
        <p className="text-xs font-bold text-foreground mb-2 text-right">الشارات</p>
        <div className="flex flex-wrap gap-2 justify-end">
          {badges.map((b, i) => (
            <Badge key={i} variant="outline" className="text-[10px] border-secondary/40 text-secondary">
              <Award className="h-3 w-3 ml-1" /> {b}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// --- Main Page ---

const ProfilePage = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { preferences, updatePreference } = usePreferences();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useState<HTMLInputElement | null>(null);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useState<HTMLInputElement | null>(null);

  // Mock data for stats & gamification (can be replaced with real data later)
  const [stats] = useState([
    { label: "التطبيقات", value: 12, icon: Smartphone },
    { label: "الكتب", value: 8, icon: BookOpen },
    { label: "الصوتيات", value: 24, icon: Headphones },
    { label: "الريلز", value: 45, icon: Film },
    { label: "المرفوعات", value: 3, icon: Upload },
    { label: "الإعجابات", value: 67, icon: Heart },
  ]);

  const [gamification] = useState({
    points: 350,
    badges: ["قارئ نشيط", "مستمع دائم", "ناشر خير"],
    streak: 7,
  });

  const userLevel = "طالب علم";

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }
    if (user) fetchProfile();
  }, [user, authLoading]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
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
      toast({ title: "خطأ", description: "حجم الصورة أقل من 2 ميجابايت", variant: "destructive" });
      return;
    }
    setUploadingAvatar(true);
    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, { upsert: true });
    if (uploadError) {
      toast({ title: "خطأ في رفع الصورة", description: uploadError.message, variant: "destructive" });
      setUploadingAvatar(false);
      return;
    }
    const { data: publicUrl } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const newUrl = `${publicUrl.publicUrl}?t=${Date.now()}`;
    await supabase.from("profiles").update({ avatar_url: newUrl }).eq("id", user.id);
    setAvatarUrl(newUrl);
    toast({ title: "تم تحديث الصورة بنجاح" });
    setUploadingAvatar(false);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    const { error } = await supabase.from("profiles").update({ display_name: displayName.trim() }).eq("id", user.id);
    if (error) {
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "تم حفظ التغييرات" });
      setIsEditing(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) toast({ title: "تم تسجيل الخروج" });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: "حقيبة المسلم", text: "تطبيق إسلامي شامل", url: window.location.origin });
    }
  };

  const toggleTheme = () => updatePreference("theme", preferences.theme === "dark" ? "light" : "dark");
  const toggleNotifications = () => updatePreference("notifications_enabled", !preferences.notifications_enabled);

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

      <main className="container py-4 px-4 space-y-5 max-w-md mx-auto">
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="avatar-upload"
          onChange={handleAvatarUpload}
        />

        {/* 1. Profile Header */}
        <ProfileHeader
          avatarUrl={avatarUrl}
          displayName={displayName}
          email={email}
          bio={bio || "محب للقرآن والعلم الشرعي"}
          level={userLevel}
          onEditClick={() => setIsEditing(true)}
          onAvatarClick={() => document.getElementById("avatar-upload")?.click()}
          uploadingAvatar={uploadingAvatar}
        />

        {/* Edit Profile Inline */}
        {isEditing && (
          <section className="animate-fadeIn rounded-2xl border-2 border-secondary/30 bg-card p-4 space-y-3">
            <h3 className="text-sm font-bold text-foreground font-cairo flex items-center gap-2">
              <Edit3 className="h-4 w-4 text-secondary" />
              تعديل البيانات
            </h3>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">الاسم</label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="أدخل اسمك"
                className="text-right h-11 rounded-xl border-2 border-secondary/20 focus:border-primary bg-background text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">النبذة</label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="نبذة قصيرة عنك..."
                className="text-right rounded-xl border-2 border-secondary/20 focus:border-primary bg-background text-sm min-h-[70px]"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveProfile} className="flex-1 h-10 rounded-xl gradient-islamic text-primary-foreground text-sm">
                حفظ
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="outline" className="h-10 rounded-xl border-2 border-secondary/30 text-sm">
                إلغاء
              </Button>
            </div>
          </section>
        )}

        {/* 2. Stats */}
        <StatsSection stats={stats} />

        {/* 3. Profile Sections */}
        <section className="animate-fadeIn" style={{ animationDelay: "200ms" }}>
          <h3 className="text-xs font-bold text-muted-foreground mb-2 px-2 uppercase tracking-wide text-right">
            📂 أقسامي
          </h3>
          <div className="rounded-2xl border-2 border-secondary/30 bg-card overflow-hidden divide-y divide-border/50">
            <SectionItem icon={Smartphone} label="تطبيقاتي المحفوظة" count={12} />
            <SectionItem icon={BookOpen} label="مكتبتي" count={8} to="/library" />
            <SectionItem icon={Headphones} label="الصوتيات المفضلة" count={24} to="/audio" />
            <SectionItem icon={Film} label="الريلز المحفوظة" count={45} />
            <SectionItem icon={Upload} label="المحتوى الذي رفعته" count={3} />
            <SectionItem icon={Heart} label="الإعجابات" count={67} />
          </div>
        </section>

        {/* 4. Gamification */}
        <GamificationSection {...gamification} />

        {/* 5. Settings */}
        <section className="animate-fadeIn" style={{ animationDelay: "400ms" }}>
          <h3 className="text-xs font-bold text-muted-foreground mb-2 px-2 uppercase tracking-wide text-right">
            ⚙️ الإعدادات
          </h3>
          <div className="rounded-2xl border-2 border-secondary/30 bg-card overflow-hidden divide-y divide-border/50">
            <SectionItem icon={Edit3} label="تعديل البيانات" />
            <SectionItem icon={Lock} label="تغيير كلمة المرور" />

            {/* Theme Toggle */}
            <div className="flex items-center justify-between py-3.5 px-5" dir="rtl">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-secondary/10 flex items-center justify-center">
                  {preferences.theme === "dark" ? (
                    <Sun className="h-4.5 w-4.5 text-secondary" />
                  ) : (
                    <Moon className="h-4.5 w-4.5 text-secondary" />
                  )}
                </div>
                <span className="text-sm font-semibold text-foreground">الوضع الليلي</span>
              </div>
              <Switch checked={preferences.theme === "dark"} onCheckedChange={toggleTheme} />
            </div>

            {/* Language */}
            <SectionItem icon={Globe} label="اللغة" />

            {/* Notifications Toggle */}
            <div className="flex items-center justify-between py-3.5 px-5" dir="rtl">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Bell className="h-4.5 w-4.5 text-secondary" />
                </div>
                <span className="text-sm font-semibold text-foreground">الإشعارات</span>
              </div>
              <Switch checked={preferences.notifications_enabled} onCheckedChange={toggleNotifications} />
            </div>

            <SectionItem icon={Shield} label="سياسة الخصوصية" />
          </div>
        </section>

        {/* Sign Out */}
        <section className="animate-fadeIn" style={{ animationDelay: "450ms" }}>
          <button
            onClick={handleSignOut}
            className="w-full py-3 rounded-2xl border-2 border-red-400/30 bg-red-500/10 text-red-500 font-semibold text-sm hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            تسجيل الخروج
          </button>
        </section>

        {/* Footer */}
        <div className="text-center py-3">
          <p className="text-[10px] text-muted-foreground/60">حقيبة المسلم • الإصدار 1.0.0</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
