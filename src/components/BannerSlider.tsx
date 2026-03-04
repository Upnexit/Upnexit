import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const bannerSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&h=500&fit=crop',
    titleBn: 'আধুনিক সফটওয়্যার সলিউশন',
    titleEn: 'Modern Software Solutions',
    descBn: 'আপনার ব্যবসার জন্য কাস্টম সফটওয়্যার তৈরি করি',
    descEn: 'We build custom software for your business',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&h=500&fit=crop',
    titleBn: 'স্কুল ম্যানেজমেন্ট সিস্টেম',
    titleEn: 'School Management System',
    descBn: 'শিক্ষা প্রতিষ্ঠান পরিচালনা এখন আরও সহজ',
    descEn: 'Managing educational institutions made easier',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&h=500&fit=crop',
    titleBn: 'হসপিটাল ম্যানেজমেন্ট সিস্টেম',
    titleEn: 'Hospital Management System',
    descBn: 'স্বাস্থ্যসেবা ডিজিটাইজেশনে আমরা পাশে আছি',
    descEn: 'Digitizing healthcare with smart solutions',
  },
];

const BannerSlider = () => {
  const { lang } = useLanguage();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % bannerSlides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = bannerSlides[current];

  return (
    <section className="relative bg-muted overflow-hidden">
      <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={lang === 'bn' ? slide.titleBn : slide.titleEn}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, hsl(150 25% 8% / 0.75), hsl(150 25% 8% / 0.3))' }} />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="max-w-xl"
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">
                    {lang === 'bn' ? slide.titleBn : slide.titleEn}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
                    {lang === 'bn' ? slide.descBn : slide.descEn}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        <button
          onClick={prev}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 transition-colors flex items-center justify-center"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 transition-colors flex items-center justify-center"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {bannerSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerSlider;
