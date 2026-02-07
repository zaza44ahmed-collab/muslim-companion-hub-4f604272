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
} from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  to?: string;
  onClick?: () => void;
}

const MenuItem = ({ icon: Icon, label, to, onClick }: MenuItemProps) => {
  const content = (
    <div className="flex items-center justify-between py-4 px-4 transition-colors duration-200 hover:bg-accent/50 cursor-pointer">
      <ChevronLeft className="h-5 w-5 text-secondary" />
      <div className="flex items-center gap-3">
        <span className="text-base font-medium text-foreground">{label}</span>
        <Icon className="h-5 w-5 text-secondary" />
      </div>
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }
  return <div onClick={onClick}>{content}</div>;
};

const SettingsPage = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "رفيق المسلم",
        text: "تطبيق رفيق المسلم - تطبيق إسلامي شامل",
        url: window.location.origin,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="container py-4 space-y-4">
        {/* Profile Card */}
        <section className="animate-fadeIn">
          <div className="relative overflow-hidden rounded-2xl gradient-islamic p-6 border-2 border-secondary/30">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 right-2 w-20 h-20 border-2 border-primary-foreground/30 rounded-full" />
              <div className="absolute bottom-2 left-2 w-16 h-16 border-2 border-primary-foreground/20 rounded-full" />
            </div>
            <div className="relative flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary-foreground/20 border-2 border-secondary/50 flex items-center justify-center">
                <User className="h-10 w-10 text-primary-foreground" />
              </div>
              <h2 className="text-xl font-bold text-primary-foreground font-cairo">
                المستخدم
              </h2>
              <button className="w-full max-w-xs py-3 px-6 rounded-xl bg-secondary/20 border-2 border-secondary/40 text-primary-foreground font-semibold text-sm hover:bg-secondary/30 transition-colors duration-200">
                إعدادات الحساب
              </button>
            </div>
          </div>
        </section>

        {/* First Menu Group */}
        <section
          className="animate-fadeIn"
          style={{ animationDelay: "100ms" }}
        >
          <div className="rounded-2xl border-2 border-secondary/30 bg-card overflow-hidden divide-y divide-border">
            <MenuItem icon={Bookmark} label="المحفوظات" to="/bookmarks" />
            <MenuItem icon={Download} label="التنزيلات" to="/downloads" />
            <MenuItem icon={Settings} label="الإعدادات" to="/app-settings" />
            <MenuItem icon={BarChart3} label="الإحصائيات" to="/stats" />
          </div>
        </section>

        {/* Second Menu Group */}
        <section
          className="animate-fadeIn"
          style={{ animationDelay: "200ms" }}
        >
          <div className="rounded-2xl border-2 border-secondary/30 bg-card overflow-hidden divide-y divide-border">
            <MenuItem icon={Info} label="عن التطبيق" to="/about" />
            <MenuItem icon={Star} label="تقييم التطبيق" />
            <MenuItem icon={Share2} label="شارك التطبيق" onClick={handleShare} />
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default SettingsPage;
