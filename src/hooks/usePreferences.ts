import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface UserPreferences {
  theme: string;
  language: string;
  notifications_enabled: boolean;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'light',
  language: 'ar',
  notifications_enabled: true,
};

export function usePreferences() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // Fall back to localStorage for non-authenticated users
      const saved = localStorage.getItem('theme');
      setPreferences(prev => ({ ...prev, theme: saved || 'light' }));
      setLoading(false);
      return;
    }

    const fetchPreferences = async () => {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('theme, language, notifications_enabled')
        .eq('id', user.id)
        .single();

      if (data && !error) {
        setPreferences(data);
        // Sync theme to DOM
        if (data.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', data.theme);
      }
      setLoading(false);
    };

    fetchPreferences();
  }, [user]);

  const updatePreference = useCallback(async <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }));

    if (key === 'theme') {
      if (value === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', value as string);
    }

    if (user) {
      await supabase
        .from('user_preferences')
        .update({ [key]: value })
        .eq('id', user.id);
    }
  }, [user]);

  return { preferences, loading, updatePreference };
}
