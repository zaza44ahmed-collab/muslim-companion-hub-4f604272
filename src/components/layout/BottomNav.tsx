import { Home, Smartphone, Video, Headphones, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "الرئيسية", path: "/" },
  { icon: Smartphone, label: "التطبيقات", path: "/apps" },
  { icon: Video, label: "الفيديو", path: "/videos" },
  { icon: Headphones, label: "الصوتيات", path: "/audio" },
  { icon: BookOpen, label: "المكتبة", path: "/library" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-around h-[56px] px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center gap-0.5 w-14 py-1 transition-all"
            >
              <div className={cn(
                "p-1.5 rounded-xl transition-all duration-200",
                isActive ? "bg-primary/10" : ""
              )}>
                <item.icon className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-primary" : "text-foreground/40"
                )} />
              </div>
              <span className={cn(
                "text-[9px] font-semibold transition-colors",
                isActive ? "text-primary" : "text-foreground/40"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
