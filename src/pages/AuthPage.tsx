import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, UserPlus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: "خطأ في تسجيل الدخول", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "تم تسجيل الدخول بنجاح" });
        navigate("/settings");
      }
    } else {
      const { error } = await signUp(email, password);
      if (error) {
        toast({ title: "خطأ في إنشاء الحساب", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "تم إنشاء الحساب", description: "تحقق من بريدك الإلكتروني لتأكيد الحساب" });
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4" dir="rtl">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="h-20 w-20 mx-auto rounded-2xl gradient-islamic flex items-center justify-center mb-4 shadow-lg">
          <span className="text-3xl text-primary-foreground font-bold font-amiri">حم</span>
        </div>
        <h1 className="text-2xl font-bold font-amiri text-gradient-islamic">حقيبة المسلم</h1>
        <p className="text-muted-foreground text-sm mt-1">رفيقك اليومي</p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-sm rounded-2xl border-2 border-secondary/30 bg-card p-6 shadow-lg">
        <h2 className="text-lg font-bold text-foreground text-center mb-6 font-cairo">
          {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pr-10 text-right"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10 text-right"
              minLength={6}
              required
            />
          </div>

          <Button type="submit" className="w-full gradient-islamic text-primary-foreground font-semibold" disabled={loading}>
            {loading ? "جاري..." : isLogin ? (
              <><LogIn className="h-4 w-4 ml-2" /> تسجيل الدخول</>
            ) : (
              <><UserPlus className="h-4 w-4 ml-2" /> إنشاء حساب</>
            )}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-secondary hover:underline font-cairo"
          >
            {isLogin ? "ليس لديك حساب؟ أنشئ حساباً" : "لديك حساب؟ سجل الدخول"}
          </button>
        </div>
      </div>

      {/* Back */}
      <button onClick={() => navigate("/")} className="mt-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowRight className="h-4 w-4" />
        <span className="text-sm">العودة للرئيسية</span>
      </button>
    </div>
  );
};

export default AuthPage;
