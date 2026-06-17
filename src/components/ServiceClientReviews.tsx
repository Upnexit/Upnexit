import { motion } from 'framer-motion';
import { Star, Quote, MapPin, BadgeCheck } from 'lucide-react';
import {
  serviceReviews,
  serviceGradients,
  serviceLabels,
  type ServiceReviewKey,
} from '@/data/serviceReviews';

interface Props {
  serviceKey: ServiceReviewKey;
}

/**
 * Service-detail "Client Reviews" section — always English, bold display
 * typography, 5 reviews tailored to the current service.
 */
const ServiceClientReviews = ({ serviceKey }: Props) => {
  const reviews = serviceReviews[serviceKey];
  if (!reviews || reviews.length === 0) return null;

  const gradient = serviceGradients[serviceKey];
  const label = serviceLabels[serviceKey].en;

  return (
    <section className="relative py-12 sm:py-20 md:py-24 overflow-hidden">
      {/* soft background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(145 40% 97%) 50%, hsl(0 0% 100%) 100%)',
        }}
      />
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full -z-10"
        style={{ background: 'radial-gradient(circle, hsl(46 92% 55% / 0.10), transparent 70%)' }} />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full -z-10"
        style={{ background: 'radial-gradient(circle, hsl(145 63% 42% / 0.08), transparent 70%)' }} />

      <div className="container mx-auto px-4 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <span
            className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${gradient} px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-lg`}
          >
            <BadgeCheck className="h-3.5 w-3.5" />
            {label} • Verified Clients
          </span>

          <h2
            className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 900,
              letterSpacing: '-0.03em',
            }}
          >
            Client{' '}
            <span
              className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
              style={{ fontWeight: 900 }}
            >
              Reviews
            </span>
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground">
            Real experiences shared by businesses using our{' '}
            <span className="font-semibold text-foreground">{label}</span> service.
          </p>

          <div className="mt-5 flex items-center justify-center gap-1.5">
            <span className="block w-8 sm:w-12 h-[2px] rounded-full bg-primary/40" />
            <span className={`block w-14 sm:w-20 h-[3px] rounded-full bg-gradient-to-r ${gradient}`} />
            <span className="block w-8 sm:w-12 h-[2px] rounded-full bg-primary/40" />
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {reviews.map((r, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative flex flex-col rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-soft hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Hover gradient sheen */}
              <div
                className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-[0.08] bg-gradient-to-br ${gradient} transition-opacity duration-500`}
              />
              {/* Quote watermark */}
              <Quote
                className={`pointer-events-none absolute -top-2 -right-2 h-20 w-20 opacity-10 bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}
                strokeWidth={1.2}
              />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className={`h-4 w-4 ${
                      n <= r.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>

              {/* Review text — English, professional */}
              <p
                className="text-sm sm:text-[15px] leading-relaxed text-foreground/90 flex-1"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 500,
                }}
              >
                “{r.en}”
              </p>

              {/* Footer: avatar + identity */}
              <div className="mt-5 flex items-center gap-3 pt-4 border-t border-border/60">
                <div
                  className={`h-11 w-11 shrink-0 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-black text-base shadow-md ring-2 ring-white`}
                >
                  {r.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p
                    className="truncate text-sm text-foreground"
                    style={{ fontWeight: 800, letterSpacing: '-0.01em' }}
                  >
                    {r.name}
                  </p>
                  <p
                    className={`truncate text-xs bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                    style={{ fontWeight: 700 }}
                  >
                    {r.company}
                  </p>
                  <p className="flex items-center gap-1 truncate text-[11px] text-muted-foreground mt-0.5">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span className="truncate">{r.location}</span>
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceClientReviews;