
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { UserProgress } from '../types';

interface CertificateProps {
  progress: UserProgress;
  gpa: number;
  onClose: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ progress, gpa, onClose }) => {
  const sovereignRank = useMemo(() => {
    if (gpa >= 3.9) return "GRANDMASTER ARCHITECT";
    if (gpa >= 3.5) return "INSTITUTIONAL SOVEREIGN";
    if (gpa >= 3.0) return "TIER-1 ALPHA OPERATIVE";
    return "QUANTITATIVE ANALYST";
  }, [gpa]);

  const alphaHash = useMemo(() => {
    const seed = `${progress.totalPoints}-${gpa}-${Date.now()}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash |= 0; 
    }
    return `SOV-${Math.abs(hash).toString(16).toUpperCase().padStart(10, '0')}`;
  }, [progress.totalPoints, gpa]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] bg-[#050A10]/98 flex items-center justify-center p-6 lg:p-12 overflow-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-6xl aspect-[1.414/1] bg-[#0A0F15] border-[1px] border-[#D4AF37]/40 p-8 lg:p-16 overflow-hidden flex flex-col shadow-[0_100px_200px_rgba(0,0,0,0.9)]"
      >
        {/* Subtle Intricate Background Pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="guilloche" width="120" height="120" patternUnits="userSpaceOnUse">
                <circle cx="60" cy="60" r="55" fill="none" stroke="#D4AF37" strokeWidth="0.5"/>
                <circle cx="60" cy="60" r="45" fill="none" stroke="#D4AF37" strokeWidth="0.2"/>
                <path d="M0 60 L 120 60 M 60 0 L 60 120" stroke="#D4AF37" strokeWidth="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#guilloche)" />
          </svg>
        </div>

        <div className="relative h-full border-2 border-[#D4AF37]/10 flex flex-col items-center justify-between p-8 lg:p-16 text-center">
          
          <div className="space-y-6 lg:space-y-8">
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 border-2 border-accent rounded-full flex items-center justify-center text-accent font-black text-4xl lg:text-5xl shadow-[0_0_30px_rgba(212,175,55,0.3)]">Σ</div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-black text-white tracking-[0.3em] uppercase leading-none">
              Sovereign Credential
            </h1>
            <p className="text-[10px] lg:text-xs text-accent font-mono tracking-[0.6em] uppercase font-bold opacity-60">
              Institutional Mastery of Dynastic Capital Architecture
            </p>
          </div>

          <div className="w-full max-w-4xl space-y-12 lg:space-y-16">
            <div className="space-y-6">
              <p className="text-sm lg:text-lg text-slate-500 font-light uppercase tracking-[0.5em] italic">
                Official Verification of Professional Competence
              </p>
              <h2 className="text-5xl lg:text-8xl font-black text-white font-display tracking-tight uppercase leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                {sovereignRank}
              </h2>
              <div className="h-1 w-32 bg-accent mx-auto mt-8 shadow-[0_0_10px_var(--accent)]" />
            </div>

            <p className="text-base lg:text-2xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto italic tracking-tight">
              In recognition of demonstrated proficiency in advanced volatility mechanics, multi-jurisdictional arbitrage frameworks, and vertically integrated tax optimization protocols.
            </p>

            <div className="grid grid-cols-3 gap-6 lg:gap-12 border-y border-[#D4AF37]/20 py-8 lg:py-12">
              <div className="space-y-2">
                <span className="block text-[8px] lg:text-[10px] font-black text-accent uppercase tracking-[0.4em]">ALPHA STATUS</span>
                <span className="text-2xl lg:text-5xl font-bold text-white font-mono">{gpa.toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <span className="block text-[8px] lg:text-[10px] font-black text-accent uppercase tracking-[0.4em]">POINTS EQUITY</span>
                <span className="text-2xl lg:text-5xl font-bold text-white font-mono">${(progress.totalPoints / 1000000).toFixed(1)}M</span>
              </div>
              <div className="space-y-2">
                <span className="block text-[8px] lg:text-[10px] font-black text-accent uppercase tracking-[0.4em]">RESILIENCE</span>
                <span className="text-2xl lg:text-5xl font-bold text-white font-mono">{Math.round(progress.psychology.fomoResistance)}%</span>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-between items-end px-4">
            <div className="text-left space-y-3">
              <div className="w-48 lg:w-64 h-px bg-white/20" />
              <p className="text-[9px] lg:text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Institutional Board</p>
            </div>

            <div className="flex flex-col items-center gap-6">
               <div className="bg-[#D4AF37]/5 px-4 lg:px-6 py-2 border border-[#D4AF37]/20 rounded-md">
                <span className="text-[8px] lg:text-[10px] font-mono text-accent tracking-widest">{alphaHash}</span>
              </div>
            </div>

            <div className="text-right space-y-3">
              <div className="w-48 lg:w-64 h-px bg-white/20" />
              <p className="text-[9px] lg:text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Sovereign Clearing</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="fixed bottom-6 lg:bottom-12 left-1/2 -translate-x-1/2 flex gap-4 lg:gap-6">
        <button 
          onClick={() => window.print()} 
          className="px-8 lg:px-16 py-4 lg:py-6 bg-accent text-[#050A10] font-black rounded-2xl flex items-center gap-4 uppercase text-[10px] lg:text-sm tracking-[0.4em] transition-all hover:bg-white hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]"
        >
          Export Credential
        </button>
        <button 
          onClick={onClose} 
          className="px-6 lg:px-12 py-4 lg:py-6 border border-white/10 text-white/40 font-black rounded-2xl hover:text-white hover:bg-white/5 transition-all uppercase text-[10px] lg:text-sm tracking-[0.4em]"
        >
          Return
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white !important; color: black !important; }
          .bg-[#050A10]/98 { background: white !important; }
          .bg-[#0A0F15] { background: white !important; border: 4pt solid black !important; color: black !important; box-shadow: none !important; }
          .text-white { color: black !important; }
          .text-slate-500, .text-slate-300 { color: #666 !important; }
          .text-accent { color: #8a6d3b !important; }
          #root, .fixed, button { display: none !important; }
          @page { size: landscape; margin: 0; }
        }
      `}} />
    </motion.div>
  );
};

export default Certificate;
