import { WifiOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const OfflinePage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center" dir="rtl">
      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
        <WifiOff className="h-10 w-10 text-destructive" />
      </div>
      <h1 className="text-xl font-bold text-foreground font-cairo mb-2">لا يوجد اتصال بالإنترنت</h1>
      <p className="text-sm text-muted-foreground mb-6 max-w-xs">
        تحقق من اتصالك بالإنترنت وحاول مرة أخرى
      </p>
      <Button
        variant="islamic"
        className="gap-2"
        onClick={() => window.location.reload()}
      >
        <RefreshCw className="h-4 w-4" />
        إعادة المحاولة
      </Button>
    </div>
  );
};

export default OfflinePage;
