import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import footerSketch from '@/assets/footer-sketch.png';

const CloudSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 80" className={className} fill="currentColor">
    <ellipse cx="60" cy="50" rx="50" ry="20" />
    <ellipse cx="90" cy="40" rx="40" ry="18" />
    <ellipse cx="130" cy="48" rx="45" ry="18" />
    <ellipse cx="100" cy="35" rx="30" ry="15" />
  </svg>
);

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden pb-14 lg:pb-0">
      {/* Background sketch image - full coverage */}
      <div className="absolute inset-0">
        <img
          src={footerSketch}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Animated clouds */}
      <CloudSVG className="absolute top-6 text-white/10 w-32 h-12 animate-[float-cloud_30s_linear_infinite] z-[1]" />
      <CloudSVG className="absolute top-16 text-white/15 w-24 h-10 animate-[float-cloud_40s_linear_8s_infinite] z-[1]" />
      <CloudSVG className="absolute top-3 text-white/[0.07] w-40 h-14 animate-[float-cloud_25s_linear_15s_infinite] z-[1]" />

      {/* Top accent line */}
      <div className="h-1 gradient-accent relative z-10" />

      <div className="container mx-auto px-4 lg:px-8 py-8 md:py-10 relative z-10">
        {/* Content area with transparent dark backdrop */}
        <div className="rounded-2xl bg-[hsl(150_20%_8%/0.8)] backdrop-blur-md p-6 md:p-8 border border-white/5">
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
                  <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition-all duration-300">
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
                  className="flex-1 h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/25 focus:outline-none focus:border-primary/40 transition-colors"
                />
                <button className="h-9 w-9 shrink-0 rounded-lg gradient-accent text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright - minimal gap */}
        <div className="mt-3 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-white/50 drop-shadow-sm">
            © {new Date().getFullYear()} TechSoft. {t.footer.rights}.
          </p>
          <div className="flex items-center gap-1 text-[10px] text-white/50 drop-shadow-sm">
            Made with <span className="text-primary mx-0.5">♥</span> in Bangladesh
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
