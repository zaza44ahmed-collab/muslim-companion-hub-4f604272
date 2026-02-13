import { useState, useEffect, useCallback } from "react";
import { Send, Reply, Trash2, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  reel_id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  created_at: string;
  author_name: string;
  author_avatar: string | null;
  replies: Comment[];
}

interface ReelCommentsSheetProps {
  reelId: string | null;
  onClose: () => void;
}

const ReelCommentsSheet = ({ reelId, onClose }: ReelCommentsSheetProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [sending, setSending] = useState(false);

  const fetchComments = useCallback(async () => {
    if (!reelId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("reel_comments")
      .select("*")
      .eq("reel_id", reelId)
      .order("created_at", { ascending: true });

    if (!error && data) {
      const userIds = [...new Set(data.map((c: any) => c.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url")
        .in("id", userIds);

      const mapped = data.map((c: any) => ({
        id: c.id,
        reel_id: c.reel_id,
        user_id: c.user_id,
        parent_id: c.parent_id,
        content: c.content,
        created_at: c.created_at,
        author_name: profiles?.find((p: any) => p.id === c.user_id)?.display_name || "مستخدم",
        author_avatar: profiles?.find((p: any) => p.id === c.user_id)?.avatar_url || null,
        replies: [] as Comment[],
      }));

      // Build tree
      const topLevel: Comment[] = [];
      const map = new Map<string, Comment>();
      mapped.forEach((c) => map.set(c.id, c));
      mapped.forEach((c) => {
        if (c.parent_id && map.has(c.parent_id)) {
          map.get(c.parent_id)!.replies.push(c);
        } else {
          topLevel.push(c);
        }
      });
      setComments(topLevel);
    }
    setLoading(false);
  }, [reelId]);

  useEffect(() => {
    if (reelId) fetchComments();
  }, [reelId, fetchComments]);

  const handleSend = async () => {
    if (!user) { toast({ title: "سجل دخولك أولاً" }); return; }
    if (!text.trim() || !reelId) return;
    setSending(true);
    const { error } = await supabase.from("reel_comments").insert({
      reel_id: reelId,
      user_id: user.id,
      parent_id: replyTo?.id || null,
      content: text.trim(),
    });
    setSending(false);
    if (error) {
      toast({ title: "حدث خطأ", variant: "destructive" });
    } else {
      setText("");
      setReplyTo(null);
      // Update comments_count
      const count = (await supabase.from("reel_comments").select("id", { count: "exact" }).eq("reel_id", reelId)).count || 0;
      await supabase.from("reels").update({ comments_count: count }).eq("id", reelId);
      await fetchComments();
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!user || !reelId) return;
    await supabase.from("reel_comments").delete().eq("id", commentId).eq("user_id", user.id);
    const count = (await supabase.from("reel_comments").select("id", { count: "exact" }).eq("reel_id", reelId)).count || 0;
    await supabase.from("reels").update({ comments_count: count }).eq("id", reelId);
    await fetchComments();
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "الآن";
    if (mins < 60) return `${mins}د`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}س`;
    return `${Math.floor(hrs / 24)}ي`;
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`flex gap-2 ${isReply ? "mr-8" : ""}`}>
      <div className="h-7 w-7 rounded-full bg-secondary/10 flex items-center justify-center text-xs shrink-0 overflow-hidden">
        {comment.author_avatar ? (
          <img src={comment.author_avatar} alt="" className="h-full w-full object-cover" />
        ) : "👤"}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-foreground">{comment.author_name}</span>
          <span className="text-[9px] text-muted-foreground">{timeAgo(comment.created_at)}</span>
        </div>
        <p className="text-[11px] text-foreground/90 leading-4 mt-0.5">{comment.content}</p>
        <div className="flex items-center gap-3 mt-1">
          <button onClick={() => setReplyTo(comment)} className="text-[9px] text-primary font-semibold">رد</button>
          {user && comment.user_id === user.id && (
            <button onClick={() => handleDelete(comment.id)} className="text-[9px] text-destructive font-semibold">حذف</button>
          )}
        </div>
        {/* Replies */}
        {comment.replies.length > 0 && (
          <div className="mt-2 space-y-2.5">
            {comment.replies.map((r) => renderComment(r, true))}
          </div>
        )}
      </div>
    </div>
  );

  if (!reelId) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col" dir="rtl">
      {/* Backdrop */}
      <div className="flex-1 bg-black/50" onClick={onClose} />

      {/* Sheet */}
      <div className="bg-card rounded-t-2xl max-h-[70vh] flex flex-col animate-slideUp">
        {/* Handle */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-secondary/20">
          <h3 className="text-xs font-bold text-foreground">التعليقات</h3>
          <button onClick={onClose}><X className="h-4 w-4 text-muted-foreground" /></button>
        </div>

        {/* Comments list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-3xl">💬</span>
              <p className="text-xs text-muted-foreground mt-2">لا توجد تعليقات بعد</p>
            </div>
          ) : (
            comments.map((c) => renderComment(c))
          )}
        </div>

        {/* Reply indicator */}
        {replyTo && (
          <div className="px-3 py-1.5 bg-secondary/10 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">رد على <strong className="text-foreground">{replyTo.author_name}</strong></span>
            <button onClick={() => setReplyTo(null)}><X className="h-3 w-3 text-muted-foreground" /></button>
          </div>
        )}

        {/* Input */}
        <div className="flex items-center gap-2 p-3 border-t border-secondary/20">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={replyTo ? "اكتب رداً..." : "اكتب تعليقاً..."}
            className="flex-1 h-9 px-3 rounded-full border-2 border-secondary/30 bg-background text-xs focus:outline-none focus:border-primary/60 text-right"
            onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
          />
          <button
            onClick={handleSend}
            disabled={sending || !text.trim()}
            className="h-9 w-9 rounded-full gradient-islamic flex items-center justify-center shrink-0 disabled:opacity-50"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin text-primary-foreground" /> : <Send className="h-4 w-4 text-primary-foreground" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReelCommentsSheet;
