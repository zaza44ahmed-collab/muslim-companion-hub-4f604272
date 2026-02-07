import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const actions = [
  {
    id: "azkar",
    title: "أذكار",
    icon: "📿",
    color: "from-emerald-500 to-teal-600",
    path: "/azkar",
  },
  {
    id: "mosques",
    title: "مساجد",
    icon: "🕌",
    color: "from-amber-500 to-orange-600",
    path: "/mosques",
  },
  {
    id: "qibla",
    title: "قبلة",
    icon: "🧭",
    color: "from-blue-500 to-indigo-600",
    path: "/qibla",
  },
  {
    id: "tasbih",
    title: "مسبحة",
    icon: "🤲",
    color: "from-purple-500 to-pink-600",
    path: "/tasbih",
  },
  {
    id: "duas",
    title: "أدعية",
    icon: "✨",
    color: "from-rose-500 to-red-600",
    path: "/duas",
  },
  {
    id: "quran",
    title: "قرآن",
    icon: "📖",
    color: "from-green-600 to-emerald-700",
    path: "/quran",
  },
];

const QuickActions = () => {
  return (
    <div className="py-4">
      <h3 className="font-bold text-lg mb-4">الوصول السريع</h3>
      
      <div className="grid grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <Link
            key={action.id}
            to={action.path}
            className={cn(
              "group relative flex flex-col items-center justify-center p-4 rounded-2xl",
              "bg-gradient-to-br shadow-card-islamic hover:shadow-lg",
              "transition-all duration-300 hover:scale-105 hover:-translate-y-1",
              "border-2 border-secondary/40 hover:border-secondary/70",
              action.color
            )}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Decorative Circle */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-1 right-1 w-6 h-6 border border-white/20 rounded-full" />
            </div>

            <span className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-110">
              {action.icon}
            </span>
            <span className="text-sm font-bold text-white">
              {action.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
