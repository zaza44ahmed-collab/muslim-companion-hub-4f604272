import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setIsRecovery(true);
    }
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setIsRecovery(true);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "خطأ", description: "كلمة المرور غير متطابقة", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "تم تغيير كلمة المرور بنجاح" });
      navigate("/");
    }
  };

  if (!isRecovery) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4" dir="rtl">
        <div className="text-center">
          <p className="text-muted-foreground">رابط غير صالح</p>
          <Button variant="link" onClick={() => navigate("/auth")}>العودة لتسجيل الدخول</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4" dir="rtl">
      <h1 className="text-xl font-bold font-cairo mb-6">إعادة تعيين كلمة المرور</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div className="relative">
          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <Input type={showPassword ? "text" : "password"} placeholder="كلمة المرور الجديدة" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pr-11 pl-10 text-right h-12 rounded-xl border-2 border-primary/30" minLength={6} required />
        </div>
        <div className="relative">
          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
          <Input type={showPassword ? "text" : "password"} placeholder="تأكيد كلمة المرور" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pr-11 text-right h-12 rounded-xl border-2 border-primary/30" minLength={6} required />
        </div>
        <Button type="submit" className="w-full h-12 rounded-xl gradient-islamic text-primary-foreground" disabled={loading}>
          {loading ? "جاري..." : "تغيير كلمة المرور"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
