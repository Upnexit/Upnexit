import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Shield, Clock, Heart, Users, Code2, Award, Target, Eye, Sparkles, ArrowRight, Star, TrendingUp, Lightbulb, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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

  const values = lang === 'bn'
    ? [
        { icon: Star, title: 'মানসম্মত কাজ', desc: 'প্রতিটি প্রজেক্টে সর্বোচ্চ মান নিশ্চিত করি' },
        { icon: TrendingUp, title: 'ক্রমাগত উন্নয়ন', desc: 'নতুন প্রযুক্তি শিখে নিজেদের আপডেট রাখি' },
        { icon: Lightbulb, title: 'সৃজনশীলতা', desc: 'প্রতিটি সমস্যার ইউনিক সমাধান খুঁজি' },
        { icon: Handshake, title: 'বিশ্বস্ততা', desc: 'ক্লায়েন্টদের সাথে দীর্ঘমেয়াদী সম্পর্ক তৈরি করি' },
      ]
    : [
        { icon: Star, title: 'Quality Work', desc: 'Ensuring highest quality in every project' },
        { icon: TrendingUp, title: 'Continuous Growth', desc: 'Staying updated with latest technologies' },
        { icon: Lightbulb, title: 'Creativity', desc: 'Finding unique solutions to every problem' },
        { icon: Handshake, title: 'Trust', desc: 'Building long-term relationships with clients' },
      ];

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(160deg, hsl(145 63% 96%) 0%, hsl(0 0% 100%) 25%, hsl(46 80% 96%) 55%, hsl(145 45% 94%) 100%)'
        }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(145 63% 32%) 1px, transparent 1px), linear-gradient(90deg, hsl(145 63% 32%) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-24 right-[12%] w-56 h-56 rounded-full"
            style={{ background: 'radial-gradient(circle, hsl(145 63% 42% / 0.08), transparent 70%)' }}
          />
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-16 left-[8%] w-72 h-72 rounded-full"
            style={{ background: 'radial-gradient(circle, hsl(46 92% 55% / 0.1), transparent 70%)' }}
          />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/8 text-primary mb-6"
          >
            <Sparkles className="h-3.5 w-3.5" /> About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-5 text-foreground"
          >
            {t.about.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-lg leading-relaxed"
          >
            {t.about.p1}
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full h-auto">
            <path d="M0 100L48 90C96 80 192 60 288 50C384 40 480 40 576 45C672 50 768 60 864 65C960 70 1056 70 1152 60C1248 50 1344 30 1392 20L1440 10V100H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl p-7 md:p-9 border border-primary/15 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, hsl(145 63% 32% / 0.05), hsl(145 63% 32% / 0.02))' }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 gradient-accent rounded-t-3xl" />
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                {lang === 'bn' ? 'আমাদের মিশন' : 'Our Mission'}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {lang === 'bn'
                  ? 'প্রযুক্তির মাধ্যমে বাংলাদেশের প্রতিষ্ঠানগুলোকে ডিজিটাল রূপান্তরে সহায়তা করা এবং সাশ্রয়ী মূল্যে মানসম্মত সফটওয়্যার প্রদান করা।'
                  : 'To help organizations in Bangladesh with digital transformation through technology and provide quality software at affordable prices.'
                }
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl p-7 md:p-9 border border-secondary/20 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, hsl(46 92% 55% / 0.06), hsl(46 92% 55% / 0.02))' }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 gradient-yellow rounded-t-3xl" />
              <div className="w-14 h-14 rounded-2xl bg-secondary/15 flex items-center justify-center mb-5">
                <Eye className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                {lang === 'bn' ? 'আমাদের ভিশন' : 'Our Vision'}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {lang === 'bn'
                  ? 'বাংলাদেশের শীর্ষস্থানীয় সফটওয়্যার কোম্পানি হিসেবে প্রতিষ্ঠিত হওয়া এবং আন্তর্জাতিক মানের সেবা প্রদান করা।'
                  : 'To be established as a leading software company in Bangladesh and provide world-class services.'
                }
              </p>
            </motion.div>
          </div>

          {/* Why Choose Us */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/8 text-primary mb-5">
                {lang === 'bn' ? 'কেন আমরা' : 'Why Us'}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-tight text-foreground">
                {t.about.whyUs}
              </h2>
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
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-muted/60 border border-border/50 hover:border-primary/20 hover:shadow-card transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{r}</span>
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
                      whileHover={{ scale: 1.05 }}
                      className={`p-5 rounded-2xl text-center border transition-all ${
                        item.color === 'primary' ? 'bg-primary/5 border-primary/10 hover:border-primary/25' : 'bg-secondary/8 border-secondary/15 hover:border-secondary/30'
                      }`}
                    >
                      <item.icon className={`h-7 w-7 mx-auto mb-2 ${item.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                      <p className="text-2xl md:text-3xl font-black text-foreground">{item.num}</p>
                      <p className="text-xs text-muted-foreground mt-1 font-medium">{item.label}</p>
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

      {/* Values Section */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/8 text-primary mb-5">
              {lang === 'bn' ? 'আমাদের মূল্যবোধ' : 'Our Values'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              {lang === 'bn' ? 'যে নীতিতে আমরা চলি' : 'Principles We Follow'}
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-background rounded-3xl p-7 border border-border hover:border-primary/20 hover:shadow-elevated transition-all text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                  <v.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary/15 mb-5" style={{ color: 'hsl(40 95% 38%)' }}>
              {lang === 'bn' ? 'আমাদের টিম' : 'Our Team'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
              {lang === 'bn' ? 'দক্ষ পেশাদারদের দল' : 'Expert Professionals'}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
              {lang === 'bn' ? 'অভিজ্ঞ ও দক্ষ পেশাদারদের নিয়ে আমাদের টিম' : 'Our team of experienced professionals'}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-background rounded-3xl p-7 border border-border hover:border-primary/20 hover:shadow-elevated transition-all text-center group relative overflow-hidden"
              >
                {/* Subtle background pattern */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.04]" style={{
                  backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
                  backgroundSize: '8px 8px',
                }} />
                <div className="w-24 h-24 rounded-3xl bg-primary/8 border-2 border-primary/15 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 group-hover:scale-105 group-hover:border-primary/25 transition-all duration-300">
                  <member.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                <p className="text-xs text-muted-foreground font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/30">
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
                {lang === 'bn' ? 'আমাদের সাথে কাজ করুন' : 'Work With Us'}
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto text-sm md:text-base">
                {lang === 'bn' ? 'আপনার আইডিয়া বাস্তবে রূপ দিতে আমরা প্রস্তুত' : 'We are ready to bring your ideas to life'}
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-background text-foreground hover:bg-background/90 font-bold px-8 gap-2 rounded-xl shadow-elevated">
                  {t.contact.title} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
