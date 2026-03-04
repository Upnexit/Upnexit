import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % team.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [team.length]);

  const leftMember = team[activeIndex];
  const rightMember = team[(activeIndex + 1) % team.length];

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid grid-cols-2 gap-3 sm:gap-6"
          >
            <MemberCard member={leftMember} />
            <MemberCard member={rightMember} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {team.map((_, i) => (
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
