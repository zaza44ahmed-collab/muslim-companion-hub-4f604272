import { Play, Download, Heart, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredItems = [
  {
    id: 1,
    title: "تطبيق أذكار المسلم",
    description: "أذكار الصباح والمساء وأذكار النوم",
    type: "app",
    icon: "📱",
    downloads: "15K+",
    rating: 4.9,
  },
  {
    id: 2,
    title: "القرآن الكريم كاملاً",
    description: "بصوت الشيخ محمد صديق المنشاوي",
    type: "audio",
    icon: "🎧",
    duration: "60+ ساعة",
    rating: 5.0,
  },
  {
    id: 3,
    title: "رياض الصالحين",
    description: "للإمام النووي - مع الشرح",
    type: "book",
    icon: "📚",
    pages: "650 صفحة",
    rating: 4.8,
  },
];

const FeaturedContent = () => {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">المحتوى المميز</h3>
        <Button variant="ghost" size="sm" className="gap-1 text-primary">
          عرض الكل
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {featuredItems.map((item) => (
          <div
            key={item.id}
            className="bg-card rounded-2xl p-4 shadow-card-islamic flex items-center gap-4 transition-all duration-300 hover:shadow-lg"
          >
            {/* Icon */}
            <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl shrink-0">
              {item.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-base truncate">{item.title}</h4>
              <p className="text-sm text-muted-foreground truncate">
                {item.description}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-secondary font-medium">
                  ⭐ {item.rating}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.downloads || item.duration || item.pages}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Button variant="iconPrimary" size="icon" className="h-10 w-10">
                {item.type === "audio" ? (
                  <Play className="h-4 w-4" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedContent;
