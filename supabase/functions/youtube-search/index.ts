import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const CHANNEL_HANDLES = [
  'alshuwayer9',
  '3hkmz',
  'qutofosaimi',
  'sahihalfiqh',
  'salman_alfaresi',
  'tawhydullah',
  'fatawa24.',
  'aluthaymeen',
  'k_d_rd',
  'miloudabuslem',
  'alislam28',
];

const CACHE_HOURS = 6; // Refresh cache every 6 hours

async function resolveChannelIds(apiKey: string, handles: string[]): Promise<Record<string, string>> {
  const results: Record<string, string> = {};
  const promises = handles.map(async (handle) => {
    try {
      const params = new URLSearchParams({
        part: 'id,snippet',
        forHandle: handle,
        key: apiKey,
      });
      const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?${params}`);
      const data = await res.json();
      if (data.items?.[0]) {
        results[handle] = data.items[0].id;
      }
    } catch (e) {
      console.error(`Failed to resolve handle ${handle}:`, e);
    }
  });
  await Promise.all(promises);
  return results;
}

async function fetchChannelShorts(apiKey: string, channelId: string, channelHandle: string, maxResults = 5) {
  const params = new URLSearchParams({
    part: 'snippet',
    channelId,
    type: 'video',
    maxResults: String(maxResults),
    order: 'date',
    videoDuration: 'short',
    key: apiKey,
    fields: 'items(id,snippet(title,description,thumbnails,channelTitle,publishedAt))',
  });

  const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`);
  const data = await res.json();

  if (!res.ok) {
    console.error(`Error fetching shorts for ${channelId}:`, data);
    return [];
  }

  return (data.items || []).map((item: any) => ({
    video_id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description || '',
    thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
    channel_title: item.snippet.channelTitle || channelHandle,
    channel_handle: channelHandle,
    published_at: item.snippet.publishedAt,
    video_url: `https://www.youtube.com/embed/${item.id.videoId}`,
  }));
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json().catch(() => ({}));
    const { mode, channel } = body;

    // Check cache first
    const cacheThreshold = new Date(Date.now() - CACHE_HOURS * 60 * 60 * 1000).toISOString();
    
    let cacheQuery = supabase.from('youtube_cache').select('*').gte('fetched_at', cacheThreshold);
    if (channel) {
      cacheQuery = cacheQuery.eq('channel_handle', channel);
    }
    const { data: cached } = await cacheQuery.order('published_at', { ascending: false });

    if (cached && cached.length > 5) {
      // Return cached data
      const videos = cached.map((v: any) => ({
        id: v.video_id,
        title: v.title,
        description: v.description,
        thumbnail: v.thumbnail,
        channelTitle: v.channel_title,
        channelHandle: v.channel_handle,
        publishedAt: v.published_at,
        videoUrl: v.video_url,
      }));

      // Shuffle if no channel filter
      if (!channel) {
        for (let i = videos.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [videos[i], videos[j]] = [videos[j], videos[i]];
        }
      }

      return new Response(JSON.stringify({ videos, cached: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Cache miss or stale - fetch from YouTube API
    const apiKey = Deno.env.get('YOUTUBE_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'YouTube API key not configured', videos: [] }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const channelMap = await resolveChannelIds(apiKey, CHANNEL_HANDLES);
    const channelEntries = Object.entries(channelMap);

    if (channelEntries.length === 0) {
      return new Response(JSON.stringify({ error: 'Could not resolve any channel IDs', videos: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch 5 shorts from each channel
    const allVideosArrays = await Promise.all(
      channelEntries.map(([handle, channelId]) => fetchChannelShorts(apiKey, channelId, handle, 5))
    );

    const allVideos = allVideosArrays.flat();

    // Store in cache (upsert)
    if (allVideos.length > 0) {
      // Clear old cache
      await supabase.from('youtube_cache').delete().lt('fetched_at', cacheThreshold);
      
      // Upsert new videos
      const upsertData = allVideos.map((v: any) => ({
        video_id: v.video_id,
        title: v.title,
        description: v.description,
        thumbnail: v.thumbnail,
        channel_title: v.channel_title,
        channel_handle: v.channel_handle,
        published_at: v.published_at,
        video_url: v.video_url,
        fetched_at: new Date().toISOString(),
      }));

      await supabase.from('youtube_cache').upsert(upsertData, { onConflict: 'video_id' });
    }

    // Shuffle
    for (let i = allVideos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allVideos[i], allVideos[j]] = [allVideos[j], allVideos[i]];
    }

    const videos = allVideos.map((v: any) => ({
      id: v.video_id,
      title: v.title,
      description: v.description,
      thumbnail: v.thumbnail,
      channelTitle: v.channel_title,
      channelHandle: v.channel_handle,
      publishedAt: v.published_at,
      videoUrl: v.video_url,
    }));

    return new Response(JSON.stringify({ videos, cached: false }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
