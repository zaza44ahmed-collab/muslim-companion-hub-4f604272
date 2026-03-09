import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export type SavedItemType = 'app' | 'reel' | 'audio' | 'book' | 'listing';

export function useSavedItems(itemType?: SavedItemType) {
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [savedItems, setSavedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSaved = useCallback(async () => {
    if (!user) { setSavedIds(new Set()); setSavedItems([]); return; }
    setLoading(true);
    let query = supabase.from('saved_items').select('*').eq('user_id', user.id);
    if (itemType) query = query.eq('item_type', itemType);
    const { data } = await query.order('created_at', { ascending: false });
    if (data) {
      setSavedIds(new Set(data.map((d: any) => `${d.item_type}:${d.item_id}`)));
      setSavedItems(data);
    }
    setLoading(false);
  }, [user, itemType]);

  useEffect(() => { fetchSaved(); }, [fetchSaved]);

  const toggleSave = async (type: SavedItemType, itemId: string) => {
    if (!user) return false;
    const key = `${type}:${itemId}`;
    if (savedIds.has(key)) {
      setSavedIds(prev => { const n = new Set(prev); n.delete(key); return n; });
      await supabase.from('saved_items').delete().eq('user_id', user.id).eq('item_type', type).eq('item_id', itemId);
    } else {
      setSavedIds(prev => new Set(prev).add(key));
      await supabase.from('saved_items').insert({ user_id: user.id, item_type: type, item_id: itemId });
    }
    return true;
  };

  const isSaved = (type: SavedItemType, itemId: string) => savedIds.has(`${type}:${itemId}`);

  return { savedIds, savedItems, loading, toggleSave, isSaved, refetch: fetchSaved };
}
