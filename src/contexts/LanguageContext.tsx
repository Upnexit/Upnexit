import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ThreeDotsLoader } from '@/components/ui/3-dots-loader';

type Lang = 'bn' | 'en';
const translations = {
  bn: {
    nav: { home: 'হোম', services: 'সেবাসমূহ', about: 'আমাদের সম্পর্কে', contact: 'যোগাযোগ', portfolio: 'পোর্টফোলিও' },
    hero: {
      badge: 'আপনার ব্যবসার ডিজিটাল সমাধান',
      title1: 'কাস্টম সফটওয়্যার',
      title2: 'সলিউশন',
      subtitle: 'আমরা আপনার প্রতিষ্ঠানের জন্য স্কুল ম্যানেজমেন্ট, হসপিটাল ম্যানেজমেন্ট সহ যেকোনো কাস্টম সফটওয়্যার তৈরি করে থাকি।',
      cta1: 'ফ্রি কনসালটেশন',
      cta2: 'আমাদের সেবা দেখুন',
    },
    services: {
      title: 'আমাদের সেবাসমূহ',
      subtitle: 'আমরা বিভিন্ন ধরনের সফটওয়্যার সলিউশন প্রদান করি',
      school: { title: 'স্কুল ম্যানেজমেন্ট সফটওয়্যার', desc: 'ছাত্র-ছাত্রী, শিক্ষক, পরীক্ষা, ফলাফল, ফি সবকিছু একটি প্ল্যাটফর্মে পরিচালনা করুন।' },
      hospital: { title: 'হসপিটাল ম্যানেজমেন্ট সফটওয়্যার', desc: 'রোগী, ডাক্তার, অ্যাপয়েন্টমেন্ট, বিলিং — সবকিছু সহজে ম্যানেজ করুন।' },
      custom: { title: 'কাস্টম সফটওয়্যার ডেভেলপমেন্ট', desc: 'আপনার ব্যবসার চাহিদা অনুযায়ী সম্পূর্ণ কাস্টমাইজড সফটওয়্যার তৈরি করি।' },
      web: { title: 'ওয়েব অ্যাপ্লিকেশন', desc: 'আধুনিক ও রেসপন্সিভ ওয়েব অ্যাপ্লিকেশন যা যেকোনো ডিভাইসে কাজ করে।' },
    },
    stats: {
      clients: 'সন্তুষ্ট ক্লায়েন্ট',
      projects: 'সম্পন্ন প্রজেক্ট',
      years: 'বছরের অভিজ্ঞতা',
      support: '২৪/৭ সাপোর্ট',
    },
    about: {
      title: 'আমাদের সম্পর্কে',
      p1: 'আমরা একটি অভিজ্ঞ সফটওয়্যার ডেভেলপমেন্ট টিম যারা বাংলাদেশের বিভিন্ন প্রতিষ্ঠানের জন্য মানসম্মত সফটওয়্যার সলিউশন প্রদান করে আসছি।',
      p2: 'আমাদের লক্ষ্য হলো প্রযুক্তির মাধ্যমে আপনার ব্যবসাকে আরও কার্যকর ও লাভজনক করে তোলা।',
      whyUs: 'কেন আমাদের বেছে নেবেন?',
      reasons: ['অভিজ্ঞ ডেভেলপার টিম', 'সাশ্রয়ী মূল্য', 'সময়মতো ডেলিভারি', 'ফ্রি আফটার-সেলস সাপোর্ট'],
    },
    contact: {
      title: 'যোগাযোগ করুন',
      subtitle: 'আপনার প্রজেক্ট নিয়ে আলোচনা করতে আমাদের সাথে যোগাযোগ করুন',
      name: 'আপনার নাম',
      email: 'ইমেইল',
      phone: 'ফোন নম্বর',
      message: 'আপনার বার্তা',
      send: 'বার্তা পাঠান',
    },
    footer: {
      desc: 'আমরা মানসম্মত কাস্টম সফটওয়্যার সলিউশন প্রদান করি।',
      quickLinks: 'দ্রুত লিংক',
      contactInfo: 'যোগাযোগের তথ্য',
      rights: 'সর্বস্বত্ব সংরক্ষিত',
    },
  },
  en: {
    nav: { home: 'Home', services: 'Services', about: 'About Us', contact: 'Contact', portfolio: 'Portfolio' },
    hero: {
      badge: 'Digital Solutions for Your Business',
      title1: 'Custom Software',
      title2: 'Solutions',
      subtitle: 'We build custom software solutions including School Management, Hospital Management, and more for your organization.',
      cta1: 'Free Consultation',
      cta2: 'View Our Services',
    },
    services: {
      title: 'Our Services',
      subtitle: 'We provide various types of software solutions',
      school: { title: 'School Management Software', desc: 'Manage students, teachers, exams, results, and fees all in one platform.' },
      hospital: { title: 'Hospital Management Software', desc: 'Easily manage patients, doctors, appointments, and billing.' },
      custom: { title: 'Custom Software Development', desc: 'Fully customized software built according to your business needs.' },
      web: { title: 'Web Applications', desc: 'Modern & responsive web applications that work on any device.' },
    },
    stats: {
      clients: 'Happy Clients',
      projects: 'Completed Projects',
      years: 'Years Experience',
      support: '24/7 Support',
    },
    about: {
      title: 'About Us',
      p1: 'We are an experienced software development team providing quality software solutions for various organizations in Bangladesh.',
      p2: 'Our goal is to make your business more efficient and profitable through technology.',
      whyUs: 'Why Choose Us?',
      reasons: ['Experienced Dev Team', 'Affordable Pricing', 'On-time Delivery', 'Free After-Sales Support'],
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Get in touch with us to discuss your project',
      name: 'Your Name',
      email: 'Email',
      phone: 'Phone Number',
      message: 'Your Message',
      send: 'Send Message',
    },
    footer: {
      desc: 'We provide quality custom software solutions.',
      quickLinks: 'Quick Links',
      contactInfo: 'Contact Info',
      rights: 'All rights reserved',
    },
  },
};

type Translations = typeof translations.bn;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('bn');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('preferred_lang') as Lang | null;
    if (saved) {
      setLang(saved);
      setIsReady(true);
      return;
    }

    const detect = async () => {
      try {
        const { data } = await supabase.functions.invoke('detect-country');
        const code = data?.country_code;
        const detectedLang: Lang = code === 'BD' ? 'bn' : 'en';
        setLang(detectedLang);
      } catch {
        // Default to 'bn' on failure
      } finally {
        setIsReady(true);
      }
    };
    detect();
  }, []);

  const handleSetLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem('preferred_lang', newLang);
  };

  const t = translations[lang];

  // Show a minimal loading screen until language is detected
  if (!isReady) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
        <ThreeDotsLoader />
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
