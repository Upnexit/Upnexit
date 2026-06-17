import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Linkedin, Instagram, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLogoUrl, useSiteSettings } from '@/hooks/useSiteSettings';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.83a8.16 8.16 0 0 0 4.77 1.52V6.91a4.85 4.85 0 0 1-1.84-.22z"/>
  </svg>
);

const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1BGxtCwBud/',
    Icon: Facebook,
    bg: 'bg-[#1877F2]',
    ring: 'hover:shadow-[0_8px_24px_-6px_rgba(24,119,242,0.7)]',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/upnexit/?hl=en',
    Icon: Instagram,
    bg: 'bg-[linear-gradient(135deg,#feda75_0%,#fa7e1e_25%,#d62976_55%,#962fbf_80%,#4f5bd5_100%)]',
    ring: 'hover:shadow-[0_8px_24px_-6px_rgba(214,41,118,0.7)]',
  },
  {
    label: 'LinkedIn',
    href: '#',
    Icon: Linkedin,
    bg: 'bg-[#0A66C2]',
    ring: 'hover:shadow-[0_8px_24px_-6px_rgba(10,102,194,0.7)]',
  },
  {
    label: 'TikTok',
    href: '#',
    Icon: TikTokIcon,
    bg: 'bg-[#010101] relative',
    ring: 'hover:shadow-[0_8px_24px_-6px_rgba(37,244,238,0.6)]',
    tiktok: true,
  },
];

const Footer = () => {
  const { t, lang } = useLanguage();
  const logoUrl = useLogoUrl();
  const { get } = useSiteSettings();
  const companyName = get('company_name', 'Upnex It');

  return (
    <footer className="gradient-dark text-white relative overflow-hidden pb-20 lg:pb-0">
      {/* Seamless fade from page gradient into footer */}
      <div aria-hidden className="absolute inset-x-0 -top-16 h-16 bg-gradient-to-b from-transparent to-[hsl(150_45%_10%)] pointer-events-none" />
      {/* Gold top accent ribbon */}
      <div className="h-[3px] bg-gradient-to-r from-secondary via-secondary/70 to-primary" />
      {/* Soft glowing orbs for depth */}
      <div aria-hidden className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 py-10 md:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={logoUrl} alt={`${companyName} Logo`} className="w-9 h-9 rounded-xl object-contain" />
              <span className="text-xl font-extrabold tracking-tight">{companyName}</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed mb-6 max-w-xs">{t.footer.desc}</p>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Upnex It on ${s.label}`}
                  className={`relative w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-0.5 ${s.ring} ring-1 ring-white/15`}
                >
                  {s.tiktok && (
                    <>
                      <span aria-hidden className="absolute inset-0 rounded-xl translate-x-[1.5px] translate-y-[1.5px] bg-[#25F4EE] mix-blend-screen opacity-70" />
                      <span aria-hidden className="absolute inset-0 rounded-xl -translate-x-[1.5px] -translate-y-[1.5px] bg-[#FE2C55] mix-blend-screen opacity-70" />
                    </>
                  )}
                  <s.Icon className="h-[18px] w-[18px] relative z-10" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links + Contact side by side on mobile */}
          <div className="grid grid-cols-2 gap-6 sm:contents">
            {/* Quick Links */}
            <div className="rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] p-5">
              <h4 className="font-bold mb-4 text-white tracking-wide text-sm uppercase">{t.footer.quickLinks}</h4>
              <div className="space-y-3">
                {[
                  { label: t.nav.home, href: '/' },
                  { label: t.nav.services, href: '/services' },
                  { label: t.nav.about, href: '/about' },
                  { label: t.nav.contact, href: '/contact' },
                ].map((l) => (
                  <Link key={l.href} to={l.href} className="flex items-center gap-1.5 text-sm text-white/85 hover:text-white hover:translate-x-1 transition-all duration-200 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] p-5">
              <h4 className="font-bold mb-4 text-white tracking-wide text-sm uppercase">{t.footer.contactInfo}</h4>
              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-2 text-white/85">
                  <Mail className="h-3.5 w-3.5 text-secondary shrink-0" />
                  upnex360@gmail.com
                </p>
                <p className="flex items-center gap-2 text-white/85">
                  <Phone className="h-3.5 w-3.5 text-secondary shrink-0" />
                  +880 1628112731
                </p>
                <p className="flex items-center gap-2 text-white/85">
                  <MapPin className="h-3.5 w-3.5 text-secondary shrink-0" />
                  সাপাহার, নওগাঁ, বাংলাদেশ
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] p-5">
            <h4 className="font-bold mb-3 text-white tracking-wide text-sm uppercase">Newsletter</h4>
            <p className="text-sm text-white/85 mb-4 leading-relaxed">Stay updated with our latest news.</p>
            <div className="flex gap-2">
              <label htmlFor="footer-newsletter-email" className="sr-only">Email address for newsletter</label>
              <input
                id="footer-newsletter-email"
                type="email"
                placeholder="Email"
                aria-label="Email address for newsletter"
                className="flex-1 h-10 px-4 rounded-lg bg-white/10 border border-white/25 text-sm text-white placeholder:text-white/70 focus:outline-none focus:border-secondary focus:bg-white/[0.12] transition-all"
              />
              <button type="submit" aria-label="Subscribe to newsletter" className="h-10 px-4 rounded-lg gradient-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright - hidden on mobile, visible on desktop */}
        <div className="hidden sm:flex mt-12 pt-8 border-t border-white/10 flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/75">
            © {new Date().getFullYear()} Upnex It. {t.footer.rights}.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="text-xs text-white/75 hover:text-white transition-colors">
              {lang === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
            </Link>
            <Link to="/terms-of-service" className="text-xs text-white/75 hover:text-white transition-colors">
              {lang === 'bn' ? 'শর্তাবলী' : 'Terms of Service'}
            </Link>
            <span className="text-xs text-white/80 flex items-center gap-1">
              Made in <span className="text-primary font-bold text-sm">Upnex It</span>
            </span>
          </div>
        </div>

        {/* SEO: local service-area text (hidden visually, crawler-friendly) */}
        <div className="sr-only">
          <p>
            Upnex It — best software &amp; IT company in Naogaon, Bangladesh. Custom software,
            school &amp; hospital management, ERP, website &amp; mobile app development serving
            Naogaon Sadar, Atrai, Badalgachhi, Dhamoirhat, Manda, Mahadebpur, Niamatpur,
            Patnitala, Porsha, Raninagar &amp; Sapahar.
          </p>
          <p className="mt-1" lang="bn">
            নওগাঁর সেরা আইটি ও সফটওয়্যার প্রতিষ্ঠান — নওগাঁ সদর, আত্রাই, বদলগাছী, ধামইরহাট,
            মান্দা, মহাদেবপুর, নিয়ামতপুর, পত্নীতলা, পোরশা, রাণীনগর ও সাপাহার সহ সারা
            বাংলাদেশে কাস্টম সফটওয়্যার, ওয়েবসাইট ও মোবাইল অ্যাপ ডেভেলপমেন্ট সেবা।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
