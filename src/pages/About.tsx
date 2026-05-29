import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeamSlider from '@/components/TeamSlider';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Shield, Clock, Heart, Users, Code2, Award, Target, Eye, Sparkles, ArrowRight, Star, TrendingUp, Lightbulb, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import InternalLinks from '@/components/InternalLinks';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const About = () => {
  const { t, lang } = useLanguage();
  const reasonIcons = [Zap, Shield, Clock, Heart];

  // Fetch all team members from DB
  const { data: allMembers = [] } = useQuery({
    queryKey: ['team-members-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return data;
    },
  });

  const founders = allMembers.filter(m => m.is_founder);
  const teamMembers = allMembers.filter(m => !m.is_founder).map(m => ({
    name: m.name,
    role: m.role,
    image: m.image_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
  }));

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
    <div className="min-h-screen bg-background pb-0 overflow-x-hidden">
      <SEOHead
        title="About Upnex It — Software Company in Naogaon"
        description="Learn about Upnex It — a Naogaon-based software company building School, Hospital, and Custom Software solutions across Bangladesh."
        canonical="https://upnexit.pro.bd/about"
        keywords="about upnex it, software company naogaon, IT company rajshahi, software developer bangladesh, tech startup bangladesh, আপনেক্স আইটি, সফটওয়্যার কোম্পানি নওগাঁ, আইটি কোম্পানি রাজশাহী, best software company rajshahi division"
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
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 text-foreground"
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
      <section className="py-10 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 mb-10 md:mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 border border-primary/15 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, hsl(145 63% 32% / 0.05), hsl(145 63% 32% / 0.02))' }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 gradient-accent rounded-t-2xl sm:rounded-t-3xl" />
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-5">
                <Target className="h-5 w-5 sm:h-7 sm:w-7 text-primary" />
              </div>
              <h2 className="text-sm sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3">
                {lang === 'bn' ? 'আমাদের মিশন' : 'Our Mission'}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
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
              className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 border border-secondary/20 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, hsl(46 92% 55% / 0.06), hsl(46 92% 55% / 0.02))' }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 gradient-yellow rounded-t-2xl sm:rounded-t-3xl" />
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-secondary/15 flex items-center justify-center mb-3 sm:mb-5">
                <Eye className="h-5 w-5 sm:h-7 sm:w-7 text-secondary" />
              </div>
              <h2 className="text-sm sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3">
                {lang === 'bn' ? 'আমাদের ভিশন' : 'Our Vision'}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
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
              <div className="bg-background rounded-2xl sm:rounded-3xl border border-border p-4 sm:p-6 md:p-8 shadow-elevated relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 gradient-accent rounded-t-3xl" />
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {[
                    { icon: Users, num: '10+', label: lang === 'bn' ? 'সন্তুষ্ট ক্লায়েন্ট' : 'Happy Clients', color: 'primary' },
                    { icon: Code2, num: '50+', label: lang === 'bn' ? 'সম্পন্ন প্রজেক্ট' : 'Projects Done', color: 'secondary' },
                    { icon: Award, num: '2+', label: lang === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years Experience', color: 'primary' },
                    { icon: Shield, num: '99%', label: lang === 'bn' ? 'ক্লায়েন্ট সন্তুষ্টি' : 'Satisfaction', color: 'secondary' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className={`p-3 sm:p-5 rounded-xl sm:rounded-2xl text-center border transition-all ${
                        item.color === 'primary' ? 'bg-primary/5 border-primary/10 hover:border-primary/25' : 'bg-secondary/8 border-secondary/15 hover:border-secondary/30'
                      }`}
                    >
                      <item.icon className={`h-7 w-7 mx-auto mb-2 ${item.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                      <p className="text-lg sm:text-2xl md:text-3xl font-black text-foreground">{item.num}</p>
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
      <section className="py-10 md:py-20 bg-muted/30">
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-background rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-border hover:border-primary/20 hover:shadow-elevated transition-all text-center group"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center mx-auto mb-3 sm:mb-5 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                  <v.icon className="h-5 w-5 sm:h-7 sm:w-7 text-primary" />
                </div>
                <h3 className="font-bold text-xs sm:text-base text-foreground mb-1 group-hover:text-primary transition-colors">{v.title}</h3>
                <p className="text-[10px] sm:text-sm text-muted-foreground leading-relaxed hidden sm:block">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section - from DB */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary/15 mb-5" style={{ color: 'hsl(40 95% 38%)' }}>
              Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 text-foreground tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Founder</span>{' '}
              of the Company
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
              {lang === 'bn' ? 'অভিজ্ঞ ও দূরদর্শী নেতৃত্বের অধীনে আমরা এগিয়ে যাচ্ছি' : 'Moving forward under experienced and visionary leadership'}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto">
            {founders.map((leader, i) => {
              const isMehedi = leader.name.toLowerCase().includes('mehedi');
              const profileUrl = isMehedi ? 'https://mehedihassan.iam.bd/' : `/about/${isMehedi ? 'mehedi-hasan' : 'arafat-rahman'}`;
              const LinkWrapper = isMehedi ? 'a' : Link;
              const linkProps = isMehedi ? { href: profileUrl, target: '_blank', rel: 'noopener noreferrer' } : { to: profileUrl };

              return (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -6 }}
                  className="bg-background rounded-2xl sm:rounded-3xl border border-border hover:border-primary/20 hover:shadow-elevated transition-all group relative overflow-hidden flex flex-col"
                >
                  <LinkWrapper {...linkProps} className="block" aria-label={`View profile of ${leader.name}`}>
                    <div className="relative h-56 sm:h-72 md:h-80 overflow-hidden rounded-t-2xl sm:rounded-t-3xl cursor-pointer">
                      <img
                        src={leader.image_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'}
                        alt={`${leader.name} - ${leader.role} of Upnex It, Naogaon Bangladesh`}
                        title={`${leader.name} - ${leader.role}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                      <div className="absolute bottom-2 sm:bottom-4 left-3 sm:left-5 right-3 sm:right-5">
                        <h3 className="font-bold text-sm sm:text-lg text-primary-foreground">{leader.name}</h3>
                        <span className="inline-block mt-0.5 sm:mt-1 px-2 sm:px-3 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider bg-primary/80 text-primary-foreground">
                          {leader.role}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 sm:p-5 md:p-6">
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">{leader.bio || ''}</p>
                      <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                        {lang === 'bn' ? 'বিস্তারিত প্রোফাইল দেখুন' : 'View full profile'}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </LinkWrapper>

                  {/* Portfolio button for Mehedi Hasan */}
                  {isMehedi && (
                    <div className="px-3 sm:px-5 md:px-6 pb-3 sm:pb-5 md:pb-6 mt-auto">
                      <a
                        href="https://mehedihassan.iam.bd/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md hover:from-primary/90 hover:to-primary transition-all duration-300 group/btn"
                      >
                        <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover/btn:scale-110 transition-transform" />
                        {lang === 'bn' ? 'পার্সোনাল পোর্টফোলিও' : 'Personal Portfolio'}
                        <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section - from DB */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/8 text-primary mb-5">
              {lang === 'bn' ? 'আমাদের টিম' : 'Our Team'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 text-foreground tracking-tight" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              {lang === 'bn' ? 'আমাদের টিম মেম্বার' : 'Our Team Members'}
            </h2>
            <div className="flex flex-col items-center mt-2 gap-[3px]">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="block w-48 sm:w-64 md:w-80 h-[3px] rounded-full bg-accent origin-center"
              />
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
                className="block w-36 sm:w-48 md:w-60 h-[2px] rounded-full bg-accent/60 origin-center"
              />
            </div>
          </motion.div>

          {teamMembers.length > 0 ? (
            <TeamSlider team={teamMembers} />
          ) : (
            <p className="text-center text-muted-foreground">
              {lang === 'bn' ? 'টিম সদস্য লোড হচ্ছে...' : 'Loading team members...'}
            </p>
          )}
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
            {/* Grid texture overlay */}
            <div className="absolute inset-0 opacity-[0.08]" style={{
              backgroundImage: `
                linear-gradient(hsl(0 0% 100%) 1.5px, transparent 1.5px),
                linear-gradient(90deg, hsl(0 0% 100%) 1.5px, transparent 1.5px)
              `,
              backgroundSize: '48px 48px',
            }} />
            {/* Diagonal lines texture */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, hsl(0 0% 100%), hsl(0 0% 100%) 1px, transparent 1px, transparent 20px)',
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
                  {lang === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks exclude="/about" />
      <Footer />
    </div>
  );
};

export default About;
