import { Star, Download, ArrowRight, Share2, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { AppItem } from "@/data/apps";

interface AppDetailDialogProps {
  app: AppItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AppDetailDialog = ({ app, open, onOpenChange }: AppDetailDialogProps) => {
  if (!app) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 max-h-[90vh] overflow-hidden rounded-2xl">
        <ScrollArea className="max-h-[90vh]">
          {/* Header */}
          <DialogHeader className="p-5 pb-0">
            <div className="flex items-start gap-4">
              <img
                src={app.icon}
                alt={app.name}
                className="h-20 w-20 rounded-2xl object-cover shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-lg font-bold font-cairo text-right">
                  {app.name}
                </DialogTitle>
                <p className="text-sm text-primary font-semibold mt-0.5">
                  {app.developer}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                    {app.rating}
                  </span>
                  <span>{app.downloads} تنزيل</span>
                  <span>{app.size}</span>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="px-5 pt-4">
            {/* Action Buttons */}
            <div className="flex gap-3 mb-5">
              <Button variant="islamic" className="flex-1 font-bold text-sm h-11" onClick={() => {
                const q = encodeURIComponent(app.name);
                window.open(`https://play.google.com/store/search?q=${q}&c=apps`, "_blank");
              }}>
                <Download className="h-4 w-4 ml-2" />
                تثبيت
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11 shrink-0" onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: app.name, text: app.description });
                } else {
                  navigator.clipboard.writeText(app.name + " - " + app.description);
                  toast({ title: "تم النسخ" });
                }
              }}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Screenshots */}
            {app.screenshots.length > 0 && (
              <div className="mb-5">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {app.screenshots.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`لقطة شاشة ${i + 1}`}
                      className="h-48 rounded-xl object-cover shadow-sm shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* About */}
            <div className="mb-5">
              <h3 className="text-base font-bold font-cairo mb-2 flex items-center gap-2">
                حول التطبيق
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {app.fullDescription}
              </p>
            </div>

            {/* Features */}
            <div className="mb-5">
              <h3 className="text-base font-bold font-cairo mb-3">المميزات</h3>
              <div className="space-y-2.5">
                {app.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-primary text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* App Info */}
            <div className="mb-5 bg-muted/10 rounded-xl p-4">
              <h3 className="text-base font-bold font-cairo mb-3">معلومات التطبيق</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">الإصدار</span>
                  <p className="font-semibold">{app.version}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">الحجم</span>
                  <p className="font-semibold">{app.size}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">آخر تحديث</span>
                  <p className="font-semibold">{app.lastUpdate}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">التنزيلات</span>
                  <p className="font-semibold">{app.downloads}</p>
                </div>
              </div>
            </div>

            {/* Safety */}
            <div className="mb-6 flex items-center gap-3 bg-primary/5 rounded-xl p-3">
              <Shield className="h-5 w-5 text-primary shrink-0" />
              <span className="text-xs text-muted-foreground">
                تطبيق آمن - تم التحقق من المحتوى الإسلامي
              </span>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AppDetailDialog;
