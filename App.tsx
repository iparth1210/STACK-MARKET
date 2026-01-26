
import React, { useState, useEffect, useMemo } from 'react';
import { CURRICULUM } from './constants';
import { Level, LevelStatus, Topic, UserProgress } from './types';
import TopicModal from './components/TopicModal';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('finance_frenzy_ultimate');
    return saved ? JSON.parse(saved) : {
      currentLevel: 1,
      completedTopicIds: [],
      totalPoints: 0
    };
  });

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  useEffect(() => {
    localStorage.setItem('finance_frenzy_ultimate', JSON.stringify(progress));
  }, [progress]);

  const handleCompleteTopic = (topicId: string) => {
    if (progress.completedTopicIds.includes(topicId)) return;

    setProgress(prev => {
      const newCompleted = [...prev.completedTopicIds, topicId];
      const newPoints = prev.totalPoints + 250;
      
      const currentLevelData = CURRICULUM.find(l => l.id === prev.currentLevel);
      const allLevelTopicsCompleted = currentLevelData?.topics.every(t => newCompleted.includes(t.id));
      
      let nextLevel = prev.currentLevel;
      if (allLevelTopicsCompleted && prev.currentLevel < CURRICULUM.length) {
        nextLevel = prev.currentLevel + 1;
      }

      return {
        ...prev,
        completedTopicIds: newCompleted,
        totalPoints: newPoints,
        currentLevel: nextLevel
      };
    });
  };

  const totalPossibleTopics = useMemo(() => 
    CURRICULUM.reduce((acc, curr) => acc + curr.topics.length, 0), 
  []);

  const completionPercentage = Math.round((progress.completedTopicIds.length / totalPossibleTopics) * 100);

  const currentRank = useMemo(() => {
    if (progress.totalPoints < 1000) return "CASHLESS PEASANT";
    if (progress.totalPoints < 3000) return "MARKET APPRENTICE";
    if (progress.totalPoints < 6000) return "FINANCIAL OPERATIVE";
    return "INSTITUTIONAL OVERLORD";
  }, [progress.totalPoints]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 overflow-hidden flex font-['Space_Grotesk']">
      
      {/* SIDEBAR: COLLAPSIBLE TERMINAL */}
      <aside className={`fixed md:relative z-[60] h-screen transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) border-r border-white/10 glass-card p-8 flex flex-col gap-10 shrink-0 ${isSidebarOpen ? 'w-full md:w-[28rem] translate-x-0' : 'w-0 -translate-x-full md:w-20'}`}>
        
        {/* SIDEBAR CONTENT (ONLY VISIBLE WHEN OPEN) */}
        {isSidebarOpen && (
          <div className="h-full flex flex-col gap-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-sky-600 rounded-[1.5rem] flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(14,165,233,0.3)]">💰</div>
              <div>
                <h1 className="font-bungee text-3xl leading-none">FINANCE<br/><span className="text-sky-500">FRENZY</span></h1>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em]">War Room Terminal</span>
              </div>
            </div>

            <div className="space-y-10 flex-1 overflow-y-auto pr-4 scrollbar-hide">
              <div className="p-8 bg-slate-900/50 rounded-[2.5rem] border border-white/5 shadow-inner">
                <label className="text-[10px] font-bungee text-sky-500 uppercase tracking-widest mb-4 block">Status Profile</label>
                <p className="font-bungee text-3xl text-white mb-2">{currentRank}</p>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 transition-all duration-1000 shadow-[0_0_10px_rgba(14,165,233,0.5)]" style={{ width: `${(progress.totalPoints % 1000) / 10}%` }}></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="p-6 bg-slate-900/50 rounded-[2rem] border border-white/5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Combat XP</label>
                  <p className="font-mono text-2xl font-bold text-sky-400">{progress.totalPoints}</p>
                </div>
                <div className="p-6 bg-slate-900/50 rounded-[2rem] border border-white/5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">F-IQ</label>
                  <p className="font-mono text-2xl font-bold text-pink-400">{100 + (progress.completedTopicIds.length * 12)}</p>
                </div>
              </div>

              <div className="p-8 bg-slate-900/50 rounded-[2.5rem] border border-white/5">
                <div className="flex justify-between items-end mb-4">
                  <label className="text-[10px] font-bungee text-slate-500">GLOBAL MASTERY</label>
                  <span className="text-xs font-mono text-sky-400 font-bold">{completionPercentage}%</span>
                </div>
                <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-white/5 p-1">
                  <div className="h-full bg-gradient-to-r from-sky-600 to-pink-500 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                </div>
              </div>

              <div className="space-y-3 opacity-50">
                <label className="text-[10px] font-bungee text-slate-600 block">SYSTEM LOGS</label>
                <div className="font-mono text-[9px] text-slate-500 space-y-1">
                  <p className="text-green-500/80 tracking-tighter">{'>'} SECURING_NET_PROTOCOL_4.0</p>
                  <p className="text-sky-500/80 tracking-tighter">{'>'} SYNCING_INSTITUTIONAL_FEEDS...</p>
                  <p className="text-pink-500/80 tracking-tighter">{'>'} WEALTH_GAPS_DETECTED...</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOGGLE BUTTON */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-24 bg-sky-600 hover:bg-sky-500 rounded-r-2xl flex items-center justify-center border-y border-r border-sky-400/50 z-[70] shadow-[10px_0_30px_rgba(0,0,0,0.5)] transition-all group"
        >
          <span className="text-white text-xl font-bold group-hover:scale-125 transition-transform">{isSidebarOpen ? '❮' : '❯'}</span>
        </button>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 relative overflow-y-auto p-6 md:p-20 scroll-smooth bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.03),_transparent)]">
        
        {/* TOP NAVIGATION BAR */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-24">
          <div className="max-w-3xl">
            <h2 className="text-6xl md:text-9xl font-bungee text-white mb-8 tracking-tighter">FINANCE <span className="text-sky-500">WAR ROOM</span></h2>
            <p className="text-2xl text-slate-400 font-light leading-relaxed">Destroy your poverty habits. Master the mechanics of institutional wealth from Zero to Pro level.</p>
          </div>
          <div className="hidden lg:flex flex-col items-end gap-3 p-8 glass-card rounded-[2rem] border border-white/5">
            <span className="text-[10px] font-bungee text-sky-500 tracking-widest">ENCRYPTION: AES-256 SECURE</span>
            <div className="flex gap-2">
              {[1,2,3,4,5,6,7,8].map(i => <div key={i} className={`w-1.5 h-4 ${i < 6 ? 'bg-sky-500 shadow-[0_0_5px_rgba(14,165,233,0.8)]' : 'bg-slate-800'}`}></div>)}
            </div>
          </div>
        </header>

        {/* PROGRESSION MAP */}
        <div className="space-y-48 pb-64">
          {CURRICULUM.map((level, idx) => {
            const isUnlocked = level.id <= progress.currentLevel;
            const isDone = isUnlocked && level.topics.every(t => progress.completedTopicIds.includes(t.id));

            return (
              <div key={level.id} className={`relative transition-all duration-1000 ${!isUnlocked ? 'opacity-20 grayscale blur-[2px]' : 'opacity-100'}`}>
                
                {/* Level Header */}
                <div className="flex items-center gap-10 mb-20 relative z-10">
                  <div className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center text-6xl level-node border-4 transition-all shadow-[0_0_50px_rgba(0,0,0,0.5)] ${isDone ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-sky-600 border-sky-400 text-white'}`}>
                    {isUnlocked ? level.icon : "🔒"}
                  </div>
                  <div>
                    <h3 className="text-5xl md:text-7xl font-bungee text-white tracking-tighter mb-2">{level.name}</h3>
                    <p className="text-base font-mono text-sky-500 uppercase tracking-[0.6em] font-bold">{level.tagline}</p>
                  </div>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                  {level.topics.map((topic) => {
                    const completed = progress.completedTopicIds.includes(topic.id);
                    return (
                      <div
                        key={topic.id}
                        onClick={() => setSelectedTopic(topic)}
                        className={`group relative glass-card p-12 rounded-[4rem] border-2 transition-all cursor-pointer hover:-translate-y-4 hover:shadow-[0_40px_100px_rgba(0,0,0,0.6)]
                          ${completed ? 'border-green-500/40 hover:border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.1)]' : 'border-white/10 hover:border-sky-500 hover:shadow-[0_0_50px_rgba(14,165,233,0.1)]'}
                        `}
                      >
                        {completed && (
                          <div className="absolute -top-4 -right-4 bg-green-500 text-[10px] font-bungee px-8 py-3 rounded-full rotate-12 shadow-2xl z-20">DECRYPTED ✓</div>
                        )}
                        
                        <div className="flex justify-between items-start mb-10">
                          <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-4xl ${completed ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500 group-hover:bg-sky-500 group-hover:text-white transition-all'}`}>
                            {completed ? '✓' : '◈'}
                          </div>
                          <span className="text-[10px] font-mono font-bold text-slate-500 tracking-widest">+250 XP</span>
                        </div>

                        <h4 className="text-3xl font-bungee text-white mb-6 group-hover:text-sky-400 transition-colors">{topic.title}</h4>
                        <p className="text-base text-slate-400 leading-relaxed font-light line-clamp-3 mb-10">{topic.description}</p>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                          <span className="text-[10px] font-bungee text-sky-500 tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">ACCESS INTEL →</span>
                          <div className="flex gap-1.5">
                             <div className={`h-1.5 w-10 rounded-full ${completed ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'bg-slate-800'}`}></div>
                             <div className={`h-1.5 w-5 rounded-full ${completed ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'bg-slate-800'}`}></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Map Connector */}
                {idx < CURRICULUM.length - 1 && (
                  <div className={`absolute left-16 -bottom-32 w-1.5 h-32 ${isDone ? 'bg-gradient-to-b from-green-500 to-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.3)]' : 'bg-slate-800/50'}`}></div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* TOP-LEVEL MODAL */}
      {selectedTopic && (
        <TopicModal
          topic={selectedTopic}
          onClose={() => setSelectedTopic(null)}
          onComplete={handleCompleteTopic}
          isCompleted={progress.completedTopicIds.includes(selectedTopic.id)}
        />
      )}

      {/* REAL-TIME MARKET TICKER */}
      <footer className="fixed bottom-0 left-0 right-0 h-14 bg-black/90 backdrop-blur-2xl border-t border-white/5 px-8 flex items-center justify-between z-[80]">
        <div className="flex items-center gap-10 overflow-hidden w-full">
          <div className="flex items-center gap-3 shrink-0">
             <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,1)]"></div>
             <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Satellite Feeds: Active</span>
          </div>
          <div className="whitespace-nowrap animate-[marquee_50s_linear_infinite] inline-block text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em]">
            <span className="mx-14">₿ BTC: $96,402 <span className="text-green-400 font-bold">+2.4%</span></span>
            <span className="mx-14">Ξ ETH: $2,841 <span className="text-red-400 font-bold">-0.8%</span></span>
            <span className="mx-14"> AAPL: $228.14 <span className="text-green-400 font-bold">+1.1%</span></span>
            <span className="mx-14">🚀 TSLA: $251.44 <span className="text-green-400 font-bold">+4.2%</span></span>
            <span className="mx-14">🥇 GOLD: $2,741 <span className="text-slate-400">0.0%</span></span>
            <span className="mx-14">📊 SPX: 5,986 <span className="text-green-400 font-bold">+0.5%</span></span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-6 border-l border-white/10 pl-10 shrink-0">
           <span className="text-[10px] font-mono text-sky-500 font-bold tracking-[0.4em]">BUILD v4.1.0-ULTIMATE</span>
        </div>
        <style>{`
          @keyframes marquee { 0% { transform: translateX(50%); } 100% { transform: translateX(-100%); } }
        `}</style>
      </footer>
    </div>
  );
};

export default App;
