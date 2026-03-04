import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { GraduationCap, HeartPulse, Code, Globe, ArrowUpRight, CheckCircle2, Layers, Monitor, Smartphone, Database, Cloud, Shield } from 'lucide-react';

const Services = () => {
  const { t, lang } = useLanguage();

  const services = [
    { icon: GraduationCap, ...t.services.school, accent: 'bg-primary/8 text-primary border-primary/15' },
    { icon: HeartPulse, ...t.services.hospital, accent: 'bg-destructive/8 text-destructive border-destructive/15' },
    { icon: Code, ...t.services.custom, accent: 'bg-secondary/15 text-secondary-foreground border-secondary/20' },
    { icon: Globe, ...t.services.web, accent: 'bg-primary/8 text-primary border-primary/15' },
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(160deg, hsl(145 63% 96%) 0%, hsl(0 0% 100%) 25%, hsl(46 80% 96%) 55%, hsl(145 45% 94%) 100%)'
        }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(145 63% 32%) 1px, transparent 1px), linear-gradient(90deg, hsl(145 63% 32%) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/8 text-primary mb-5"
          >
            Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 text-foreground"
          >
            {t.services.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base"
          >
            {t.services.subtitle}
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto">
            <path d="M0 80L48 72C96 64 192 48 288 40C384 32 480 32 576 36C672 40 768 48 864 52C960 56 1056 56 1152 48C1248 40 1344 24 1392 16L1440 8V80H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-background rounded-2xl p-6 md:p-7 border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </div>
                <div className={`w-14 h-14 rounded-2xl ${s.accent} border flex items-center justify-center mb-5`}>
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-3 text-foreground group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-muted/40">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
              {lang === 'bn' ? 'আমাদের কাজের প্রক্রিয়া' : 'Our Work Process'}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
              {lang === 'bn' ? 'আমরা একটি সুশৃঙ্খল প্রক্রিয়া অনুসরণ করি' : 'We follow a structured process'}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-background rounded-2xl p-6 border border-border hover:border-primary/20 transition-all hover:shadow-card"
              >
                <span className="text-4xl font-black text-primary/15 absolute top-4 right-4">{p.step}</span>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section-padding">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-muted/50 border border-border hover:border-primary/20 hover:shadow-card transition-all"
              >
                <tech.icon className="h-8 w-8 text-primary" />
                <span className="text-xs font-semibold text-foreground text-center">{tech.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
