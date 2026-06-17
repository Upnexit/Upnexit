import type { LucideIcon } from 'lucide-react';

export type ServiceReviewKey =
  | 'school'
  | 'hospital'
  | 'custom'
  | 'web'
  | 'graphics'
  | 'boosting';

export interface ServiceReview {
  name: string;
  company: string;
  location: string;
  rating: number;
  /** Bengali review used on homepage */
  bn: string;
  /** English review used on service-detail page */
  en: string;
  female?: boolean;
}

/**
 * 5 reviews per service. Homepage uses the first 2 (Bengali),
 * service-detail page uses all 5 (English).
 */
export const serviceReviews: Record<ServiceReviewKey, ServiceReview[]> = {
  school: [
    {
      name: 'মোঃ আব্দুর রহমান',
      company: 'Sunrise International School',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      bn: 'আপনেক্স আইটি-এর স্কুল ম্যানেজমেন্ট সফটওয়্যার আমাদের পুরো প্রতিষ্ঠানের কাজ সহজ করেছে। ভর্তি, ফি কালেকশন আর রেজাল্ট প্রকাশ — সবকিছুই এখন এক ক্লিকে।',
      en: "Upnex It's School Management Software completely transformed how we run our institution. Admissions, fee collection and result publishing are now just one click away.",
    },
    {
      name: 'Farzana Akter',
      company: 'Green Hope Academy',
      location: 'Chattogram, Bangladesh',
      rating: 5,
      bn: 'অভিভাবক পোর্টাল আর SMS নোটিফিকেশন থাকার ফলে অভিভাবকদের সাথে যোগাযোগ আগের চেয়ে অনেক সহজ হয়েছে। Upnex It-এর সাপোর্ট টিম সত্যিই দারুণ।',
      en: "The parent portal and SMS notifications have made communication with guardians effortless. Upnex It's support team is genuinely outstanding.",
      female: true,
    },
    {
      name: 'Mizanur Rahman',
      company: 'Bright Future School',
      location: 'Sylhet, Bangladesh',
      rating: 5,
      bn: 'অনলাইন ফি কালেকশন আর অটো রিসিট সিস্টেম আমাদের অ্যাকাউন্টস ডিপার্টমেন্টের প্রায় ৭০% সময় বাঁচিয়েছে।',
      en: 'The online fee collection and auto-receipt system saved nearly 70% of the time our accounts department used to spend on manual work.',
    },
    {
      name: 'Nasrin Sultana',
      company: 'Dhaka Model High School',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      bn: 'রেজাল্ট প্রসেসিং, এডমিট কার্ড আর টেবুলেশন শিট তৈরি — সবই অসাধারণ। আপনেক্স আইটি সত্যিই বিশ্বস্ত পার্টনার।',
      en: 'Result processing, admit cards and tabulation sheets are flawless. Upnex It has become a truly reliable partner for our institution.',
      female: true,
    },
    {
      name: 'Kamrul Hasan',
      company: 'Riverside Academy',
      location: 'Khulna, Bangladesh',
      rating: 5,
      bn: 'অ্যাটেন্ডেন্স ট্র্যাকিং আর ক্লাস রুটিন অটোমেশন আমাদের অ্যাডমিনিস্ট্রেটিভ চাপ অনেকটাই কমিয়েছে। হাইলি রিকমেন্ডেড।',
      en: 'Attendance tracking and automated class routine reduced our administrative load drastically. Highly recommended for any modern school.',
    },
  ],

  hospital: [
    {
      name: 'Dr. Shahidul Islam',
      company: 'City Care Hospital',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      bn: 'Upnex It-এর হাসপাতাল ম্যানেজমেন্ট সফটওয়্যার আমাদের পেশেন্ট হ্যান্ডলিং, প্রেসক্রিপশন আর বিলিং সম্পূর্ণ ডিজিটালাইজ করেছে।',
      en: "Upnex It's Hospital Management Software fully digitized our patient handling, prescriptions and billing workflow.",
    },
    {
      name: 'Dr. Rumana Begum',
      company: 'LifeLine Diagnostic Center',
      location: 'Chattogram, Bangladesh',
      rating: 5,
      bn: 'ল্যাব রিপোর্ট, এপয়েন্টমেন্ট আর রেভিনিউ — সব একসাথে দেখা যায়। ডাক্তার ও রোগী উভয়ের অভিজ্ঞতা অনেক উন্নত হয়েছে।',
      en: 'Lab reports, appointments and revenue analytics in one dashboard. Both doctors and patients now have a far better experience.',
      female: true,
    },
    {
      name: 'Mahmudul Hasan',
      company: 'Apollo Care Clinic',
      location: 'Rajshahi, Bangladesh',
      rating: 5,
      bn: 'ইলেক্ট্রনিক হেলথ রেকর্ড আর ফার্মেসি মডিউল চমৎকার। আমাদের হাসপাতাল ম্যানেজমেন্ট এখন অনেক প্রফেশনাল।',
      en: 'The electronic health records and pharmacy module are excellent. Our hospital management feels far more professional now.',
    },
    {
      name: 'Dr. Sabrina Haque',
      company: 'Wellness Hospital BD',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      bn: 'IPD, OPD ও ক্যাশ কাউন্টার — সব মডিউল একসাথে কাজ করে। আপনেক্স আইটির সফটওয়্যার সত্যিই হাসপাতালের জন্য আদর্শ।',
      en: 'IPD, OPD and cash counter modules work in perfect sync. Upnex It has built the ideal system for hospital operations.',
      female: true,
    },
    {
      name: 'Tanvir Ahmed',
      company: 'MediPlus Hospital',
      location: 'Cumilla, Bangladesh',
      rating: 5,
      bn: '২৪/৭ সাপোর্ট আর দ্রুত আপডেট পাওয়ার অভিজ্ঞতা দারুণ। হাসপাতাল ম্যানেজমেন্টের জন্য সেরা পছন্দ।',
      en: 'Their 24/7 support and rapid feature updates are exceptional. The best choice for any modern hospital management system.',
    },
  ],

  custom: [
    {
      name: 'Rakibul Islam',
      company: 'NextGen Logistics',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      bn: 'আমাদের কাস্টম লজিস্টিক সফটওয়্যার তৈরি করে দিয়েছে Upnex It। চাহিদা অনুযায়ী একদম পারফেক্ট সমাধান।',
      en: 'Upnex It built a fully custom logistics software that fits our workflow perfectly. Tailored exactly to our requirements.',
    },
    {
      name: 'Sumaiya Rahman',
      company: 'Rahman Garments Ltd.',
      location: 'Gazipur, Bangladesh',
      rating: 5,
      bn: 'ইনভেন্টরি, প্রোডাকশন আর HR — সব একটি কাস্টম ERP-তে। Upnex It এর টিম সত্যিই দারুণ কাজ করেছে।',
      en: 'Inventory, production and HR — all unified in one custom ERP. The Upnex It team executed brilliantly from start to finish.',
      female: true,
    },
    {
      name: 'Imran Hossain',
      company: 'BD Trade House',
      location: 'Narayanganj, Bangladesh',
      rating: 5,
      bn: 'আমাদের ব্যবসার ইউনিক প্রবলেমগুলো বুঝে কাস্টম সফটওয়্যার বানিয়ে দিয়েছে। প্রোডাক্টিভিটি বহুগুণ বেড়েছে।',
      en: 'They understood the unique pain points of our business and delivered a custom solution. Our productivity multiplied.',
    },
    {
      name: 'Naima Akter',
      company: 'Aroma Foods',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      bn: 'POS, অ্যাকাউন্টিং আর রিপোর্টিং সব এক জায়গায় — আমাদের চেইন আউটলেট ম্যানেজমেন্ট অনেক সহজ হয়েছে।',
      en: 'POS, accounting and reporting in one platform — managing our chain outlets is now incredibly easy.',
      female: true,
    },
    {
      name: 'Sajid Karim',
      company: 'Karim Real Estate',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      bn: 'ক্লায়েন্ট ম্যানেজমেন্ট আর কমিশন ক্যালকুলেশনের জন্য পারফেক্ট কাস্টম সলিউশন পেয়েছি Upnex It থেকে।',
      en: 'We received the perfect custom solution for client management and commission calculation from Upnex It.',
    },
  ],

  web: [
    {
      name: 'Arif Hossain',
      company: 'Hossain Builders',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      bn: 'Upnex It আমাদের কোম্পানির জন্য চমৎকার একটি ওয়েবসাইট তৈরি করেছে। ডিজাইন, স্পিড আর SEO — সবকিছু টপ ক্লাস।',
      en: 'Upnex It built a stunning website for our company. The design, speed and SEO quality are absolutely top class.',
    },
    {
      name: 'Rumana Sharmin',
      company: 'Shop & Style BD',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      bn: 'আমাদের ই-কমার্স ওয়েবসাইট চালু হবার পর সেল ৩ গুণ বেড়েছে। প্রফেশনাল ডিজাইন আর স্মুথ চেকআউট।',
      en: 'After launching our e-commerce site our sales tripled. Professional design and a buttery-smooth checkout experience.',
      female: true,
    },
    {
      name: 'Habib Rahman',
      company: 'Rahman Travels',
      location: 'Sylhet, Bangladesh',
      rating: 5,
      bn: 'বুকিং সিস্টেম সহ আমাদের ট্রাভেল এজেন্সির ওয়েবসাইট তৈরি করে দিয়েছে। কাজের মান অসাধারণ।',
      en: 'They built our travel agency website complete with a booking system. The quality of work is outstanding.',
    },
    {
      name: 'Tasnim Jahan',
      company: 'Bloom Fashion',
      location: 'Chattogram, Bangladesh',
      rating: 5,
      bn: 'মোবাইল রেসপন্সিভ আর সুপার ফাস্ট। SEO র‍্যাঙ্কিং Google-এ অনেক ভালো এসেছে।',
      en: 'Mobile responsive and blazing fast. Our Google SEO rankings improved dramatically after the launch.',
      female: true,
    },
    {
      name: 'Saiful Islam',
      company: 'Islam Properties',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      bn: 'কাস্টম প্রোপার্টি লিস্টিং পোর্টাল — পুরোপুরি আমাদের চাহিদা অনুযায়ী। Upnex It-কে ধন্যবাদ।',
      en: 'A custom property listing portal built exactly to our needs. Huge thanks to the Upnex It team.',
    },
  ],

  graphics: [
    {
      name: 'Mehedi Hasan',
      company: 'Mehedi Brand Studio',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      bn: 'লোগো, ব্যানার আর সোশ্যাল মিডিয়া পোস্টের ডিজাইন একদম প্রিমিয়াম মানের। ক্লায়েন্টরা মুগ্ধ।',
      en: 'Logo, banner and social media post designs are absolutely premium quality. Our clients were genuinely impressed.',
    },
    {
      name: 'Sharmin Akter',
      company: 'Akter Boutique',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      bn: 'ব্র্যান্ড আইডেন্টিটি ডিজাইন এতটাই প্রফেশনাল যে আমাদের পুরো ব্র্যান্ডিং নতুন উচ্চতায় পৌঁছেছে।',
      en: 'The brand identity design was so professional that it elevated our entire brand to a new level.',
      female: true,
    },
    {
      name: 'Jubair Ahmed',
      company: 'Cafe Aroma',
      location: 'Chattogram, Bangladesh',
      rating: 5,
      bn: 'মেনু কার্ড, প্যাকেজিং আর ব্যানার ডিজাইন — Upnex It-এর গ্রাফিক্স টিম সত্যিই ক্রিয়েটিভ।',
      en: 'Menu cards, packaging and banner designs — the Upnex It graphics team is truly creative and professional.',
    },
    {
      name: 'Nusrat Jahan',
      company: 'Glow Beauty Salon',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      bn: 'সোশ্যাল মিডিয়ার জন্য প্রতি মাসে নতুন ডিজাইন — দ্রুত ডেলিভারি আর অসাধারণ কোয়ালিটি।',
      en: 'Fresh social media designs delivered every month — fast turnaround and exceptional quality.',
      female: true,
    },
    {
      name: 'Asif Iqbal',
      company: 'Iqbal Enterprise',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      bn: 'কোম্পানি প্রোফাইল, ভিজিটিং কার্ড আর ব্রশিয়ার — সবকিছু প্রফেশনাল এবং ইউনিক ডিজাইন।',
      en: 'Company profile, business cards and brochures — every deliverable was unique and professional.',
    },
  ],

  boosting: [
    {
      name: 'Shahriar Kabir',
      company: 'Kabir Electronics',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      bn: 'Facebook বুস্টিং করে আমাদের সেল ২ মাসে দ্বিগুণ হয়েছে। ROI অসাধারণ।',
      en: 'Facebook boosting doubled our sales within just two months. The ROI is absolutely outstanding.',
    },
    {
      name: 'Tahmina Sultana',
      company: 'Sultana Fashion House',
      location: 'Chattogram, Bangladesh',
      rating: 5,
      bn: 'টার্গেটেড অডিয়েন্সে অ্যাড পৌঁছানোর কারণে আমাদের অনলাইন অর্ডার অনেক বেড়েছে।',
      en: 'Reaching the right targeted audience with their ads boosted our online orders significantly.',
      female: true,
    },
    {
      name: 'Rashed Khan',
      company: 'Khan Mobile Hub',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      bn: 'Google Ads ও Facebook Ads দুটোতেই দারুণ রেজাল্ট পেয়েছি। ম্যানেজার খুবই হেল্পফুল।',
      en: 'We received excellent results from both Google Ads and Facebook Ads. The account manager is exceptionally helpful.',
    },
    {
      name: 'Lamia Hossain',
      company: 'Lamia Beauty Care',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      bn: 'সাপ্তাহিক রিপোর্ট আর অপ্টিমাইজেশন — সবকিছু খুব ট্রান্সপারেন্ট। Upnex It-কে ধন্যবাদ।',
      en: 'Weekly reports and continuous optimization — everything stays fully transparent. Big thanks to Upnex It.',
      female: true,
    },
    {
      name: 'Mahbub Alam',
      company: 'Alam Travel Agency',
      location: 'Sylhet, Bangladesh',
      rating: 5,
      bn: 'ডিজিটাল মার্কেটিং সার্ভিস নেওয়ার পর আমাদের ব্র্যান্ড অ্যাওয়ারনেস বহুগুণ বেড়েছে।',
      en: 'After taking their digital marketing service our brand awareness grew exponentially.',
    },
  ],
};

export const serviceLabels: Record<ServiceReviewKey, { bn: string; en: string }> = {
  school:   { bn: 'স্কুল ম্যানেজমেন্ট', en: 'School Management' },
  hospital: { bn: 'হাসপাতাল ম্যানেজমেন্ট', en: 'Hospital Management' },
  custom:   { bn: 'কাস্টম সফটওয়্যার', en: 'Custom Software' },
  web:      { bn: 'ওয়েব ডেভেলপমেন্ট', en: 'Web Development' },
  graphics: { bn: 'গ্রাফিক্স ডিজাইন', en: 'Graphics Design' },
  boosting: { bn: 'ডিজিটাল মার্কেটিং', en: 'Digital Marketing' },
};

export const serviceGradients: Record<ServiceReviewKey, string> = {
  school:   'from-emerald-400 via-teal-500 to-cyan-600',
  hospital: 'from-rose-400 via-pink-500 to-red-500',
  custom:   'from-indigo-500 via-violet-500 to-fuchsia-500',
  web:      'from-sky-400 via-blue-500 to-indigo-600',
  graphics: 'from-amber-400 via-orange-500 to-pink-500',
  boosting: 'from-lime-400 via-green-500 to-emerald-600',
};

// Suppress unused-import warning if consumers tree-shake icons elsewhere
export type _ReviewIcon = LucideIcon;