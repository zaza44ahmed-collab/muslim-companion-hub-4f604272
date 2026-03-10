import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User, Edit3, Bookmark, Upload, Bell, Clock, Moon, Sun, Globe, Shield,
  Info, Star, Share2, Heart, Flag, LogOut, LogIn, ArrowLeft, ChevronLeft,
  Crown, Volume2, Lock, Eye, EyeOff, Camera, Loader2,
  Smartphone, BookOpen, Headphones, Film, Package,
  CreditCard, Bitcoin, FileText, MessageSquare, Mail,
} from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { usePreferences } from "@/hooks/usePreferences";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AddAppDialog from "@/components/apps/AddAppDialog";
import AddReelDialog from "@/components/reels/AddReelDialog";
import AddAudioDialog from "@/components/audio/AddAudioDialog";
import AddBookDialog from "@/components/library/AddBookDialog";
import AddListingDialog from "@/components/marketplace/AddListingDialog";
import { useReels } from "@/hooks/useReels";
import { useListings } from "@/hooks/useListings";
import { useSavedItems, type SavedItemType } from "@/hooks/useSavedItems";

// --- Reusable Sub-components ---

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  subtitle?: string;
  to?: string;
  onClick?: () => void;
  trailing?: React.ReactNode;
  destructive?: boolean;
}

const MenuItem = ({ icon: Icon, label, subtitle, to, onClick, trailing, destructive }: MenuItemProps) => {
  const content = (
    <div className="flex items-center justify-between py-3.5 px-4 transition-colors duration-200 hover:bg-accent/50 cursor-pointer group" dir="rtl">
      <div className="flex items-center gap-3">
        <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${destructive ? "bg-destructive/10" : "bg-secondary/10"}`}>
          <Icon className={`h-4 w-4 ${destructive ? "text-destructive" : "text-secondary"}`} />
        </div>
        <div className="flex flex-col items-start">
          <span className={`text-sm font-semibold ${destructive ? "text-destructive" : "text-foreground"}`}>{label}</span>
          {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
        </div>
      </div>
      {trailing || <ChevronLeft className="h-4 w-4 text-muted-foreground group-hover:text-secondary transition-colors" />}
    </div>
  );
  if (to) return <Link to={to}>{content}</Link>;
  return <div onClick={onClick}>{content}</div>;
};

const MenuSection = ({ title, children, delay = "0ms" }: { title: string; children: React.ReactNode; delay?: string }) => (
  <section className="animate-fadeIn" style={{ animationDelay: delay }}>
    <h3 className="text-xs font-bold text-muted-foreground mb-2 px-2 uppercase tracking-wide text-right">{title}</h3>
    <div className="rounded-2xl border-2 border-secondary/30 bg-card overflow-hidden divide-y divide-border/50">
      {children}
    </div>
  </section>
);

// --- Sub-pages ---

const EditProfilePage = ({ onBack, user }: { onBack: () => void; user: any }) => {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("profiles").select("display_name, avatar_url, email, bio").eq("id", user.id).single()
      .then(({ data }) => {
        if (data) {
          const parts = (data.display_name || "").split(" ");
          setFirstName(parts[0] || "");
          setLastName(parts.slice(1).join(" ") || "");
          setAvatarUrl(data.avatar_url);
          setEmail(data.email || user.email || "");
          setBio((data as any).bio || "");
        }
      });
  }, [user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${user.id}/avatar.${ext}`;
    await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    const newUrl = `${data.publicUrl}?t=${Date.now()}`;
    await supabase.from("profiles").update({ avatar_url: newUrl }).eq("id", user.id);
    setAvatarUrl(newUrl);
    setUploading(false);
    toast({ title: "تم تحديث الصورة" });
  };

  const handleSave = async () => {
    setSaving(true);
    const displayName = `${firstName} ${lastName}`.trim();
    await supabase.from("profiles").update({ display_name: displayName, bio } as any).eq("id", user.id);
    if (newPassword.length >= 6) {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) toast({ title: "خطأ في تغيير كلمة المرور", description: error.message, variant: "destructive" });
      else toast({ title: "تم تغيير كلمة المرور" });
    }
    setSaving(false);
    toast({ title: "تم حفظ التغييرات" });
    onBack();
  };

  return (
    <div className="space-y-5" dir="rtl">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-4 border-secondary/50 overflow-hidden bg-muted flex items-center justify-center">
            {avatarUrl ? <img src={avatarUrl} alt="" className="h-full w-full object-cover" /> : <User className="h-10 w-10 text-muted-foreground" />}
          </div>
          <label className="absolute bottom-0 left-0 h-8 w-8 rounded-full bg-secondary flex items-center justify-center cursor-pointer">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin text-secondary-foreground" /> : <Camera className="h-4 w-4 text-secondary-foreground" />}
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </label>
        </div>
        <p className="text-xs text-muted-foreground">{email}</p>
      </div>
      <div className="space-y-3">
        <div><label className="text-xs font-semibold text-muted-foreground">الاسم الأول</label>
          <Input value={firstName} onChange={e => setFirstName(e.target.value)} className="text-right h-11 rounded-xl" /></div>
        <div><label className="text-xs font-semibold text-muted-foreground">الاسم الأخير</label>
          <Input value={lastName} onChange={e => setLastName(e.target.value)} className="text-right h-11 rounded-xl" /></div>
        <div><label className="text-xs font-semibold text-muted-foreground">النبذة الشخصية</label>
          <Input value={bio} onChange={e => setBio(e.target.value)} placeholder="نبذة قصيرة عنك" className="text-right h-11 rounded-xl" /></div>
        <div className="relative"><label className="text-xs font-semibold text-muted-foreground">كلمة المرور الجديدة (اختياري)</label>
          <Input type={showPassword ? "text" : "password"} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="اترك فارغاً إن لم ترد التغيير" className="text-right h-11 rounded-xl pr-3 pl-10" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-8 text-muted-foreground">
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <Button onClick={handleSave} className="w-full h-11 rounded-xl gradient-islamic text-primary-foreground" disabled={saving}>
        {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
      </Button>
    </div>
  );
};

const SavedItemsPage = ({ onBack }: { onBack: () => void }) => {
  const [tab, setTab] = useState<SavedItemType>("app");
  const { savedItems, loading: savedLoading, toggleSave } = useSavedItems(tab);
  const tabs: { id: SavedItemType; label: string; icon: React.ElementType }[] = [
    { id: "app", label: "تطبيقات", icon: Smartphone },
    { id: "reel", label: "ريلز", icon: Film },
    { id: "audio", label: "صوتيات", icon: Headphones },
    { id: "book", label: "كتب", icon: BookOpen },
    { id: "listing", label: "مبيعات", icon: Package },
  ];
  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition-colors ${tab === t.id ? "bg-primary text-primary-foreground" : "bg-card border border-border/50"}`}>
            <t.icon className="h-3.5 w-3.5" />{t.label}
          </button>
        ))}
      </div>
      {savedLoading ? (
        <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : savedItems.length > 0 ? (
        <div className="space-y-2">
          {savedItems.map((item: any) => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50">
              <div className="flex-1">
                <p className="text-sm font-bold">{item.item_id}</p>
                <p className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleDateString("ar-SA")}</p>
              </div>
              <button onClick={() => toggleSave(item.item_type, item.item_id)}
                className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-destructive/10">
                <Heart className="h-4 w-4 fill-destructive text-destructive" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <Bookmark className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm font-semibold">لا توجد عناصر محفوظة</p>
          <p className="text-xs mt-1">احفظ المحتوى لتجده هنا</p>
        </div>
      )}
    </div>
  );
};

const UploadedFilesPage = ({ onBack }: { onBack: () => void }) => {
  const [showAppDialog, setShowAppDialog] = useState(false);
  const [showReelDialog, setShowReelDialog] = useState(false);
  const [showAudioDialog, setShowAudioDialog] = useState(false);
  const [showBookDialog, setShowBookDialog] = useState(false);
  const [showListingDialog, setShowListingDialog] = useState(false);
  const { createReel } = useReels();
  const { createListing } = useListings();

  return (
    <div className="space-y-4" dir="rtl">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "تطبيق", icon: Smartphone, onClick: () => setShowAppDialog(true) },
          { label: "ريلز", icon: Film, onClick: () => setShowReelDialog(true) },
          { label: "صوتية", icon: Headphones, onClick: () => setShowAudioDialog(true) },
          { label: "كتاب", icon: BookOpen, onClick: () => setShowBookDialog(true) },
          { label: "منتج", icon: Package, onClick: () => setShowListingDialog(true) },
        ].map((item) => (
          <button key={item.label} onClick={item.onClick}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-secondary/30 bg-card hover:bg-accent/50 transition-colors">
            <item.icon className="h-6 w-6 text-secondary" />
            <span className="text-xs font-semibold">إضافة {item.label}</span>
          </button>
        ))}
      </div>
      <AddAppDialog open={showAppDialog} onOpenChange={setShowAppDialog} onAdded={() => {}} />
      <AddReelDialog open={showReelDialog} onOpenChange={setShowReelDialog} onSubmit={createReel} />
      <AddAudioDialog open={showAudioDialog} onOpenChange={setShowAudioDialog} onAdded={() => {}} />
      <AddBookDialog open={showBookDialog} onOpenChange={setShowBookDialog} onAdded={() => {}} />
      <AddListingDialog open={showListingDialog} onOpenChange={setShowListingDialog} onSubmit={createListing} />
    </div>
  );
};

const NotificationsPage = ({ onBack }: { onBack: () => void }) => (
  <div className="space-y-4" dir="rtl">
    <div className="text-center py-8 text-muted-foreground">
      <Bell className="h-10 w-10 mx-auto mb-3 opacity-40" />
      <p className="text-sm">لا توجد تنبيهات جديدة</p>
    </div>
  </div>
);

const PrivacyPolicyPage = ({ onBack }: { onBack: () => void }) => (
  <div className="space-y-4" dir="rtl">
    <div className="bg-card rounded-xl p-4 text-sm text-muted-foreground leading-relaxed space-y-3">
      <p><strong className="text-foreground">مقدمة:</strong> نلتزم في تطبيق حقيبة المسلم بحماية خصوصيتك وبياناتك الشخصية وفقاً لأعلى المعايير الدولية لحماية البيانات.</p>
      <p><strong className="text-foreground">1. البيانات المجمعة:</strong> نجمع فقط البيانات الضرورية لتشغيل التطبيق مثل البريد الإلكتروني والاسم وبيانات الاستخدام الأساسية. لا نجمع أي بيانات حساسة مثل الموقع الجغرافي الدقيق أو المعلومات المالية بدون إذنك الصريح.</p>
      <p><strong className="text-foreground">2. استخدام البيانات:</strong> تُستخدم بياناتك حصرياً لتحسين تجربتك في التطبيق وتقديم المحتوى المناسب. لا نبيع بياناتك أبداً ولا نشاركها مع أطراف ثالثة لأغراض تسويقية.</p>
      <p><strong className="text-foreground">3. التخزين والأمان:</strong> نستخدم تشفيراً متقدماً (AES-256) لحماية بياناتك أثناء النقل والتخزين. يتم تخزين البيانات على خوادم آمنة ومحمية ضمن أحدث البنى التحتية السحابية.</p>
      <p><strong className="text-foreground">4. ملفات تعريف الارتباط (Cookies):</strong> نستخدم ملفات تعريف الارتباط الأساسية فقط لضمان عمل التطبيق بشكل سليم وتذكر تفضيلاتك مثل اللغة ووضع العرض.</p>
      <p><strong className="text-foreground">5. مشاركة البيانات:</strong> لا نشارك بياناتك الشخصية مع أي جهة خارجية باستثناء مزودي الخدمات الضرورية لتشغيل التطبيق (مثل خدمات المصادقة والدفع) والذين يلتزمون بسياسات خصوصية صارمة.</p>
      <p><strong className="text-foreground">6. حقوقك:</strong> يحق لك طلب الاطلاع على بياناتك الشخصية أو تعديلها أو حذفها بالكامل في أي وقت. كما يحق لك الاعتراض على معالجة بياناتك أو طلب نقلها.</p>
      <p><strong className="text-foreground">7. حماية الأطفال:</strong> لا نجمع بيانات من الأطفال دون سن 13 عاماً بشكل متعمد. إذا اكتشفنا ذلك، سنحذف تلك البيانات فوراً.</p>
      <p><strong className="text-foreground">8. الإعلانات:</strong> في حالة عرض إعلانات، نلتزم بعرض إعلانات ملائمة ومحترمة فقط، ولا نستخدم بيانات تتبع متقدمة.</p>
      <p><strong className="text-foreground">9. التحديثات:</strong> قد نقوم بتحديث هذه السياسة بشكل دوري وسنخطرك بأي تغييرات جوهرية عبر إشعار داخل التطبيق أو البريد الإلكتروني.</p>
      <p><strong className="text-foreground">10. التواصل:</strong> لأي استفسارات تتعلق بالخصوصية، تواصل معنا عبر البريد الإلكتروني: privacy@haqibatalmuslim.com</p>
      <p className="text-xs text-muted-foreground/60 pt-2 border-t border-border/50">آخر تحديث: مارس 2026</p>
    </div>
  </div>
);

const AboutAppPage = ({ onBack }: { onBack: () => void }) => (
  <div className="space-y-4" dir="rtl">
    <div className="text-center py-4">
      <img src="/logo-app.png" alt="حقيبة المسلم" className="h-20 w-20 rounded-2xl mx-auto mb-3 shadow-lg" />
      <h3 className="text-lg font-bold font-cairo">حقيبة المسلم</h3>
      <p className="text-xs text-muted-foreground mt-1">الإصدار 1.0.0</p>
    </div>
    <div className="bg-card rounded-xl p-4 text-sm text-muted-foreground leading-relaxed space-y-2">
      <p>تطبيق حقيبة المسلم هو تطبيق إسلامي شامل يهدف إلى تسهيل حياة المسلم اليومية من خلال توفير القرآن الكريم، الأذكار، أوقات الصلاة، المكتبة الإسلامية، الصوتيات، والمتجر الإسلامي في مكان واحد.</p>
      <p>تم تطويره بحب وإتقان ليكون رفيقك الإسلامي في كل وقت وحين.</p>
      <p className="text-xs font-semibold text-foreground">المميزات الرئيسية:</p>
      <ul className="list-disc list-inside text-xs space-y-1">
        <li>القرآن الكريم بأصوات أشهر القراء</li>
        <li>أذكار الصباح والمساء والأدعية</li>
        <li>مواقيت الصلاة واتجاه القبلة</li>
        <li>مكتبة الكتب الإسلامية</li>
        <li>صوتيات ودروس ومحاضرات</li>
        <li>ريلز إسلامية ومحتوى مميز</li>
        <li>متجر إسلامي</li>
      </ul>
    </div>
  </div>
);

const DonationPage = ({ onBack }: { onBack: () => void }) => {
  const [amount, setAmount] = useState("5");
  const [method, setMethod] = useState("");
  const { toast } = useToast();
  const amounts = ["1", "3", "5", "10"];
  return (
    <div className="space-y-4" dir="rtl">
      <p className="text-sm text-muted-foreground">يمكنك دعم تطوير التطبيق ليستمر في تقديم القرآن والدروس الإسلامية مجاناً.</p>
      <div className="flex gap-2">
        {amounts.map(a => (
          <button key={a} onClick={() => setAmount(a)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${amount === a ? "bg-primary text-primary-foreground" : "bg-card border border-border"}`}>
            ${a}
          </button>
        ))}
      </div>
      <Input value={amount} onChange={e => setAmount(e.target.value)} placeholder="مبلغ مخصص" className="text-right h-11 rounded-xl" type="number" />
      <h4 className="text-sm font-bold">طريقة الدفع:</h4>
      <div className="space-y-2">
        {[
          { id: "card", icon: CreditCard, label: "بطاقة فيزا / ماستركارد", desc: "ادفع بالبطاقة البنكية" },
          { id: "crypto", icon: Bitcoin, label: "العملات الرقمية", desc: "BTC, ETH, USDT" },
          { id: "paypal", icon: MessageSquare, label: "PayPal", desc: "الدفع عبر PayPal" },
        ].map(m => (
          <div key={m.id} onClick={() => setMethod(m.id)}
            className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${method === m.id ? "border-primary bg-primary/5" : "border-secondary/30 bg-card hover:bg-accent/50"}`}>
            <m.icon className="h-5 w-5 text-secondary" />
            <div><p className="text-sm font-semibold">{m.label}</p><p className="text-xs text-muted-foreground">{m.desc}</p></div>
          </div>
        ))}
      </div>
      <Button className="w-full h-12 rounded-xl gradient-islamic text-primary-foreground text-sm font-bold"
        onClick={() => toast({ title: "شكراً لك على دعمك لتطوير التطبيق، جزاك الله خيراً 🤲" })}>
        🤲 تبرع بمبلغ ${amount}
      </Button>
    </div>
  );
};

const ReportPage = ({ onBack }: { onBack: () => void }) => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("bug");
  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex gap-2">
        <button onClick={() => setType("bug")}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${type === "bug" ? "bg-destructive text-destructive-foreground" : "bg-card border border-border/50"}`}>
          🐛 إبلاغ عن خلل
        </button>
        <button onClick={() => setType("suggestion")}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${type === "suggestion" ? "bg-primary text-primary-foreground" : "bg-card border border-border/50"}`}>
          💡 اقتراح تحسين
        </button>
      </div>
      <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="اكتب رسالتك هنا..."
        className="w-full min-h-[120px] p-3 rounded-xl border-2 border-secondary/30 bg-card text-sm text-right" />
      <Button className="w-full gradient-islamic text-primary-foreground" onClick={() => { toast({ title: "تم إرسال الرسالة بنجاح ✅" }); setMessage(""); onBack(); }}>
        إرسال
      </Button>
    </div>
  );
};

// SubscriptionPage removed - replaced by donation system

const PrayerCalcPage = ({ onBack }: { onBack: () => void }) => {
  const calcMethods = [
    { id: 3, name: "رابطة العالم الإسلامي" },
    { id: 4, name: "أم القرى (السعودية)" },
    { id: 2, name: "الاتحاد الإسلامي لأمريكا الشمالية (ISNA)" },
    { id: 5, name: "الهيئة المصرية العامة للمساحة" },
    { id: 1, name: "جامعة العلوم الإسلامية بكراتشي" },
    { id: 7, name: "معهد الجيوفيزياء بجامعة طهران" },
    { id: 12, name: "اتحاد المنظمات الإسلامية الفرنسية" },
    { id: 9, name: "وزارة الأوقاف - الكويت" },
    { id: 13, name: "وزارة الشؤون الدينية - تركيا" },
    { id: 16, name: "الهيئة العامة للمساحة - دبي" },
    { id: 10, name: "وزارة الشؤون الدينية - قطر" },
    { id: 14, name: "وزارة الأوقاف - الأردن" },
    { id: 11, name: "مجلس التنمية الإسلامية بسنغافورة (MUIS)" },
  ];
  const madhabs = [
    { id: 0, name: "الشافعي (قياسي)" },
    { id: 1, name: "الحنفي" },
  ];
  const [selectedMethod, setSelectedMethod] = useState(() => Number(localStorage.getItem("prayer_method") || "5"));
  const [selectedMadhab, setSelectedMadhab] = useState(() => Number(localStorage.getItem("prayer_madhab") || "0"));
  const { toast } = useToast();

  const handleSave = () => {
    localStorage.setItem("prayer_method", String(selectedMethod));
    localStorage.setItem("prayer_madhab", String(selectedMadhab));
    toast({ title: "تم حفظ إعدادات المواقيت ✅" });
    onBack();
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div className="bg-card rounded-xl p-4 space-y-3">
        <h4 className="text-sm font-bold">طريقة الحساب</h4>
        {calcMethods.map(m => (
          <label key={m.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 cursor-pointer">
            <input type="radio" name="calc" checked={selectedMethod === m.id}
              onChange={() => setSelectedMethod(m.id)} className="accent-primary" />
            <span className="text-sm">{m.name}</span>
          </label>
        ))}
      </div>
      <div className="bg-card rounded-xl p-4 space-y-3">
        <h4 className="text-sm font-bold">المذهب الفقهي (حساب العصر)</h4>
        {madhabs.map(m => (
          <label key={m.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 cursor-pointer">
            <input type="radio" name="madhab" checked={selectedMadhab === m.id}
              onChange={() => setSelectedMadhab(m.id)} className="accent-primary" />
            <span className="text-sm">{m.name}</span>
          </label>
        ))}
      </div>
      <Button onClick={handleSave} className="w-full h-11 rounded-xl gradient-islamic text-primary-foreground">
        حفظ الإعدادات
      </Button>
    </div>
  );
};

const AdhanSettingsPage = ({ onBack }: { onBack: () => void }) => (
  <div className="space-y-4" dir="rtl">
    <div className="bg-card rounded-xl p-4 space-y-3">
      {["الفجر", "الظهر", "العصر", "المغرب", "العشاء"].map(p => (
        <div key={p} className="flex items-center justify-between py-2">
          <span className="text-sm font-semibold">{p}</span>
          <Switch defaultChecked />
        </div>
      ))}
    </div>
  </div>
);

const LanguagePage = ({ onBack, preferences, updatePreference }: { onBack: () => void; preferences: any; updatePreference: any }) => (
  <div className="space-y-4" dir="rtl">
    <div className="bg-card rounded-xl p-4 space-y-3">
      {[{ id: "ar", label: "العربية 🇸🇦" }, { id: "en", label: "English 🇬🇧" }].map(lang => (
        <label key={lang.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 cursor-pointer">
          <input type="radio" name="lang" checked={preferences.language === lang.id}
            onChange={() => {
              updatePreference("language", lang.id);
              document.documentElement.dir = lang.id === "ar" ? "rtl" : "ltr";
              document.documentElement.lang = lang.id;
            }} className="accent-primary" />
          <span className="text-sm">{lang.label}</span>
        </label>
      ))}
    </div>
  </div>
);

// --- Main Settings Page ---

const SettingsPage = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { preferences, updatePreference } = usePreferences();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activePage, setActivePage] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<{ display_name: string | null; avatar_url: string | null; email: string | null }>({
    display_name: null, avatar_url: null, email: null,
  });

  useEffect(() => {
    if (user) {
      supabase.from("profiles").select("display_name, avatar_url, email").eq("id", user.id).single()
        .then(({ data }) => { if (data) setProfileData(data); });
    }
  }, [user, activePage]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: "حقيبة المسلم", text: "تطبيق حقيبة المسلم - شارك تؤجر 🤲", url: window.location.origin });
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) toast({ title: "تم تسجيل الخروج" });
  };

  const toggleTheme = () => {
    const newTheme = preferences.theme === "dark" ? "light" : "dark";
    updatePreference("theme", newTheme);
  };

  // Sub-pages map with titles
  const pageConfig: Record<string, { title: string; component: React.ReactNode }> = {
    editProfile: { title: "تعديل الملف الشخصي", component: user ? <EditProfilePage onBack={() => setActivePage(null)} user={user} /> : null },
    savedItems: { title: "المحفوظات", component: <SavedItemsPage onBack={() => setActivePage(null)} /> },
    uploads: { title: "الملفات المرفوعة", component: <UploadedFilesPage onBack={() => setActivePage(null)} /> },
    notifications: { title: "التنبيهات", component: <NotificationsPage onBack={() => setActivePage(null)} /> },
    privacy: { title: "سياسة الخصوصية", component: <PrivacyPolicyPage onBack={() => setActivePage(null)} /> },
    about: { title: "عن التطبيق", component: <AboutAppPage onBack={() => setActivePage(null)} /> },
    donation: { title: "إعانة مالية", component: <DonationPage onBack={() => setActivePage(null)} /> },
    report: { title: "الإبلاغ عن خلل / اقتراح", component: <ReportPage onBack={() => setActivePage(null)} /> },
    prayerCalc: { title: "حساب المواقيت والمذهب", component: <PrayerCalcPage onBack={() => setActivePage(null)} /> },
    adhanSettings: { title: "إعدادات المؤذن", component: <AdhanSettingsPage onBack={() => setActivePage(null)} /> },
    language: { title: "اختيار اللغة", component: <LanguagePage onBack={() => setActivePage(null)} preferences={preferences} updatePreference={updatePreference} /> },
  };

  // Sub-page view - NO top header bar
  if (activePage && pageConfig[activePage]) {
    return (
      <div className="min-h-screen bg-background pb-20" dir="rtl">
        <main className="container py-4 px-4 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold font-cairo text-foreground">{pageConfig[activePage].title}</h2>
            <Button variant="ghost" size="icon" onClick={() => setActivePage(null)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
          {pageConfig[activePage].component}
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20" dir="rtl">
      <main className="container py-4 space-y-5 px-4">
        {/* Back row */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold font-cairo text-foreground">الإعدادات</h1>
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
        </div>

        {/* Profile Card with golden frame */}
        <section className="animate-fadeIn text-center">
          <div className="rounded-2xl border-2 border-secondary p-5 bg-card shadow-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className="h-20 w-20 rounded-full border-4 border-secondary/50 overflow-hidden bg-muted flex items-center justify-center shadow-lg ring-2 ring-secondary/30 ring-offset-2 ring-offset-background">
                  {profileData.avatar_url ? (
                    <img src={profileData.avatar_url} alt="الصورة الشخصية" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-secondary flex items-center justify-center shadow-md">
                  <Crown className="h-3.5 w-3.5 text-secondary-foreground" />
                </div>
              </div>
              <h2 className="text-lg font-bold text-foreground font-cairo">
                {profileData.display_name || "مستخدم"}
              </h2>
              <p className="text-xs text-muted-foreground">{user?.email || "سجل دخولك"}</p>
            </div>
          </div>
        </section>

        {/* Donation CTA */}
        <section className="animate-fadeIn" style={{ animationDelay: "50ms" }}>
          <div className="rounded-xl bg-gradient-to-l from-emerald-600 to-teal-700 p-4 text-white text-center shadow-lg cursor-pointer" onClick={() => setActivePage("donation")}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <Heart className="h-5 w-5" />
              <h3 className="font-bold text-sm">ادعم تطوير التطبيق</h3>
            </div>
            <button className="mt-3 px-6 py-2 bg-white text-emerald-700 rounded-xl font-bold text-xs hover:bg-white/90 transition-colors">
              تبرع الآن 🤲
            </button>
          </div>
        </section>

        {/* أ. الملف الشخصي */}
        <MenuSection title="أ. الملف الشخصي" delay="100ms">
          <MenuItem icon={Edit3} label="تعديل الملف الشخصي" subtitle="الصورة، الاسم، النبذة، كلمة المرور" onClick={() => setActivePage("editProfile")} />
          <MenuItem icon={Bookmark} label="المحفوظات" subtitle="تطبيقات • ريلز • صوتيات • كتب • مبيعات" onClick={() => setActivePage("savedItems")} />
          <MenuItem icon={Upload} label="الملفات المرفوعة" subtitle="المحتوى الذي رفعته" onClick={() => setActivePage("uploads")} />
          <MenuItem icon={Bell} label="التنبيهات" subtitle="تحذيرات وتحديثات" onClick={() => setActivePage("notifications")} />
        </MenuSection>

        {/* ب. إعدادات أوقات الصلاة */}
        <MenuSection title="ب. إعدادات أوقات الصلاة" delay="150ms">
          <MenuItem icon={Clock} label="طريقة حساب المواقيت والمذهب" onClick={() => setActivePage("prayerCalc")} />
          <MenuItem icon={Volume2} label="إعدادات المؤذن والتنبيهات" onClick={() => setActivePage("adhanSettings")} />
        </MenuSection>

        {/* ج. إعدادات عامة */}
        <MenuSection title="ج. إعدادات عامة" delay="200ms">
          <MenuItem
            icon={preferences.theme === "dark" ? Sun : Moon}
            label="تنسيق المظهر"
            subtitle={preferences.theme === "dark" ? "الوضع الداكن" : "الوضع الفاتح"}
            onClick={toggleTheme}
            trailing={
              <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                <span className="text-xs text-muted-foreground">{preferences.theme === "dark" ? "داكن" : "فاتح"}</span>
                <Switch checked={preferences.theme === "dark"} onCheckedChange={toggleTheme} />
              </div>
            }
          />
          <MenuItem icon={Globe} label="اختيار اللغة" subtitle={preferences.language === "ar" ? "العربية" : "English"} onClick={() => setActivePage("language")} />
          <MenuItem icon={Shield} label="سياسة الخصوصية" onClick={() => setActivePage("privacy")} />
        </MenuSection>

        {/* د. حول التطبيق */}
        <MenuSection title="د. حول التطبيق" delay="250ms">
          <MenuItem icon={Info} label="عن التطبيق" subtitle="الإصدار 1.0.0" onClick={() => setActivePage("about")} />
          <MenuItem icon={Star} label="تقييم التطبيق" subtitle="قيّمنا على المتجر" />
          <MenuItem icon={Share2} label="شارك تؤجر" subtitle="أخبر أصدقاءك وانشر الخير" onClick={handleShare} />
          <MenuItem icon={Heart} label="إعانة مالية" subtitle="ادعم تطوير التطبيق" onClick={() => setActivePage("donation")} />
          <MenuItem icon={Flag} label="الإبلاغ عن خلل / اقتراح تحسين" onClick={() => setActivePage("report")} />
        </MenuSection>

        {/* تسجيل الخروج / الدخول */}
        {user ? (
          <button
            onClick={handleSignOut}
            className="w-full py-3.5 rounded-xl bg-destructive/10 text-destructive font-bold text-sm border border-destructive/20 flex items-center justify-center gap-2 hover:bg-destructive/20 transition-colors animate-fadeIn"
            style={{ animationDelay: "300ms" }}
          >
            <LogOut className="h-4 w-4" />
            تسجيل الخروج
          </button>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="w-full py-3.5 rounded-xl gradient-islamic text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 animate-fadeIn"
            style={{ animationDelay: "300ms" }}
          >
            <LogIn className="h-4 w-4" />
            تسجيل الدخول
          </button>
        )}

        <div className="text-center py-2 animate-fadeIn" style={{ animationDelay: "350ms" }}>
          <p className="text-xs text-muted-foreground font-cairo">حقيبة المسلم</p>
          <p className="text-[10px] text-muted-foreground/60 mt-1">الإصدار 1.0.0</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default SettingsPage;
