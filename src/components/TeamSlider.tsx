import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const TeamSlider = ({ team }: { team: TeamMember[] }) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(team.length / 2);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((p) => (p + 1) % totalPages);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const currentMembers = team.slice(page * 2, page * 2 + 2);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="grid grid-cols-2 gap-3 sm:gap-6"
          >
            {currentMembers.map((member, i) => (
              <div
                key={i}
                className="bg-background rounded-2xl sm:rounded-3xl border border-border hover:border-primary/20 hover:shadow-elevated transition-all text-center group relative overflow-hidden"
              >
                <div className="w-full aspect-square overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 sm:p-5">
                  <h3 className="font-bold text-xs sm:text-base text-foreground mb-0.5 sm:mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === page ? 'w-6 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSlider;
