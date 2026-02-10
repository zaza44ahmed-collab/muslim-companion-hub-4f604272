import { Settings, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
        
        {/* Left side - Settings, Search */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Search className="h-7 w-7 text-foreground/70" />
          </Button>
          <Link to="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-8 w-8 text-secondary" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
