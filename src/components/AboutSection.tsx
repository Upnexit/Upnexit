import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Shield, Clock, Heart } from 'lucide-react';

const AboutSection = () => {
  const { t } = useLanguage();

  const reasonIcons = [Zap, Shield, Clock, Heart];

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/8 text-primary mb-5">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">{t.about.title}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed text-sm md:text-base">{t.about.p1}</p>
            <p className="text-muted-foreground mb-8 leading-relaxed text-sm md:text-base">{t.about.p2}</p>

            <h3 className="font-bold text-base md:text-lg mb-5 text-foreground">{t.about.whyUs}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.about.reasons.map((r, i) => {
                const Icon = reasonIcons[i] || CheckCircle2;
                return (
                  <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/50 border border-border/50">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{r}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-background rounded-3xl border border-border p-6 md:p-8 shadow-elevated relative overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 right-0 h-1 gradient-accent rounded-t-3xl" />
              
              <div className="space-y-5 mt-2">
                {[
                  { w1: '80%', w2: '95%', color: 'bg-primary' },
                  { w1: '65%', w2: '88%', color: 'bg-secondary' },
                  { w1: '75%', w2: '92%', color: 'bg-primary' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <div className={`w-3 h-3 rounded-full ${item.color} shrink-0`} />
                    <div className="flex-1">
                      <div className="h-3 rounded-full bg-primary/10 mb-2" style={{ width: item.w1 }} />
                      <div className="h-2 rounded-full bg-muted" style={{ width: item.w2 }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {['primary', 'secondary', 'primary'].map((c, i) => (
                  <div key={i} className={`h-24 md:h-28 rounded-2xl ${c === 'primary' ? 'bg-primary/5 border border-primary/10' : 'bg-secondary/10 border border-secondary/15'} flex items-center justify-center`}>
                    <div className={`w-10 h-10 rounded-xl ${c === 'primary' ? 'bg-primary/15' : 'bg-secondary/20'}`} />
                  </div>
                ))}
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-3 -right-3 md:bottom-4 md:right-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-glow">
                ✓ Trusted
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full" style={{ background: 'hsl(46 92% 55% / 0.08)' }} />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full" style={{ background: 'hsl(145 63% 32% / 0.06)' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
