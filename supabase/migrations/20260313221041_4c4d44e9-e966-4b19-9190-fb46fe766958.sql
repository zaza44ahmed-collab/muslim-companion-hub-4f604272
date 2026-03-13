
CREATE TABLE public.youtube_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id text NOT NULL UNIQUE,
  title text NOT NULL,
  description text DEFAULT '',
  thumbnail text,
  channel_title text,
  channel_handle text,
  published_at timestamptz,
  video_url text NOT NULL,
  fetched_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.youtube_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view cached videos" ON public.youtube_cache FOR SELECT TO public USING (true);

CREATE INDEX idx_youtube_cache_channel ON public.youtube_cache(channel_handle);
CREATE INDEX idx_youtube_cache_fetched ON public.youtube_cache(fetched_at);
