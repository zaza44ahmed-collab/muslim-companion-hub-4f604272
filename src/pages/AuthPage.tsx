import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, UserPlus, LogIn, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { lovable } from "@/integrations/lovable/index";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isLogin && password !== confirmPassword) {
      toast({ title: "خطأ", description: "كلمة المرور غير متطابقة", variant: "destructive" });
      setLoading(false);
      return;
    }

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: "خطأ في تسجيل الدخول", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "تم تسجيل الدخول بنجاح" });
        navigate("/settings");
      }
    } else {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        toast({ title: "خطأ في إنشاء الحساب", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "تم إنشاء الحساب", description: "تحقق من بريدك الإلكتروني لتأكيد الحساب" });
      }
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (error) {
      toast({ title: "خطأ", description: "فشل تسجيل الدخول بـ Google", variant: "destructive" });
    }
    setGoogleLoading(false);
  };

  return (
    <div className="min-h-screen islamic-bg-light flex flex-col items-center justify-center px-4 py-8" dir="rtl">
      {/* Logo */}
      <div className="mb-6 text-center">
        <div className="h-20 w-20 mx-auto rounded-2xl gradient-islamic flex items-center justify-center mb-3 shadow-lg">
          <span className="text-3xl text-primary-foreground font-bold font-amiri">حم</span>
        </div>
        <h1 className="text-2xl font-bold font-amiri text-gradient-islamic">حقيبة المسلم</h1>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-foreground mb-4 font-cairo">
        {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
      </h2>

      {/* Tab Toggle */}
      <div className="w-full max-w-sm flex rounded-xl bg-muted p-1 mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold font-cairo transition-all ${
            isLogin ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
          }`}
        >
          تسجيل الدخول
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold font-cairo transition-all ${
            !isLogin ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
          }`}
        >
          إنشاء حساب
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        {!isLogin && (
          <div className="relative">
            <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
            <Input
              type="text"
              placeholder="الاسم الكامل"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="pr-11 text-right h-12 rounded-xl border-2 border-primary/30 focus:border-primary bg-card text-base"
              required
            />
          </div>
        )}

        <div className="relative">
          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
          <Input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pr-11 text-right h-12 rounded-xl border-2 border-primary/30 focus:border-primary bg-card text-base"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pr-11 pl-10 text-right h-12 rounded-xl border-2 border-primary/30 focus:border-primary bg-card text-base"
            minLength={6}
            required
          />
        </div>

        {!isLogin && (
          <div className="relative">
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="تأكيد كلمة المرور"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pr-11 pl-10 text-right h-12 rounded-xl border-2 border-primary/30 focus:border-primary bg-card text-base"
              minLength={6}
              required
            />
          </div>
        )}

        {isLogin && (
          <div className="text-right">
            <button type="button" className="text-sm text-primary hover:underline font-cairo">
              نسيت كلمة المرور؟
            </button>
          </div>
        )}

        <Button type="submit" className="w-full h-12 rounded-xl gradient-islamic text-primary-foreground font-semibold text-base" disabled={loading}>
          {loading ? "جاري..." : isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
        </Button>
      </form>

      {/* Divider */}
      <div className="w-full max-w-sm flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm text-muted-foreground font-cairo">أو</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Google Sign In */}
      <Button
        variant="outline"
        onClick={handleGoogleSignIn}
        disabled={googleLoading}
        className="w-full max-w-sm h-12 rounded-xl border-2 border-primary/30 bg-card text-foreground font-semibold text-base font-cairo gap-3"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        {googleLoading ? "جاري..." : "تسجيل الدخول باستخدام Google"}
      </Button>

      {/* Toggle */}
      <div className="mt-5 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm font-cairo text-muted-foreground"
        >
          {isLogin ? "ليس لديك حساب؟ " : "لديك حساب؟ "}
          <span className="text-primary font-bold hover:underline">
            {isLogin ? "إنشاء حساب" : "تسجيل الدخول"}
          </span>
        </button>
      </div>

      {/* Back */}
      <button onClick={() => navigate("/")} className="mt-4 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowRight className="h-4 w-4" />
        <span className="text-sm">العودة للرئيسية</span>
      </button>
    </div>
  );
};

export default AuthPage;
