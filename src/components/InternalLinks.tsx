import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

interface InternalLinksProps {
  exclude?: string; // current page path to exclude
}

const InternalLinks = ({ exclude }: InternalLinksProps) => {
  const { lang } = useLanguage();

  const links = [
    { path: '/', label: lang === 'bn' ? 'হোম' : 'Home' },
    { path: '/services', label: lang === 'bn' ? 'সেবাসমূহ' : 'Services' },
    { path: '/portfolio', label: lang === 'bn' ? 'পোর্টফোলিও' : 'Portfolio' },
    { path: '/blog', label: lang === 'bn' ? 'ব্লগ' : 'Blog' },
    { path: '/about', label: lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us' },
    { path: '/contact', label: lang === 'bn' ? 'যোগাযোগ' : 'Contact' },
    { path: '/consultation', label: lang === 'bn' ? 'ফ্রি কনসালটেশন' : 'Free Consultation' },
  ].filter(l => l.path !== exclude);

  return (
    <nav aria-label="Related pages" className="py-8 md:py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <h3 className="text-lg font-bold text-foreground mb-4">
          {lang === 'bn' ? 'আরও দেখুন' : 'Explore More'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-muted hover:bg-primary/10 hover:text-primary border border-border hover:border-primary/20 transition-all"
            >
              {link.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default InternalLinks;
