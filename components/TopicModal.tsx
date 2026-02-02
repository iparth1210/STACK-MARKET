
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Topic, SubTopic, JurisdictionalNode } from '../types';
import OracleChat from './OracleChat';
import MediaRenderer from './MediaRenderer';

const MatrixRow: React.FC<{ node: JurisdictionalNode }> = ({ node }) => (
  <div className="grid grid-cols-5 gap-4 lg:gap-6 p-6 lg:p-8 border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-all">
    <div className="text-base lg:text-lg font-bold text-white uppercase tracking-tighter truncate">{node.nation}</div>
    <div className="text-lg lg:text-xl font-mono text-accent font-bold">{node.taxRate}</div>
    <div className="text-xs lg:text-sm text-slate-400 font-light italic truncate">{node.assetProtection}</div>
    <div className={`text-[10px] lg:text-[11px] font-black uppercase tracking-widest ${node.sovereignRisk === 'Low' ? 'text-green-500' : 'text-yellow-500'}`}>
      {node.sovereignRisk} RISK
    </div>
    <div className="text-[10px] lg:text-[11px] text-slate-500 font-mono tracking-tighter truncate">{node.keyAdvantage}</div>
  </div>
);

const SubTopicModule: React.FC<{ sub: SubTopic }> = ({ sub }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const win = window as any;
    if (win.renderMathInElement && containerRef.current) {
        try {
          win.renderMathInElement(containerRef.current, {
              delimiters: [
                  {left: '$$', right: '$$', display: true},
                  {left: '$', right: '$', display: false}
              ],
              throwOnError: false
          });
        } catch (e) {
          console.warn("KaTeX error:", e);
        }
    }
  }, [sub.technicalBriefing]);

  return (
    <div ref={containerRef} className="p-8 lg:p-14 glass-terminal rounded-[40px] lg:rounded-[48px] border-white/10 space-y-10 lg:space-y-12 relative overflow-hidden group">
      <h3 className="text-3xl lg:text-5xl font-black text-white tracking-tighter uppercase font-display">{sub.title}</h3>

      {sub.jurisdictionalMatrix ? (
        <div className="border border-white/10 rounded-[24px] overflow-hidden bg-black/50 shadow-inner overflow-x-auto custom-scrollbar">
           <div className="min-w-[600px]">
             <div className="grid grid-cols-5 gap-4 lg:gap-6 p-4 bg-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                <span>Jurisdiction</span><span>Rate</span><span>Protection</span><span>Risk</span><span>Advantage</span>
             </div>
             {sub.jurisdictionalMatrix.map((node, i) => <MatrixRow key={i} node={node} />)}
           </div>
        </div>
      ) : (
        <MediaRenderer title={sub.title} imagePrompt={sub.imagePrompt} videoId={sub.explainerVideoId} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
        <div className="space-y-3">
          <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em] block">Sovereign Intuition</span>
          <p className="text-lg lg:text-xl text-slate-400 font-light italic leading-relaxed tracking-tight border-l-2 border-accent/20 pl-6 lg:pl-8">{sub.streetExplanation}</p>
        </div>
        <div className="space-y-3">
          <span className="text-[9px] font-black text-accent uppercase tracking-[0.5em] block">Institutional Architecture</span>
          <p className="text-lg lg:text-xl text-white font-medium leading-relaxed tracking-tight">{sub.boardroomExplanation}</p>
        </div>
      </div>

      {sub.technicalBriefing && (
        <div className="p-8 rounded-[32px] bg-black/70 border border-accent/20 font-mono text-center shadow-xl relative z-10 overflow-x-auto custom-scrollbar">
          <span className="text-[9px] font-black text-accent uppercase tracking-[0.6em] block mb-4">Quantitative Proof</span>
          <div className="math-container text-lg lg:text-2xl whitespace-nowrap">{sub.technicalBriefing}</div>
        </div>
      )}
    </div>
  );
};

const TopicModal: React.FC<{ topic: Topic, onClose: () => void, onComplete: () => void, isCompleted: boolean, gpa: number }> = ({ topic, onClose, onComplete, isCompleted }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-[#050A10]/95 backdrop-blur-3xl flex items-center justify-center p-4 lg:p-8">
      <motion.div initial={{ scale: 0.97, y: 40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} transition={{ type: 'spring', damping: 25, stiffness: 150 }} className="w-full h-full glass-terminal rounded-[40px] lg:rounded-[56px] flex flex-col overflow-hidden border-[#D4AF37]/25">
        <header className="px-6 lg:px-14 py-6 lg:py-8 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#0A0F15]/80 z-20 backdrop-blur-md">
          <div className="flex items-center gap-6 min-w-0 flex-1">
            <span className="text-3xl lg:text-5xl shrink-0">{topic.category === 'SOVEREIGN' ? '💎' : '📊'}</span>
            <div className="min-w-0">
              <span className="text-[8px] lg:text-[9px] font-black text-accent uppercase tracking-[0.6em] block mb-1">Terminal Node</span>
              <h2 className="text-2xl lg:text-4xl font-black text-white tracking-tighter uppercase leading-tight font-display truncate">{topic.title}</h2>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl bg-white/5 hover:bg-white/15 flex items-center justify-center text-2xl text-white/40 transition-all border border-white/10 shrink-0">✕</button>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6 lg:p-14 custom-scrollbar space-y-12 bg-gradient-to-b from-transparent to-[#050A10]/30">
            <div className="max-w-5xl mx-auto space-y-12">
                <section className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-6 relative overflow-hidden">
                  <span className="text-[10px] font-black text-accent uppercase tracking-[0.7em] block">Mission Directive</span>
                  <p className="text-3xl lg:text-5xl text-white font-light tracking-tighter italic font-display">"{topic.missionStrategy}"</p>
                  <p className="text-base lg:text-lg text-slate-400 font-light leading-relaxed">{topic.description}</p>
                </section>
                <div className="space-y-12 pb-16">
                  {topic.subTopics.map((sub, i) => <SubTopicModule key={i} sub={sub} />)}
                </div>
            </div>
          </main>
          <aside className="w-full lg:w-[30rem] border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0A0F15]/60 flex flex-col p-6 lg:p-10 gap-8 shrink-0 overflow-y-auto custom-scrollbar">
            <div className="flex-1 glass-terminal rounded-[24px] border-white/5 p-6 shadow-inner relative flex flex-col min-h-[350px]">
              <OracleChat currentTopic={topic.title} />
            </div>
            <div className="space-y-6 mt-auto">
                <div className="p-6 glass-terminal rounded-[24px] border-white/5 space-y-4">
                  <span className="text-[9px] font-black text-accent uppercase tracking-[0.45em] block">Data Sync Resources</span>
                  <div className="space-y-3">
                    {topic.resources.map((res, i) => (
                      <a key={i} href={res.url} target="_blank" rel="noreferrer" className="flex items-center justify-between text-xs text-slate-400 hover:text-white transition-all hover:translate-x-1 group">
                        <span className="font-semibold truncate pr-4">{res.title}</span>
                        <span className="text-[8px] font-black uppercase text-accent/50 group-hover:text-accent shrink-0">{res.provider || 'LINK'}</span>
                      </a>
                    ))}
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }} 
                  onClick={() => { onComplete(); onClose(); }} 
                  className={`w-full py-6 rounded-[24px] font-black text-lg uppercase tracking-[0.5em] transition-all shadow-xl ${isCompleted ? 'bg-white/5 text-white/30 cursor-default' : 'bg-accent text-[#050A10] shadow-[0_20px_40px_rgba(212,175,55,0.2)]'}`}
                  disabled={isCompleted}
                >
                  {isCompleted ? 'NODE VERIFIED' : 'SYNCHRONIZE'}
                </motion.button>
            </div>
          </aside>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TopicModal;
