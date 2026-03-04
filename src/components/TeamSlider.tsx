import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const TeamSlider = ({ team }: { team: TeamMember[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % team.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [team.length]);

  // The two visible: activeIndex (sliding in) and the previous one (stays/slides out)
  const currentMember = team[activeIndex];
  const stableIndex = (activeIndex + 1) % team.length;
  const stableMember = team[stableIndex];

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {/* Left card - animates in/out */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center group"
            >
              <div className="w-full aspect-square overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                <img src={currentMember.image} alt={currentMember.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 sm:p-5">
                <h3 className="font-bold text-xs sm:text-base text-foreground mb-0.5 sm:mb-1">{currentMember.name}</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">{currentMember.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right card - stable, swaps when left changes */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={stableIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
              className="text-center group"
            >
              <div className="w-full aspect-square overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                <img src={stableMember.image} alt={stableMember.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 sm:p-5">
                <h3 className="font-bold text-xs sm:text-base text-foreground mb-0.5 sm:mb-1">{stableMember.name}</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">{stableMember.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
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
