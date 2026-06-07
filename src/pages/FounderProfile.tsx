import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, MapPin, Briefcase, Calendar, Award, Code2, Mail, Phone, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InternalLinks from '@/components/InternalLinks';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

type FounderInfo = {
  slug: string;
  name: string;
  nameBn: string;
  role: string;
  roleBn: string;
  image: string;
  shortBio: string;
  shortBioBn: string;
  address: string;
  addressBn: string;
  addressCurrent?: string;
  addressCurrentBn?: string;
  roleDetail?: string;
  roleDetailBn?: string;
  education: { year: string; title: string; titleBn: string; place: string; placeBn: string }[];
  educationBadge?: string;
  educationBadgeBn?: string;
  expertise: string[];
  expertiseBn: string[];
  story: string;
  storyBn: string;
  email?: string;
  phone?: string;
};

const FOUNDERS: Record<string, FounderInfo> = {
  'mehedi-hasan': {
    slug: 'mehedi-hasan',
    name: 'MD. Mehedi Hasan',
    nameBn: 'এম.ডি. মেহেদী হাসান',
    role: 'CEO & Founder, Upnex It',
    roleBn: 'সিইও ও প্রতিষ্ঠাতা, আপনেক্স আইটি',
    image: 'https://jbkzetqirqmyuijkfhvy.supabase.co/storage/v1/object/public/team-photos/1772611825155.jpeg',
    shortBio:
      'Skilled Electrical Engineer, IT expert and server specialist. Co-founder & CEO of Upnex It — leading custom software, school & hospital management solutions across Bangladesh.',
    shortBioBn:
      'দক্ষ ইলেকট্রিক্যাল ইঞ্জিনিয়ার, আইটি বিশেষজ্ঞ এবং সার্ভার এক্সপার্ট। আপনেক্স আইটি-এর সহ-প্রতিষ্ঠাতা ও সিইও।',
    address: 'Sonadanga, Gopalpur, Sapahar Upazila, Naogaon District, Rajshahi Division, Bangladesh',
    addressBn: 'সোনাডাঙ্গা, গোপালপুর, সাপাহার উপজেলা, নওগাঁ জেলা, রাজশাহী বিভাগ, বাংলাদেশ',
    addressCurrent: 'Rajshahi City, Rajshahi Division, Bangladesh (currently studying & working from here)',
    addressCurrentBn: 'রাজশাহী শহর, রাজশাহী বিভাগ, বাংলাদেশ (বর্তমানে এখান থেকেই পড়াশোনা ও কাজ পরিচালনা)',
    roleDetail:
      'As the CEO & Founder of Upnex It, MD. Mehedi Hasan leads end-to-end product strategy, technical architecture and business operations. He directly oversees custom software development, school & hospital management systems, secure server and cloud infrastructure, client consulting and the engineering team — driving the company\'s mission to deliver world-class IT solutions across Bangladesh.',
    roleDetailBn:
      'আপনেক্স আইটি-এর সিইও ও প্রতিষ্ঠাতা হিসেবে এম.ডি. মেহেদী হাসান প্রোডাক্ট স্ট্র্যাটেজি, টেকনিক্যাল আর্কিটেকচার এবং ব্যবসায়িক পরিচালনার সম্পূর্ণ দায়িত্ব পালন করেন। তিনি কাস্টম সফটওয়্যার ডেভেলপমেন্ট, স্কুল ও হাসপাতাল ম্যানেজমেন্ট সিস্টেম, সিকিউর সার্ভার ও ক্লাউড ইনফ্রাস্ট্রাকচার, ক্লায়েন্ট কনসাল্টিং এবং পুরো ইঞ্জিনিয়ারিং টিমকে সরাসরি নেতৃত্ব দেন — পুরো বাংলাদেশে বিশ্বমানের আইটি সমাধান পৌঁছে দেওয়ার লক্ষ্যে।',
    educationBadge: 'Diploma in EEE (ongoing)',
    educationBadgeBn: 'ডিপ্লোমা EEE (চলমান)',
    education: [
      {
        year: 'Present',
        title: 'Diploma in Electrical Engineering (Ongoing)',
        titleBn: 'ডিপ্লোমা ইন ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং (চলমান)',
        place: 'Bangladesh Polytechnic Institute, Rajshahi',
        placeBn: 'বাংলাদেশ পলিটেকনিক ইনস্টিটিউট, রাজশাহী',
      },
      {
        year: '2025',
        title: 'SSC — Science Group',
        titleBn: 'এসএসসি — বিজ্ঞান বিভাগ',
        place: 'Al Hilal Islami Academy & College, Sapahar, Naogaon',
        placeBn: 'আল হিলাল ইসলামি একাডেমি অ্যান্ড কলেজ, সাপাহার, নওগাঁ',
      },
      {
        year: 'Primary',
        title: 'Primary Education (Foundation)',
        titleBn: 'প্রাথমিক শিক্ষা (হাতেখড়ি)',
        place: 'Sonadanga Sarkarpara Government Primary School, Gopalpur, Sapahar',
        placeBn: 'সোনাডাঙ্গা সরকারপাড়া সরকারি প্রাথমিক বিদ্যালয়, গোপালপুর, সাপাহার',
      },
    ],
    expertise: ['Electrical Engineering', 'Server Management', 'Cloud Infrastructure', 'Custom Software Architecture', 'IT Consulting', 'Team Leadership', 'Entrepreneurship'],
    expertiseBn: ['ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং', 'সার্ভার ম্যানেজমেন্ট', 'ক্লাউড ইনফ্রাস্ট্রাকচার', 'কাস্টম সফটওয়্যার আর্কিটেকচার', 'আইটি কনসাল্টিং', 'টিম লিডারশিপ', 'উদ্যোক্তা'],
    story:
      'MD. Mehedi Hasan was born and raised in Sonadanga, Gopalpur — a small village under Sapahar Upazila of Naogaon District in northern Bangladesh. His learning journey started at Sonadanga Sarkarpara Government Primary School, where his teachers first noticed his unusual curiosity for machines, electronics and computers. From a young age he would dismantle small electrical devices just to understand how they worked, and that simple curiosity slowly grew into a serious passion for technology and problem solving.\n\nHe completed his SSC in 2025 from Al Hilal Islami Academy & College, Sapahar in the Science group with strong results. While still in school, he was already self-learning programming, networking, server administration and digital design through online resources — turning every free hour into practice. Right after SSC he moved to Rajshahi and enrolled in a Diploma in Electrical Engineering at Bangladesh Polytechnic Institute, Rajshahi, where he is currently studying.\n\nAlongside his studies, he co-founded Upnex It with the vision of building a truly Bangladeshi IT brand that delivers world-class custom software, school management systems, hospital management systems, e-commerce platforms, secure cloud and server solutions for businesses and institutions across the country. Today, as CEO & Founder of Upnex It, he leads the technical strategy, server infrastructure, product architecture and the engineering team — combining village-rooted discipline with global engineering standards.',
    storyBn:
      'এম.ডি. মেহেদী হাসানের জন্ম ও বেড়ে ওঠা নওগাঁ জেলার সাপাহার উপজেলার গোপালপুর ইউনিয়নের সোনাডাঙ্গা গ্রামে — উত্তর বাংলাদেশের একটি ছোট্ট গ্রাম। তাঁর শিক্ষাজীবনের হাতেখড়ি হয় সোনাডাঙ্গা সরকারপাড়া সরকারি প্রাথমিক বিদ্যালয় থেকে, যেখানে শিক্ষকরা প্রথম তাঁর যন্ত্রপাতি, ইলেকট্রনিক্স ও কম্পিউটারের প্রতি আলাদা কৌতূহল লক্ষ্য করেন। ছোটবেলা থেকেই তিনি ছোটখাট ইলেকট্রিক ডিভাইস খুলে বুঝতে চাইতেন কীভাবে কাজ করে — এই কৌতূহলই ধীরে ধীরে প্রযুক্তি ও সমস্যা সমাধানের প্রতি গভীর ভালোবাসায় রূপ নেয়।\n\n২০২৫ সালে আল হিলাল ইসলামি একাডেমি অ্যান্ড কলেজ, সাপাহার থেকে বিজ্ঞান বিভাগে এসএসসি সম্পন্ন করেন ভালো ফলাফলসহ। স্কুলে থাকা অবস্থাতেই তিনি প্রোগ্রামিং, নেটওয়ার্কিং, সার্ভার অ্যাডমিনিস্ট্রেশন এবং ডিজিটাল ডিজাইন নিজে নিজে শেখা শুরু করেন — অনলাইন রিসোর্স ব্যবহার করে প্রতিটি অবসর সময়কে অনুশীলনে রূপান্তর করেন। এসএসসি-র পরপরই রাজশাহীতে চলে আসেন এবং বাংলাদেশ পলিটেকনিক ইনস্টিটিউট, রাজশাহী-তে ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং ডিপ্লোমাতে ভর্তি হন, যেখানে বর্তমানে অধ্যয়নরত।\n\nপড়াশোনার পাশাপাশি তিনি আপনেক্স আইটি সহ-প্রতিষ্ঠা করেন এই স্বপ্ন নিয়ে — একটি সত্যিকারের বাংলাদেশি আইটি ব্র্যান্ড গড়ে তোলা, যা পুরো দেশে বিশ্বমানের কাস্টম সফটওয়্যার, স্কুল ম্যানেজমেন্ট সিস্টেম, হাসপাতাল ম্যানেজমেন্ট সিস্টেম, ই-কমার্স প্ল্যাটফর্ম এবং সিকিউর ক্লাউড ও সার্ভার সমাধান পৌঁছে দেবে। বর্তমানে আপনেক্স আইটি-এর সিইও ও প্রতিষ্ঠাতা হিসেবে তিনি টেকনিক্যাল স্ট্র্যাটেজি, সার্ভার ইনফ্রাস্ট্রাকচার, প্রোডাক্ট আর্কিটেকচার এবং সম্পূর্ণ ইঞ্জিনিয়ারিং টিমকে নেতৃত্ব দিচ্ছেন — গ্রামীণ শৃঙ্খলা ও বৈশ্বিক ইঞ্জিনিয়ারিং মান একসঙ্গে মিশিয়ে।',
  },
  'arafat-rahman': {
    slug: 'arafat-rahman',
    name: 'AR. Arafat Rahman',
    nameBn: 'এ.আর. আরাফাত রহমান',
    role: 'Co-Founder & Director, Upnex It',
    roleBn: 'সহ-প্রতিষ্ঠাতা ও পরিচালক, আপনেক্স আইটি',
    image: 'https://jbkzetqirqmyuijkfhvy.supabase.co/storage/v1/object/public/team-photos/1772611974154.jpeg',
    shortBio:
      'Skilled Computer Engineer and UI/UX Designer. Co-founder & Director of Upnex It — leading product design, user experience and strategic direction.',
    shortBioBn:
      'দক্ষ কম্পিউটার ইঞ্জিনিয়ার এবং UI/UX ডিজাইনার। আপনেক্স আইটি-এর সহ-প্রতিষ্ঠাতা ও পরিচালক।',
    address: 'Nidpur, Niamatpur Upazila, Naogaon District, Rajshahi Division, Bangladesh',
    addressBn: 'নিদপুর, নিয়ামতপুর উপজেলা, নওগাঁ জেলা, রাজশাহী বিভাগ, বাংলাদেশ',
    education: [
      {
        year: '2025',
        title: 'SSC (Secondary School Certificate)',
        titleBn: 'এসএসসি (মাধ্যমিক)',
        place: 'Alil Al Islami Academy & College',
        placeBn: 'আলিল আল ইসলামি একাডেমি অ্যান্ড কলেজ',
      },
    ],
    expertise: ['Computer Engineering', 'UI/UX Design', 'Product Strategy', 'Frontend Development', 'Brand Design'],
    expertiseBn: ['কম্পিউটার ইঞ্জিনিয়ারিং', 'UI/UX ডিজাইন', 'প্রোডাক্ট স্ট্র্যাটেজি', 'ফ্রন্টএন্ড ডেভেলপমেন্ট', 'ব্র্যান্ড ডিজাইন'],
    story:
      'AR. Arafat Rahman co-founded Upnex It to craft beautiful, user-friendly digital products. His expertise in computer engineering and design ensures every Upnex It product is both technically robust and a delight to use.',
    storyBn:
      'এ.আর. আরাফাত রহমান আপনেক্স আইটি সহ-প্রতিষ্ঠা করেছেন সুন্দর ও ব্যবহারবান্ধব ডিজিটাল পণ্য তৈরির জন্য। তাঁর কম্পিউটার ইঞ্জিনিয়ারিং ও ডিজাইন দক্ষতা প্রতিটি প্রোডাক্টকে শক্তিশালী ও ব্যবহারে আনন্দদায়ক করে তোলে।',
  },
};

const FounderProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const founder = slug ? FOUNDERS[slug] : undefined;

  if (!founder) return <Navigate to="/about" replace />;

  const isBn = lang === 'bn';
  const name = isBn ? founder.nameBn : founder.name;
  const role = isBn ? founder.roleBn : founder.role;
  const bio = isBn ? founder.shortBioBn : founder.shortBio;
  const address = isBn ? founder.addressBn : founder.address;
  const addressCurrent = isBn ? founder.addressCurrentBn : founder.addressCurrent;
  const roleDetail = isBn ? founder.roleDetailBn : founder.roleDetail;
  const story = isBn ? founder.storyBn : founder.story;
  const expertise = isBn ? founder.expertiseBn : founder.expertise;

  // Per-founder location chip
  const isMehedi = founder.slug === 'mehedi-hasan';
  const portfolioUrl = isMehedi ? 'https://mehedihassan.iam.bd/' : null;
  const locationChip = isMehedi
    ? (isBn ? 'সাপাহার, নওগাঁ' : 'Sapahar, Naogaon')
    : (isBn ? 'নিয়ামতপুর, নওগাঁ' : 'Niamatpur, Naogaon');
  const roleChip = founder.role.includes('CEO')
    ? (isBn ? 'প্রতিষ্ঠানের CEO' : 'CEO of the Company')
    : (isBn ? 'প্রতিষ্ঠানের পরিচালক' : 'Director of the Company');

  // Build rich alternate-name list so name searches in any form hit this page
  const nameVariants = isMehedi
    ? [
        'Mehedi Hasan', 'Mehedi Hassan', 'MD Mehedi Hasan', 'MD. Mehedi Hasan',
        'Md Mehedi Hasan', 'মেহেদী হাসান', 'এম.ডি. মেহেদী হাসান', 'মেহেদি হাসান',
        'Mehedi Hasan Upnex', 'Mehedi Hasan CEO', 'Mehedi Hasan Naogaon',
        'Mehedi Hasan Sapahar', 'Upnex It Founder', 'Upnex It CEO',
      ]
    : [
        'Arafat Rahman', 'AR Arafat Rahman', 'AR. Arafat Rahman',
        'আরাফাত রহমান', 'এ.আর. আরাফাত রহমান', 'Arafat Rahman Upnex',
        'Arafat Rahman Co-founder', 'Arafat Rahman Niamatpur', 'Arafat Rahman Naogaon',
      ];

  const profileUrl = `https://upnexit.pro.bd/about/${founder.slug}`;

  // JSON-LD Person schema – enriched for "name search" ranking
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${profileUrl}#person`,
    name: founder.name,
    givenName: isMehedi ? 'Mehedi' : 'Arafat',
    familyName: isMehedi ? 'Hasan' : 'Rahman',
    additionalName: isMehedi ? 'MD' : 'AR',
    alternateName: nameVariants,
    description: founder.shortBio,
    jobTitle: founder.role,
    image: {
      '@type': 'ImageObject',
      url: founder.image,
      width: 800,
      height: 800,
      caption: `${founder.name} — ${founder.role}`,
    },
    url: profileUrl,
    mainEntityOfPage: profileUrl,
    worksFor: {
      '@type': 'Organization',
      name: 'Upnex It',
      url: 'https://upnexit.pro.bd',
      logo: 'https://upnexit.pro.bd/logo.png',
    },
    birthPlace: isMehedi
      ? { '@type': 'Place', name: 'Sapahar, Naogaon, Bangladesh' }
      : { '@type': 'Place', name: 'Niamatpur, Naogaon, Bangladesh' },
    address: isMehedi ? {
      '@type': 'PostalAddress',
      addressLocality: 'Sapahar',
      addressRegion: 'Naogaon, Rajshahi',
      addressCountry: 'BD',
      streetAddress: 'Sonadanga, Gopalpur, Sapahar Upazila',
    } : {
      '@type': 'PostalAddress',
      addressLocality: 'Niamatpur',
      addressRegion: 'Naogaon, Rajshahi',
      addressCountry: 'BD',
      streetAddress: 'Nidpur, Niamatpur Upazila',
    },
    alumniOf: founder.education.map((e) => ({
      '@type': 'EducationalOrganization',
      name: e.place,
    })),
    knowsAbout: founder.expertise,
    knowsLanguage: ['Bengali', 'English'],
    nationality: { '@type': 'Country', name: 'Bangladesh' },
    gender: 'Male',
    sameAs: [
      'https://upnexit.pro.bd',
      'https://www.facebook.com/share/1BGxtCwBud/',
      'https://www.instagram.com/upnexit/?hl=en',
      ...(isMehedi && portfolioUrl ? [portfolioUrl] : []),
    ],
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': profileUrl,
    url: profileUrl,
    name: `${founder.name} — ${founder.role}`,
    description: founder.shortBio,
    inLanguage: ['en', 'bn'],
    mainEntity: { '@id': `${profileUrl}#person` },
    image: founder.image,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Upnex It',
      url: 'https://upnexit.pro.bd',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://upnexit.pro.bd' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://upnexit.pro.bd/about' },
      { '@type': 'ListItem', position: 3, name: founder.name, item: profileUrl },
    ],
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEOHead
        title={isMehedi
          ? `Mehedi Hasan — CEO & Founder of Upnex It | মেহেদী হাসান`
          : `${founder.name} — ${founder.role} | Upnex It`}
        description={isMehedi
          ? `Mehedi Hasan (MD. Mehedi Hasan / মেহেদী হাসান) — CEO & Founder of Upnex It. Electrical engineer, server & IT expert from Sapahar, Naogaon, Bangladesh. Leading custom software, school & hospital management solutions.`
          : `${founder.name} (${founder.nameBn}) — ${founder.role}. ${founder.shortBio}`}
        canonical={profileUrl}
        ogImage={founder.image}
        type="profile"
        keywords={[...nameVariants, founder.role, 'Upnex It', 'Naogaon IT', 'Bangladesh software founder', 'Sapahar', 'Niamatpur'].join(', ')}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* SR-only name variants — helps name-based search */}
      <div className="sr-only">
        <h2>{nameVariants.join(' · ')}</h2>
        <p>
          {founder.name} ({founder.nameBn}) — {founder.role} at Upnex It,
          based in {isMehedi ? 'Sapahar, Naogaon, Bangladesh' : 'Niamatpur, Naogaon, Bangladesh'}.
          Also known as {nameVariants.slice(0, 6).join(', ')}.
        </p>
      </div>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, hsl(145 63% 96%) 0%, hsl(0 0% 100%) 35%, hsl(46 80% 96%) 75%, hsl(145 45% 94%) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(145 63% 32%) 1px, transparent 1px), linear-gradient(90deg, hsl(145 63% 32%) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {isBn ? 'About-এ ফিরে যান' : 'Back to About'}
          </Link>

          <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[340px_1fr] gap-6 md:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mx-auto md:mx-0"
            >
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl opacity-50" />
              {portfolioUrl ? (
                <a
                  href={portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${founder.name}'s personal portfolio`}
                  className="relative block aspect-square w-56 sm:w-64 md:w-full max-w-[340px] rounded-3xl overflow-hidden border-4 border-background shadow-elevated group cursor-pointer"
                >
                  <img
                    src={founder.image}
                    alt={`${founder.name} - ${founder.role} of Upnex It, from ${locationChip}, Bangladesh`}
                    title={`${founder.name} - Visit Personal Portfolio`}
                    loading="eager"
                    width={340}
                    height={340}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/0 to-foreground/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/95 text-primary-foreground text-[10px] sm:text-xs font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-sm">
                    <ExternalLink className="h-3 w-3" />
                    {isBn ? 'পোর্টফোলিও দেখুন' : 'Visit Portfolio'}
                  </div>
                </a>
              ) : (
                <div className="relative aspect-square w-56 sm:w-64 md:w-full max-w-[340px] rounded-3xl overflow-hidden border-4 border-background shadow-elevated">
                  <img
                    src={founder.image}
                    alt={`${founder.name} - ${founder.role} of Upnex It, from ${locationChip}, Bangladesh`}
                    title={`${founder.name} - ${founder.role} | ${locationChip}`}
                    loading="eager"
                    width={340}
                    height={340}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="absolute -bottom-3 -right-3 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-glow">
                ★ {roleChip}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary mb-4">
                <Sparkles className="h-3.5 w-3.5" /> {isBn ? 'প্রতিষ্ঠাতা প্রোফাইল' : 'Founder Profile'}
              </span>
              {portfolioUrl ? (
                <a
                  href={portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${founder.name}'s personal portfolio`}
                  className="inline-block group"
                >
                  <h1
                    className="signature-name text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-3 leading-[1.05] transition-colors duration-300 group-hover:text-primary"
                    aria-label={founder.name}
                  >
                    {founder.name}
                  </h1>
                </a>
              ) : (
                <h1
                  className="signature-name text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-3 leading-[1.05]"
                  aria-label={founder.name}
                >
                  {founder.name}
                </h1>
              )}
              <span className="sr-only">{founder.nameBn}</span>
              <p className="text-base md:text-lg font-semibold text-primary mb-4">{role}</p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                {bio}
              </p>

              {portfolioUrl && (
                <a
                  href={portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 mb-5 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-semibold shadow-sm hover:shadow-md hover:from-primary/90 hover:to-primary transition-all duration-300 group"
                >
                  <Briefcase className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  {isBn ? 'পার্সোনাল পোর্টফোলিও দেখুন' : 'Visit Personal Portfolio'}
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-medium text-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> {locationChip}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-medium text-foreground">
                  <GraduationCap className="h-3.5 w-3.5 text-primary" /> {founder.educationBadge || 'SSC 2025'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-medium text-foreground">
                  <Briefcase className="h-3.5 w-3.5 text-primary" /> Upnex It
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detail grid */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-background rounded-2xl border border-border p-5 md:p-6 hover:shadow-elevated hover:border-primary/20 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-base mb-2">{isBn ? 'ঠিকানা' : 'Address'}</h3>
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                {isBn ? 'স্থায়ী ঠিকানা' : 'Permanent Address'}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{address}</p>
              {addressCurrent && (
                <>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                    {isBn ? 'বর্তমান ঠিকানা' : 'Current Address'}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{addressCurrent}</p>
                </>
              )}
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-background rounded-2xl border border-border p-5 md:p-6 hover:shadow-elevated hover:border-primary/20 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-base mb-3">{isBn ? 'শিক্ষাগত যোগ্যতা' : 'Education'}</h3>
              <ul className="space-y-3">
                {founder.education.map((e, i) => (
                  <li key={i} className="border-l-2 border-primary/30 pl-3">
                    <p className="text-xs font-bold text-primary flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" /> {e.year}
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">{isBn ? e.titleBn : e.title}</p>
                    <p className="text-xs text-muted-foreground">{isBn ? e.placeBn : e.place}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-background rounded-2xl border border-border p-5 md:p-6 hover:shadow-elevated hover:border-primary/20 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-base mb-2">{isBn ? 'বর্তমান ভূমিকা' : 'Current Role'}</h3>
              <p className="text-sm font-semibold text-foreground leading-relaxed">{role}</p>
              {roleDetail && (
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">{roleDetail}</p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                {isBn ? 'কোম্পানি: ' : 'Company: '}
                <Link to="/" className="text-primary font-semibold hover:underline">Upnex It</Link>
              </p>
            </motion.div>
          </div>

          {/* Expertise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 bg-background rounded-2xl border border-border p-5 md:p-7"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <Code2 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-base md:text-lg">{isBn ? 'দক্ষতা ও অভিজ্ঞতা' : 'Expertise'}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {expertise.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-primary/8 text-primary border border-primary/15 text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 rounded-2xl p-6 md:p-8 border border-primary/15"
            style={{ background: 'linear-gradient(135deg, hsl(145 63% 32% / 0.04), hsl(46 92% 55% / 0.04))' }}
          >
            <h3 className="font-bold text-foreground text-lg md:text-xl mb-3">
              {isBn ? 'যাত্রার গল্প' : 'The Journey'}
            </h3>
            <div className="text-sm md:text-base text-muted-foreground leading-relaxed space-y-4">
              {story.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/contact">
              <Button size="lg" className="gap-2 rounded-xl">
                <Mail className="h-4 w-4" /> {isBn ? 'যোগাযোগ করুন' : 'Get in Touch'}
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="gap-2 rounded-xl">
                {isBn ? 'কোম্পানি সম্পর্কে' : 'About Company'}
              </Button>
            </Link>
            {Object.values(FOUNDERS)
              .filter((f) => f.slug !== founder.slug)
              .map((f) => (
                <Link key={f.slug} to={`/about/${f.slug}`}>
                  <Button size="lg" variant="ghost" className="gap-2 rounded-xl">
                    {isBn ? 'দেখুন: ' : 'Meet '} {isBn ? f.nameBn : f.name}
                  </Button>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <InternalLinks exclude="/about" />
      <Footer />
    </div>
  );
};

export default FounderProfile;
