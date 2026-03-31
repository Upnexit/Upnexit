import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, AlertTriangle, CreditCard, Scale, RefreshCw, Ban, Globe, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';

  const lastUpdated = isBn ? '৩১ মার্চ, ২০২৬' : 'March 31, 2026';

  const sections = isBn ? [
    {
      icon: FileText,
      title: 'সেবার শর্তাবলী গ্রহণ',
      content: [
        'আমাদের ওয়েবসাইট ব্যবহার বা সেবা গ্রহণের মাধ্যমে আপনি নিম্নলিখিত শর্তাবলী মেনে নিচ্ছেন:',
        '• আপনাকে অবশ্যই ১৮ বছর বা তার বেশি বয়সের হতে হবে অথবা অভিভাবকের অনুমতি থাকতে হবে।',
        '• আপনি সঠিক ও সত্য তথ্য প্রদান করবেন।',
        '• আপনি আমাদের সেবা কোনো অবৈধ কাজে ব্যবহার করবেন না।',
        '• এই শর্তাবলী যেকোনো সময় পরিবর্তন হতে পারে এবং পরিবর্তনের পর ব্যবহার অব্যাহত রাখলে তা মেনে নেওয়া হিসেবে গণ্য হবে।',
      ],
    },
    {
      icon: Globe,
      title: 'আমাদের সেবাসমূহ',
      content: [
        'Upnex It নিম্নলিখিত সফটওয়্যার সেবা প্রদান করে:',
        '• কাস্টম ওয়েবসাইট ডিজাইন ও ডেভেলপমেন্ট।',
        '• মোবাইল অ্যাপ্লিকেশন ডেভেলপমেন্ট।',
        '• ই-কমার্স সলিউশন ও ম্যানেজমেন্ট সিস্টেম।',
        '• UI/UX ডিজাইন ও ব্র্যান্ডিং।',
        '• SEO ও ডিজিটাল মার্কেটিং সেবা।',
        '• সেবার পরিসর ও মূল্য প্রকল্প অনুযায়ী পরিবর্তিত হতে পারে।',
      ],
    },
    {
      icon: CreditCard,
      title: 'অর্ডার ও পেমেন্ট',
      content: [
        '• অর্ডার কনফার্ম হওয়ার পর প্রকল্পের কাজ শুরু করা হয়।',
        '• পেমেন্ট শর্তাবলী প্রকল্পের ধরন অনুযায়ী নির্ধারিত হবে।',
        '• সাধারণত প্রকল্প শুরুর আগে একটি অগ্রিম পেমেন্ট প্রয়োজন।',
        '• সম্পূর্ণ পেমেন্ট না হওয়া পর্যন্ত প্রকল্পের সম্পূর্ণ মালিকানা হস্তান্তর হবে না।',
        '• পেমেন্ট সংক্রান্ত যেকোনো বিরোধ ৭ কার্যদিবসের মধ্যে জানাতে হবে।',
      ],
    },
    {
      icon: RefreshCw,
      title: 'রিফান্ড ও বাতিলকরণ নীতি',
      content: [
        '• প্রকল্পের কাজ শুরু হওয়ার পূর্বে বাতিলকরণের ক্ষেত্রে সম্পূর্ণ অগ্রিম ফেরত দেওয়া হবে।',
        '• কাজ শুরু হওয়ার পর বাতিলকরণের ক্ষেত্রে সম্পন্ন কাজের পরিমাণ অনুযায়ী রিফান্ড নির্ধারিত হবে।',
        '• সম্পূর্ণ ডেলিভারি ও অনুমোদনের পর রিফান্ড প্রযোজ্য নয়।',
        '• রিফান্ডের অনুরোধ লিখিতভাবে (ইমেইলে) জানাতে হবে।',
      ],
    },
    {
      icon: Scale,
      title: 'মেধাস্বত্ব ও মালিকানা',
      content: [
        '• সম্পূর্ণ পেমেন্ট সাপেক্ষে কাস্টম ডেভেলপ করা সফটওয়্যারের মালিকানা ক্লায়েন্টের কাছে হস্তান্তর হবে।',
        '• তৃতীয় পক্ষের লাইসেন্সকৃত উপাদান (যেমন: ফন্ট, ইমেজ, প্লাগইন) তাদের নিজ নিজ লাইসেন্স শর্তানুযায়ী প্রযোজ্য।',
        '• পোর্টফোলিওতে প্রকল্পটি প্রদর্শনের অধিকার Upnex It সংরক্ষণ করে (ক্লায়েন্টের লিখিত আপত্তি না থাকলে)।',
        '• ওপেন-সোর্স কম্পোনেন্ট ব্যবহৃত হলে তাদের নিজ নিজ লাইসেন্স শর্ত প্রযোজ্য হবে।',
      ],
    },
    {
      icon: AlertTriangle,
      title: 'দায়বদ্ধতার সীমাবদ্ধতা',
      content: [
        '• আমাদের সেবা "যেমন আছে" ভিত্তিতে প্রদান করা হয়।',
        '• তৃতীয় পক্ষের সেবা (হোস্টিং, ডোমেইন, API) সম্পর্কিত কোনো সমস্যার জন্য আমরা সরাসরি দায়ী নই।',
        '• সার্ভার ডাউনটাইম, ডেটা লস বা সাইবার আক্রমণজনিত ক্ষতির জন্য আমাদের দায়বদ্ধতা সীমিত।',
        '• কোনো ক্ষেত্রেই আমাদের মোট দায়বদ্ধতা ক্লায়েন্টের প্রদত্ত মোট পেমেন্টের অতিরিক্ত হবে না।',
      ],
    },
    {
      icon: Ban,
      title: 'নিষিদ্ধ ব্যবহার',
      content: [
        'আপনি আমাদের সেবা নিম্নলিখিত উদ্দেশ্যে ব্যবহার করতে পারবেন না:',
        '• কোনো অবৈধ বা প্রতারণামূলক কার্যকলাপ।',
        '• ম্যালওয়্যার, ভাইরাস বা ক্ষতিকর কোড বিতরণ।',
        '• অন্য ব্যবহারকারীদের তথ্য অননুমোদিতভাবে সংগ্রহ।',
        '• আমাদের সিস্টেমে অননুমোদিত প্রবেশ বা হ্যাকিংয়ের চেষ্টা।',
      ],
    },
    {
      icon: Mail,
      title: 'যোগাযোগ',
      content: [
        'এই শর্তাবলী সম্পর্কে কোনো প্রশ্ন বা উদ্বেগ থাকলে আমাদের সাথে যোগাযোগ করুন:',
        '• **ইমেইল:** upnex360@gmail.com',
        '• **ফোন:** +880 1628112731',
        '• **ঠিকানা:** সাপাহার, নওগাঁ, বাংলাদেশ',
      ],
    },
  ] : [
    {
      icon: FileText,
      title: 'Acceptance of Terms',
      content: [
        'By using our website or services, you agree to the following terms:',
        '• You must be at least 18 years old or have parental consent.',
        '• You will provide accurate and truthful information.',
        '• You will not use our services for any illegal activities.',
        '• These terms may change at any time, and continued use after changes constitutes acceptance.',
      ],
    },
    {
      icon: Globe,
      title: 'Our Services',
      content: [
        'Upnex It provides the following software services:',
        '• Custom website design and development.',
        '• Mobile application development.',
        '• E-commerce solutions and management systems.',
        '• UI/UX design and branding.',
        '• SEO and digital marketing services.',
        '• Service scope and pricing may vary based on project requirements.',
      ],
    },
    {
      icon: CreditCard,
      title: 'Orders & Payments',
      content: [
        '• Project work begins after order confirmation.',
        '• Payment terms are determined based on the project type.',
        '• An advance payment is typically required before project initiation.',
        '• Full project ownership is not transferred until complete payment is received.',
        '• Any payment disputes must be reported within 7 business days.',
      ],
    },
    {
      icon: RefreshCw,
      title: 'Refund & Cancellation Policy',
      content: [
        '• Full advance refund is available if cancelled before project work begins.',
        '• Refunds after work has started are determined based on the amount of work completed.',
        '• Refunds are not applicable after full delivery and approval.',
        '• Refund requests must be submitted in writing (via email).',
      ],
    },
    {
      icon: Scale,
      title: 'Intellectual Property & Ownership',
      content: [
        '• Ownership of custom-developed software transfers to the client upon full payment.',
        '• Third-party licensed components (fonts, images, plugins) are subject to their respective license terms.',
        '• Upnex It reserves the right to showcase the project in its portfolio (unless the client objects in writing).',
        '• If open-source components are used, their respective license terms apply.',
      ],
    },
    {
      icon: AlertTriangle,
      title: 'Limitation of Liability',
      content: [
        '• Our services are provided on an "as is" basis.',
        '• We are not directly responsible for issues related to third-party services (hosting, domain, API).',
        '• Our liability for server downtime, data loss, or cyber attack damages is limited.',
        '• In no case shall our total liability exceed the total payment made by the client.',
      ],
    },
    {
      icon: Ban,
      title: 'Prohibited Use',
      content: [
        'You may not use our services for the following purposes:',
        '• Any illegal or fraudulent activities.',
        '• Distribution of malware, viruses, or harmful code.',
        '• Unauthorized collection of other users\' data.',
        '• Unauthorized access or hacking attempts on our systems.',
      ],
    },
    {
      icon: Mail,
      title: 'Contact Us',
      content: [
        'If you have any questions or concerns about these terms, please contact us:',
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
              <Scale className="h-4 w-4 text-secondary" />
              <span className="text-white/80 text-sm font-medium">
                {isBn ? 'আইনি শর্তাবলী' : 'Legal Terms'}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              {isBn ? 'সেবার শর্তাবলী' : 'Terms of Service'}
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
                ? 'Upnex It-এর ওয়েবসাইট ও সেবা ব্যবহার করার পূর্বে অনুগ্রহ করে নিম্নলিখিত শর্তাবলী মনোযোগ সহকারে পড়ুন। আমাদের সেবা ব্যবহারের মাধ্যমে আপনি এই শর্তাবলী মেনে নিচ্ছেন বলে গণ্য হবে।'
                : 'Please read the following terms and conditions carefully before using Upnex It\'s website and services. By using our services, you are deemed to have accepted these terms and conditions.'}
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

export default TermsOfService;
