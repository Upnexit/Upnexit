import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t, lang } = useLanguage();

  return (
    <footer className="gradient-dark text-white relative overflow-hidden pb-20 lg:pb-0">
      {/* Top accent line */}
      <div className="h-1 gradient-accent" />

      
      <div className="container mx-auto px-4 lg:px-8 py-10 md:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Upnex It Logo" className="w-9 h-9 rounded-xl object-contain" />
              <span className="text-xl font-extrabold tracking-tight">Upnex It</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed mb-6 max-w-xs">{t.footer.desc}</p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: 'https://www.facebook.com/share/1BGxtCwBud/' },
                { Icon: Twitter, href: '#' },
                { Icon: Linkedin, href: '#' },
                { Icon: Instagram, href: 'https://www.instagram.com/upnexit/?hl=en' },
              ].map((item, i) => {
                const labels = ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'];
                return (
                  <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`Upnex It on ${labels[i]}`} className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center hover:bg-accent/20 hover:border-accent/40 transition-all duration-300 group">
                    <item.Icon className="h-4 w-4 text-white/85 group-hover:text-accent transition-colors duration-300" />
                  </a>
                );
              })}
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
      </div>
    </footer>
  );
};

export default Footer;
