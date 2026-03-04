import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gradient mb-3">TechSoft</h3>
            <p className="text-sm text-muted-foreground">{t.footer.desc}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">{t.footer.quickLinks}</h4>
            <div className="space-y-2">
              {[
                { label: t.nav.home, href: '#home' },
                { label: t.nav.services, href: '#services' },
                { label: t.nav.about, href: '#about' },
                { label: t.nav.contact, href: '#contact' },
              ].map((l) => (
                <a key={l.href} href={l.href} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">{t.footer.contactInfo}</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>info@techsoft.com.bd</p>
              <p>+880 1XXX-XXXXXX</p>
              <p>ঢাকা, বাংলাদেশ</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} TechSoft. {t.footer.rights}.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
