
-- Add bio, level, points, streak to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS bio text DEFAULT '',
ADD COLUMN IF NOT EXISTS level text DEFAULT 'مبتدئ',
ADD COLUMN IF NOT EXISTS points integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS streak_days integer DEFAULT 0;

-- User activity stats table
CREATE TABLE public.user_activity_stats (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  apps_saved integer DEFAULT 0,
  books_read integer DEFAULT 0,
  audio_listened integer DEFAULT 0,
  reels_watched integer DEFAULT 0,
  content_uploaded integer DEFAULT 0,
  total_likes integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.user_activity_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own stats" ON public.user_activity_stats
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats" ON public.user_activity_stats
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stats" ON public.user_activity_stats
FOR UPDATE USING (auth.uid() = user_id);

-- User badges table
CREATE TABLE public.user_badges (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  badge_name text NOT NULL,
  earned_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, badge_name)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own badges" ON public.user_badges
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own badges" ON public.user_badges
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Auto-create activity stats for new users (update existing trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  INSERT INTO public.user_preferences (id) VALUES (NEW.id);
  INSERT INTO public.user_activity_stats (user_id) VALUES (NEW.id);
  INSERT INTO public.user_badges (user_id, badge_name) VALUES (NEW.id, 'مبتدئ');
  RETURN NEW;
END;
$$;

-- Trigger for updated_at
CREATE TRIGGER update_user_activity_stats_updated_at
BEFORE UPDATE ON public.user_activity_stats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
