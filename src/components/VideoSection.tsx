import { useLanguage } from '@/contexts/LanguageContext';

const VideoSection = () => {
  const { lang } = useLanguage();

  return (
    <section className="section-padding bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            {lang === 'bn' ? 'আমাদের পরিচিতি' : 'Watch Our Introduction'}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            {lang === 'bn'
              ? 'আমাদের সেবা সম্পর্কে বিস্তারিত জানতে ভিডিওটি দেখুন'
              : 'Watch this video to learn more about our services'}
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full rounded-3xl overflow-hidden shadow-elevated" style={{ paddingBottom: '56.25%' }}>
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
