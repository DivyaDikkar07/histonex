import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[#051121] mix-blend-multiply opacity-50" />
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-warm-gold/20 blur-[1px]"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            x: [null, (Math.random() - 0.5) * 100],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
      
      {/* Subtle sweeping light rays */}
      <motion.div 
        className="absolute -top-[50%] -left-[10%] w-[120%] h-[120%] bg-gradient-to-br from-white/5 to-transparent origin-center"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 150,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}
