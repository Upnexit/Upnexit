import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

function getVisitorId() {
  let id = localStorage.getItem('_vid');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('_vid', id);
  }
  return id;
}

export function usePageTracker() {
  const location = useLocation();

  useEffect(() => {
    // Facebook Pixel - track page view on route change
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }

    const track = async () => {
      try {
        await supabase.functions.invoke('track-visit', {
          body: {
            page_path: location.pathname,
            visitor_id: getVisitorId(),
            referrer: document.referrer || null,
          },
        });
      } catch {
        // Silent fail - don't break UX for tracking
      }
    };

    // Small delay to not block rendering
    const timer = setTimeout(track, 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);
}
