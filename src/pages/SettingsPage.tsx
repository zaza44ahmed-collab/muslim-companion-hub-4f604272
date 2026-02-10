import { Link } from "react-router-dom";
import {
  User,
  Bookmark,
  Download,
  Settings,
  BarChart3,
  Info,
  Star,
  Share2,
  ChevronLeft,
  Moon,
  Bell,
  Globe,
  Shield,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  subtitle?: string;
  to?: string;
  onClick?: () => void;
}

const MenuItem = ({ icon: Icon, label, subtitle, to, onClick }: MenuItemProps) => {
  const content = (
    <div className="flex items-center justify-between py-3.5 px-5 transition-colors duration-200 hover:bg-accent/50 cursor-pointer group" dir="rtl">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-secondary/10 flex items-center justify-center">
          <Icon className="h-4.5 w-4.5 text-secondary" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold text-foreground">{label}</span>
          {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
        </div>
      </div>
      <ChevronLeft className="h-4 w-4 text-muted-foreground group-hover:text-secondary transition-colors" />
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }
  return <div onClick={onClick}>{content}</div>;
};

interface MenuSectionProps {
  title: string;
  children: React.ReactNode;
  delay?: string;
}

const MenuSection = ({ title, children, delay = "0ms" }: MenuSectionProps) => (
  <section className="animate-fadeIn" style={{ animationDelay: delay }}>
    <h3 className="text-xs font-bold text-muted-foreground mb-2 px-2 uppercase tracking-wide text-right">
      {title}
    </h3>
    <div className="rounded-2xl border-2 border-secondary/30 bg-card overflow-hidden divide-y divide-border/50">
      {children}
    </div>
  </section>
);

const SettingsPage = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "حقيبة المسلم",
        text: "تطبيق حقيبة المسلم - تطبيق إسلامي شامل",
        url: window.location.origin,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Custom Header */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b-2 border-secondary/30">
        <div className="container flex h-14 items-center justify-between">
          <div className="w-10" />
          <h1 className="text-lg font-bold font-amiri text-gradient-islamic">الإعدادات</h1>
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="container py-4 space-y-5">
        {/* Profile Card */}
        <section className="animate-fadeIn">
          <div className="relative overflow-hidden rounded-2xl gradient-islamic p-5 border-2 border-secondary/30">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-24 h-24 border-2 border-primary-foreground/20 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-primary-foreground/10 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-primary-foreground/5 rounded-full" />
            </div>

            <div className="relative flex items-center gap-4 flex-row-reverse">
              {/* Avatar */}
              <div className="h-16 w-16 rounded-2xl bg-primary-foreground/15 border-2 border-secondary/40 flex items-center justify-center shadow-lg">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>

              {/* Info */}
              <div className="flex-1 text-right">
                <h2 className="text-lg font-bold text-primary-foreground font-cairo">
                  مرحباً بك 👋
                </h2>
                <p className="text-primary-foreground/70 text-sm mt-1">
                  حقيبة المسلم • رفيقك اليومي
                </p>
              </div>
            </div>

            {/* Account Settings Button */}
            <button className="w-full mt-4 py-2.5 px-6 rounded-xl bg-secondary/20 border border-secondary/40 text-primary-foreground font-semibold text-sm hover:bg-secondary/30 transition-all duration-200 backdrop-blur-sm">
              إعدادات الحساب
            </button>
          </div>
        </section>

        {/* General Section */}
        <MenuSection title="عام" delay="100ms">
          <MenuItem icon={Bookmark} label="المحفوظات" subtitle="المحتوى المحفوظ" to="/bookmarks" />
          <MenuItem icon={Download} label="التنزيلات" subtitle="الملفات المحملة" to="/downloads" />
          <MenuItem icon={BarChart3} label="الإحصائيات" subtitle="تتبع نشاطك" to="/stats" />
        </MenuSection>

        {/* Preferences Section */}
        <MenuSection title="التفضيلات" delay="150ms">
          <MenuItem icon={Moon} label="المظهر" subtitle="فاتح / داكن" />
          <MenuItem icon={Bell} label="الإشعارات" subtitle="إعدادات التنبيهات" />
          <MenuItem icon={Globe} label="اللغة" subtitle="العربية" />
          <MenuItem icon={Shield} label="الخصوصية" subtitle="إدارة البيانات" />
        </MenuSection>

        {/* About Section */}
        <MenuSection title="حول التطبيق" delay="200ms">
          <MenuItem icon={Info} label="عن التطبيق" subtitle="الإصدار 1.0.0" to="/about" />
          <MenuItem icon={Star} label="تقييم التطبيق" subtitle="قيّمنا على المتجر" />
          <MenuItem icon={Share2} label="شارك التطبيق" subtitle="أخبر أصدقاءك" onClick={handleShare} />
          <MenuItem icon={HelpCircle} label="المساعدة" subtitle="الأسئلة الشائعة" />
        </MenuSection>

        {/* App Version */}
        <div className="text-center py-4 animate-fadeIn" style={{ animationDelay: "250ms" }}>
          <p className="text-xs text-muted-foreground font-cairo">حقيبة المسلم</p>
          <p className="text-[10px] text-muted-foreground/60 mt-1">الإصدار 1.0.0</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default SettingsPage;
