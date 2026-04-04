import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: string;
  noindex?: boolean;
  keywords?: string;
}

const DEFAULT_OG_IMAGE = 'https://upnexit.pro.bd/og-image.jpg';

const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  keywords,
}: SEOHeadProps) => {
  useEffect(() => {
    // Title
    document.title = title;

    // Helper to set/create meta tags
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);

    if (keywords) {
      setMeta('name', 'keywords', keywords);
    }

    if (noindex) {
      setMeta('name', 'robots', 'noindex, nofollow');
    } else {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) robotsMeta.remove();
    }

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', ogImage);
    if (canonical) {
      setMeta('property', 'og:url', canonical);
    }

    // Twitter
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // Canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    return () => {
      // Clean up canonical on unmount
      const link = document.querySelector('link[rel="canonical"]');
      if (link) link.remove();
    };
  }, [title, description, canonical, ogImage, type, noindex, keywords]);

  return null;
};

export default SEOHead;
