import { useLanguage } from '@/contexts/LanguageContext';
import { Play } from 'lucide-react';

const VideoSection = () => {
  const { lang } = useLanguage();

  return (
    <section className="relative bg-muted/50">
      {/* Top decorative wave separator */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%]">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 60L60 52C120 44 240 28 360 22C480 16 600 20 720 26C840 32 960 40 1080 42C1200 44 1320 40 1380 38L1440 36V60H0Z" fill="hsl(140 8% 96% / 0.5)" />
        </svg>
      </div>
      <div className="section-padding">
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
        <div className="max-w-3xl lg:max-w-6xl mx-auto">
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-elevated ring-1 ring-border/30" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/GuXDGUQbawI"
              title="Company Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default VideoSection;
