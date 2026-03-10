import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Check, X, ArrowLeft, GraduationCap, HeartPulse, Code, Globe, Shield, Clock, Headphones, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const serviceData = {
  bn: {
    school: {
      title: 'স্কুল ম্যানেজমেন্ট সফটওয়্যার',
      subtitle: 'আপনার শিক্ষা প্রতিষ্ঠানের সম্পূর্ণ ডিজিটাল সমাধান',
      description: 'আমাদের স্কুল ম্যানেজমেন্ট সফটওয়্যার দিয়ে আপনার শিক্ষা প্রতিষ্ঠানের সমস্ত কার্যক্রম ডিজিটালভাবে পরিচালনা করুন। ছাত্র-ছাত্রী ভর্তি থেকে শুরু করে পরীক্ষার ফলাফল, ফি কালেকশন, অনলাইন ক্লাস — সবকিছু একটি প্ল্যাটফর্মে।',
      icon: GraduationCap,
      features: [
        'ছাত্র-ছাত্রী ভর্তি ও তথ্য ব্যবস্থাপনা',
        'শিক্ষক প্রোফাইল ও অ্যাটেন্ডেন্স',
        'পরীক্ষার সময়সূচি ও ফলাফল প্রকাশ',
        'অনলাইন ফি কালেকশন ও রিপোর্ট',
        'অভিভাবক পোর্টাল ও নোটিফিকেশন',
        'লাইব্রেরি ম্যানেজমেন্ট',
        'ক্লাস রুটিন ও সময়সূচি',
        'SMS ও ইমেইল নোটিফিকেশন',
      ],
      gold: {
        name: 'গোল্ড',
        price: '৫০,০০০',
        period: '/বছর',
        features: [
          { text: 'সীমাহীন ছাত্র-ছাত্রী', included: true },
          { text: 'সীমাহীন শিক্ষক', included: true },
          { text: 'অনলাইন ফি কালেকশন', included: true },
          { text: 'অভিভাবক অ্যাপ', included: true },
          { text: 'SMS নোটিফিকেশন', included: true },
          { text: 'অনলাইন পরীক্ষা সিস্টেম', included: true },
          { text: 'লাইব্রেরি ম্যানেজমেন্ট', included: true },
          { text: 'কাস্টম ডোমেইন', included: true },
          { text: '২৪/৭ প্রিমিয়াম সাপোর্ট', included: true },
          { text: 'ডেটা ব্যাকআপ ও রিকভারি', included: true },
        ],
      },
      silver: {
        name: 'সিলভার',
        price: '৩০,০০০',
        period: '/বছর',
        features: [
          { text: '৫০০ ছাত্র-ছাত্রী পর্যন্ত', included: true },
          { text: '৫০ শিক্ষক পর্যন্ত', included: true },
          { text: 'অনলাইন ফি কালেকশন', included: true },
          { text: 'অভিভাবক অ্যাপ', included: true },
          { text: 'SMS নোটিফিকেশন', included: false },
          { text: 'অনলাইন পরীক্ষা সিস্টেম', included: false },
          { text: 'লাইব্রেরি ম্যানেজমেন্ট', included: true },
          { text: 'কাস্টম ডোমেইন', included: false },
          { text: 'বিজনেস আওয়ার সাপোর্ট', included: true },
          { text: 'ডেটা ব্যাকআপ', included: true },
        ],
      },
    },
    hospital: {
      title: 'হসপিটাল ম্যানেজমেন্ট সফটওয়্যার',
      subtitle: 'আপনার হাসপাতালের সম্পূর্ণ ডিজিটাল সমাধান',
      description: 'আমাদের হসপিটাল ম্যানেজমেন্ট সফটওয়্যার দিয়ে আপনার হাসপাতাল বা ক্লিনিকের সমস্ত কার্যক্রম স্বয়ংক্রিয়ভাবে পরিচালনা করুন। রোগী ভর্তি, ডাক্তারের অ্যাপয়েন্টমেন্ট, ফার্মেসি, বিলিং — সবকিছু এক জায়গায়।',
      icon: HeartPulse,
      features: [
        'রোগী নিবন্ধন ও তথ্য ব্যবস্থাপনা',
        'ডাক্তার প্রোফাইল ও অ্যাপয়েন্টমেন্ট',
        'OPD ও IPD ম্যানেজমেন্ট',
        'ফার্মেসি ও ইনভেন্টরি',
        'ল্যাব রিপোর্ট ও ডায়াগনস্টিক',
        'বিলিং ও পেমেন্ট সিস্টেম',
        'নার্স ও স্টাফ ম্যানেজমেন্ট',
        'ইমার্জেন্সি ম্যানেজমেন্ট',
      ],
      gold: {
        name: 'গোল্ড',
        price: '৮০,০০০',
        period: '/বছর',
        features: [
          { text: 'সীমাহীন রোগী নিবন্ধন', included: true },
          { text: 'সীমাহীন ডাক্তার', included: true },
          { text: 'ফার্মেসি ম্যানেজমেন্ট', included: true },
          { text: 'ল্যাব ম্যানেজমেন্ট', included: true },
          { text: 'অনলাইন অ্যাপয়েন্টমেন্ট', included: true },
          { text: 'IPD ম্যানেজমেন্ট', included: true },
          { text: 'অটো বিলিং সিস্টেম', included: true },
          { text: 'কাস্টম ডোমেইন', included: true },
          { text: '২৪/৭ প্রিমিয়াম সাপোর্ট', included: true },
          { text: 'ডেটা ব্যাকআপ ও রিকভারি', included: true },
        ],
      },
      silver: {
        name: 'সিলভার',
        price: '৫০,০০০',
        period: '/বছর',
        features: [
          { text: '১০০০ রোগী পর্যন্ত', included: true },
          { text: '২০ ডাক্তার পর্যন্ত', included: true },
          { text: 'ফার্মেসি ম্যানেজমেন্ট', included: true },
          { text: 'ল্যাব ম্যানেজমেন্ট', included: false },
          { text: 'অনলাইন অ্যাপয়েন্টমেন্ট', included: true },
          { text: 'IPD ম্যানেজমেন্ট', included: false },
          { text: 'বেসিক বিলিং', included: true },
          { text: 'কাস্টম ডোমেইন', included: false },
          { text: 'বিজনেস আওয়ার সাপোর্ট', included: true },
          { text: 'ডেটা ব্যাকআপ', included: true },
        ],
      },
    },
    custom: {
      title: 'কাস্টম সফটওয়্যার ডেভেলপমেন্ট',
      subtitle: 'আপনার ব্যবসার জন্য তৈরি সম্পূর্ণ কাস্টম সমাধান',
      description: 'আপনার ব্যবসার নির্দিষ্ট চাহিদা অনুযায়ী সম্পূর্ণ কাস্টমাইজড সফটওয়্যার তৈরি করি। ই-কমার্স, ইনভেন্টরি, CRM, ERP — যেকোনো ধরনের সফটওয়্যার আমরা ডেভেলপ করে থাকি।',
      icon: Code,
      features: [
        'রিকোয়ারমেন্ট অ্যানালাইসিস',
        'UI/UX ডিজাইন',
        'ফুলস্ট্যাক ডেভেলপমেন্ট',
        'API ইন্টিগ্রেশন',
        'ডেটাবেইজ ডিজাইন',
        'সিকিউরিটি অডিট',
        'পারফরম্যান্স অপ্টিমাইজেশন',
        'ডিপ্লয়মেন্ট ও মেইনটেন্যান্স',
      ],
      gold: {
        name: 'গোল্ড',
        price: 'আলোচনা সাপেক্ষে',
        period: '',
        features: [
          { text: 'সম্পূর্ণ কাস্টম UI/UX ডিজাইন', included: true },
          { text: 'ফুলস্ট্যাক ডেভেলপমেন্ট', included: true },
          { text: 'মোবাইল রেসপন্সিভ', included: true },
          { text: 'API ইন্টিগ্রেশন', included: true },
          { text: 'রিয়েল-টাইম ফিচার', included: true },
          { text: 'অ্যাডভান্সড সিকিউরিটি', included: true },
          { text: '৬ মাস ফ্রি মেইনটেন্যান্স', included: true },
          { text: 'সোর্স কোড হ্যান্ডওভার', included: true },
          { text: '২৪/৭ প্রিমিয়াম সাপোর্ট', included: true },
          { text: 'ট্রেনিং ও ডকুমেন্টেশন', included: true },
        ],
      },
      silver: {
        name: 'সিলভার',
        price: 'আলোচনা সাপেক্ষে',
        period: '',
        features: [
          { text: 'স্ট্যান্ডার্ড UI ডিজাইন', included: true },
          { text: 'ফুলস্ট্যাক ডেভেলপমেন্ট', included: true },
          { text: 'মোবাইল রেসপন্সিভ', included: true },
          { text: 'বেসিক API ইন্টিগ্রেশন', included: true },
          { text: 'রিয়েল-টাইম ফিচার', included: false },
          { text: 'বেসিক সিকিউরিটি', included: true },
          { text: '৩ মাস ফ্রি মেইনটেন্যান্স', included: true },
          { text: 'সোর্স কোড হ্যান্ডওভার', included: false },
          { text: 'বিজনেস আওয়ার সাপোর্ট', included: true },
          { text: 'বেসিক ডকুমেন্টেশন', included: true },
        ],
      },
    },
    web: {
      title: 'ওয়েব অ্যাপ্লিকেশন',
      subtitle: 'আধুনিক ও রেসপন্সিভ ওয়েব সমাধান',
      description: 'আধুনিক প্রযুক্তি ব্যবহার করে দ্রুত, নিরাপদ ও রেসপন্সিভ ওয়েব অ্যাপ্লিকেশন তৈরি করি। React, Next.js, Node.js সহ সর্বাধুনিক টেকনোলজি ব্যবহার করা হয়।',
      icon: Globe,
      features: [
        'রেসপন্সিভ ওয়েব ডিজাইন',
        'প্রগ্রেসিভ ওয়েব অ্যাপ (PWA)',
        'SEO অপ্টিমাইজেশন',
        'কন্টেন্ট ম্যানেজমেন্ট সিস্টেম',
        'ই-কমার্স ইন্টিগ্রেশন',
        'পেমেন্ট গেটওয়ে',
        'অ্যানালিটিক্স ড্যাশবোর্ড',
        'ক্লাউড হোস্টিং সেটআপ',
      ],
      gold: {
        name: 'গোল্ড',
        price: '৪০,০০০',
        period: '/প্রজেক্ট',
        features: [
          { text: 'কাস্টম UI/UX ডিজাইন', included: true },
          { text: 'সীমাহীন পেজ', included: true },
          { text: 'SEO অপ্টিমাইজেশন', included: true },
          { text: 'কন্টেন্ট ম্যানেজমেন্ট', included: true },
          { text: 'ই-কমার্স ফিচার', included: true },
          { text: 'পেমেন্ট ইন্টিগ্রেশন', included: true },
          { text: 'অ্যানালিটিক্স সেটআপ', included: true },
          { text: 'কাস্টম ডোমেইন ও SSL', included: true },
          { text: '৬ মাস ফ্রি মেইনটেন্যান্স', included: true },
          { text: '২৪/৭ প্রিমিয়াম সাপোর্ট', included: true },
        ],
      },
      silver: {
        name: 'সিলভার',
        price: '২০,০০০',
        period: '/প্রজেক্ট',
        features: [
          { text: 'টেমপ্লেট বেজড ডিজাইন', included: true },
          { text: '১০ পেজ পর্যন্ত', included: true },
          { text: 'বেসিক SEO', included: true },
          { text: 'কন্টেন্ট ম্যানেজমেন্ট', included: true },
          { text: 'ই-কমার্স ফিচার', included: false },
          { text: 'পেমেন্ট ইন্টিগ্রেশন', included: false },
          { text: 'অ্যানালিটিক্স সেটআপ', included: true },
          { text: 'ডোমেইন ও SSL', included: true },
          { text: '৩ মাস ফ্রি মেইনটেন্যান্স', included: true },
          { text: 'বিজনেস আওয়ার সাপোর্ট', included: true },
        ],
      },
    },
  },
  en: {
    school: {
      title: 'School Management Software',
      subtitle: 'Complete Digital Solution for Your Educational Institution',
      description: 'Manage all activities of your educational institution digitally with our School Management Software. From student admission to exam results, fee collection, online classes — everything in one platform.',
      icon: GraduationCap,
      features: [
        'Student Admission & Data Management',
        'Teacher Profiles & Attendance',
        'Exam Scheduling & Result Publishing',
        'Online Fee Collection & Reports',
        'Parent Portal & Notifications',
        'Library Management',
        'Class Routine & Scheduling',
        'SMS & Email Notifications',
      ],
      gold: {
        name: 'Gold',
        price: '৳50,000',
        period: '/year',
        features: [
          { text: 'Unlimited Students', included: true },
          { text: 'Unlimited Teachers', included: true },
          { text: 'Online Fee Collection', included: true },
          { text: 'Parent App', included: true },
          { text: 'SMS Notifications', included: true },
          { text: 'Online Exam System', included: true },
          { text: 'Library Management', included: true },
          { text: 'Custom Domain', included: true },
          { text: '24/7 Premium Support', included: true },
          { text: 'Data Backup & Recovery', included: true },
        ],
      },
      silver: {
        name: 'Silver',
        price: '৳30,000',
        period: '/year',
        features: [
          { text: 'Up to 500 Students', included: true },
          { text: 'Up to 50 Teachers', included: true },
          { text: 'Online Fee Collection', included: true },
          { text: 'Parent App', included: true },
          { text: 'SMS Notifications', included: false },
          { text: 'Online Exam System', included: false },
          { text: 'Library Management', included: true },
          { text: 'Custom Domain', included: false },
          { text: 'Business Hour Support', included: true },
          { text: 'Data Backup', included: true },
        ],
      },
    },
    hospital: {
      title: 'Hospital Management Software',
      subtitle: 'Complete Digital Solution for Your Hospital',
      description: 'Automate all operations of your hospital or clinic with our Hospital Management Software. Patient admission, doctor appointments, pharmacy, billing — everything in one place.',
      icon: HeartPulse,
      features: [
        'Patient Registration & Data Management',
        'Doctor Profiles & Appointments',
        'OPD & IPD Management',
        'Pharmacy & Inventory',
        'Lab Reports & Diagnostics',
        'Billing & Payment System',
        'Nurse & Staff Management',
        'Emergency Management',
      ],
      gold: {
        name: 'Gold',
        price: '৳80,000',
        period: '/year',
        features: [
          { text: 'Unlimited Patient Registration', included: true },
          { text: 'Unlimited Doctors', included: true },
          { text: 'Pharmacy Management', included: true },
          { text: 'Lab Management', included: true },
          { text: 'Online Appointments', included: true },
          { text: 'IPD Management', included: true },
          { text: 'Auto Billing System', included: true },
          { text: 'Custom Domain', included: true },
          { text: '24/7 Premium Support', included: true },
          { text: 'Data Backup & Recovery', included: true },
        ],
      },
      silver: {
        name: 'Silver',
        price: '৳50,000',
        period: '/year',
        features: [
          { text: 'Up to 1000 Patients', included: true },
          { text: 'Up to 20 Doctors', included: true },
          { text: 'Pharmacy Management', included: true },
          { text: 'Lab Management', included: false },
          { text: 'Online Appointments', included: true },
          { text: 'IPD Management', included: false },
          { text: 'Basic Billing', included: true },
          { text: 'Custom Domain', included: false },
          { text: 'Business Hour Support', included: true },
          { text: 'Data Backup', included: true },
        ],
      },
    },
    custom: {
      title: 'Custom Software Development',
      subtitle: 'Fully Custom Solutions for Your Business',
      description: 'We build fully customized software according to your specific business needs. E-commerce, Inventory, CRM, ERP — we develop any type of software.',
      icon: Code,
      features: [
        'Requirement Analysis',
        'UI/UX Design',
        'Fullstack Development',
        'API Integration',
        'Database Design',
        'Security Audit',
        'Performance Optimization',
        'Deployment & Maintenance',
      ],
      gold: {
        name: 'Gold',
        price: 'Contact Us',
        period: '',
        features: [
          { text: 'Complete Custom UI/UX Design', included: true },
          { text: 'Fullstack Development', included: true },
          { text: 'Mobile Responsive', included: true },
          { text: 'API Integration', included: true },
          { text: 'Real-time Features', included: true },
          { text: 'Advanced Security', included: true },
          { text: '6 Months Free Maintenance', included: true },
          { text: 'Source Code Handover', included: true },
          { text: '24/7 Premium Support', included: true },
          { text: 'Training & Documentation', included: true },
        ],
      },
      silver: {
        name: 'Silver',
        price: 'Contact Us',
        period: '',
        features: [
          { text: 'Standard UI Design', included: true },
          { text: 'Fullstack Development', included: true },
          { text: 'Mobile Responsive', included: true },
          { text: 'Basic API Integration', included: true },
          { text: 'Real-time Features', included: false },
          { text: 'Basic Security', included: true },
          { text: '3 Months Free Maintenance', included: true },
          { text: 'Source Code Handover', included: false },
          { text: 'Business Hour Support', included: true },
          { text: 'Basic Documentation', included: true },
        ],
      },
    },
    web: {
      title: 'Web Applications',
      subtitle: 'Modern & Responsive Web Solutions',
      description: 'We build fast, secure & responsive web applications using modern technologies. Built with React, Next.js, Node.js and other cutting-edge technologies.',
      icon: Globe,
      features: [
        'Responsive Web Design',
        'Progressive Web App (PWA)',
        'SEO Optimization',
        'Content Management System',
        'E-commerce Integration',
        'Payment Gateway',
        'Analytics Dashboard',
        'Cloud Hosting Setup',
      ],
      gold: {
        name: 'Gold',
        price: '৳40,000',
        period: '/project',
        features: [
          { text: 'Custom UI/UX Design', included: true },
          { text: 'Unlimited Pages', included: true },
          { text: 'SEO Optimization', included: true },
          { text: 'Content Management', included: true },
          { text: 'E-commerce Features', included: true },
          { text: 'Payment Integration', included: true },
          { text: 'Analytics Setup', included: true },
          { text: 'Custom Domain & SSL', included: true },
          { text: '6 Months Free Maintenance', included: true },
          { text: '24/7 Premium Support', included: true },
        ],
      },
      silver: {
        name: 'Silver',
        price: '৳20,000',
        period: '/project',
        features: [
          { text: 'Template Based Design', included: true },
          { text: 'Up to 10 Pages', included: true },
          { text: 'Basic SEO', included: true },
          { text: 'Content Management', included: true },
          { text: 'E-commerce Features', included: false },
          { text: 'Payment Integration', included: false },
          { text: 'Analytics Setup', included: true },
          { text: 'Domain & SSL', included: true },
          { text: '3 Months Free Maintenance', included: true },
          { text: 'Business Hour Support', included: true },
        ],
      },
    },
  },
};

const highlights = {
  bn: [
    { icon: Shield, text: '১০০% নিরাপদ ও সিকিউর' },
    { icon: Clock, text: 'দ্রুত ডেলিভারি' },
    { icon: Headphones, text: 'ডেডিকেটেড সাপোর্ট' },
    { icon: Zap, text: 'হাই পারফরম্যান্স' },
  ],
  en: [
    { icon: Shield, text: '100% Safe & Secure' },
    { icon: Clock, text: 'Fast Delivery' },
    { icon: Headphones, text: 'Dedicated Support' },
    { icon: Zap, text: 'High Performance' },
  ],
};

const ctaText = {
  bn: { back: 'ফিরে যান', contact: 'যোগাযোগ করুন', popular: 'জনপ্রিয়', recommended: 'রিকমেন্ডেড', keyFeatures: 'মূল বৈশিষ্ট্যসমূহ', pricing: 'প্রাইসিং প্ল্যান', whyChoose: 'কেন এই সফটওয়্যার বেছে নেবেন?' },
  en: { back: 'Go Back', contact: 'Contact Us', popular: 'Popular', recommended: 'Recommended', keyFeatures: 'Key Features', pricing: 'Pricing Plans', whyChoose: 'Why Choose This Software?' },
};

type ServiceKey = 'school' | 'hospital' | 'custom' | 'web';

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();

  const serviceKey = slug as ServiceKey;
  const data = serviceData[lang]?.[serviceKey];
  const texts = ctaText[lang];
  const highlightItems = highlights[lang];

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Link to="/">
            <Button variant="default">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = data.icon;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <Link to="/#services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm">
            <ArrowLeft className="h-4 w-4" />
            {texts.back}
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <IconComponent className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{data.title}</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-3">{data.subtitle}</p>
            <p className="text-muted-foreground leading-relaxed">{data.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose - Highlights */}
      <section className="py-10 border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {highlightItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{texts.keyFeatures}</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto">
            {data.features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/20 transition-colors">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-20 bg-muted/40">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{texts.pricing}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Silver Plan */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-background rounded-2xl border border-border p-6 md:p-8 relative hover:border-primary/20 transition-all hover:shadow-lg">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-1">{data.silver.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-extrabold text-foreground">{data.silver.price}</span>
                  <span className="text-muted-foreground text-sm">{data.silver.period}</span>
                </div>
              </div>
              <div className="space-y-3 mb-8">
                {data.silver.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {f.included ? (
                      <Check className="h-4 w-4 text-primary shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                    )}
                    <span className={`text-sm ${f.included ? 'text-foreground' : 'text-muted-foreground/50 line-through'}`}>{f.text}</span>
                  </div>
                ))}
              </div>
              <Link to="/consultation">
                <Button variant="outline" className="w-full" size="lg">{texts.contact}</Button>
              </Link>
            </motion.div>

            {/* Gold Plan */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-background rounded-2xl border-2 border-primary p-6 md:p-8 relative hover:shadow-xl transition-all shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  <Star className="h-3 w-3" />
                  {texts.recommended}
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-1">{data.gold.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-extrabold text-primary">{data.gold.price}</span>
                  <span className="text-muted-foreground text-sm">{data.gold.period}</span>
                </div>
              </div>
              <div className="space-y-3 mb-8">
                {data.gold.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {f.included ? (
                      <Check className="h-4 w-4 text-primary shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                    )}
                    <span className={`text-sm ${f.included ? 'text-foreground' : 'text-muted-foreground/50 line-through'}`}>{f.text}</span>
                  </div>
                ))}
              </div>
              <Link to="/consultation">
                <Button variant="default" className="w-full" size="lg">{texts.contact}</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {lang === 'bn' ? 'আজই শুরু করুন' : 'Get Started Today'}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              {lang === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন এবং আপনার প্রতিষ্ঠানের জন্য সেরা সমাধান পান।' : 'Contact us and get the best solution for your organization.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/consultation">
                <Button variant="hero" size="lg">{lang === 'bn' ? 'ফ্রি কনসালটেশন নিন' : 'Get Free Consultation'}</Button>
              </Link>
              <Link to="/contact">
                <Button variant="heroOutline" size="lg">{texts.contact}</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
