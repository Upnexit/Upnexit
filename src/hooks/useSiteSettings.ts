import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type SiteSettingsMap = Record<string, string>;

/**
 * Reads site_settings as a key→value map AND subscribes to realtime changes
 * so any admin edit instantly propagates to every open page.
 */
export const useSiteSettings = () => {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ['site-settings-map'],
    queryFn: async (): Promise<SiteSettingsMap> => {
      const { data, error } = await supabase.from('site_settings').select('key, value');
      if (error) throw error;
      const map: SiteSettingsMap = {};
      (data ?? []).forEach((r: any) => { map[r.key] = r.value ?? ''; });
      return map;
    },
    staleTime: 30_000,
  });

  useEffect(() => {
    const channel = supabase
      .channel('site_settings_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'site_settings' },
        () => {
          qc.invalidateQueries({ queryKey: ['site-settings-map'] });
          qc.invalidateQueries({ queryKey: ['site-settings'] });
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [qc]);

  const settings = query.data ?? {};
  return {
    settings,
    get: (key: string, fallback = '') => settings[key] || fallback,
    isLoading: query.isLoading,
  };
};

/** Returns the live logo URL with a cache-busting version (or fallback /logo.png). */
export const useLogoUrl = (fallback = '/logo.png') => {
  const { get } = useSiteSettings();
  const url = get('logo_url', '');
  const version = get('logo_version', '');
  if (!url) return fallback;
  return version ? `${url}${url.includes('?') ? '&' : '?'}v=${version}` : url;
};