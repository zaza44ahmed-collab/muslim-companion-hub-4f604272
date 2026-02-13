import { Link } from "react-router-dom";

const actions = [
  { id: "azkar", title: "أذكار", icon: "📿", path: "/azkar" },
  { id: "mosques", title: "مساجد", icon: "🕌", path: "/mosques" },
  { id: "qibla", title: "قبلة", icon: "🧭", path: "/qibla" },
  { id: "tasbih", title: "مسبحة", icon: "🤲", path: "/tasbih" },
  { id: "duas", title: "أدعية", icon: "✨", path: "/duas" },
  { id: "quran", title: "قرآن", icon: "📖", path: "/quran" },
];

const QuickActions = () => {
  return (
    <div>
      <h3 className="font-bold text-sm mb-2.5 text-foreground">الوصول السريع</h3>
      <div className="grid grid-cols-3 gap-2.5">
        {actions.map((action) => (
          <Link
            key={action.id}
            to={action.path}
            className="flex flex-col items-center justify-center py-4 rounded-2xl bg-card hover:bg-card/80 transition-all duration-200 active:scale-95"
          >
            <span className="text-2xl mb-1.5">{action.icon}</span>
            <span className="text-[11px] font-semibold text-foreground/80">{action.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
