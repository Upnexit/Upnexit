import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="gradient-dark text-white relative overflow-hidden pb-20 lg:pb-0">
      {/* Top accent line */}
      <div className="h-1 gradient-accent" />
      
      <div className="container mx-auto px-4 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center">
                <span className="text-white font-black text-lg">T</span>
              </div>
              <span className="text-xl font-extrabold">TechSoft</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xs">{t.footer.desc}</p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-colors">
                  <Icon className="h-4 w-4 text-white/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links + Contact side by side on mobile */}
          <div className="grid grid-cols-2 gap-6 sm:contents">
            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4 text-white/90">{t.footer.quickLinks}</h4>
              <div className="space-y-2.5">
                {[
                  { label: t.nav.home, href: '/' },
                  { label: t.nav.services, href: '/services' },
                  { label: t.nav.about, href: '/about' },
                  { label: t.nav.contact, href: '/contact' },
                ].map((l) => (
                  <Link key={l.href} to={l.href} className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors group">
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4 text-white/90">{t.footer.contactInfo}</h4>
              <div className="space-y-2.5 text-sm text-white/50">
                <p>info@techsoft.com.bd</p>
                <p>+880 1XXX-XXXXXX</p>
                <p>ঢাকা, বাংলাদেশ</p>
              </div>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div>
            <h4 className="font-bold mb-4 text-white/90">Newsletter</h4>
            <p className="text-sm text-white/50 mb-4">Stay updated with our latest news.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 h-10 px-4 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/25"
              />
              <button className="h-10 px-4 rounded-lg gradient-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright - hidden on mobile, visible on desktop */}
        <div className="hidden sm:flex mt-12 pt-8 border-t border-white/10 flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} TechSoft. {t.footer.rights}.
          </p>
          <div className="flex items-center gap-1 text-xs text-white/40">
            Made with <span className="text-destructive mx-0.5">♥</span> in Bangladesh
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
