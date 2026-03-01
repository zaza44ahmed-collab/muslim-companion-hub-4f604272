
-- Add new columns to user_apps for app file, screenshots, and version
ALTER TABLE public.user_apps ADD COLUMN IF NOT EXISTS app_file_url text;
ALTER TABLE public.user_apps ADD COLUMN IF NOT EXISTS screenshots text[] DEFAULT '{}';
ALTER TABLE public.user_apps ADD COLUMN IF NOT EXISTS version text DEFAULT '';
ALTER TABLE public.user_apps ADD COLUMN IF NOT EXISTS downloads_count integer DEFAULT 0;

-- Create app_ratings table
CREATE TABLE IF NOT EXISTS public.app_ratings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  app_id uuid NOT NULL REFERENCES public.user_apps(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(app_id, user_id)
);

ALTER TABLE public.app_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view app ratings" ON public.app_ratings FOR SELECT USING (true);
CREATE POLICY "Users can rate apps" ON public.app_ratings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own ratings" ON public.app_ratings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own ratings" ON public.app_ratings FOR DELETE USING (auth.uid() = user_id);

-- Create app_comments table
CREATE TABLE IF NOT EXISTS public.app_comments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  app_id uuid NOT NULL REFERENCES public.user_apps(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.app_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view app comments" ON public.app_comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON public.app_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON public.app_comments FOR DELETE USING (auth.uid() = user_id);
