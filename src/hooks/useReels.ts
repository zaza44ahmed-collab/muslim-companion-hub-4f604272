import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface ReelData {
  id: string;
  user_id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string | null;
  audio_name: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  views_count: number;
  created_at: string;
  author_name: string;
  author_avatar: string | null;
}

export function useReels() {
  const { user } = useAuth();
  const [reels, setReels] = useState<ReelData[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const fetchReels = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reels')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const userIds = [...new Set(data.map((r: any) => r.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_url')
        .in('id', userIds);

      const mapped: ReelData[] = data.map((r: any) => ({
        id: r.id,
        user_id: r.user_id,
        title: r.title,
        description: r.description || '',
        video_url: r.video_url,
        thumbnail_url: r.thumbnail_url,
        audio_name: r.audio_name || 'الصوت الأصلي',
        likes_count: r.likes_count,
        comments_count: r.comments_count,
        shares_count: r.shares_count,
        views_count: r.views_count,
        created_at: r.created_at,
        author_name: profiles?.find((p: any) => p.id === r.user_id)?.display_name || 'مستخدم',
        author_avatar: profiles?.find((p: any) => p.id === r.user_id)?.avatar_url || null,
      }));
      setReels(mapped);
    }
    setLoading(false);
  }, []);

  const fetchLikes = useCallback(async () => {
    if (!user) { setLikedIds(new Set()); return; }
    const { data } = await supabase
      .from('reel_likes')
      .select('reel_id')
      .eq('user_id', user.id);
    if (data) setLikedIds(new Set(data.map((l: any) => l.reel_id)));
  }, [user]);

  useEffect(() => { fetchReels(); }, [fetchReels]);
  useEffect(() => { fetchLikes(); }, [fetchLikes]);

  const toggleLike = async (reelId: string) => {
    if (!user) return false;
    const isLiked = likedIds.has(reelId);
    if (isLiked) {
      await supabase.from('reel_likes').delete().eq('user_id', user.id).eq('reel_id', reelId);
      await supabase.from('reels').update({ likes_count: Math.max(0, (reels.find(r => r.id === reelId)?.likes_count || 1) - 1) }).eq('id', reelId);
      setLikedIds(prev => { const n = new Set(prev); n.delete(reelId); return n; });
    } else {
      await supabase.from('reel_likes').insert({ user_id: user.id, reel_id: reelId });
      await supabase.from('reels').update({ likes_count: (reels.find(r => r.id === reelId)?.likes_count || 0) + 1 }).eq('id', reelId);
      setLikedIds(prev => new Set(prev).add(reelId));
    }
    await fetchReels();
    return true;
  };

  const createReel = async (data: { title: string; description: string; videoFile: File; audioName: string }) => {
    if (!user) return { error: 'يجب تسجيل الدخول أولاً' };

    const ext = data.videoFile.name.split('.').pop();
    const path = `${user.id}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('reel-videos')
      .upload(path, data.videoFile);

    if (uploadError) return { error: uploadError.message };

    const { data: urlData } = supabase.storage.from('reel-videos').getPublicUrl(path);

    const { error } = await supabase.from('reels').insert({
      user_id: user.id,
      title: data.title,
      description: data.description,
      video_url: urlData.publicUrl,
      audio_name: data.audioName || 'الصوت الأصلي',
    });

    if (error) return { error: error.message };
    await fetchReels();
    return { error: null };
  };

  const deleteReel = async (id: string) => {
    if (!user) return { error: 'يجب تسجيل الدخول أولاً' };
    const reel = reels.find(r => r.id === id);
    if (reel) {
      const url = reel.video_url;
      const parts = url.split('/reel-videos/');
      if (parts.length > 1) {
        await supabase.storage.from('reel-videos').remove([parts[1]]);
      }
    }
    await supabase.from('reel_likes').delete().eq('reel_id', id);
    const { error } = await supabase.from('reels').delete().eq('id', id).eq('user_id', user.id);
    if (error) return { error: error.message };
    await fetchReels();
    return { error: null };
  };

  return { reels, loading, likedIds, toggleLike, createReel, deleteReel, refetch: fetchReels };
}
