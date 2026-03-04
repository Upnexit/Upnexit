import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const MemberCard = ({ member }: { member: TeamMember }) => (
  <div className="bg-background rounded-2xl sm:rounded-3xl border border-border hover:border-primary/20 hover:shadow-elevated transition-all text-center group relative overflow-hidden shrink-0 w-[calc(50%-6px)] md:w-[calc(25%-18px)]">
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
  if (team.length === 0) return null;

  // If 4 or fewer, just show grid without sliding
  if (team.length <= 4) {
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

  // Infinite marquee for more than 4 members
  const duplicated = [...team, ...team];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-3 sm:gap-6"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: team.length * 4,
            ease: 'linear',
          },
        }}
      >
        {duplicated.map((member, i) => (
          <MemberCard key={`${member.name}-${i}`} member={member} />
        ))}
      </motion.div>
    </div>
  );
};

export default TeamSlider;
