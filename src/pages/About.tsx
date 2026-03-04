import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Shield, Clock, Heart, Users, Code2, Award, Target, Eye } from 'lucide-react';

const About = () => {
  const { t, lang } = useLanguage();
  const reasonIcons = [Zap, Shield, Clock, Heart];

  const team = lang === 'bn'
    ? [
        { name: 'মোহাম্মদ আলী', role: 'সিইও ও ফাউন্ডার', icon: Target },
        { name: 'সাদিয়া রহমান', role: 'লিড ডেভেলপার', icon: Code2 },
        { name: 'রাকিব হাসান', role: 'UI/UX ডিজাইনার', icon: Eye },
        { name: 'ফাতেমা খাতুন', role: 'প্রজেক্ট ম্যানেজার', icon: Users },
      ]
    : [
        { name: 'Mohammad Ali', role: 'CEO & Founder', icon: Target },
        { name: 'Sadia Rahman', role: 'Lead Developer', icon: Code2 },
        { name: 'Rakib Hasan', role: 'UI/UX Designer', icon: Eye },
        { name: 'Fatema Khatun', role: 'Project Manager', icon: Users },
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
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 text-foreground"
          >
            {t.about.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base"
          >
            {t.about.p1}
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto">
            <path d="M0 80L48 72C96 64 192 48 288 40C384 32 480 32 576 36C672 40 768 48 864 52C960 56 1056 56 1152 48C1248 40 1344 24 1392 16L1440 8V80H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-tight text-foreground">
                {t.about.whyUs}
              </h2>
              <p className="text-muted-foreground mb-3 leading-relaxed text-sm md:text-base">{t.about.p1}</p>
              <p className="text-muted-foreground mb-8 leading-relaxed text-sm md:text-base">{t.about.p2}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.about.reasons.map((r, i) => {
                  const Icon = reasonIcons[i] || CheckCircle2;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/60 border border-border/50 hover:border-primary/20 hover:shadow-sm transition-all"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{r}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-background rounded-3xl border border-border p-6 md:p-8 shadow-elevated relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 gradient-accent rounded-t-3xl" />
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {[
                    { icon: Users, num: '150+', label: lang === 'bn' ? 'সন্তুষ্ট ক্লায়েন্ট' : 'Happy Clients', color: 'primary' },
                    { icon: Code2, num: '200+', label: lang === 'bn' ? 'সম্পন্ন প্রজেক্ট' : 'Projects Done', color: 'secondary' },
                    { icon: Award, num: '8+', label: lang === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years Experience', color: 'primary' },
                    { icon: Shield, num: '99%', label: lang === 'bn' ? 'ক্লায়েন্ট সন্তুষ্টি' : 'Satisfaction', color: 'secondary' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className={`p-4 rounded-2xl text-center border ${
                        item.color === 'primary' ? 'bg-primary/5 border-primary/10' : 'bg-secondary/8 border-secondary/15'
                      }`}
                    >
                      <item.icon className={`h-6 w-6 mx-auto mb-2 ${item.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                      <p className="text-xl md:text-2xl font-black text-foreground">{item.num}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full" style={{ background: 'hsl(46 92% 55% / 0.1)' }} />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full" style={{ background: 'hsl(145 63% 32% / 0.08)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-muted/40">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
              {lang === 'bn' ? 'আমাদের টিম' : 'Our Team'}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              {lang === 'bn' ? 'অভিজ্ঞ ও দক্ষ পেশাদারদের নিয়ে আমাদের টিম' : 'Our team of experienced professionals'}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background rounded-2xl p-6 border border-border hover:border-primary/20 hover:shadow-card transition-all text-center group"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 transition-colors">
                  <member.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
