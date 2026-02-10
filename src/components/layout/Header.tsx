import { Settings, User, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function getHijriDate(): string {
  try {
    const formatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formatter.format(new Date());
  } catch {
    return "";
  }
}

function getGregorianDate(): string {
  const formatter = new Intl.DateTimeFormat("ar", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formatter.format(new Date());
}

const Header = () => {
  const hijriDate = getHijriDate();
  const gregorianDate = getGregorianDate();

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setIsDark(true);
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-lg border-b-2 border-secondary/30">
      <div className="container flex h-auto py-3 items-center justify-between">
        {/* Right side - User icon */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-secondary/15 border-2 border-secondary/30 flex items-center justify-center">
            <User className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-amiri text-primary leading-tight">
              حقيبة المسلم
            </h1>
            <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
              {hijriDate} • {gregorianDate}
            </p>
          </div>
        </div>
        
        {/* Left side - Dark mode toggle, Settings */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)}>
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-400 transition-transform duration-300" />
            ) : (
              <Moon className="h-5 w-5 text-foreground/70 transition-transform duration-300" />
            )}
          </Button>
          <Link to="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-6 w-6 text-secondary" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;