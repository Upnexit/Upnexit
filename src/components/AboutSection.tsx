import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.about.title}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">{t.about.p1}</p>
            <p className="text-muted-foreground mb-8 leading-relaxed">{t.about.p2}</p>

            <h3 className="font-semibold text-lg mb-4 text-primary">{t.about.whyUs}</h3>
            <ul className="space-y-3">
              {t.about.reasons.map((r, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="gradient-card rounded-2xl border border-border/50 p-8 shadow-card">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <div className="h-3 rounded bg-primary/10 mb-2" style={{ width: `${80 - i * 10}%` }} />
                      <div className="h-2 rounded bg-muted" style={{ width: `${95 - i * 5}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 rounded-lg bg-primary/5 border border-primary/10" />
                ))}
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-primary/5 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
