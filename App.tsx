
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CURRICULUM } from './constants';
import { Topic, UserProgress } from './types';
import TopicModal from './components/TopicModal';
import { getMarketIntelligence } from './services/geminiService';
import Certificate from './components/Certificate';
import InteractiveWidget from './components/InteractiveWidget';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'TERMINAL' | 'VAULT' | 'LAB' | 'SETTINGS'>('TERMINAL');
  const [marketIntel, setMarketIntel] = useState<any>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [hudVisible, setHudVisible] = useState(true);
  const [tempName, setTempName] = useState('');
  const audioContextRef = useRef<AudioContext | null>(null);

  // Hard Reset Logic: Default state is absolute zero
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('sovereign_terminal_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only return saved state if it exists and has a user name (meaning they passed auth)
        if (parsed.userName && parsed.userName !== '') return parsed;
      }
    } catch (e) {
      console.warn("Reset protocol initiated.");
    }
    return { 
      userName: '', // Trigger Auth
      currentLevel: 1, // Only Phase 0 unlocked
      completedTopicIds: [], 
      totalPoints: 0, // Zero Equity
      streak: 1, 
      lastActiveDate: new Date().toISOString(),
      psychology: { trait: 'Institutional Analyst', fomoResistance: 50, analyticalPatience: 50, riskAppetite: 50 },
      notepad: [],
      interestScores: { TRADER: 0, BUILDER: 0 },
      blackSwanDecisions: [],
      isCertified: false,
      hasCompletedOnboarding: false
    };
  });

  const playMechanicalSound = (type: 'click' | 'alert') => {
    try {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      if (type === 'click') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
      }
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  };

  const totalTopicsCount = useMemo(() => CURRICULUM.reduce((acc, curr) => acc + (curr.topics?.length || 0), 0), []);

  const gpa = useMemo(() => {
    if (totalTopicsCount === 0) return 1.0;
    const completedCount = progress.completedTopicIds.length;
    return Math.min(4.0, Math.max(1.0, 1.0 + (completedCount / totalTopicsCount) * 3.0));
  }, [progress.completedTopicIds, totalTopicsCount]);

  useEffect(() => {
    localStorage.setItem('sovereign_terminal_v1', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    const fetchIntel = async () => {
      const intel = await getMarketIntelligence();
      if (intel) {
        setMarketIntel(intel);
        if (intel.alphaSentiment < 40) playMechanicalSound('alert');
      }
    };
    fetchIntel();
    const interval = setInterval(fetchIntel, 300000);
    return () => clearInterval(interval);
  }, []);

  const handleCompleteTopic = (topic: Topic) => {
    playMechanicalSound('click');
    setProgress(prev => {
      if (prev.completedTopicIds.includes(topic.id)) return prev;
      const newCompleted = [...prev.completedTopicIds, topic.id];
      const currentLevelTopics = CURRICULUM.find(l => l.id === prev.currentLevel)?.topics || [];
      const isLevelComplete = currentLevelTopics.length > 0 && currentLevelTopics.every(t => newCompleted.includes(t.id));
      return { 
        ...prev, 
        completedTopicIds: newCompleted, 
        totalPoints: prev.totalPoints + 50000, 
        currentLevel: Math.min(isLevelComplete ? prev.currentLevel + 1 : prev.currentLevel, CURRICULUM.length)
      };
    });
  };

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      playMechanicalSound('click');
      setProgress(prev => ({ ...prev, userName: tempName.trim(), hasCompletedOnboarding: true }));
    }
  };

  return (
    <div className="min-h-screen flex bg-[#050A10] text-[#E5E7EB] font-sans selection:bg-accent selection:text-bg overflow-hidden relative">
      
      {/* INITIAL AUTHENTICATION MODAL (REPLACES PERSONAGUIDE) */}
      <AnimatePresence>
        {!progress.userName && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-[#050A10] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass-terminal p-12 lg:p-16 rounded-[48px] border-accent/30 max-w-2xl w-full text-center space-y-12"
            >
              <div className="space-y-4">
                <span className="text-6xl text-accent drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">Σ</span>
                <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase font-display">System Initialization</h1>
                <p className="text-slate-400 font-light italic text-lg">Establish your sovereign identity to unlock the terminal.</p>
              </div>

              <form onSubmit={handleAuthenticate} className="space-y-6">
                <input 
                  type="text" 
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Enter Operative Name..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-2xl text-white focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all text-center font-mono"
                  autoFocus
                />
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-6 bg-accent text-[#050A10] rounded-2xl font-black text-xl uppercase tracking-[0.5em] shadow-[0_20px_40px_rgba(212,175,55,0.2)]"
                >
                  Authenticate
                </motion.button>
              </form>
              
              <div className="pt-8 border-t border-white/5">
                <p className="text-[10px] text-white/20 uppercase tracking-[0.5em]">Clearance Level: Uninitiated</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hudVisible && progress.userName && (
          <motion.aside 
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -120, opacity: 0 }}
            className="w-24 lg:w-32 bg-[#0A0F15] border-r border-[#D4AF37]/15 flex flex-col items-center py-12 gap-12 z-[100] shadow-[20px_0_80px_rgba(0,0,0,0.95)]"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              onClick={() => { playMechanicalSound('click'); setActiveView('TERMINAL'); }}
              className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center text-[#050A10] font-black text-3xl shadow-[0_0_40px_rgba(212,175,55,0.4)] cursor-pointer"
            >
              Σ
            </motion.div>
            
            <nav className="flex flex-col gap-8">
              {[
                { id: 'TERMINAL', icon: 'M4 6h16M4 12h16M4 18h16', label: 'HUB' },
                { id: 'LAB', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'LAB' },
                { id: 'VAULT', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'VAULT' },
                { id: 'SETTINGS', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', label: 'CFG' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => { playMechanicalSound('click'); setActiveView(item.id as any); }}
                  className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center transition-all group relative border ${
                    activeView === item.id 
                      ? 'border-accent bg-accent/20 text-accent shadow-[0_0_20px_rgba(212,175,55,0.25)]' 
                      : 'border-white/5 text-white/30 hover:text-white hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${item.icon}" />` }} />
                  <span className="text-[8px] font-black uppercase mt-1 tracking-tighter opacity-80">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-auto flex flex-col items-center gap-10">
                <div className="flex flex-col items-center">
                    <span className="text-[9px] font-black text-accent uppercase tracking-[0.3em] mb-1">GPA</span>
                    <span className="text-2xl font-light text-white font-mono leading-none">{gpa.toFixed(2)}</span>
                </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className={`flex-1 overflow-hidden flex flex-col min-w-0 ${!progress.userName ? 'opacity-0' : 'opacity-100'}`}>
        <header className="h-16 border-b border-white/5 bg-[#0A0F15]/70 flex items-center px-6 lg:px-12 justify-between shrink-0 z-50 backdrop-blur-2xl">
          <div className="flex items-center gap-6 overflow-hidden">
            <span className="text-[10px] font-black text-accent uppercase tracking-[0.6em] whitespace-nowrap">Sovereign Terminal v1.5.1</span>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${marketIntel ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-[10px] text-white/40 uppercase font-mono truncate">Node Status: {marketIntel ? 'Synchronized' : 'Pending'}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 lg:gap-10">
            <div className="text-right flex flex-col justify-center">
               <span className="text-white/20 text-[9px] uppercase tracking-[0.5em] block mb-0.5 leading-none">Net Alpha Equity</span>
               <span className="text-xl font-bold text-white tracking-tighter tabular-nums leading-none">${progress.totalPoints.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => { playMechanicalSound('click'); setHudVisible(!hudVisible); }} 
              className="p-2.5 border border-white/10 rounded-xl hover:bg-white/10 transition-all active:scale-90"
            >
              <svg className="w-5 h-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-12 custom-scrollbar relative">
          <AnimatePresence mode="wait">
            {activeView === 'TERMINAL' && (
              <motion.div 
                key="terminal"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto space-y-16"
              >
                <div className="flex flex-col gap-6 border-l-4 border-accent pl-12">
                  <h1 className="text-5xl lg:text-8xl font-bold text-white tracking-tighter leading-none uppercase font-display">THE<br/><span className="text-accent">SINGULARITY</span></h1>
                  <p className="text-slate-400 font-light text-lg lg:text-2xl tracking-wide max-w-2xl leading-relaxed italic opacity-80">Architecture for Dynastic Wealth Preservation.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-1 space-y-12">
                    <section className="glass-terminal p-12 rounded-[48px] space-y-10 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                      <h3 className="text-[11px] font-black text-accent uppercase tracking-[0.7em] border-b border-white/5 pb-8">Global Intelligence Brief</h3>
                      <div className="space-y-10">
                        {(marketIntel?.briefs || []).map((brief: any, i: number) => (
                          <div key={i} className="space-y-4 border-l-2 border-accent/20 pl-8 py-3 hover:border-accent transition-all duration-500 group">
                            <h4 className="text-base font-bold text-white leading-tight group-hover:text-accent transition-colors">{brief.title}</h4>
                            <p className="text-[13px] text-slate-500 leading-relaxed font-light">{brief.brief}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {CURRICULUM.map((level) => {
                      const unlocked = level.id <= progress.currentLevel;
                      const completed = level.topics?.length > 0 && level.topics.every(t => progress.completedTopicIds.includes(t.id));
                      return (
                        <motion.div
                          key={level.id}
                          whileHover={unlocked ? { scale: 1.04, y: -8 } : {}}
                          onClick={() => { if (unlocked) { playMechanicalSound('click'); setSelectedTopic(level.topics[0]); } }}
                          className={`p-12 rounded-[56px] border glass-terminal transition-all duration-700 flex flex-col gap-10 relative overflow-hidden group ${
                            unlocked 
                              ? (completed ? 'border-accent/50 bg-accent/5' : 'border-white/10 hover:border-accent/80 cursor-pointer') 
                              : 'opacity-40 grayscale blur-[4px] cursor-not-allowed'
                          }`}
                        >
                          <div className="absolute inset-0 shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="flex items-center justify-between relative z-10">
                            <span className="text-6xl">{level.icon}</span>
                            {completed && <div className="text-accent text-[11px] font-black border border-accent/40 px-6 py-2 rounded-full bg-accent/10 tracking-[0.3em]">VERIFIED</div>}
                          </div>
                          <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-white mb-4 tracking-tighter uppercase font-display leading-tight">{level.name}</h3>
                            <p className="text-[12px] text-slate-500 font-semibold uppercase tracking-[0.2em] leading-relaxed italic">{level.tagline}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {activeView === 'LAB' && (
              <motion.div key="lab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center py-16">
                 <InteractiveWidget topicId="t10-2" />
              </motion.div>
            )}

            {activeView === 'VAULT' && (
              <motion.div key="vault" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 py-20">
                {['Dynastic Architecture', 'Capital Shielding', 'Offshore Custody', 'Risk Parity Models', 'Hedge Matrix', 'Legacy Transfer'].map((item, idx) => (
                  <motion.div key={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.1 }} className="p-16 glass-terminal rounded-[56px] flex flex-col items-center gap-10 border-white/10">
                    <svg className="w-16 h-16 text-accent/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <span className="text-2xl font-bold text-white/80 uppercase tracking-[0.25em] text-center font-display">{item}</span>
                    <span className="text-[11px] text-accent/40 uppercase font-mono tracking-[0.4em] border border-accent/20 px-6 py-2 rounded-full backdrop-blur-sm">Locked_Unit</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeView === 'SETTINGS' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-16 py-20">
                <div className="p-20 glass-terminal rounded-[72px] space-y-16 border-white/10 shadow-[0_60px_150px_rgba(0,0,0,0.9)]">
                  <h2 className="text-5xl font-bold text-white uppercase tracking-tighter border-b border-white/5 pb-10 font-display">Protocol Configuration</h2>
                  <div className="space-y-12">
                    <div className="flex justify-between items-center py-8 border-b border-white/5">
                      <span className="text-xs font-black uppercase text-white/30 tracking-[0.5em]">Operative Identity</span>
                      <span className="text-accent font-mono text-2xl tracking-tighter">{progress.userName}</span>
                    </div>
                    <button 
                      onClick={() => { if(confirm("Permanently shredded local financial ledger. Proceed with Hard Reset?")){ localStorage.clear(); window.location.reload(); } }} 
                      className="w-full py-10 border-2 border-red-500/20 text-red-500 font-black uppercase tracking-[0.8em] rounded-[32px] hover:bg-red-500 hover:text-white transition-all shadow-[0_0_50px_rgba(239,68,68,0.1)]"
                    >
                      Destroy Local Ledger
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {selectedTopic && (
          <TopicModal 
            topic={selectedTopic} 
            onClose={() => setSelectedTopic(null)} 
            onComplete={() => handleCompleteTopic(selectedTopic)}
            isCompleted={progress.completedTopicIds.includes(selectedTopic.id)}
            gpa={gpa}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCertificate && (
          <Certificate progress={progress} gpa={gpa} onClose={() => setShowCertificate(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
