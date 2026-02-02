
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface InteractiveWidgetProps {
  topicId: string;
}

const InteractiveWidget: React.FC<InteractiveWidgetProps> = ({ }) => {
  const [portfolioValue, setPortfolioValue] = useState(5000000);
  const [borrowingCost, setBorrowingCost] = useState(4.5);
  const [years, setYears] = useState(25);
  const growthRate = 8; // Fixed CAGR for baseline
  const formulaRef = useRef<HTMLDivElement>(null);

  const calculation = useMemo(() => {
    const taxRate = 0.238; 
    const futureValue = portfolioValue * Math.pow(1 + (growthRate / 100), years);
    const capitalGain = futureValue - portfolioValue;
    
    // Scenario A: Liquidation (Pay Taxes)
    const taxPaid = capitalGain * taxRate;
    const netWealthA = futureValue - taxPaid;

    // Scenario B: Buy-Borrow-Die (Sovereign Shield)
    const annualSpendRate = 0.03;
    const annualSpend = portfolioValue * annualSpendRate;
    const totalSpent = annualSpend * years;
    
    // Simplified interest calc for simulation visualization
    const totalInterest = totalSpent * (borrowingCost / 100) * (years / 2); 
    const netWealthB = futureValue - totalInterest - totalSpent;

    return { 
      netWealthA, 
      netWealthB, 
      advantage: netWealthB - netWealthA, 
      futureValue,
      taxAvoided: taxPaid
    };
  }, [portfolioValue, borrowingCost, years]);

  const renderFormula = () => {
    const win = window as any;
    if (win.renderMathInElement && formulaRef.current) {
        try {
          win.renderMathInElement(formulaRef.current, {
            delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false}
            ],
            throwOnError: false
          });
        } catch (e) {
          console.warn("KaTeX error in Widget:", e);
        }
    }
  };

  useEffect(() => {
    renderFormula();
  }, [calculation]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-terminal p-10 lg:p-16 rounded-[48px] lg:rounded-[64px] border-white/10 shadow-[0_50px_150px_rgba(0,0,0,0.7)] space-y-16 w-full max-w-6xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-12 opacity-[0.04] pointer-events-none select-none">
         <span className="text-[180px] font-black text-white">Σ</span>
      </div>

      <div className="text-center space-y-4 relative z-10">
        <h4 className="text-4xl lg:text-5xl font-bold text-white tracking-tighter uppercase font-display">THE ALPHA SIMULATOR</h4>
        <p className="text-lg text-slate-500 font-light italic uppercase tracking-widest">Buy-Borrow-Die Optimization Protocol</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative z-10">
        <div className="space-y-12">
           <div className="space-y-6">
             <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Portfolio Basis ($)</label>
                <span className="text-3xl font-mono font-bold text-accent">${(portfolioValue / 1000000).toFixed(1)}M</span>
             </div>
             <input 
                type="range" min="1000000" max="100000000" step="1000000" 
                value={portfolioValue} 
                onChange={(e) => setPortfolioValue(Number(e.target.value))} 
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-accent" 
             />
           </div>
           
           <div className="space-y-6">
             <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">SBLOC Spread (%)</label>
                <span className="text-3xl font-mono font-bold text-white/80">{borrowingCost}%</span>
             </div>
             <input 
                type="range" min="1" max="15" step="0.1" 
                value={borrowingCost} 
                onChange={(e) => setBorrowingCost(Number(e.target.value))} 
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary" 
             />
           </div>

           <div className="space-y-6">
             <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Horizon (Years)</label>
                <span className="text-3xl font-mono font-bold text-white/80">{years}Y</span>
             </div>
             <input 
                type="range" min="5" max="50" step="1" 
                value={years} 
                onChange={(e) => setYears(Number(e.target.value))} 
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary" 
             />
           </div>

           <div className="bg-white/[0.03] p-10 rounded-[40px] border border-white/5 space-y-6 shadow-inner">
              <span className="text-[10px] font-black text-accent uppercase tracking-[0.5em] block">Sovereign Wealth Identity</span>
              <div ref={formulaRef} className="text-xl lg:text-2xl text-accent font-mono border-b border-accent/20 pb-6 overflow-x-auto custom-scrollbar whitespace-nowrap">
                {'$$\\text{Retained Equity} = V_{f} - (L_{debt} \\times r_{spread})$$' }
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed uppercase tracking-tighter italic">
                Simulating dynastic preservation vs liquidation event risk.
              </p>
           </div>
        </div>

        <div className="p-14 rounded-[56px] bg-white/[0.02] border border-accent/20 flex flex-col justify-center items-center text-center relative overflow-hidden group shadow-2xl min-h-[480px]">
           <motion.div 
             animate={{ opacity: [0.05, 0.15, 0.05] }}
             transition={{ duration: 8, repeat: Infinity }}
             className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent" 
           />
           <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.6em] mb-10 relative z-10">Institutional Edge Dividend</span>
           <div className="relative z-10 space-y-4">
              <motion.p 
                key={calculation.advantage}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl lg:text-7xl font-bold tracking-tighter text-white font-display"
              >
                ${Math.round(calculation.advantage / 1000).toLocaleString()}k
              </motion.p>
              <p className="text-lg font-mono italic text-accent opacity-80 uppercase tracking-[0.2em] font-bold">
                Alpha Retained
              </p>
           </div>
           
           <div className="mt-14 flex flex-col gap-6 relative z-10 w-full px-4">
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1.5">
                   <span className="text-slate-500">Traditional Exit</span>
                   <span className="text-white">${Math.round(calculation.netWealthA / 1000000).toFixed(2)}M</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: `${(calculation.netWealthA / calculation.netWealthB) * 100}%` }}
                    className="h-full bg-slate-700" 
                   />
                </div>
              </div>
              
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1.5">
                   <span className="text-accent">Sovereign Terminal Protocol</span>
                   <span className="text-white">${Math.round(calculation.netWealthB / 1000000).toFixed(2)}M</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    className="h-full bg-accent shadow-[0_0_20px_var(--accent)]" 
                   />
                </div>
              </div>
           </div>

           <div className="mt-10 text-[9px] text-slate-600 font-black uppercase tracking-[0.4em] italic opacity-60">
             Simulation Model: {years}Y @ {growthRate}% CAGR
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveWidget;
