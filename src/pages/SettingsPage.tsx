import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User, Edit3, Bookmark, Upload, Bell, Clock, Moon, Sun, Globe, Shield,
  Info, Star, Share2, Heart, Flag, LogOut, LogIn, ChevronLeft, ArrowLeft,
  Crown, Volume2, Sparkles,
} from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { usePreferences } from "@/hooks/usePreferences";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  subtitle?: string;
  to?: string;
  onClick?: () => void;
  trailing?: React.ReactNode;
  destructive?: boolean;
}

const MenuItem = ({ icon: Icon, label, subtitle, to, onClick, trailing, destructive }: MenuItemProps) => {
  const content = (
    <div className="flex items-center justify-between py-3.5 px-4 transition-colors duration-200 hover:bg-accent/50 cursor-pointer group" dir="rtl">
      <div className="flex items-center gap-3">
        <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${destructive ? "bg-destructive/10" : "bg-secondary/10"}`}>
          <Icon className={`h-4 w-4 ${destructive ? "text-destructive" : "text-secondary"}`} />
        </div>
        <div className="flex flex-col items-start">
          <span className={`text-sm font-semibold ${destructive ? "text-destructive" : "text-foreground"}`}>{label}</span>
          {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
        </div>
      </div>
      {trailing || <ChevronLeft className="h-4 w-4 text-muted-foreground group-hover:text-secondary transition-colors" />}
    </div>
  );
  if (to) return <Link to={to}>{content}</Link>;
  return <div onClick={onClick}>{content}</div>;
};

const MenuSection = ({ title, children, delay = "0ms" }: { title: string; children: React.ReactNode; delay?: string }) => (
  <section className="animate-fadeIn" style={{ animationDelay: delay }}>
    <h3 className="text-xs font-bold text-muted-foreground mb-2 px-2 uppercase tracking-wide text-right">{title}</h3>
    <div className="rounded-2xl border-2 border-secondary/30 bg-card overflow-hidden divide-y divide-border/50">
      {children}
    </div>
  </section>
);

const SettingsPage = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { preferences, updatePreference } = usePreferences();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState<{ display_name: string | null; avatar_url: string | null; email: string | null }>({
    display_name: null, avatar_url: null, email: null,
  });

  useEffect(() => {
    if (user) {
      supabase.from("profiles").select("display_name, avatar_url, email").eq("id", user.id).single()
        .then(({ data }) => {
          if (data) setProfileData(data);
        });
    }
  }, [user]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: "حقيبة المسلم", text: "تطبيق حقيبة المسلم - شارك تؤجر 🤲", url: window.location.origin });
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) toast({ title: "تم تسجيل الخروج" });
  };

  const toggleTheme = () => {
    const newTheme = preferences.theme === "dark" ? "light" : "dark";
    updatePreference("theme", newTheme);
  };

  return (
    <div className="min-h-screen bg-background pb-20" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b-2 border-secondary/30">
        <div className="container flex h-14 items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold font-amiri text-gradient-islamic">الإعدادات</h1>
        </div>
      </header>

      <main className="container py-4 space-y-5 px-4">
        {/* Profile Card - Centered */}
        <section className="animate-fadeIn text-center py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="h-20 w-20 rounded-full border-3 border-secondary/40 overflow-hidden bg-muted flex items-center justify-center shadow-lg">
              {profileData.avatar_url ? (
                <img src={profileData.avatar_url} alt="الصورة الشخصية" className="h-full w-full object-cover" />
              ) : (
                <User className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-foreground font-cairo">
                {profileData.display_name || "مستخدم"}
              </h2>
              {/* Pro badge placeholder */}
            </div>
            <p className="text-xs text-muted-foreground">{user?.email || "سجل دخولك"}</p>
          </div>
        </section>

        {/* Subscription CTA */}
        <section className="animate-fadeIn" style={{ animationDelay: "50ms" }}>
          <div className="rounded-xl bg-gradient-to-l from-red-500 to-rose-600 p-4 text-white text-center shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Crown className="h-5 w-5" />
              <h3 className="font-bold text-sm">اشترك في باقة PRO ✨</h3>
            </div>
            <p className="text-xs opacity-80 mt-1">ميزات حصرية ومحتوى بلا حدود</p>
            <p className="text-[10px] opacity-60 mt-1">الدفع بكارت فيزا أو العملات الرقمية</p>
            <button className="mt-3 px-6 py-2 bg-white text-rose-600 rounded-xl font-bold text-xs hover:bg-white/90 transition-colors">
              اشترك الآن
            </button>
          </div>
        </section>

        {/* أ. الملف الشخصي */}
        <MenuSection title="أ. الملف الشخصي" delay="100ms">
          <MenuItem icon={Edit3} label="تعديل الملف الشخصي" subtitle="الصورة، الاسم، كلمة المرور" onClick={() => navigate("/profile")} />
          <MenuItem icon={Bookmark} label="المحفوظات" subtitle="تطبيقات • ريلز • صوتيات • كتب • مبيعات" />
          <MenuItem icon={Upload} label="الملفات المرفوعة" subtitle="المحتوى الذي رفعته" />
          <MenuItem icon={Bell} label="التنبيهات" subtitle="تحذيرات وتحديثات من الإدارة" />
        </MenuSection>

        {/* ب. إعدادات أوقات الصلاة */}
        <MenuSection title="ب. إعدادات أوقات الصلاة" delay="150ms">
          <MenuItem icon={Clock} label="طريقة حساب المواقيت والمذهب" subtitle="أم القرى" />
          <MenuItem icon={Volume2} label="إعدادات المؤذن والتنبيهات" subtitle="أصوات الأذان والتنبيهات" />
        </MenuSection>

        {/* ج. إعدادات عامة */}
        <MenuSection title="ج. إعدادات عامة" delay="200ms">
          <MenuItem
            icon={preferences.theme === "dark" ? Sun : Moon}
            label="تنسيق المظهر"
            subtitle={preferences.theme === "dark" ? "داكن" : "فاتح"}
            onClick={toggleTheme}
            trailing={<Switch checked={preferences.theme === "dark"} onCheckedChange={toggleTheme} />}
          />
          <MenuItem icon={Globe} label="اختيار اللغة" subtitle="العربية" />
          <MenuItem icon={Shield} label="سياسة الخصوصية" />
        </MenuSection>

        {/* د. حول التطبيق */}
        <MenuSection title="د. حول التطبيق" delay="250ms">
          <MenuItem icon={Info} label="عن التطبيق" subtitle="الإصدار 1.0.0" />
          <MenuItem icon={Star} label="تقييم التطبيق" subtitle="قيّمنا على المتجر" />
          <MenuItem icon={Share2} label="شارك تؤجر" subtitle="أخبر أصدقاءك وانشر الخير" onClick={handleShare} />
          <MenuItem icon={Heart} label="إعانة مالية" subtitle="ادعم تطوير التطبيق" />
          <MenuItem icon={Flag} label="الإبلاغ عن خلل / اقتراح تحسين" />
        </MenuSection>

        {/* تسجيل الخروج / الدخول */}
        {user ? (
          <button
            onClick={handleSignOut}
            className="w-full py-3.5 rounded-xl bg-destructive/10 text-destructive font-bold text-sm border border-destructive/20 flex items-center justify-center gap-2 hover:bg-destructive/20 transition-colors animate-fadeIn"
            style={{ animationDelay: "300ms" }}
          >
            <LogOut className="h-4 w-4" />
            تسجيل الخروج
          </button>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="w-full py-3.5 rounded-xl gradient-islamic text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 animate-fadeIn"
            style={{ animationDelay: "300ms" }}
          >
            <LogIn className="h-4 w-4" />
            تسجيل الدخول
          </button>
        )}

        <div className="text-center py-2 animate-fadeIn" style={{ animationDelay: "350ms" }}>
          <p className="text-xs text-muted-foreground font-cairo">حقيبة المسلم</p>
          <p className="text-[10px] text-muted-foreground/60 mt-1">الإصدار 1.0.0</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default SettingsPage;
