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

interface BottomNavProps {
  variant?: "default" | "dark";
}

const BottomNav = ({ variant = "default" }: BottomNavProps) => {
  const location = useLocation();
  const isDark = variant === "dark";

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl safe-area-bottom",
      isDark
        ? "bg-black/90 border-t border-white/10"
        : "bg-card/98 border-t-2 border-secondary/30 shadow-[0_-2px_12px_-2px_hsl(var(--secondary)/0.1)]"
    )}>
      <div className="flex items-center justify-around h-[72px] px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 w-16 py-2 transition-all duration-300 relative",
                isActive ? "" : "opacity-60 hover:opacity-100"
              )}
            >
              {/* Active indicator line */}
              {isActive && (
                <div className={cn(
                  "absolute -top-[9px] left-1/2 -translate-x-1/2 w-10 h-1 rounded-full",
                  isDark ? "bg-white" : "bg-secondary"
                )} />
              )}
              <div
                className={cn(
                  "p-2 rounded-xl transition-all duration-300",
                  isActive
                    ? isDark ? "bg-white/15" : "bg-secondary/15"
                    : ""
                )}
              >
                <item.icon
                  className={cn(
                    "h-6 w-6 transition-all duration-300",
                    isActive
                      ? isDark ? "text-white" : "text-secondary"
                      : isDark ? "text-white/60" : "text-foreground/60"
                  )}
                />
              </div>
              <span className={cn(
                "text-[11px] font-semibold transition-all duration-300",
                isActive
                  ? isDark ? "text-white" : "text-secondary"
                  : isDark ? "text-white/60" : "text-foreground/60"
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
