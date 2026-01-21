import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SeasonalBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80 p-5">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2" />
      
      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 islamic-pattern opacity-30" />

      <div className="relative z-10">
        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-secondary-foreground mb-2">
          🌙 موسم مميز
        </span>
        
        <h3 className="text-xl font-bold text-secondary-foreground mb-1">
          استعد لشهر رمضان المبارك
        </h3>
        <p className="text-sm text-secondary-foreground/80 mb-4">
          تطبيقات وكتب وصوتيات خاصة بالشهر الكريم
        </p>

        <Button variant="outline" className="bg-white/20 border-white/30 text-secondary-foreground hover:bg-white/30">
          اكتشف المزيد
          <ChevronLeft className="h-4 w-4 mr-1" />
        </Button>
      </div>

      {/* Decorative Crescent */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-5xl opacity-30">
        🌙
      </div>
    </div>
  );
};

export default SeasonalBanner;
