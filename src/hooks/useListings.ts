import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface ListingData {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  category: string;
  condition: string;
  phone: string;
  is_featured: boolean;
  views: number;
  created_at: string;
  updated_at: string;
  images: string[];
  seller_name: string;
  seller_avatar: string | null;
  is_favorited?: boolean;
}

export function useListings() {
  const { user } = useAuth();
  const [listings, setListings] = useState<ListingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const fetchListings = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        listing_images(image_url, position)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      // Fetch seller profiles separately
      const userIds = [...new Set(data.map((item: any) => item.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_url')
        .in('id', userIds);
      const mapped: ListingData[] = data.map((item: any) => ({
        id: item.id,
        user_id: item.user_id,
        title: item.title,
        description: item.description,
        price: item.price,
        currency: item.currency,
        location: item.location,
        category: item.category,
        condition: item.condition,
        phone: item.phone,
        is_featured: item.is_featured,
        views: item.views,
        created_at: item.created_at,
        updated_at: item.updated_at,
        images: (item.listing_images || [])
          .sort((a: any, b: any) => a.position - b.position)
          .map((img: any) => img.image_url),
        seller_name: profiles?.find((p: any) => p.id === item.user_id)?.display_name || 'مستخدم',
        seller_avatar: profiles?.find((p: any) => p.id === item.user_id)?.avatar_url || null,
        is_favorited: false,
      }));
      setListings(mapped);
    }
    setLoading(false);
  }, []);

  const fetchFavorites = useCallback(async () => {
    if (!user) { setFavoriteIds(new Set()); return; }
    const { data } = await supabase
      .from('listing_favorites')
      .select('listing_id')
      .eq('user_id', user.id);
    if (data) {
      setFavoriteIds(new Set(data.map((f: any) => f.listing_id)));
    }
  }, [user]);

  useEffect(() => { fetchListings(); }, [fetchListings]);
  useEffect(() => { fetchFavorites(); }, [fetchFavorites]);

  const toggleFavorite = async (listingId: string) => {
    if (!user) return false;
    const isFav = favoriteIds.has(listingId);
    if (isFav) {
      await supabase.from('listing_favorites').delete().eq('user_id', user.id).eq('listing_id', listingId);
      setFavoriteIds((prev) => { const n = new Set(prev); n.delete(listingId); return n; });
    } else {
      await supabase.from('listing_favorites').insert({ user_id: user.id, listing_id: listingId });
      setFavoriteIds((prev) => new Set(prev).add(listingId));
    }
    return true;
  };

  const createListing = async (data: {
    title: string; description: string; price: number; location: string;
    category: string; condition: string; phone: string; imageFiles: File[];
  }) => {
    if (!user) return { error: 'يجب تسجيل الدخول أولاً' };

    const { data: listing, error } = await supabase
      .from('listings')
      .insert({
        user_id: user.id,
        title: data.title,
        description: data.description,
        price: data.price,
        location: data.location,
        category: data.category,
        condition: data.condition,
        phone: data.phone,
      })
      .select()
      .single();

    if (error || !listing) return { error: error?.message || 'حدث خطأ' };

    // Upload images
    for (let i = 0; i < data.imageFiles.length; i++) {
      const file = data.imageFiles[i];
      const ext = file.name.split('.').pop();
      const path = `${user.id}/${listing.id}/${i}.${ext}`;
      
      const { error: uploadError } = await supabase.storage
        .from('listing-images')
        .upload(path, file);

      if (!uploadError) {
        const { data: urlData } = supabase.storage.from('listing-images').getPublicUrl(path);
        await supabase.from('listing_images').insert({
          listing_id: listing.id,
          image_url: urlData.publicUrl,
          position: i,
        });
      }
    }

    await fetchListings();
    return { error: null };
  };

  const incrementViews = async (listingId: string) => {
    // Best-effort view count increment
    try {
      const current = listings.find(l => l.id === listingId);
      if (current) {
        await supabase.from('listings').update({ views: current.views + 1 }).eq('id', listingId);
      }
    } catch {
      // ignore
    }
  };

  return {
    listings,
    loading,
    favoriteIds,
    toggleFavorite,
    createListing,
    incrementViews,
    refetch: fetchListings,
  };
}
