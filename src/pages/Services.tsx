import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { GraduationCap, HeartPulse, Code, Globe, ArrowUpRight, CheckCircle2, Layers, Monitor, Smartphone, Database, Cloud, Shield, ArrowRight, Sparkles, Palette, Megaphone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import InternalLinks from '@/components/InternalLinks';

const Services = () => {
  const { t, lang } = useLanguage();

  const services = [
    { icon: GraduationCap, ...t.services.school, accent: 'bg-primary/8 text-primary border-primary/15', gradient: 'from-primary/10 to-primary/5', slug: 'school' },
    { icon: HeartPulse, ...t.services.hospital, accent: 'bg-destructive/8 text-destructive border-destructive/15', gradient: 'from-destructive/10 to-destructive/5', slug: 'hospital' },
    { icon: Code, ...t.services.custom, accent: 'bg-secondary/15 text-secondary-foreground border-secondary/20', gradient: 'from-secondary/15 to-secondary/5', slug: 'custom' },
    { icon: Globe, ...t.services.web, accent: 'bg-primary/8 text-primary border-primary/15', gradient: 'from-primary/10 to-primary/5', slug: 'web' },
    { icon: Palette, ...t.services.graphics, accent: 'bg-secondary/15 text-secondary-foreground border-secondary/20', gradient: 'from-secondary/15 to-secondary/5', slug: 'graphics', comingSoon: true },
    { icon: Megaphone, ...t.services.boosting, accent: 'bg-destructive/8 text-destructive border-destructive/15', gradient: 'from-destructive/10 to-destructive/5', slug: 'boosting', comingSoon: true },
  ];

  const process = lang === 'bn'
    ? [
        { step: '০১', title: 'পরিকল্পনা', desc: 'আপনার প্রয়োজনীয়তা বিশ্লেষণ করে একটি বিস্তারিত পরিকল্পনা তৈরি করি।' },
        { step: '০২', title: 'ডিজাইন', desc: 'আকর্ষণীয় ও ব্যবহারবান্ধব UI/UX ডিজাইন তৈরি করি।' },
        { step: '০৩', title: 'ডেভেলপমেন্ট', desc: 'আধুনিক প্রযুক্তি ব্যবহার করে সফটওয়্যার তৈরি করি।' },
        { step: '০৪', title: 'ডেলিভারি ও সাপোর্ট', desc: 'সময়মতো ডেলিভারি এবং ফ্রি আফটার-সেলস সাপোর্ট।' },
      ]
    : [
        { step: '01', title: 'Planning', desc: 'We analyze your requirements and create a detailed plan.' },
        { step: '02', title: 'Design', desc: 'We create attractive and user-friendly UI/UX designs.' },
        { step: '03', title: 'Development', desc: 'We build software using modern technologies.' },
        { step: '04', title: 'Delivery & Support', desc: 'On-time delivery and free after-sales support.' },
      ];

  const techStack = [
    { icon: Monitor, label: 'React / Next.js' },
    { icon: Smartphone, label: 'React Native' },
    { icon: Database, label: 'PostgreSQL' },
    { icon: Cloud, label: 'Cloud Hosting' },
    { icon: Shield, label: 'Security First' },
    { icon: Layers, label: 'Scalable Architecture' },
  ];

  const features = lang === 'bn'
    ? [
        { title: 'রেসপন্সিভ ডিজাইন', desc: 'সব ডিভাইসে পারফেক্ট দেখায়' },
        { title: 'দ্রুত পারফরম্যান্স', desc: 'অপটিমাইজড কোড ও ক্যাশিং' },
        { title: 'SEO অপটিমাইজড', desc: 'সার্চ ইঞ্জিনে উপরে থাকুন' },
        { title: 'নিরাপদ ও স্কেলেবল', desc: 'এন্টারপ্রাইজ-গ্রেড সিকিউরিটি' },
        { title: 'API ইন্টিগ্রেশন', desc: 'থার্ড-পার্টি সার্ভিস সংযুক্ত করুন' },
        { title: 'রিয়েল-টাইম আপডেট', desc: 'লাইভ ডেটা সিঙ্ক্রোনাইজেশন' },
      ]
    : [
        { title: 'Responsive Design', desc: 'Looks perfect on all devices' },
        { title: 'Fast Performance', desc: 'Optimized code & caching' },
        { title: 'SEO Optimized', desc: 'Rank higher in search engines' },
        { title: 'Secure & Scalable', desc: 'Enterprise-grade security' },
        { title: 'API Integration', desc: 'Connect third-party services' },
        { title: 'Real-time Updates', desc: 'Live data synchronization' },
      ];

  return (
    <div className="min-h-screen pb-0 overflow-x-hidden">
      <SEOHead
        title="Software Services - Upnex It | সফটওয়্যার সেবাসমূহ"
        description="Upnex It offers School Management Software, Hospital Management Software, Custom Software Development & Web Applications in Bangladesh. Get a free demo today."
        canonical="https://upnexit.pro.bd/services"
        keywords="software services bangladesh, school management system, hospital management system, custom software development, web application development, ERP software bd, school ERP bangladesh, HMS software, clinic management software, e-commerce development bangladesh, সফটওয়্যার সেবা বাংলাদেশ, স্কুল ম্যানেজমেন্ট সিস্টেম, হসপিটাল ম্যানেজমেন্ট, কাস্টম সফটওয়্যার ডেভেলপমেন্ট"
      />
      {/* JSON-LD Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Upnex It Software Services",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "School Management Software", "url": "https://upnexit.pro.bd/services/school" },
              { "@type": "ListItem", "position": 2, "name": "Hospital Management Software", "url": "https://upnexit.pro.bd/services/hospital" },
              { "@type": "ListItem", "position": 3, "name": "Custom Software Development", "url": "https://upnexit.pro.bd/services/custom" },
              { "@type": "ListItem", "position": 4, "name": "Web Application Development", "url": "https://upnexit.pro.bd/services/web" }
            ]
          })
        }}
      />
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-24 pb-16 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(160deg, hsl(145 63% 96%) 0%, hsl(0 0% 100%) 25%, hsl(46 80% 96%) 55%, hsl(145 45% 94%) 100%)'
        }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(145 63% 32%) 1px, transparent 1px), linear-gradient(90deg, hsl(145 63% 32%) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 right-[10%] w-60 h-60 rounded-full"
            style={{ background: 'radial-gradient(circle, hsl(145 63% 42% / 0.08), transparent 70%)' }}
          />
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-20 left-[5%] w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle, hsl(46 92% 55% / 0.1), transparent 70%)' }}
          />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/8 text-primary mb-6"
          >
            <Sparkles className="h-3.5 w-3.5" /> Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 text-foreground"
          >
            {t.services.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-lg leading-relaxed"
          >
            {t.services.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Services Grid - Enhanced */}
      <section className="py-10 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
            {services.map((s, i) => {
              return (
              <Link to={`/services/${s.slug}`} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className={`group bg-gradient-to-br ${s.gradient} rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 border border-border hover:border-primary/25 transition-all duration-500 cursor-pointer relative overflow-hidden shadow-soft hover:shadow-elevated h-full`}
                >
                  {(s as any).comingSoon && (
                    <span className="absolute top-3 right-3 sm:top-4 sm:right-4 inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-secondary text-secondary-foreground border border-secondary/40 shadow-sm z-10">
                      <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> {t.services.comingSoon}
                    </span>
                  )}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.04]" style={{
                    backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
                    backgroundSize: '12px 12px',
                  }} />
                  {!(s as any).comingSoon && <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight className="h-5 w-5 text-primary" />
                  </div>}
                  <div className={`w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl ${s.accent} border flex items-center justify-center mb-3 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <s.icon className="h-5 w-5 sm:h-8 sm:w-8" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-lg md:text-xl mb-1 sm:mb-3 text-foreground group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed hidden sm:block">{s.desc}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500 rounded-b-3xl" />
                </motion.div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-10 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary/15 mb-5" style={{ color: 'hsl(40 95% 38%)' }}>
              {lang === 'bn' ? 'বৈশিষ্ট্যসমূহ' : 'Features'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
              {lang === 'bn' ? 'কেন আমাদের সফটওয়্যার বেছে নেবেন?' : 'Why Choose Our Software?'}
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-2.5 sm:gap-4 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-background border border-border hover:border-primary/20 hover:shadow-card transition-all group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-foreground mb-0.5 sm:mb-1">{f.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Timeline Style */}
      <section className="py-10 md:py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/8 text-primary mb-5">
              {lang === 'bn' ? 'প্রক্রিয়া' : 'Process'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
              {lang === 'bn' ? 'আমাদের কাজের প্রক্রিয়া' : 'Our Work Process'}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
              {lang === 'bn' ? 'আমরা একটি সুশৃঙ্খল প্রক্রিয়া অনুসরণ করি' : 'We follow a structured process'}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 relative">
            {/* Connection line (desktop) */}
            <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20" />
            {process.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative bg-background rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-border hover:border-primary/20 transition-all hover:shadow-elevated group"
              >
                {/* Step number circle */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full gradient-accent flex items-center justify-center mb-3 sm:mb-5 text-primary-foreground font-black text-sm sm:text-lg shadow-glow relative z-10">
                  {p.step}
                </div>
                <h3 className="font-bold text-sm sm:text-lg text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-10 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
              {lang === 'bn' ? 'আমাদের টেকনোলজি' : 'Our Technology Stack'}
            </h2>
          </motion.div>
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.08, y: -6 }}
                className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-2xl bg-background border border-border hover:border-primary/25 hover:shadow-elevated transition-all group relative overflow-hidden"
              >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                  background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.06), transparent 70%)'
                }} />
                <motion.div 
                  className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors relative z-10"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <tech.icon className="h-5 w-5 sm:h-7 sm:w-7 text-primary" />
                </motion.div>
                <span className="text-xs sm:text-xs font-bold text-foreground text-center relative z-10">{tech.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-8 md:p-14 text-center"
            style={{ background: 'var(--gradient-hero)' }}
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }} />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary-foreground mb-4">
                {lang === 'bn' ? 'আপনার প্রজেক্ট শুরু করুন' : 'Start Your Project Today'}
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto text-sm md:text-base">
                {lang === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন এবং ফ্রি কনসালটেশন নিন' : 'Contact us and get a free consultation'}
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-background text-foreground hover:bg-background/90 font-bold px-8 gap-2 rounded-xl shadow-elevated">
                  {t.hero.cta1} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks exclude="/services" />
      <Footer />
    </div>
  );
};

export default Services;
