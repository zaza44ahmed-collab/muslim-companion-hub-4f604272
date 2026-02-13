
-- Create reel comments table with parent_id for replies
CREATE TABLE public.reel_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reel_id UUID NOT NULL REFERENCES public.reels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  parent_id UUID REFERENCES public.reel_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.reel_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reel comments"
ON public.reel_comments FOR SELECT USING (true);

CREATE POLICY "Users can create comments"
ON public.reel_comments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
ON public.reel_comments FOR DELETE USING (auth.uid() = user_id);

-- Index for fast lookup
CREATE INDEX idx_reel_comments_reel_id ON public.reel_comments(reel_id);
CREATE INDEX idx_reel_comments_parent_id ON public.reel_comments(parent_id);
