import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  videoUrl: string;
}

const SEARCH_QUERIES = [
  'مقاطع إسلامية قصيرة shorts',
  'تلاوة قرآن كريم shorts',
  'أذكار وأدعية shorts',
  'دروس دينية قصيرة',
  'قصص إسلامية shorts',
];

export function useYouTubeVideos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

  const fetchVideos = useCallback(async (query?: string, pageToken?: string) => {
    setLoading(true);
    setError(null);

    try {
      const searchQuery = query || SEARCH_QUERIES[Math.floor(Math.random() * SEARCH_QUERIES.length)];

      const { data, error: fnError } = await supabase.functions.invoke('youtube-search', {
        body: { query: searchQuery, pageToken, maxResults: 20 },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);

      if (pageToken) {
        setVideos(prev => [...prev, ...(data.videos || [])]);
      } else {
        setVideos(data.videos || []);
      }
      setNextPageToken(data.nextPageToken || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في جلب الفيديوهات');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (nextPageToken && !loading) {
      fetchVideos(undefined, nextPageToken);
    }
  }, [nextPageToken, loading, fetchVideos]);

  return { videos, loading, error, fetchVideos, loadMore, hasMore: !!nextPageToken };
}
