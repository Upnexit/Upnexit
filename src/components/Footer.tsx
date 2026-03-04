import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-3">
              <span className="text-primary">Tech</span>Soft
            </h3>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">{t.footer.desc}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary">{t.footer.quickLinks}</h4>
            <div className="space-y-2.5">
              {[
                { label: t.nav.home, href: '#home' },
                { label: t.nav.services, href: '#services' },
                { label: t.nav.about, href: '#about' },
                { label: t.nav.contact, href: '#contact' },
              ].map((l) => (
                <a key={l.href} href={l.href} className="block text-sm text-primary-foreground/70 hover:text-primary transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary">{t.footer.contactInfo}</h4>
            <div className="space-y-2.5 text-sm text-primary-foreground/70">
              <p>info@techsoft.com.bd</p>
              <p>+880 1XXX-XXXXXX</p>
              <p>ঢাকা, বাংলাদেশ</p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} TechSoft. {t.footer.rights}.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
