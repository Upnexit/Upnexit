import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import footerSketch from '@/assets/footer-sketch.png';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden pb-16 lg:pb-0">
      {/* Background sketch image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(150 25% 10%) 0%, hsl(150 30% 6%) 60%, transparent 100%)' }} />
        <img
          src={footerSketch}
          alt=""
          className="absolute bottom-0 left-0 w-full h-auto object-cover opacity-40"
          style={{ maxHeight: '280px', objectPosition: 'center bottom' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{ background: 'linear-gradient(180deg, hsl(150 25% 10%) 0%, transparent 50%)' }} />
      </div>

      {/* Top accent line */}
      <div className="h-1 gradient-accent relative z-10" />

      <div className="container mx-auto px-4 lg:px-8 py-10 md:py-14 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center">
                <span className="text-white font-black text-lg">T</span>
              </div>
              <span className="text-xl font-extrabold text-white">TechSoft</span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed mb-4 max-w-xs">{t.footer.desc}</p>
            <div className="flex gap-2">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition-all duration-300">
                  <Icon className="h-3.5 w-3.5 text-white/50" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-3 text-sm text-white/90">{t.footer.quickLinks}</h4>
            <div className="space-y-2">
              {[
                { label: t.nav.home, href: '/' },
                { label: t.nav.services, href: '/services' },
                { label: t.nav.about, href: '/about' },
                { label: t.nav.contact, href: '/contact' },
              ].map((l) => (
                <Link key={l.href} to={l.href} className="flex items-center gap-1.5 text-xs text-white/45 hover:text-primary transition-colors group">
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-3 text-sm text-white/90">{t.footer.contactInfo}</h4>
            <div className="space-y-2.5">
              {[
                { icon: Mail, text: 'info@techsoft.com.bd' },
                { icon: Phone, text: '+880 1XXX-XXXXXX' },
                { icon: MapPin, text: 'ঢাকা, বাংলাদেশ' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-white/45">
                  <Icon className="h-3.5 w-3.5 text-primary/60 shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-3 text-sm text-white/90">Newsletter</h4>
            <p className="text-xs text-white/45 mb-3">Stay updated with our latest news.</p>
            <div className="flex gap-1.5">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 h-9 px-3 rounded-lg bg-white/5 border border-white/8 text-xs text-white placeholder:text-white/25 focus:outline-none focus:border-primary/40 transition-colors"
              />
              <button className="h-9 w-9 shrink-0 rounded-lg gradient-accent text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-white/35">
            © {new Date().getFullYear()} TechSoft. {t.footer.rights}.
          </p>
          <div className="flex items-center gap-1 text-[10px] text-white/35">
            Made with <span className="text-primary mx-0.5">♥</span> in Bangladesh
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
