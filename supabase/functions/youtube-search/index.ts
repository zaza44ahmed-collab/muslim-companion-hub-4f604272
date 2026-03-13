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

async function resolveChannelIds(apiKey: string, handles: string[]): Promise<Record<string, string>> {
  const results: Record<string, string> = {};
  
  // Batch resolve using forHandle (one at a time since API doesn't support batch forHandle)
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

async function fetchChannelShorts(apiKey: string, channelId: string, channelTitle: string, maxResults = 5, pageToken?: string) {
  const params = new URLSearchParams({
    part: 'snippet',
    channelId,
    type: 'video',
    maxResults: String(maxResults),
    order: 'date',
    videoDuration: 'short',
    key: apiKey,
    fields: 'items(id,snippet(title,description,thumbnails,channelTitle,publishedAt)),nextPageToken',
  });
  if (pageToken) params.set('pageToken', pageToken);

  const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`);
  const data = await res.json();

  if (!res.ok) {
    console.error(`Error fetching shorts for ${channelId}:`, data);
    return [];
  }

  return (data.items || []).map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description || '',
    thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
    channelTitle: item.snippet.channelTitle || channelTitle,
    publishedAt: item.snippet.publishedAt,
    videoUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
  }));
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('YOUTUBE_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'YouTube API key not configured' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json().catch(() => ({}));
    const { mode, query, pageToken, maxResults } = body;

    // Mode: "channels" (default) - fetch from predefined channels
    // Mode: "search" - search YouTube
    if (mode === 'search' && query) {
      const params = new URLSearchParams({
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: String(maxResults || 20),
        order: 'relevance',
        videoDuration: 'short',
        key: apiKey,
        fields: 'items(id,snippet(title,description,thumbnails,channelTitle,publishedAt)),nextPageToken,pageInfo',
      });
      if (pageToken) params.set('pageToken', pageToken);

      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`);
      const data = await response.json();

      if (!response.ok) {
        return new Response(JSON.stringify({ error: data.error?.message || 'YouTube API error' }), {
          status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const videos = (data.items || []).map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        videoUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
      }));

      return new Response(JSON.stringify({ videos, nextPageToken: data.nextPageToken }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Default: fetch from predefined channels
    const channelMap = await resolveChannelIds(apiKey, CHANNEL_HANDLES);
    const channelEntries = Object.entries(channelMap);

    if (channelEntries.length === 0) {
      return new Response(JSON.stringify({ error: 'Could not resolve any channel IDs', videos: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch 5 shorts from each channel in parallel
    const allVideosArrays = await Promise.all(
      channelEntries.map(([handle, channelId]) => fetchChannelShorts(apiKey, channelId, handle, 5))
    );

    // Flatten and shuffle
    const allVideos = allVideosArrays.flat();
    for (let i = allVideos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allVideos[i], allVideos[j]] = [allVideos[j], allVideos[i]];
    }

    return new Response(JSON.stringify({ videos: allVideos }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
