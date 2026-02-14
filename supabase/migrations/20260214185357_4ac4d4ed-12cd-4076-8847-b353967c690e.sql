
-- User-submitted apps
CREATE TABLE public.user_apps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  category TEXT NOT NULL DEFAULT 'quran',
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.user_apps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view user apps" ON public.user_apps FOR SELECT USING (true);
CREATE POLICY "Users can create own apps" ON public.user_apps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own apps" ON public.user_apps FOR DELETE USING (auth.uid() = user_id);

-- User-submitted books
CREATE TABLE public.user_books (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  cover_url TEXT,
  file_url TEXT,
  category TEXT NOT NULL DEFAULT 'fiqh',
  pages INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.user_books ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view user books" ON public.user_books FOR SELECT USING (true);
CREATE POLICY "Users can create own books" ON public.user_books FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own books" ON public.user_books FOR DELETE USING (auth.uid() = user_id);

-- User-submitted audio
CREATE TABLE public.user_audio (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  artist TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  cover_url TEXT,
  audio_url TEXT,
  category TEXT NOT NULL DEFAULT 'quran',
  duration TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.user_audio ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view user audio" ON public.user_audio FOR SELECT USING (true);
CREATE POLICY "Users can create own audio" ON public.user_audio FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own audio" ON public.user_audio FOR DELETE USING (auth.uid() = user_id);

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('user-content', 'user-content', true);

CREATE POLICY "Anyone can view user content" ON storage.objects FOR SELECT USING (bucket_id = 'user-content');
CREATE POLICY "Auth users can upload content" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'user-content' AND auth.uid() IS NOT NULL);
CREATE POLICY "Users can delete own content" ON storage.objects FOR DELETE USING (bucket_id = 'user-content' AND auth.uid()::text = (storage.foldername(name))[1]);
