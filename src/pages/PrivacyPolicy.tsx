import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye, Database, UserCheck, Bell, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';

  const lastUpdated = isBn ? '৩১ মার্চ, ২০২৬' : 'March 31, 2026';

  const sections = isBn ? [
    {
      icon: Database,
      title: 'তথ্য সংগ্রহ',
      content: [
        'আমরা আপনার সেবা ব্যবহারের অভিজ্ঞতা উন্নত করতে নিম্নলিখিত তথ্য সংগ্রহ করি:',
        '• **ব্যক্তিগত তথ্য:** নাম, ইমেইল, ফোন নম্বর — যা আপনি স্বেচ্ছায় আমাদের প্রদান করেন (যেমন: অর্ডার, যোগাযোগ ফর্ম বা অ্যাকাউন্ট তৈরির সময়)।',
        '• **স্বয়ংক্রিয় তথ্য:** ব্রাউজার তথ্য, IP অ্যাড্রেস, ডিভাইস তথ্য এবং পেজ ভিজিট সম্পর্কিত ডেটা — যা আপনার ব্রাউজিং অভিজ্ঞতা উন্নত করতে ব্যবহৃত হয়।',
        '• **কুকিজ ও ট্র্যাকিং:** ওয়েবসাইটের কার্যকারিতা ও পারফরম্যান্স বিশ্লেষণের জন্য আমরা কুকিজ ব্যবহার করি।',
      ],
    },
    {
      icon: Eye,
      title: 'তথ্য ব্যবহার',
      content: [
        'আমরা সংগৃহীত তথ্য নিম্নলিখিত উদ্দেশ্যে ব্যবহার করি:',
        '• আপনার অর্ডার প্রসেসিং এবং সেবা প্রদান।',
        '• অ্যাকাউন্ট ব্যবস্থাপনা ও নিরাপত্তা নিশ্চিত করা।',
        '• গ্রাহক সেবা সংক্রান্ত যোগাযোগ এবং অর্ডার আপডেট জানানো।',
        '• ওয়েবসাইট ও সেবার মান উন্নয়ন এবং ব্যবহারকারীর অভিজ্ঞতা বিশ্লেষণ।',
        '• আপনার সম্মতি সাপেক্ষে প্রোমোশনাল তথ্য পাঠানো।',
      ],
    },
    {
      icon: Lock,
      title: 'তথ্য সুরক্ষা',
      content: [
        'আপনার তথ্যের নিরাপত্তা আমাদের সর্বোচ্চ অগ্রাধিকার:',
        '• সকল ডেটা ট্রান্সমিশন SSL/TLS এনক্রিপশনের মাধ্যমে সুরক্ষিত।',
        '• পাসওয়ার্ড bcrypt হ্যাশিং ব্যবহার করে সংরক্ষিত হয় — আমরা কখনো প্লেইন-টেক্সট পাসওয়ার্ড সংরক্ষণ করি না।',
        '• ডেটাবেস Row Level Security (RLS) পলিসি দ্বারা সুরক্ষিত।',
        '• নিয়মিত নিরাপত্তা অডিট ও আপডেট পরিচালনা করা হয়।',
      ],
    },
    {
      icon: UserCheck,
      title: 'তৃতীয় পক্ষের সাথে তথ্য শেয়ারিং',
      content: [
        'আমরা আপনার ব্যক্তিগত তথ্য বিক্রি করি না। তবে নিম্নলিখিত ক্ষেত্রে তথ্য শেয়ার করা হতে পারে:',
        '• **সেবা প্রদানকারী অংশীদার:** ইমেইল পাঠানো, পেমেন্ট প্রসেসিং ইত্যাদির জন্য বিশ্বস্ত তৃতীয় পক্ষের সাথে।',
        '• **আইনি বাধ্যবাধকতা:** আইন বা আদালতের আদেশ অনুযায়ী প্রয়োজন হলে।',
        '• **সম্মতি সাপেক্ষে:** আপনার স্পষ্ট অনুমতি থাকলে।',
      ],
    },
    {
      icon: Bell,
      title: 'আপনার অধিকার',
      content: [
        'আপনার ব্যক্তিগত তথ্যের উপর আপনার পূর্ণ অধিকার রয়েছে:',
        '• আপনার সংরক্ষিত ডেটা দেখার এবং ডাউনলোড করার অধিকার।',
        '• ভুল বা অসম্পূর্ণ তথ্য সংশোধন করার অধিকার।',
        '• আপনার অ্যাকাউন্ট এবং সংশ্লিষ্ট ডেটা মুছে ফেলার অনুরোধ করার অধিকার।',
        '• প্রোমোশনাল ইমেইল থেকে সদস্যতা বাতিল করার অধিকার।',
      ],
    },
    {
      icon: Mail,
      title: 'যোগাযোগ',
      content: [
        'এই গোপনীয়তা নীতি সম্পর্কে কোনো প্রশ্ন বা উদ্বেগ থাকলে আমাদের সাথে যোগাযোগ করুন:',
        '• **ইমেইল:** upnex360@gmail.com',
        '• **ফোন:** +880 1628112731',
        '• **ঠিকানা:** সাপাহার, নওগাঁ, বাংলাদেশ',
      ],
    },
  ] : [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'We collect the following information to improve your experience:',
        '• **Personal Information:** Name, email, phone number — provided voluntarily through order forms, contact forms, or account registration.',
        '• **Automatic Information:** Browser details, IP address, device info, and page visit data — used to enhance your browsing experience.',
        '• **Cookies & Tracking:** We use cookies for website functionality and performance analytics.',
      ],
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'We use the collected information for the following purposes:',
        '• Processing your orders and providing services.',
        '• Managing your account and ensuring security.',
        '• Customer service communications and order updates.',
        '• Website and service improvement through usage analysis.',
        '• Sending promotional information with your consent.',
      ],
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'Your data security is our highest priority:',
        '• All data transmissions are secured with SSL/TLS encryption.',
        '• Passwords are stored using bcrypt hashing — we never store plain-text passwords.',
        '• Databases are protected by Row Level Security (RLS) policies.',
        '• Regular security audits and updates are conducted.',
      ],
    },
    {
      icon: UserCheck,
      title: 'Third-Party Sharing',
      content: [
        'We do not sell your personal information. However, we may share data in the following cases:',
        '• **Service Partners:** With trusted third parties for email delivery, payment processing, etc.',
        '• **Legal Obligations:** When required by law or court order.',
        '• **With Consent:** When you provide explicit permission.',
      ],
    },
    {
      icon: Bell,
      title: 'Your Rights',
      content: [
        'You have full rights over your personal data:',
        '• Right to access and download your stored data.',
        '• Right to correct inaccurate or incomplete information.',
        '• Right to request deletion of your account and associated data.',
        '• Right to unsubscribe from promotional emails.',
      ],
    },
    {
      icon: Mail,
      title: 'Contact Us',
      content: [
        'If you have any questions or concerns about this privacy policy, please contact us:',
        '• **Email:** upnex360@gmail.com',
        '• **Phone:** +880 1628112731',
        '• **Address:** Sapahar, Naogaon, Bangladesh',
      ],
    },
  ];

  const renderMarkdown = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
              <Shield className="h-4 w-4 text-secondary" />
              <span className="text-white/80 text-sm font-medium">
                {isBn ? 'আপনার তথ্য সুরক্ষিত' : 'Your Data is Protected'}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              {isBn ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
            </h1>
            <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto">
              {isBn
                ? `সর্বশেষ আপডেট: ${lastUpdated}`
                : `Last updated: ${lastUpdated}`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Intro */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-muted/30 border border-border rounded-2xl p-6 md:p-8 mb-10">
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {isBn
                ? 'Upnex It ("আমরা", "আমাদের") আপনার গোপনীয়তাকে অত্যন্ত গুরুত্বের সাথে বিবেচনা করে। এই গোপনীয়তা নীতি ব্যাখ্যা করে কিভাবে আমরা আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার, সংরক্ষণ এবং সুরক্ষা করি। আমাদের ওয়েবসাইট বা সেবা ব্যবহার করে আপনি এই নীতির শর্তাবলী মেনে নিচ্ছেন।'
                : 'Upnex It ("we", "our", "us") takes your privacy very seriously. This Privacy Policy explains how we collect, use, store, and protect your personal information. By using our website or services, you agree to the terms of this policy.'}
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, idx) => (
              <motion.div key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (idx + 3) }}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-foreground">{section.title}</h2>
                </div>
                <div className="space-y-3 pl-[52px]">
                  {section.content.map((line, i) => (
                    <p key={i} className="text-muted-foreground text-sm md:text-[15px] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(line) }} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
