import { Home, Smartphone, Video, Headphones, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Menu, label: "المزيد", path: "/settings" },
  { icon: Headphones, label: "الصوتيات", path: "/audio" },
  { icon: Video, label: "الفيديو", path: "/videos" },
  { icon: Smartphone, label: "التطبيقات", path: "/apps" },
  { icon: Home, label: "الرئيسية", path: "/" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/98 backdrop-blur-xl border-t-2 border-secondary/40 safe-area-bottom shadow-[0_-4px_20px_-4px_hsl(var(--secondary)/0.15)]">
      <div className="flex items-center justify-around h-18 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-16 py-2 transition-all duration-300 relative",
                isActive ? "scale-105" : "opacity-70 hover:opacity-100"
              )}
            >
              {/* Active indicator line */}
              {isActive && (
                <div className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-secondary shadow-[0_0_8px_hsl(var(--secondary)/0.5)]" />
              )}
              <div
                className={cn(
                  "p-2.5 rounded-2xl transition-all duration-300",
                  isActive
                    ? "bg-secondary/15 border border-secondary/30 shadow-[0_0_12px_hsl(var(--secondary)/0.2)]"
                    : "hover:bg-muted/50"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-all duration-300",
                    isActive ? "text-secondary drop-shadow-[0_0_4px_hsl(var(--secondary)/0.4)]" : "text-muted-foreground"
                  )}
                />
              </div>
              <span className={cn(
                "text-[10px] font-semibold transition-all duration-300",
                isActive ? "text-secondary" : "text-muted-foreground"
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
