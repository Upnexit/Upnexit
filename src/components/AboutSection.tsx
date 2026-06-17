import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Shield, Clock, Heart, Award, Users, Code2 } from 'lucide-react';

const AboutSection = () => {
  const { t, lang } = useLanguage();

  const reasonIcons = [Zap, Shield, Clock, Heart];

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-background via-secondary/15 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight text-foreground">{t.about.title}</h2>
            <p className="text-muted-foreground mb-3 leading-relaxed text-sm md:text-base">{t.about.p1}</p>
            <p className="text-muted-foreground mb-8 leading-relaxed text-sm md:text-base">{t.about.p2}</p>

            <h3 className="font-bold text-base md:text-lg mb-4 text-foreground">{t.about.whyUs}</h3>
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

          {/* Visual card - improved */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-background rounded-3xl border border-border p-6 md:p-8 shadow-elevated relative overflow-hidden">
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 gradient-accent rounded-t-3xl" />

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 mt-2 mb-6">
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
                    className={`p-4 rounded-2xl text-center border ${
                      item.color === 'primary'
                        ? 'bg-primary/5 border-primary/10'
                        : 'bg-secondary/8 border-secondary/15'
                    }`}
                  >
                    <item.icon className={`h-6 w-6 mx-auto mb-2 ${
                      item.color === 'primary' ? 'text-primary' : 'text-secondary'
                    }`} />
                    <p className="text-xl md:text-2xl font-black text-foreground">{item.num}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Progress bars */}
              <div className="space-y-3">
                {[
                  { label: lang === 'bn' ? 'কাস্টম সফটওয়্যার' : 'Custom Software', pct: 95, color: 'bg-primary' },
                  { label: lang === 'bn' ? 'মোবাইল অ্যাপ' : 'Mobile Apps', pct: 88, color: 'bg-secondary' },
                  { label: lang === 'bn' ? 'ওয়েব ডেভেলপমেন্ট' : 'Web Development', pct: 92, color: 'bg-primary' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-foreground">{item.label}</span>
                      <span className="text-muted-foreground">{item.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                        className={`h-full rounded-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: 'spring' }}
                className="absolute -bottom-2 -right-2 md:bottom-4 md:right-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-glow"
              >
                ✓ {lang === 'bn' ? 'বিশ্বস্ত' : 'Trusted'}
              </motion.div>
            </div>

            {/* Decorative blobs */}
            <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full" style={{ background: 'hsl(46 92% 55% / 0.1)' }} />
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full" style={{ background: 'hsl(145 63% 32% / 0.08)' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
