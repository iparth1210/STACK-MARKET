
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface PersonaGuideProps {
  userName?: string;
  gpa: number;
  onSetName: (name: string) => void;
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  forcedMessage?: string;
  isWelcomed?: boolean;
  onCompleteOnboarding?: () => void;
  isMinimized?: boolean;
  emotion?: Emotion;
}

type Emotion = 'NEUTRAL' | 'PROUD' | 'WARNING';

const playGuideTinkle = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2500, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.05);
    osc.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {}
};

const playSound = (type: 'click' | 'master' | 'hover') => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    if (type === 'click') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
    } else if (type === 'master') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
    }
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + (type === 'click' ? 0.05 : 0.5));
  } catch (e) {}
};

const GoldParticles = () => (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.5], y: -100 - Math.random() * 100, x: (Math.random() - 0.5) * 100 }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          className="absolute left-1/2 top-1/3 w-1 h-1 bg-accent rounded-full shadow-[0_0_10px_#d4af37]"
        />
      ))}
    </div>
);

const PersonaGuide: React.FC<PersonaGuideProps> = ({ userName, gpa, onSetName, onboardingStep, setOnboardingStep, forcedMessage, isWelcomed, onCompleteOnboarding, isMinimized, emotion: propEmotion }) => {
  const [internalEmotion, setInternalEmotion] = useState<Emotion>('NEUTRAL');
  const [inputValue, setInputValue] = useState('');
  const [isBlinking, setIsBlinking] = useState(false);

  const emotion = propEmotion || internalEmotion;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150, mass: 1.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const headRotateX = useTransform(springY, [-400, 400], [10, -10]);
  const headRotateY = useTransform(springX, [-400, 400], [-15, 15]);
  const turbanJiggleX = useTransform(springX, [-400, 400], [-8, 8]);
  const turbanJiggleY = useTransform(springY, [-400, 400], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4000);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(blinkInterval);
    };
  }, []);

  useEffect(() => {
    if (gpa > 3.5) setInternalEmotion('PROUD');
    else if (gpa < 2.0) setInternalEmotion('WARNING');
    else setInternalEmotion('NEUTRAL');
  }, [gpa]);

  useEffect(() => {
    if (forcedMessage || onboardingStep > 0) playGuideTinkle();
  }, [forcedMessage, onboardingStep]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSetName(inputValue.trim());
      setOnboardingStep(1);
    }
  };

  const dialogue = useMemo(() => {
    if (forcedMessage) return forcedMessage;
    if (!userName) return "Kem Cho! Welcome to the Inner Circle. Before we unlock the vault, what shall I call you, Operative?";
    switch (onboardingStep) {
      case 1: return `Aha, ${userName}! A strong name for a future Sovereign. Let us begin your ascent.`;
      case 2: return `Look here, ${userName}. This Sidebar tracks your GPA. Earn institutional access through mastery.`;
      case 3: return `Macro intelligence filters through here. Never trade without the context of the state.`;
      case 4: return `We end at Phase 10: The Sovereign Legacy. Are you ready for immortality?`;
      default: return `Ready to print some Alpha, ${userName}?`;
    }
  }, [forcedMessage, userName, onboardingStep]);

  return (
    <motion.div 
        key="guide-container"
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ 
            opacity: 0, 
            scale: 0.2, 
            x: -200, 
            y: 500, 
            transition: { type: 'spring', damping: 25, stiffness: 100 } 
        }}
        className="fixed bottom-0 left-10 z-[1100] pointer-events-none select-none flex flex-col items-start"
    >
        {emotion === 'PROUD' && <GoldParticles />}

        <motion.div
            key={dialogue}
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className={`absolute bottom-[380px] left-16 w-80 p-7 rounded-[32px] rounded-bl-none border-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] pointer-events-auto overflow-hidden backdrop-blur-[20px] bg-white/[0.03]
            ${emotion === 'WARNING' ? 'border-red-500/50 shadow-red-500/10' : emotion === 'PROUD' ? 'border-accent/80 shadow-accent/20' : 'border-accent/30'}`}
        >
            <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none" />
            <div className="relative space-y-4">
                <p className="text-sm font-bold text-white leading-relaxed tracking-tight">"{dialogue}"</p>
                {!userName && (
                    <form onSubmit={handleNameSubmit} className="flex gap-2">
                        <input type="text" placeholder="Identity..." autoFocus className="flex-1 bg-white/5 border border-accent/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-accent" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                        <button type="submit" className="bg-accent text-[#0A192F] px-4 py-2 rounded-xl text-[10px] font-bold uppercase">Auth</button>
                    </form>
                )}
                {userName && onboardingStep > 0 && onboardingStep < 5 && (
                    <button onClick={() => setOnboardingStep(onboardingStep + 1)} className="text-[10px] font-bold text-accent hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                        {onboardingStep === 4 ? "Initialize" : "Next Briefing"} <span>→</span>
                    </button>
                )}
                {onboardingStep === 5 && !isWelcomed && (
                    <button onClick={() => { onCompleteOnboarding?.(); playSound('master'); }} className="w-full bg-accent text-[#0A192F] py-3 rounded-xl text-[10px] font-bold uppercase shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-white transition-all">Enter Terminal</button>
                )}
                {isWelcomed && (
                    <div className="pt-2 border-t border-white/5 space-y-2">
                        <span className="text-[8px] font-black uppercase text-accent/50 tracking-[0.2em]">Quick Tips</span>
                        <p className="text-[10px] text-slate-400 font-light">"Asset protection is not a choice; it's a defensive infrastructure."</p>
                    </div>
                )}
            </div>
        </motion.div>

        <motion.div 
            layoutId="guide-avatar-identity"
            style={{ perspective: 1000, rotateX: headRotateX, rotateY: headRotateY, transformStyle: 'preserve-3d' }}
            className="w-[300px] h-[400px] relative pointer-events-auto cursor-pointer"
        >
            <svg viewBox="0 0 200 250" className="w-full h-full">
            <defs>
                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" />
                    <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#d4af37" floodOpacity={emotion === 'PROUD' ? 0.8 : 0.3} />
                </filter>
                <linearGradient id="clothGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e293b" /><stop offset="100%" stopColor="#0A192F" /></linearGradient>
            </defs>
            <motion.circle animate={{ r: emotion === 'WARNING' ? [65, 75, 65] : [70, 85, 70], opacity: emotion === 'WARNING' ? [0.1, 0.4, 0.1] : [0.05, 0.15, 0.05] }} transition={{ repeat: Infinity, duration: emotion === 'WARNING' ? 0.5 : 3 }} cx="100" cy="130" r="75" fill={emotion === 'WARNING' ? "#b91c1c" : "#d4af37"} className="blur-2xl" />
            <path d="M50 180 Q 100 160 150 180 L 170 250 H 30 Z" fill="url(#clothGradient)" stroke="#d4af37" strokeWidth="1" />
            
            {onboardingStep === 5 && !isWelcomed && (
                <motion.g initial={{ rotate: 0 }} animate={{ rotate: [0, 20, 0, 20, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ originX: '150px', originY: '180px' }}>
                    <path d="M150 180 L 180 150 Q 190 140 185 135 L 175 145" fill="none" stroke="#f5e0c3" strokeWidth="8" strokeLinecap="round" /><circle cx="180" cy="140" r="6" fill="#f5e0c3" />
                </motion.g>
            )}

            <motion.g style={{ x: springX.get() * 0.01, y: springY.get() * 0.01 }}>
                <circle cx="100" cy="130" r="50" fill={emotion === 'WARNING' ? "#fecaca" : "#f5e0c3"} filter="url(#goldGlow)" />
                <g className="eyes">
                    <motion.ellipse animate={{ scaleY: isBlinking ? 0 : 1 }} cx="80" cy="135" rx="8" ry={emotion === 'WARNING' ? 4 : 12} fill="black" />
                    <motion.ellipse animate={{ scaleY: isBlinking ? 0 : 1 }} cx="120" cy="135" rx="8" ry={emotion === 'WARNING' ? 4 : 12} fill="black" />
                    {!isBlinking && <><circle cx="82" cy="130" r="3" fill="white" /><circle cx="122" cy="130" r="3" fill="white" /></>}
                </g>
                <path d="M70 160 Q 100 150 130 160 Q 140 175 100 165 Q 60 175 70 160" fill="#332211" />
                <motion.path animate={{ d: emotion === 'PROUD' ? "M85 175 Q 100 190 115 175" : emotion === 'WARNING' ? "M85 185 Q 100 180 115 185" : "M90 180 Q 100 180 110 180" }} fill="none" stroke="#332211" strokeWidth="2" strokeLinecap="round" />
            </motion.g>

            <motion.g style={{ x: turbanJiggleX, y: turbanJiggleY, filter: "drop-shadow(0px 5px 15px rgba(0,0,0,0.5))" }}>
                <path d="M50 60 Q 100 20 150 60 L 160 80 Q 100 70 40 80 Z" fill={emotion === 'WARNING' ? "#b91c1c" : "#d4af37"} />
                <path d="M40 80 Q 100 90 160 80 Q 170 100 150 110 L 50 110 Q 30 100 40 80" fill={emotion === 'WARNING' ? "#7f1d1d" : "#b8952b"} />
                <motion.circle animate={emotion === 'PROUD' ? { scale: [1, 1.3, 1] } : {}} transition={{ repeat: Infinity, duration: 1 }} cx="100" cy="50" r="6" fill="#f1f5f9" stroke="#d4af37" strokeWidth="1" />
            </motion.g>
            </svg>
        </motion.div>
    </motion.div>
  );
};

export default PersonaGuide;
