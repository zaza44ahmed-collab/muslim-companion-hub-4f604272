import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  channelHandle: string;
  publishedAt: string;
  videoUrl: string;
}

export const CHANNEL_NAMES: Record<string, string> = {
  'alshuwayer9': 'الشيخ عبد السلام الشويعر',
  '3hkmz': 'أحكام',
  'qutofosaimi': 'قطوف العصيمي',
  'sahihalfiqh': 'صحيح الفقه',
  'salman_alfaresi': 'سلمان الفارسي',
  'tawhydullah': 'التوحيد حق الله',
  'fatawa24.': 'فتاوى ودروس',
  'aluthaymeen': 'ابن عثيمين',
  'k_d_rd': 'مسائل دينية',
  'miloudabuslem': 'ميلود أبو سليم',
  'alislam28': 'الإسلام',
};

export function useYouTubeVideos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async (channelFilter?: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('youtube-search', {
        body: { channel: channelFilter || undefined },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);

      setVideos(data.videos || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في جلب الفيديوهات');
    } finally {
      setLoading(false);
    }
  }, []);

  return { videos, loading, error, fetchVideos };
}
