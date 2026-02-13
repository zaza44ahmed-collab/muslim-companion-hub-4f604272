import { useState } from "react";
import { MapPin, DollarSign, X, ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const locations = [
  "الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام",
  "الخبر", "الظهران", "تبوك", "أبها", "الطائف", "بريدة", "حائل",
  "نجران", "جازان", "ينبع", "الجبيل", "خميس مشيط",
];

export interface AdvancedFiltersState {
  priceRange: [number, number];
  selectedLocations: string[];
}

interface AdvancedFiltersProps {
  filters: AdvancedFiltersState;
  onChange: (filters: AdvancedFiltersState) => void;
  onReset: () => void;
  maxPrice: number;
}

const AdvancedFilters = ({ filters, onChange, onReset, maxPrice }: AdvancedFiltersProps) => {
  const [showAllLocations, setShowAllLocations] = useState(false);
  const visibleLocations = showAllLocations ? locations : locations.slice(0, 8);
  const activeCount = (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice ? 1 : 0) + (filters.selectedLocations.length > 0 ? 1 : 0);

  const toggleLocation = (loc: string) => {
    const selected = filters.selectedLocations.includes(loc)
      ? filters.selectedLocations.filter((l) => l !== loc)
      : [...filters.selectedLocations, loc];
    onChange({ ...filters, selectedLocations: selected });
  };

  const formatPrice = (n: number) => n.toLocaleString("ar-SA");

  return (
    <div className="animate-fadeIn space-y-3 rounded-2xl border-2 border-secondary/20 bg-card p-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-foreground">بحث متقدم</h3>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset} className="h-6 text-[10px] text-muted-foreground px-2">
            <X className="h-3 w-3 ml-1" /> مسح الفلاتر ({activeCount})
          </Button>
        )}
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <DollarSign className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-semibold text-foreground">نطاق السعر</span>
        </div>
        <Slider
          min={0}
          max={maxPrice}
          step={Math.max(1, Math.floor(maxPrice / 100))}
          value={filters.priceRange}
          onValueChange={(val) => onChange({ ...filters, priceRange: val as [number, number] })}
          className="my-2"
        />
        <div className="flex items-center justify-between text-[10px] text-muted-foreground font-semibold">
          <span>{formatPrice(filters.priceRange[0])} ر.س</span>
          <span>{formatPrice(filters.priceRange[1])} ر.س</span>
        </div>
      </div>

      {/* Location Filter */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-semibold text-foreground">المدينة</span>
          {filters.selectedLocations.length > 0 && (
            <Badge variant="secondary" className="text-[8px] px-1.5 py-0 h-4">{filters.selectedLocations.length}</Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {visibleLocations.map((loc) => {
            const isSelected = filters.selectedLocations.includes(loc);
            return (
              <button
                key={loc}
                onClick={() => toggleLocation(loc)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/10 text-foreground/70 hover:bg-secondary/20"
                }`}
              >
                {loc}
              </button>
            );
          })}
        </div>
        {locations.length > 8 && (
          <button
            onClick={() => setShowAllLocations(!showAllLocations)}
            className="flex items-center gap-1 text-[10px] text-primary font-semibold"
          >
            {showAllLocations ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {showAllLocations ? "عرض أقل" : `عرض الكل (${locations.length})`}
          </button>
        )}
      </div>
    </div>
  );
};

export default AdvancedFilters;
