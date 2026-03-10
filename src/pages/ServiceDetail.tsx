import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Check, X, ArrowLeft, GraduationCap, HeartPulse, Code, Globe, Shield, Clock, Headphones, Zap, Star, ArrowRight, Sparkles, Users, BarChart3, Settings, Monitor, Database, Lock, FileText, CheckCircle2, Target, Layers, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Feature data with icons ────────────────────────────────
const serviceData = {
  bn: {
    school: {
      title: 'স্কুল ম্যানেজমেন্ট',
      titleHighlight: 'সফটওয়্যার',
      badge: 'Education',
      subtitle: 'আপনার শিক্ষা প্রতিষ্ঠানের সম্পূর্ণ ডিজিটাল সমাধান',
      description: 'আমাদের স্কুল ম্যানেজমেন্ট সফটওয়্যার দিয়ে আপনার শিক্ষা প্রতিষ্ঠানের সমস্ত কার্যক্রম ডিজিটালভাবে পরিচালনা করুন। ছাত্র-ছাত্রী ভর্তি থেকে শুরু করে পরীক্ষার ফলাফল, ফি কালেকশন, অনলাইন ক্লাস — সবকিছু একটি প্ল্যাটফর্মে।',
      icon: GraduationCap,
      color: 'primary',
      features: [
        { icon: Users, title: 'ছাত্র-ছাত্রী ব্যবস্থাপনা', desc: 'ভর্তি, তথ্য ও প্রোফাইল সহজে পরিচালনা' },
        { icon: FileText, title: 'পরীক্ষা ও ফলাফল', desc: 'সময়সূচি তৈরি ও ফলাফল প্রকাশ' },
        { icon: BarChart3, title: 'ফি কালেকশন', desc: 'অনলাইন ফি ও আর্থিক রিপোর্ট' },
        { icon: Monitor, title: 'অভিভাবক পোর্টাল', desc: 'অভিভাবকদের জন্য ডেডিকেটেড পোর্টাল' },
        { icon: Database, title: 'লাইব্রেরি ম্যানেজমেন্ট', desc: 'বই ইস্যু, রিটার্ন ও ক্যাটালগ' },
        { icon: Settings, title: 'ক্লাস রুটিন', desc: 'স্বয়ংক্রিয় ক্লাস রুটিন তৈরি' },
        { icon: Lock, title: 'অ্যাটেন্ডেন্স', desc: 'শিক্ষক ও ছাত্র উপস্থিতি ট্র্যাকিং' },
        { icon: Sparkles, title: 'নোটিফিকেশন', desc: 'SMS ও ইমেইলে তাৎক্ষণিক আপডেট' },
      ],
      benefits: [
        'সম্পূর্ণ ডিজিটাল প্রতিষ্ঠান পরিচালনা',
        'সময় ও খরচ সাশ্রয়',
        'পেপারলেস এডমিনিস্ট্রেশন',
        'অভিভাবকদের সাথে তাৎক্ষণিক যোগাযোগ',
        'রিয়েল-টাইম ডেটা অ্যানালিটিক্স',
        'মোবাইল থেকে সব কিছু পরিচালনা',
      ],
      gold: {
        name: 'গোল্ড', price: '৫০,০০০', period: '/বছর', currency: '৳',
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
        name: 'সিলভার', price: '৩০,০০০', period: '/বছর', currency: '৳',
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
      title: 'হসপিটাল ম্যানেজমেন্ট',
      titleHighlight: 'সফটওয়্যার',
      badge: 'Healthcare',
      subtitle: 'আপনার হাসপাতালের সম্পূর্ণ ডিজিটাল সমাধান',
      description: 'আমাদের হসপিটাল ম্যানেজমেন্ট সফটওয়্যার দিয়ে আপনার হাসপাতাল বা ক্লিনিকের সমস্ত কার্যক্রম স্বয়ংক্রিয়ভাবে পরিচালনা করুন। রোগী ভর্তি, ডাক্তারের অ্যাপয়েন্টমেন্ট, ফার্মেসি, বিলিং — সবকিছু এক জায়গায়।',
      icon: HeartPulse,
      color: 'destructive',
      features: [
        { icon: Users, title: 'রোগী ব্যবস্থাপনা', desc: 'নিবন্ধন, তথ্য ও মেডিকেল হিস্ট্রি' },
        { icon: FileText, title: 'অ্যাপয়েন্টমেন্ট', desc: 'ডাক্তারের অ্যাপয়েন্টমেন্ট শিডিউলিং' },
        { icon: BarChart3, title: 'বিলিং সিস্টেম', desc: 'স্বয়ংক্রিয় বিলিং ও পেমেন্ট' },
        { icon: Database, title: 'ফার্মেসি', desc: 'ফার্মেসি ইনভেন্টরি ও প্রেসক্রিপশন' },
        { icon: Monitor, title: 'ল্যাব রিপোর্ট', desc: 'ডায়াগনস্টিক ও ল্যাব রিপোর্ট' },
        { icon: Settings, title: 'OPD/IPD', desc: 'আউটডোর ও ইনডোর পেশেন্ট' },
        { icon: Lock, title: 'স্টাফ ম্যানেজমেন্ট', desc: 'নার্স, স্টাফ ও শিফট ম্যানেজমেন্ট' },
        { icon: Sparkles, title: 'ইমার্জেন্সি', desc: 'জরুরি বিভাগ পরিচালনা ও ট্র্যাকিং' },
      ],
      benefits: [
        'রোগীদের দ্রুত সেবা প্রদান',
        'ফার্মেসি স্টক অটো-ম্যানেজমেন্ট',
        'ডাক্তারদের শিডিউল অপ্টিমাইজেশন',
        'সম্পূর্ণ বিলিং অটোমেশন',
        'রিয়েল-টাইম বেড ম্যানেজমেন্ট',
        'ডিজিটাল প্রেসক্রিপশন ও রিপোর্ট',
      ],
      gold: {
        name: 'গোল্ড', price: '৮০,০০০', period: '/বছর', currency: '৳',
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
        name: 'সিলভার', price: '৫০,০০০', period: '/বছর', currency: '৳',
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
      title: 'কাস্টম সফটওয়্যার',
      titleHighlight: 'ডেভেলপমেন্ট',
      badge: 'Development',
      subtitle: 'আপনার ব্যবসার জন্য তৈরি সম্পূর্ণ কাস্টম সমাধান',
      description: 'আপনার ব্যবসার নির্দিষ্ট চাহিদা অনুযায়ী সম্পূর্ণ কাস্টমাইজড সফটওয়্যার তৈরি করি। ই-কমার্স, ইনভেন্টরি, CRM, ERP — যেকোনো ধরনের সফটওয়্যার আমরা ডেভেলপ করে থাকি।',
      icon: Code,
      color: 'secondary',
      features: [
        { icon: FileText, title: 'রিকোয়ারমেন্ট অ্যানালাইসিস', desc: 'চাহিদা বিশ্লেষণ ও ডকুমেন্টেশন' },
        { icon: Monitor, title: 'UI/UX ডিজাইন', desc: 'আকর্ষণীয় ও ইউজার-ফ্রেন্ডলি ডিজাইন' },
        { icon: Code, title: 'ফুলস্ট্যাক ডেভেলপমেন্ট', desc: 'ফ্রন্টএন্ড ও ব্যাকএন্ড ডেভেলপমেন্ট' },
        { icon: Settings, title: 'API ইন্টিগ্রেশন', desc: 'থার্ড-পার্টি সার্ভিস ইন্টিগ্রেশন' },
        { icon: Database, title: 'ডেটাবেইজ ডিজাইন', desc: 'স্কেলেবল ডেটাবেইজ আর্কিটেকচার' },
        { icon: Lock, title: 'সিকিউরিটি অডিট', desc: 'ডেটা সুরক্ষা ও নিরাপত্তা পরীক্ষা' },
        { icon: Zap, title: 'পারফরম্যান্স', desc: 'দ্রুত ও কার্যকর সফটওয়্যার' },
        { icon: Sparkles, title: 'ডিপ্লয়মেন্ট', desc: 'ক্লাউড ডিপ্লয়মেন্ট ও মেইনটেন্যান্স' },
      ],
      benefits: [
        'আপনার ব্যবসার অনুযায়ী সম্পূর্ণ কাস্টম',
        'আধুনিক টেকনোলজি স্ট্যাক',
        'স্কেলেবল আর্কিটেকচার',
        'সম্পূর্ণ সোর্স কোড মালিকানা',
        'ডেডিকেটেড ডেভেলপার টিম',
        'ফ্রি আফটার-সেলস সাপোর্ট',
      ],
      gold: {
        name: 'গোল্ড', price: 'আলোচনা সাপেক্ষে', period: '', currency: '',
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
        name: 'সিলভার', price: 'আলোচনা সাপেক্ষে', period: '', currency: '',
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
      title: 'ওয়েব',
      titleHighlight: 'অ্যাপ্লিকেশন',
      badge: 'Web Development',
      subtitle: 'আধুনিক ও রেসপন্সিভ ওয়েব সমাধান',
      description: 'আধুনিক প্রযুক্তি ব্যবহার করে দ্রুত, নিরাপদ ও রেসপন্সিভ ওয়েব অ্যাপ্লিকেশন তৈরি করি। React, Next.js, Node.js সহ সর্বাধুনিক টেকনোলজি ব্যবহার করা হয়।',
      icon: Globe,
      color: 'primary',
      features: [
        { icon: Monitor, title: 'রেসপন্সিভ ডিজাইন', desc: 'সব ডিভাইসে পারফেক্টলি কাজ করে' },
        { icon: Zap, title: 'PWA সাপোর্ট', desc: 'প্রগ্রেসিভ ওয়েব অ্যাপ ফিচার' },
        { icon: BarChart3, title: 'SEO অপ্টিমাইজেশন', desc: 'সার্চ ইঞ্জিনে উচ্চ র‍্যাংকিং' },
        { icon: FileText, title: 'CMS', desc: 'সহজে কন্টেন্ট ম্যানেজমেন্ট' },
        { icon: Settings, title: 'ই-কমার্স', desc: 'অনলাইন স্টোর ও পেমেন্ট' },
        { icon: Database, title: 'পেমেন্ট গেটওয়ে', desc: 'নিরাপদ পেমেন্ট ইন্টিগ্রেশন' },
        { icon: BarChart3, title: 'অ্যানালিটিক্স', desc: 'বিস্তারিত ভিজিটর ডেটা' },
        { icon: Sparkles, title: 'ক্লাউড হোস্টিং', desc: 'স্কেলেবল ক্লাউড ইনফ্রাস্ট্রাকচার' },
      ],
      benefits: [
        'লাইটনিং ফাস্ট লোডিং স্পিড',
        'গুগলে উচ্চ র‍্যাংকিং',
        'ক্রস-ব্রাউজার কম্প্যাটিবিলিটি',
        'সিকিউর HTTPS ও SSL',
        'সহজ কন্টেন্ট আপডেট সিস্টেম',
        'স্কেলেবল ক্লাউড হোস্টিং',
      ],
      gold: {
        name: 'গোল্ড', price: '৪০,০০০', period: '/প্রজেক্ট', currency: '৳',
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
        name: 'সিলভার', price: '২০,০০০', period: '/প্রজেক্ট', currency: '৳',
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
      title: 'School Management',
      titleHighlight: 'Software',
      badge: 'Education',
      subtitle: 'Complete Digital Solution for Your Educational Institution',
      description: 'Manage all activities of your educational institution digitally. From student admission to exam results, fee collection, online classes — everything in one platform.',
      icon: GraduationCap,
      color: 'primary',
      features: [
        { icon: Users, title: 'Student Management', desc: 'Admission, data & profile management' },
        { icon: FileText, title: 'Exams & Results', desc: 'Schedule exams and publish results' },
        { icon: BarChart3, title: 'Fee Collection', desc: 'Online fee collection & reports' },
        { icon: Monitor, title: 'Parent Portal', desc: 'Dedicated portal for parents' },
        { icon: Database, title: 'Library', desc: 'Book issue, return & catalog' },
        { icon: Settings, title: 'Class Routine', desc: 'Auto-generate class schedules' },
        { icon: Lock, title: 'Attendance', desc: 'Teacher & student attendance' },
        { icon: Sparkles, title: 'Notifications', desc: 'Instant SMS & email updates' },
      ],
      benefits: [
        'Complete digital institution management',
        'Save time & reduce costs',
        'Paperless administration',
        'Instant communication with parents',
        'Real-time data analytics',
        'Manage everything from mobile',
      ],
      gold: {
        name: 'Gold', price: '50,000', period: '/year', currency: '৳',
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
        name: 'Silver', price: '30,000', period: '/year', currency: '৳',
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
      title: 'Hospital Management',
      titleHighlight: 'Software',
      badge: 'Healthcare',
      subtitle: 'Complete Digital Solution for Your Hospital',
      description: 'Automate all operations of your hospital or clinic. Patient admission, doctor appointments, pharmacy, billing — everything in one place.',
      icon: HeartPulse,
      color: 'destructive',
      features: [
        { icon: Users, title: 'Patient Management', desc: 'Registration, data & medical history' },
        { icon: FileText, title: 'Appointments', desc: 'Doctor appointment scheduling' },
        { icon: BarChart3, title: 'Billing System', desc: 'Auto billing & payment tracking' },
        { icon: Database, title: 'Pharmacy', desc: 'Pharmacy inventory & prescriptions' },
        { icon: Monitor, title: 'Lab Reports', desc: 'Diagnostic & lab report management' },
        { icon: Settings, title: 'OPD/IPD', desc: 'Outpatient & inpatient management' },
        { icon: Lock, title: 'Staff Management', desc: 'Nurse, staff & shift management' },
        { icon: Sparkles, title: 'Emergency', desc: 'Emergency department management' },
      ],
      benefits: [
        'Faster patient service delivery',
        'Auto pharmacy stock management',
        'Doctor schedule optimization',
        'Complete billing automation',
        'Real-time bed management',
        'Digital prescriptions & reports',
      ],
      gold: {
        name: 'Gold', price: '80,000', period: '/year', currency: '৳',
        features: [
          { text: 'Unlimited Patients', included: true },
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
        name: 'Silver', price: '50,000', period: '/year', currency: '৳',
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
      title: 'Custom Software',
      titleHighlight: 'Development',
      badge: 'Development',
      subtitle: 'Fully Custom Solutions for Your Business',
      description: 'We build fully customized software according to your specific business needs. E-commerce, Inventory, CRM, ERP — we develop any type of software.',
      icon: Code,
      color: 'secondary',
      features: [
        { icon: FileText, title: 'Requirement Analysis', desc: 'Analyze & document your needs' },
        { icon: Monitor, title: 'UI/UX Design', desc: 'Attractive & user-friendly design' },
        { icon: Code, title: 'Fullstack Dev', desc: 'Frontend & backend development' },
        { icon: Settings, title: 'API Integration', desc: 'Third-party service integration' },
        { icon: Database, title: 'Database Design', desc: 'Scalable database architecture' },
        { icon: Lock, title: 'Security Audit', desc: 'Data protection & security' },
        { icon: Zap, title: 'Performance', desc: 'Fast & efficient software' },
        { icon: Sparkles, title: 'Deployment', desc: 'Cloud deployment & maintenance' },
      ],
      benefits: [
        'Fully custom to your business',
        'Modern technology stack',
        'Scalable architecture',
        'Complete source code ownership',
        'Dedicated developer team',
        'Free after-sales support',
      ],
      gold: {
        name: 'Gold', price: 'Contact Us', period: '', currency: '',
        features: [
          { text: 'Complete Custom UI/UX', included: true },
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
        name: 'Silver', price: 'Contact Us', period: '', currency: '',
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
      title: 'Web',
      titleHighlight: 'Applications',
      badge: 'Web Development',
      subtitle: 'Modern & Responsive Web Solutions',
      description: 'We build fast, secure & responsive web applications using React, Next.js, Node.js and other cutting-edge technologies.',
      icon: Globe,
      color: 'primary',
      features: [
        { icon: Monitor, title: 'Responsive Design', desc: 'Works on all devices' },
        { icon: Zap, title: 'PWA Support', desc: 'Progressive web app features' },
        { icon: BarChart3, title: 'SEO Optimization', desc: 'High search engine ranking' },
        { icon: FileText, title: 'CMS', desc: 'Easy content management' },
        { icon: Settings, title: 'E-commerce', desc: 'Online store & payments' },
        { icon: Database, title: 'Payment Gateway', desc: 'Secure payment integration' },
        { icon: BarChart3, title: 'Analytics', desc: 'Detailed visitor analytics' },
        { icon: Sparkles, title: 'Cloud Hosting', desc: 'Scalable cloud infrastructure' },
      ],
      benefits: [
        'Lightning fast loading speed',
        'High Google ranking',
        'Cross-browser compatibility',
        'Secure HTTPS & SSL',
        'Easy content update system',
        'Scalable cloud hosting',
      ],
      gold: {
        name: 'Gold', price: '40,000', period: '/project', currency: '৳',
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
        name: 'Silver', price: '20,000', period: '/project', currency: '৳',
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

type ServiceKey = 'school' | 'hospital' | 'custom' | 'web';

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const serviceKey = slug as ServiceKey;
  const data = serviceData[lang]?.[serviceKey];

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Link to="/"><Button variant="default">Go Home</Button></Link>
        </div>
      </div>
    );
  }

  const IconComponent = data.icon;
  const isBn = lang === 'bn';

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative pt-20 pb-10 sm:pt-32 sm:pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(160deg, hsl(145 63% 96%) 0%, hsl(0 0% 100%) 25%, hsl(46 80% 96%) 55%, hsl(145 45% 94%) 100%)'
        }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(145 63% 32%) 1px, transparent 1px), linear-gradient(90deg, hsl(145 63% 32%) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 right-[10%] w-48 sm:w-60 h-48 sm:h-60 rounded-full"
            style={{ background: 'radial-gradient(circle, hsl(145 63% 42% / 0.08), transparent 70%)' }} />
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-16 left-[5%] w-56 sm:w-80 h-56 sm:h-80 rounded-full"
            style={{ background: 'radial-gradient(circle, hsl(46 92% 55% / 0.1), transparent 70%)' }} />
          {/* Decorative dots */}
          <div className="hidden sm:grid absolute top-28 left-8 grid-cols-5 gap-2.5 opacity-20">
            {Array.from({ length: 15 }).map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />)}
          </div>
          <div className="hidden sm:grid absolute bottom-20 right-10 grid-cols-4 gap-2.5 opacity-15">
            {Array.from({ length: 12 }).map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-secondary" />)}
          </div>
          <div className="absolute top-0 left-1/4 w-px h-32 sm:h-48 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
          <div className="absolute top-0 right-1/3 w-px h-40 sm:h-64 bg-gradient-to-b from-transparent via-secondary/8 to-transparent" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <Link to="/#services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6 text-xs sm:text-sm group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {isBn ? 'ফিরে যান' : 'Go Back'}
          </Link>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-primary/8 text-primary mb-3 sm:mb-5">
                <Sparkles className="h-3.5 w-3.5" /> {data.badge}
              </motion.span>

              <h1 className="text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-2.5 sm:mb-4 tracking-tight text-foreground">
                {data.title}{' '}
                <span className="text-gradient">{data.titleHighlight}</span>
              </h1>
              <p className="text-[13px] sm:text-base md:text-lg text-muted-foreground mb-2 sm:mb-3 leading-relaxed">{data.subtitle}</p>
              <p className="text-[11px] sm:text-sm text-muted-foreground/70 leading-relaxed mb-4 sm:mb-8 max-w-xl hidden sm:block">{data.description}</p>

              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link to="/consultation" className="w-full sm:w-auto">
                  <Button variant="hero" size="default" className="gap-2 w-full sm:w-auto sm:size-lg text-xs sm:text-sm h-10 sm:h-12">
                    {isBn ? 'ফ্রি কনসালটেশন নিন' : 'Get Free Consultation'} <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button variant="heroOutline" size="default" className="w-full sm:w-auto sm:size-lg text-xs sm:text-sm h-10 sm:h-12">
                    {isBn ? 'যোগাযোগ করুন' : 'Contact Us'}
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Stats card - right side */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="relative hidden md:block">
              <div className="bg-background rounded-3xl border border-border p-6 md:p-8 shadow-elevated relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 gradient-accent rounded-t-3xl" />
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-5">
                  <IconComponent className="h-7 w-7 text-primary" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Users, num: isBn ? '১০০+' : '100+', label: isBn ? 'ব্যবহারকারী' : 'Active Users' },
                    { icon: Shield, num: '99.9%', label: isBn ? 'আপটাইম' : 'Uptime' },
                    { icon: Zap, num: isBn ? '২x' : '2x', label: isBn ? 'দ্রুত' : 'Faster' },
                    { icon: Award, num: '24/7', label: isBn ? 'সাপোর্ট' : 'Support' },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.1 }}
                      className="p-4 rounded-2xl text-center border bg-muted/30 border-border/50 hover:border-primary/20 transition-all">
                      <item.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-xl font-black text-foreground">{item.num}</p>
                      <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full" style={{ background: 'hsl(46 92% 55% / 0.08)' }} />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full" style={{ background: 'hsl(145 63% 32% / 0.06)' }} />
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full h-auto">
            <path d="M0 100L48 90C96 80 192 60 288 50C384 40 480 40 576 45C672 50 768 60 864 65C960 70 1056 70 1152 60C1248 50 1344 30 1392 20L1440 10V100H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════ HIGHLIGHTS BAR ═══════════════════ */}
      <section className="py-6 sm:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-5">
            {[
              { icon: Shield, title: isBn ? '১০০% নিরাপদ' : '100% Secure', desc: isBn ? 'ডেটা এনক্রিপশন ও সুরক্ষা' : 'Data encryption & protection' },
              { icon: Clock, title: isBn ? 'দ্রুত ডেলিভারি' : 'Fast Delivery', desc: isBn ? 'সময়মতো প্রজেক্ট হ্যান্ডওভার' : 'On-time project handover' },
              { icon: Headphones, title: isBn ? 'ডেডিকেটেড সাপোর্ট' : 'Dedicated Support', desc: isBn ? 'যেকোনো সমস্যায় পাশে আছি' : 'Always here to help' },
              { icon: Zap, title: isBn ? 'হাই পারফরম্যান্স' : 'High Performance', desc: isBn ? 'দ্রুত ও কার্যকর সফটওয়্যার' : 'Fast & efficient software' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-muted/50 border border-border hover:border-primary/20 hover:shadow-card transition-all duration-300">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
                  <item.icon className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-primary" />
                </div>
                <h4 className="font-bold text-[11px] sm:text-sm text-foreground mb-0.5">{item.title}</h4>
                <p className="text-[9px] sm:text-xs text-muted-foreground leading-snug">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURES GRID ═══════════════════ */}
      <section className="py-8 sm:py-16 md:py-20 bg-muted/30 relative">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }} />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-7 sm:mb-14">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-primary/8 text-primary mb-3 sm:mb-5">
              {isBn ? 'বৈশিষ্ট্যসমূহ' : 'Features'}
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1.5 sm:mb-3">
              {isBn ? 'মূল বৈশিষ্ট্যসমূহ' : 'Key Features'}
            </h2>
            <p className="text-[11px] sm:text-sm text-muted-foreground max-w-lg mx-auto">
              {isBn ? 'আমাদের সফটওয়্যারে যা যা পাবেন' : 'Everything included in our software'}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
            {data.features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group bg-background rounded-xl sm:rounded-3xl p-3 sm:p-6 border border-border hover:border-primary/20 hover:shadow-elevated transition-all duration-300 relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-[0.03] hidden sm:block" style={{
                  backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
                  backgroundSize: '10px 10px',
                }} />
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center mb-2 sm:mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="font-bold text-[11px] sm:text-sm md:text-base text-foreground mb-0.5 sm:mb-1 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-[9px] sm:text-xs md:text-sm text-muted-foreground leading-snug">{feature.desc}</p>
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500 rounded-b-3xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ BENEFITS / WHY CHOOSE ═══════════════════ */}
      <section className="py-8 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-secondary/15 mb-3 sm:mb-5" style={{ color: 'hsl(40 95% 38%)' }}>
                {isBn ? 'সুবিধাসমূহ' : 'Benefits'}
              </span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-5 leading-tight text-foreground">
                {isBn ? 'কেন এই সফটওয়্যার' : 'Why Choose This'}{' '}
                <span className="text-gradient">{isBn ? 'বেছে নেবেন?' : 'Software?'}</span>
              </h2>
              <p className="text-[11px] sm:text-sm text-muted-foreground mb-4 sm:mb-8 leading-relaxed">
                {isBn
                  ? 'আমাদের সফটওয়্যার ব্যবহার করে আপনার প্রতিষ্ঠানকে সম্পূর্ণ ডিজিটাল করুন এবং কাজের দক্ষতা বাড়ান।'
                  : 'Digitize your organization completely and increase efficiency with our software.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {data.benefits.map((b, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-4 rounded-lg sm:rounded-xl bg-muted/60 border border-border/50 hover:border-primary/20 hover:shadow-card transition-all group">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                      <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    </div>
                    <span className="text-[11px] sm:text-sm font-semibold text-foreground">{b}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Process Steps - right side */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="bg-background rounded-xl sm:rounded-3xl border border-border p-3.5 sm:p-6 md:p-8 shadow-elevated relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 gradient-accent rounded-t-xl sm:rounded-t-3xl" />
                <h3 className="text-sm sm:text-lg font-bold text-foreground mb-3 sm:mb-6 mt-1">
                  {isBn ? 'আমাদের কাজের প্রক্রিয়া' : 'Our Work Process'}
                </h3>
                <div className="space-y-2.5 sm:space-y-4">
                  {[
                    { step: isBn ? '০১' : '01', title: isBn ? 'পরিকল্পনা' : 'Planning', desc: isBn ? 'আপনার প্রয়োজনীয়তা বিশ্লেষণ' : 'Analyze your requirements' },
                    { step: isBn ? '০২' : '02', title: isBn ? 'ডিজাইন' : 'Design', desc: isBn ? 'আকর্ষণীয় UI/UX ডিজাইন' : 'Attractive UI/UX design' },
                    { step: isBn ? '০৩' : '03', title: isBn ? 'ডেভেলপমেন্ট' : 'Development', desc: isBn ? 'আধুনিক প্রযুক্তিতে তৈরি' : 'Built with modern tech' },
                    { step: isBn ? '০৪' : '04', title: isBn ? 'ডেলিভারি' : 'Delivery', desc: isBn ? 'সময়মতো হ্যান্ডওভার ও সাপোর্ট' : 'On-time handover & support' },
                  ].map((p, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2.5 sm:gap-4 group">
                      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl gradient-accent flex items-center justify-center text-primary-foreground font-black text-[10px] sm:text-sm shadow-glow shrink-0">
                        {p.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-[11px] sm:text-sm text-foreground group-hover:text-primary transition-colors">{p.title}</h4>
                        <p className="text-[9px] sm:text-xs text-muted-foreground">{p.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full" style={{ background: 'hsl(46 92% 55% / 0.08)' }} />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full" style={{ background: 'hsl(145 63% 32% / 0.06)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PRICING ═══════════════════ */}
      <section className="py-8 sm:py-16 md:py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, hsl(145 63% 42% / 0.06), transparent 70%)' }} />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, hsl(46 92% 55% / 0.08), transparent 70%)' }} />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-7 sm:mb-14">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-secondary/15 mb-3 sm:mb-5" style={{ color: 'hsl(40 95% 38%)' }}>
              Pricing
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1.5 sm:mb-3">
              {isBn ? 'প্রাইসিং প্ল্যান' : 'Pricing Plans'}
            </h2>
            <p className="text-[11px] sm:text-sm text-muted-foreground max-w-lg mx-auto">
              {isBn ? 'আপনার প্রতিষ্ঠানের চাহিদা অনুযায়ী সেরা প্ল্যান বেছে নিন' : 'Choose the best plan for your organization'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Silver Plan */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="bg-background rounded-xl sm:rounded-3xl border border-border p-4 sm:p-7 md:p-8 relative hover:border-primary/20 transition-all duration-300 hover:shadow-elevated group">
              <div className="mb-3 sm:mb-6">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-muted flex items-center justify-center">
                    <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-foreground">{data.silver.name}</h3>
                </div>
                <div className="flex items-baseline gap-0.5 sm:gap-1 flex-wrap">
                  {data.silver.currency && <span className="text-sm sm:text-lg font-bold text-muted-foreground">{data.silver.currency}</span>}
                  <span className="text-xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight">{data.silver.price}</span>
                  {data.silver.period && <span className="text-muted-foreground text-[10px] sm:text-sm ml-0.5 sm:ml-1">{data.silver.period}</span>}
                </div>
              </div>

              <div className="h-px bg-border mb-3 sm:mb-5" />

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-7">
                {data.silver.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 sm:gap-3">
                    {f.included ? (
                      <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <X className="h-3 w-3 text-muted-foreground/40" />
                      </div>
                    )}
                    <span className={`text-[11px] sm:text-sm ${f.included ? 'text-foreground' : 'text-muted-foreground/50 line-through'}`}>{f.text}</span>
                  </div>
                ))}
              </div>

              <Link to="/consultation" className="block">
                <Button variant="outline" className="w-full rounded-lg sm:rounded-xl text-[11px] sm:text-sm h-9 sm:h-12" size="lg">
                  {isBn ? 'যোগাযোগ করুন' : 'Contact Us'}
                </Button>
              </Link>
            </motion.div>

            {/* Gold Plan */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-background rounded-xl sm:rounded-3xl border-2 border-primary p-4 sm:p-7 md:p-8 relative shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Recommended badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <span className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-md whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg, hsl(145 63% 38%), hsl(145 63% 28%))', color: 'white' }}>
                  <Star className="h-3 w-3 fill-current" />
                  {isBn ? 'রিকমেন্ডেড' : 'Recommended'}
                </span>
              </div>

              {/* Subtle glow */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-50 pointer-events-none"
                style={{ boxShadow: 'inset 0 1px 0 0 hsl(145 63% 42% / 0.15), 0 0 40px -10px hsl(145 63% 42% / 0.15)' }} />

              <div className="mb-4 sm:mb-6 relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">{data.gold.name}</h3>
                </div>
                <div className="flex items-baseline gap-1 flex-wrap">
                  {data.gold.currency && <span className="text-base sm:text-lg font-bold text-primary">{data.gold.currency}</span>}
                  <span className="text-2xl sm:text-3xl md:text-4xl font-black text-primary tracking-tight">{data.gold.price}</span>
                  {data.gold.period && <span className="text-muted-foreground text-xs sm:text-sm ml-1">{data.gold.period}</span>}
                </div>
              </div>

              <div className="h-px bg-primary/15 mb-4 sm:mb-5" />

              <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-7 relative">
                {data.gold.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 sm:gap-3">
                    {f.included ? (
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <X className="h-3 w-3 text-muted-foreground/40" />
                      </div>
                    )}
                    <span className={`text-xs sm:text-sm ${f.included ? 'text-foreground font-medium' : 'text-muted-foreground/50 line-through'}`}>{f.text}</span>
                  </div>
                ))}
              </div>

              <Link to="/consultation" className="block">
                <Button variant="hero" className="w-full rounded-xl text-xs sm:text-sm" size="lg">
                  {isBn ? 'ফ্রি কনসালটেশন নিন' : 'Get Free Consultation'} <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="py-10 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-8 md:p-14 text-center"
            style={{ background: 'var(--gradient-hero)' }}>
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }} />
            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-primary-foreground mb-3 sm:mb-4">
                {isBn ? 'আজই শুরু করুন' : 'Get Started Today'}
              </h2>
              <p className="text-primary-foreground/80 mb-6 sm:mb-8 max-w-lg mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
                {isBn ? 'আমাদের সাথে যোগাযোগ করুন এবং আপনার প্রতিষ্ঠানের জন্য সেরা সমাধান পান।' : 'Contact us and get the best solution for your organization.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/consultation">
                  <Button size="lg" className="bg-background text-foreground hover:bg-background/90 font-bold px-6 sm:px-8 gap-2 rounded-xl shadow-elevated text-xs sm:text-sm w-full sm:w-auto">
                    {isBn ? 'ফ্রি কনসালটেশন নিন' : 'Get Free Consultation'} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-6 sm:px-8 rounded-xl text-xs sm:text-sm w-full sm:w-auto">
                    {isBn ? 'যোগাযোগ করুন' : 'Contact Us'}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
