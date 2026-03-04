import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden pb-16 lg:pb-0" style={{ background: 'linear-gradient(180deg, hsl(150 25% 10%) 0%, hsl(150 30% 6%) 100%)' }}>
      {/* Top accent line */}
      <div className="h-1 gradient-accent" />

      <div className="container mx-auto px-4 lg:px-8 py-10 md:py-14">
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
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Linkedin, href: '#' },
                { Icon: Instagram, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition-all duration-300">
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

          {/* Newsletter CTA */}
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

        {/* Divider + Copyright */}
        <div className="mt-8 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-white/35">
            © {new Date().getFullYear()} TechSoft. {t.footer.rights}.
          </p>
          <div className="flex items-center gap-1 text-[10px] text-white/35">
            Made with <span className="text-primary mx-0.5">♥</span> in Bangladesh
          </div>
        </div>
      </div>

      {/* Bottom decorative sketch - circuit board / tech pattern */}
      <div className="relative w-full h-20 md:h-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, transparent 0%, hsl(145 63% 32% / 0.06) 100%)' }}>
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Circuit-style horizontal lines */}
          <line x1="0" y1="30" x2="200" y2="30" stroke="hsl(145 63% 42%)" strokeWidth="0.8" opacity="0.15" />
          <line x1="250" y1="30" x2="500" y2="30" stroke="hsl(145 63% 42%)" strokeWidth="0.8" opacity="0.1" />
          <line x1="0" y1="60" x2="350" y2="60" stroke="hsl(145 63% 42%)" strokeWidth="0.8" opacity="0.12" />
          <line x1="400" y1="60" x2="700" y2="60" stroke="hsl(145 63% 42%)" strokeWidth="0.8" opacity="0.08" />
          <line x1="900" y1="45" x2="1200" y2="45" stroke="hsl(145 63% 42%)" strokeWidth="0.8" opacity="0.1" />
          <line x1="1250" y1="45" x2="1440" y2="45" stroke="hsl(145 63% 42%)" strokeWidth="0.8" opacity="0.12" />
          <line x1="600" y1="80" x2="1000" y2="80" stroke="hsl(145 63% 42%)" strokeWidth="0.8" opacity="0.08" />
          <line x1="1050" y1="80" x2="1440" y2="80" stroke="hsl(145 63% 42%)" strokeWidth="0.8" opacity="0.1" />

          {/* Vertical connectors */}
          <line x1="200" y1="25" x2="200" y2="60" stroke="hsl(145 63% 42%)" strokeWidth="0.8" opacity="0.12" />
          <line x1="500" y1="30" x2="500" y2="55" stroke="hsl(145 63% 42%)" strokeWidth="0.8" opacity="0.1" />
          <line x1="700" y1="55" x2="700" y2="80" stroke="hsl(145 63% 42%)" strokeWidth="0.8" opacity="0.08" />
          <line x1="1200" y1="40" x2="1200" y2="80" stroke="hsl(145 63% 42%)" strokeWidth="0.8" opacity="0.1" />
          <line x1="350" y1="58" x2="350" y2="95" stroke="hsl(145 63% 42%)" strokeWidth="0.8" opacity="0.08" />
          <line x1="900" y1="42" x2="900" y2="75" stroke="hsl(145 63% 42%)" strokeWidth="0.8" opacity="0.1" />

          {/* Junction nodes / dots */}
          <circle cx="200" cy="30" r="3" fill="hsl(145 63% 42%)" opacity="0.2" />
          <circle cx="200" cy="60" r="2.5" fill="hsl(145 63% 42%)" opacity="0.15" />
          <circle cx="500" cy="30" r="2.5" fill="hsl(145 63% 42%)" opacity="0.15" />
          <circle cx="500" cy="55" r="2" fill="hsl(46 92% 55%)" opacity="0.2" />
          <circle cx="700" cy="60" r="3" fill="hsl(145 63% 42%)" opacity="0.18" />
          <circle cx="700" cy="80" r="2" fill="hsl(145 63% 42%)" opacity="0.12" />
          <circle cx="900" cy="45" r="3" fill="hsl(46 92% 55%)" opacity="0.2" />
          <circle cx="1200" cy="45" r="2.5" fill="hsl(145 63% 42%)" opacity="0.15" />
          <circle cx="1200" cy="80" r="3" fill="hsl(145 63% 42%)" opacity="0.2" />
          <circle cx="350" cy="60" r="2" fill="hsl(145 63% 42%)" opacity="0.12" />
          <circle cx="350" cy="95" r="2.5" fill="hsl(46 92% 55%)" opacity="0.15" />
          <circle cx="900" cy="75" r="2" fill="hsl(145 63% 42%)" opacity="0.12" />

          {/* Small chip/component shapes */}
          <rect x="240" y="26" width="12" height="8" rx="1.5" stroke="hsl(145 63% 42%)" strokeWidth="0.6" fill="none" opacity="0.15" />
          <rect x="1100" y="41" width="14" height="8" rx="1.5" stroke="hsl(145 63% 42%)" strokeWidth="0.6" fill="none" opacity="0.12" />
          <rect x="800" y="76" width="10" height="8" rx="1.5" stroke="hsl(46 92% 55%)" strokeWidth="0.6" fill="none" opacity="0.15" />
          <rect x="440" y="56" width="12" height="8" rx="1.5" stroke="hsl(145 63% 42%)" strokeWidth="0.6" fill="none" opacity="0.1" />

          {/* Diagonal trace lines */}
          <line x1="250" y1="30" x2="280" y2="50" stroke="hsl(145 63% 42%)" strokeWidth="0.6" opacity="0.1" />
          <line x1="1100" y1="45" x2="1130" y2="70" stroke="hsl(145 63% 42%)" strokeWidth="0.6" opacity="0.08" />
          <line x1="600" y1="80" x2="630" y2="100" stroke="hsl(145 63% 42%)" strokeWidth="0.6" opacity="0.08" />

          {/* Subtle glow orbs */}
          <circle cx="200" cy="30" r="12" fill="hsl(145 63% 42%)" opacity="0.04" />
          <circle cx="900" cy="45" r="15" fill="hsl(46 92% 55%)" opacity="0.04" />
          <circle cx="1200" cy="80" r="10" fill="hsl(145 63% 42%)" opacity="0.03" />
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
