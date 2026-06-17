import { useLanguage } from '@/contexts/LanguageContext';
import { Play } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const VideoSection = () => {
  const { lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [loadIframe, setLoadIframe] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="video-section" ref={sectionRef}>
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
            {isVisible && !loadIframe ? (
              <button
                onClick={() => setLoadIframe(true)}
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center group cursor-pointer"
                aria-label="Play video"
              >
                {/* YouTube thumbnail as lightweight image */}
                <img
                  src="https://img.youtube.com/vi/GuXDGUQbawI/hqdefault.jpg"
                  alt="Video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-7 h-7 md:w-9 md:h-9 text-primary-foreground ml-1" />
                </div>
              </button>
            ) : loadIframe ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/GuXDGUQbawI?autoplay=1"
                title="Company Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-muted animate-pulse" />
            )}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default VideoSection;
