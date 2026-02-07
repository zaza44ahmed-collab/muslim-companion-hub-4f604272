import { Settings, Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-lg border-b-2 border-secondary/30">
      <div className="container flex h-16 items-center justify-between">
        {/* Right side - User icon */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-secondary/15 border-2 border-secondary/30 flex items-center justify-center">
            <User className="h-6 w-6 text-secondary" />
          </div>
          <h1 className="text-xl font-bold font-amiri text-primary">
            حقيبة المسلم
          </h1>
        </div>
        
        {/* Left side - Settings, Search, Bell */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Search className="h-6 w-6 text-foreground/70" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-6 w-6 text-foreground/70" />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-secondary text-[10px] font-bold flex items-center justify-center text-secondary-foreground">
              3
            </span>
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
