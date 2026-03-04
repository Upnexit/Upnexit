import { useLanguage } from '@/contexts/LanguageContext';
import { Play } from 'lucide-react';

const VideoSection = () => {
  const { lang } = useLanguage();

  return (
    <section className="section-padding bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-6 md:mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-3">
            {lang === 'bn' ? '🎬 ভিডিও' : '🎬 Video'}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            {lang === 'bn' ? 'আমাদের পরিচিতি' : 'Watch Our Introduction'}
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-md mx-auto leading-relaxed">
            {lang === 'bn'
              ? 'আমাদের সেবা সম্পর্কে বিস্তারিত জানতে ভিডিওটি দেখুন'
              : 'Watch this video to learn more about our services'}
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-elevated ring-1 ring-border/30" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Company Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
