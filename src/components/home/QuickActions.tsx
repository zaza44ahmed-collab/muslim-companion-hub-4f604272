import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const actions = [
  {
    id: "azkar",
    title: "أذكار",
    icon: "📿",
    color: "from-primary/90 to-primary",
    path: "/azkar",
  },
  {
    id: "mosques",
    title: "مساجد",
    icon: "🕌",
    color: "from-secondary/90 to-secondary",
    path: "/mosques",
  },
  {
    id: "qibla",
    title: "قبلة",
    icon: "🧭",
    color: "from-teal to-emerald",
    path: "/qibla",
  },
  {
    id: "tasbih",
    title: "مسبحة",
    icon: "🤲",
    color: "from-primary to-teal",
    path: "/tasbih",
  },
  {
    id: "duas",
    title: "أدعية",
    icon: "✨",
    color: "from-secondary to-gold-light",
    path: "/duas",
  },
  {
    id: "quran",
    title: "قرآن",
    icon: "📖",
    color: "from-emerald-dark to-primary",
    path: "/quran",
  },
];

const QuickActions = () => {
  return (
    <div className="py-2">
      <h3 className="font-bold text-sm mb-3 text-foreground">الوصول السريع</h3>
      
      <div className="grid grid-cols-3 gap-2">
        {actions.map((action, index) => (
          <Link
            key={action.id}
            to={action.path}
            className={cn(
              "group relative flex flex-col items-center justify-center p-3 rounded-2xl",
              "bg-gradient-to-br shadow-card-islamic hover:shadow-lg",
              "transition-all duration-300 hover:scale-105 hover:-translate-y-1",
              "active:scale-90 active:shadow-inner active:brightness-110",
              "border-2 border-secondary/30 hover:border-secondary/60",
              action.color
            )}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <span className="text-3xl mb-1.5 transition-transform duration-300 group-hover:scale-110">
              {action.icon}
            </span>
            <span className="text-xs font-bold text-white">
              {action.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
