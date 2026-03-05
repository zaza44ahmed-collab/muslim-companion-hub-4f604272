import { useState, useEffect } from "react";
import { Star, Download, Share2, Shield, Loader2, MessageCircle, Send, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { AppItem } from "@/data/apps";

interface AppDetailDialogProps {
  app: AppItem | null;
  userApp?: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AppDetailDialog = ({ app, userApp, open, onOpenChange }: AppDetailDialogProps) => {
  const { user } = useAuth();
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [uploaderName, setUploaderName] = useState("");

  const isUserApp = !!userApp;
  const displayName = isUserApp ? userApp.name : app?.name;
  const displayDesc = isUserApp ? userApp.description : app?.fullDescription || app?.description;
  const displayIcon = isUserApp ? userApp.icon_url : app?.icon;
  const displayVersion = isUserApp ? (userApp.version || "1.0") : app?.version;
  const displayScreenshots = isUserApp ? (userApp.screenshots || []) : (app?.screenshots || []);
  const displayFeatures = isUserApp ? [] : (app?.features || []);
  const displayDeveloper = isUserApp ? uploaderName : app?.developer;

  useEffect(() => {
    if (!open || !isUserApp) return;
    const fetchData = async () => {
      const { data: profile } = await supabase.from("profiles").select("display_name").eq("id", userApp.user_id).single();
      if (profile) setUploaderName(profile.display_name || "مستخدم");

      const { data: ratings } = await supabase.from("app_ratings").select("*").eq("app_id", userApp.id);
      if (ratings && ratings.length > 0) {
        const avg = ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / ratings.length;
        setAvgRating(Math.round(avg * 10) / 10);
        setRatingsCount(ratings.length);
        const mine = ratings.find((r: any) => r.user_id === user?.id);
        if (mine) setUserRating(mine.rating);
      } else {
        setAvgRating(0); setRatingsCount(0);
      }

      const { data: cmts } = await supabase.from("app_comments").select("*").eq("app_id", userApp.id).order("created_at", { ascending: false });
      if (cmts) {
        const userIds = [...new Set(cmts.map((c: any) => c.user_id))];
        const { data: profiles } = await supabase.from("profiles").select("id, display_name").in("id", userIds);
        setComments(cmts.map((c: any) => ({
          ...c,
          author_name: profiles?.find((p: any) => p.id === c.user_id)?.display_name || "مستخدم",
        })));
      }
    };
    fetchData();
  }, [open, userApp, user]);

  const handleRate = async (rating: number) => {
    if (!user || !isUserApp) return;
    setUserRating(rating);
    await supabase.from("app_ratings").upsert({ app_id: userApp.id, user_id: user.id, rating }, { onConflict: "app_id,user_id" });
    const { data: ratings } = await supabase.from("app_ratings").select("*").eq("app_id", userApp.id);
    if (ratings && ratings.length > 0) {
      const avg = ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / ratings.length;
      setAvgRating(Math.round(avg * 10) / 10);
      setRatingsCount(ratings.length);
    }
  };

  const handleAddComment = async () => {
    if (!user || !newComment.trim() || !isUserApp) return;
    await supabase.from("app_comments").insert({ app_id: userApp.id, user_id: user.id, content: newComment.trim() });
    setNewComment("");
    const { data: cmts } = await supabase.from("app_comments").select("*").eq("app_id", userApp.id).order("created_at", { ascending: false });
    if (cmts) {
      const userIds = [...new Set(cmts.map((c: any) => c.user_id))];
      const { data: profiles } = await supabase.from("profiles").select("id, display_name").in("id", userIds);
      setComments(cmts.map((c: any) => ({
        ...c,
        author_name: profiles?.find((p: any) => p.id === c.user_id)?.display_name || "مستخدم",
      })));
    }
  };

  const handleDownload = async () => {
    if (isUserApp && userApp.app_file_url) {
      setDownloading(true);
      setDownloadProgress(0);
      const interval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 95) { clearInterval(interval); return 95; }
          return prev + Math.random() * 15;
        });
      }, 200);
      try {
        const response = await fetch(userApp.app_file_url);
        const blob = await response.blob();
        clearInterval(interval);
        setDownloadProgress(100);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${userApp.name}.apk`;
        a.click();
        URL.revokeObjectURL(url);
        await supabase.from("user_apps").update({ downloads_count: (userApp.downloads_count || 0) + 1 }).eq("id", userApp.id);
        toast({ title: "تم التحميل بنجاح ✅" });
      } catch {
        clearInterval(interval);
        toast({ title: "فشل التحميل", variant: "destructive" });
      } finally {
        setTimeout(() => { setDownloading(false); setDownloadProgress(0); }, 1000);
      }
    } else {
      toast({ title: "لا يوجد ملف للتحميل" });
    }
  };

  if (!app && !userApp) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] w-full h-[100vh] max-h-[100vh] p-0 gap-0 rounded-none border-none" dir="rtl">
        <ScrollArea className="h-full">
          {/* Header with back button */}
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border px-4 py-3 flex items-center justify-between">
            <h2 className="text-base font-bold font-cairo">{displayName}</h2>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-5">
            {/* App Info */}
            <div className="flex items-start gap-4 mb-5">
              <img
                src={displayIcon || "/placeholder.svg"}
                alt={displayName}
                className="h-20 w-20 rounded-2xl object-cover shadow-md"
                onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
              />
              <div className="flex-1 min-w-0 text-right">
                <p className="text-sm text-primary font-semibold mt-0.5">{displayDeveloper}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                    {isUserApp ? (avgRating || "—") : app?.rating}
                  </span>
                  {isUserApp && <span>{userApp.downloads_count || 0} تنزيل</span>}
                  {!isUserApp && <span>{app?.downloads} تنزيل</span>}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-5">
              <Button variant="islamic" className="flex-1 font-bold text-sm h-11" onClick={handleDownload} disabled={downloading}>
                {downloading ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : <Download className="h-4 w-4 ml-2" />}
                {downloading ? "جاري التحميل..." : "تثبيت"}
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11 shrink-0" onClick={() => {
                if (navigator.share) navigator.share({ title: displayName, text: displayDesc });
                else { navigator.clipboard.writeText(displayName + " - " + displayDesc); toast({ title: "تم النسخ" }); }
              }}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {downloading && (
              <div className="mb-5">
                <Progress value={downloadProgress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1 text-right">{Math.round(downloadProgress)}%</p>
              </div>
            )}

            {/* Screenshots - no border */}
            {displayScreenshots.length > 0 && (
              <div className="mb-5">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {displayScreenshots.map((src: string, i: number) => (
                    <img key={i} src={src} alt={`لقطة ${i + 1}`}
                      className="h-48 rounded-xl object-cover shadow-sm shrink-0"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* About */}
            <div className="mb-5 text-right">
              <h3 className="text-base font-bold font-cairo mb-2">حول التطبيق</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{displayDesc}</p>
            </div>

            {/* Features */}
            {displayFeatures.length > 0 && (
              <div className="mb-5 text-right">
                <h3 className="text-base font-bold font-cairo mb-3">المميزات</h3>
                <div className="space-y-2.5">
                  {displayFeatures.map((feature: string, i: number) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">✓</span>
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* App Info table */}
            <div className="mb-5 bg-muted/10 rounded-xl p-4 text-right">
              <h3 className="text-base font-bold font-cairo mb-3">معلومات التطبيق</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">الإصدار</span><p className="font-semibold">{displayVersion}</p></div>
                {isUserApp && <div><span className="text-muted-foreground">التنزيلات</span><p className="font-semibold">{userApp.downloads_count || 0}</p></div>}
              </div>
            </div>

            {/* Rating */}
            {isUserApp && (
              <div className="mb-5 text-right">
                <h3 className="text-base font-bold font-cairo mb-3">التقييم</h3>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold">{avgRating || "—"}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button key={s} onClick={() => handleRate(s)}>
                        <Star className={`h-5 w-5 ${s <= (userRating || avgRating) ? "fill-gold text-gold" : "text-muted-foreground/30"}`} />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">({ratingsCount} تقييم)</span>
                </div>
              </div>
            )}

            {/* Comments */}
            {isUserApp && (
              <div className="mb-5 text-right">
                <h3 className="text-base font-bold font-cairo mb-3 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" /> التعليقات
                </h3>
                {user && (
                  <div className="flex gap-2 mb-3">
                    <input
                      className="flex-1 h-9 px-3 rounded-lg border border-border bg-card text-sm text-right"
                      placeholder="أضف تعليقاً..."
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleAddComment()}
                    />
                    <Button size="icon" variant="islamic" className="h-9 w-9 shrink-0" onClick={handleAddComment}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {comments.length === 0 ? (
                    <p className="text-xs text-muted-foreground">لا توجد تعليقات بعد</p>
                  ) : comments.map((c: any) => (
                    <div key={c.id} className="bg-muted/10 rounded-lg p-2.5 text-right">
                      <p className="text-xs font-bold">{c.author_name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6 flex items-center gap-3 bg-primary/5 rounded-xl p-3">
              <Shield className="h-5 w-5 text-primary shrink-0" />
              <span className="text-xs text-muted-foreground">تطبيق آمن - تم التحقق من المحتوى الإسلامي</span>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AppDetailDialog;
