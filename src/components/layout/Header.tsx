import { Store, User, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", user.id)
          .single();
        if (data?.avatar_url) setAvatarUrl(data.avatar_url);
      }
    };
    fetchAvatar();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchAvatar();
    });
    return () => subscription.unsubscribe();
  }, []);

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

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setIsDark(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between">
        {/* Right side - User */}
        <div className="flex items-center gap-2.5">
          <Link to="/settings">
            {avatarUrl ? (
              <img src={avatarUrl} alt="صورة المستخدم" className="h-9 w-9 rounded-full object-cover border-2 border-primary/30" />
            ) : (
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4.5 w-4.5 text-primary" />
              </div>
            )}
          </Link>
          <div>
            <h1 className="text-sm font-bold font-cairo text-foreground leading-tight">
              حقيبة المسلم
            </h1>
            <p className="text-[10px] text-muted-foreground/70 leading-tight">
              {hijriDate}
            </p>
          </div>
        </div>

        {/* Left side */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setIsDark(!isDark)}
            className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-muted/20 transition-colors"
          >
            {isDark ? (
              <Sun className="h-[18px] w-[18px] text-secondary" />
            ) : (
              <Moon className="h-[18px] w-[18px] text-foreground/50" />
            )}
          </button>
          <Link to="/marketplace">
            <div className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-muted/20 transition-colors">
              <Store className="h-[18px] w-[18px] text-foreground/50" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
