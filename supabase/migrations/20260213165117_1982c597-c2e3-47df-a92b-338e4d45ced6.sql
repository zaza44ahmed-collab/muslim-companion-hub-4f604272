
-- Create reels table
CREATE TABLE public.reels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  audio_name TEXT DEFAULT 'الصوت الأصلي',
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  shares_count INTEGER NOT NULL DEFAULT 0,
  views_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reels ENABLE ROW LEVEL SECURITY;

-- Anyone can view reels
CREATE POLICY "Anyone can view reels"
ON public.reels FOR SELECT USING (true);

-- Users can create own reels
CREATE POLICY "Users can create own reels"
ON public.reels FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update own reels
CREATE POLICY "Users can update own reels"
ON public.reels FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete own reels
CREATE POLICY "Users can delete own reels"
ON public.reels FOR DELETE USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_reels_updated_at
BEFORE UPDATE ON public.reels
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create reel-likes table
CREATE TABLE public.reel_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  reel_id UUID NOT NULL REFERENCES public.reels(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, reel_id)
);

ALTER TABLE public.reel_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reel likes"
ON public.reel_likes FOR SELECT USING (true);

CREATE POLICY "Users can like reels"
ON public.reel_likes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike reels"
ON public.reel_likes FOR DELETE USING (auth.uid() = user_id);

-- Create storage bucket for reel videos
INSERT INTO storage.buckets (id, name, public) VALUES ('reel-videos', 'reel-videos', true);

-- Storage policies for reel videos
CREATE POLICY "Anyone can view reel videos"
ON storage.objects FOR SELECT USING (bucket_id = 'reel-videos');

CREATE POLICY "Users can upload reel videos"
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'reel-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own reel videos"
ON storage.objects FOR DELETE USING (bucket_id = 'reel-videos' AND auth.uid()::text = (storage.foldername(name))[1]);
