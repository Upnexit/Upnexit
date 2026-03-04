import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative pb-14 lg:pb-0">
      <div className="bg-[hsl(0_0%_18%)] relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Top section - Brand + Newsletter CTA */}
          <div className="py-12 md:py-16 border-b border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Left - Brand */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
                    <span className="text-white font-black text-xl">T</span>
                  </div>
                  <span className="text-2xl font-extrabold text-white">TechSoft</span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed max-w-sm">
                  {t.footer.desc}
                </p>
              </div>

              {/* Right - Newsletter CTA */}
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Newsletter</p>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6">
                  Stay Updated<br />With Us
                </h3>
                <div className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    placeholder="Enter your email..."
                    className="flex-1 h-12 px-4 rounded-full bg-white/10 border border-white/15 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  <button className="h-12 w-12 shrink-0 rounded-full gradient-accent text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-glow">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="py-10 md:py-14">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              {/* Quick Links */}
              <div>
                <h4 className="font-bold mb-5 text-base text-white">{t.footer.quickLinks}</h4>
                <div className="space-y-3">
                  {[
                    { label: t.nav.home, href: '/' },
                    { label: t.nav.services, href: '/services' },
                    { label: t.nav.about, href: '/about' },
                    { label: t.nav.contact, href: '/contact' },
                  ].map((l) => (
                    <Link key={l.href} to={l.href} className="block text-sm text-white/60 hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-bold mb-5 text-base text-white">{t.footer.contactInfo}</h4>
                <div className="space-y-3">
                  <p className="text-sm text-white/60">info@techsoft.com.bd</p>
                  <p className="text-sm text-white/60">+880 1XXX-XXXXXX</p>
                  <p className="text-sm text-white/60">ঢাকা, বাংলাদেশ</p>
                </div>
              </div>

              {/* Social */}
              <div>
                <h4 className="font-bold mb-5 text-base text-white">Social</h4>
                <div className="space-y-3">
                  {['LinkedIn', 'Twitter', 'Facebook', 'Instagram'].map((s) => (
                    <a key={s} href="#" className="block text-sm text-white/60 hover:text-primary transition-colors">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 relative z-10">
          <div className="container mx-auto px-4 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} TechSoft. {t.footer.rights}.
            </p>
            <div className="flex items-center gap-4 text-xs text-white/50">
              <a href="#" className="hover:text-white/80 transition-colors">Support</a>
              <a href="#" className="hover:text-white/80 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/80 transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
