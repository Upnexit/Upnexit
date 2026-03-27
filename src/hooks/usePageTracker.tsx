import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function getVisitorId() {
  if (typeof window === 'undefined') {
    return 'server-render';
  }

  try {
    let id = window.localStorage.getItem('_vid');
    if (!id) {
      id = window.crypto?.randomUUID?.() ?? `visitor-${Date.now()}`;
      window.localStorage.setItem('_vid', id);
    }
    return id;
  } catch {
    return window.crypto?.randomUUID?.() ?? `visitor-${Date.now()}`;
  }
}

export function usePageTracker() {
  const location = useLocation();

  useEffect(() => {
    // Facebook Pixel - track page view on route change
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }

    const track = async () => {
      try {
        await supabase.functions.invoke('track-visit', {
          body: {
            page_path: location.pathname,
            visitor_id: getVisitorId(),
            referrer: typeof document !== 'undefined' ? document.referrer || null : null,
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
