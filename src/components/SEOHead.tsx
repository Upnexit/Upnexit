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

const DEFAULT_OG_IMAGE =
  'https://storage.googleapis.com/gpt-engineer-file-uploads/Fex7fztUL7ddcBz0intQqXmidY43/social-images/social-1775317823285-Screenshot_2026-04-04_211241.webp';

const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

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

    // Keep a valid robots directive at all times (never strip the sitewide one)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : DEFAULT_ROBOTS);
    setMeta('name', 'googlebot', noindex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', title);
    setMeta('property', 'og:site_name', 'Upnex It');
    setMeta('property', 'og:locale', 'en_US');
    setMeta('property', 'og:locale:alternate', 'bn_BD');
    if (canonical) {
      setMeta('property', 'og:url', canonical);
    }

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);
    setMeta('name', 'twitter:image:alt', title);

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

    // Note: canonical is intentionally NOT removed on unmount — the next
    // route's SEOHead overwrites it, so a canonical tag is always present.
  }, [title, description, canonical, ogImage, type, noindex, keywords]);

  return null;
};

export default SEOHead;
