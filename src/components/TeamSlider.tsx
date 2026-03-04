import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const MemberCard = ({ member }: { member: TeamMember }) => (
  <div className="bg-background rounded-2xl sm:rounded-3xl border border-border hover:border-primary/20 hover:shadow-elevated transition-all text-center group relative overflow-hidden h-full">
    <div className="w-full aspect-square overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
      <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>
    <div className="p-3 sm:p-5">
      <h3 className="font-bold text-xs sm:text-base text-foreground mb-0.5 sm:mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
      <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">{member.role}</p>
    </div>
  </div>
);

const TeamSlider = ({ team }: { team: TeamMember[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  const perPage = isMobile ? 2 : 4;
  const totalPages = Math.ceil(team.length / perPage);
  const needsSlider = totalPages > 1;

  useEffect(() => {
    if (!needsSlider) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalPages);
    }, 3500);
    return () => clearInterval(interval);
  }, [totalPages, needsSlider]);

  if (team.length === 0) return null;

  // No slider needed - static grid
  if (!needsSlider) {
    return (
      <div className={`grid gap-3 sm:gap-6 ${
        team.length <= 2 ? 'grid-cols-2' : 
        team.length === 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4'
      }`}>
        {team.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <MemberCard member={member} />
          </motion.div>
        ))}
      </div>
    );
  }

  const startIdx = activeIndex * perPage;
  const currentMembers = team.slice(startIdx, startIdx + perPage);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`grid gap-3 sm:gap-6 ${
              perPage <= 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'
            }`}
          >
            {currentMembers.map((member, i) => (
              <MemberCard key={i} member={member} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-6 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSlider;
