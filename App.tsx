
import React, { useState, useEffect, useMemo } from 'react';
import { CURRICULUM } from './constants';
import { Level, LevelStatus, Topic, UserProgress } from './types';
import TopicModal from './components/TopicModal';

const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('finance_frenzy_progress');
    return saved ? JSON.parse(saved) : {
      currentLevel: 1,
      completedTopicIds: [],
      totalPoints: 0
    };
  });

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  useEffect(() => {
    localStorage.setItem('finance_frenzy_progress', JSON.stringify(progress));
  }, [progress]);

  const handleCompleteTopic = (topicId: string) => {
    if (progress.completedTopicIds.includes(topicId)) return;

    setProgress(prev => {
      const newCompleted = [...prev.completedTopicIds, topicId];
      const newPoints = prev.totalPoints + 150;
      
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

  const getLevelStatus = (level: Level) => {
    if (progress.completedTopicIds.length > 0) {
      const allLevelTopicsCompleted = level.topics.every(t => progress.completedTopicIds.includes(t.id));
      if (allLevelTopicsCompleted) return LevelStatus.COMPLETED;
    }
    return LevelStatus.AVAILABLE;
  };

  const totalPossibleTopics = useMemo(() => 
    CURRICULUM.reduce((acc, curr) => acc + curr.topics.length, 0), 
  []);

  const completionPercentage = Math.round((progress.completedTopicIds.length / totalPossibleTopics) * 100);

  return (
    <div className="min-h-screen pb-32 selection:bg-blue-500 selection:text-white bg-slate-950">
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(59,130,246,0.5)] transform hover:rotate-12 transition-transform">💰</div>
            <div>
              <h1 className="text-2xl font-bungee text-white tracking-wider">Finance Frenzy</h1>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.3em]">Master of the Markets</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Market Cred</span>
              <span className="text-2xl font-bungee text-blue-400 tracking-tighter">{progress.totalPoints.toLocaleString()} XP</span>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 mt-12 mb-16">
        <div className="relative group p-1 rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.01]">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-3xl rounded-[2.5rem]"></div>
          <div className="relative z-10 p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-5xl md:text-7xl font-bungee text-white mb-6 leading-none">EVERYTHING <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">UNLOCKED</span></h2>
              <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
                The gates are open. From psychology to real estate, dive into any topic and start your journey from broke to broker.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 text-slate-300 font-bold uppercase text-xs tracking-widest">
                  {progress.completedTopicIds.length} / {totalPossibleTopics} Lessons Mastered
                </div>
              </div>
            </div>
            
            <div className="relative w-full lg:w-96 flex flex-col items-center">
              <div className="relative w-48 h-48 mb-6">
                <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                  <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552} strokeDashoffset={552 - (552 * completionPercentage) / 100} className="text-blue-500 transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bungee text-white">{completionPercentage}%</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Mastery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6">
        <div className="space-y-24 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent -translate-x-1/2 hidden lg:block"></div>

          {CURRICULUM.map((level, idx) => {
            const status = getLevelStatus(level);
            const isCompleted = status === LevelStatus.COMPLETED;

            return (
              <div key={level.id} className="relative">
                <div className="flex flex-col items-center mb-12 relative z-10 group">
                  <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-2xl border-2 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6
                    ${isCompleted ? 'bg-green-600 border-green-400 shadow-green-500/20' : 'bg-slate-900 border-blue-500 shadow-blue-500/20'}
                  `}>
                    {level.icon}
                  </div>
                  <div className="mt-6 text-center">
                    <span className="bg-blue-500/10 text-blue-400 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-500/20 mb-3 inline-block">Stage 0{level.id}</span>
                    <h3 className="text-3xl font-bungee text-white tracking-wide">{level.name}</h3>
                    <p className="text-slate-400 text-sm font-medium italic mt-1">{level.tagline}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  {level.topics.map((topic) => {
                    const isTopicCompleted = progress.completedTopicIds.includes(topic.id);
                    return (
                      <div
                        key={topic.id}
                        onClick={() => setSelectedTopic(topic)}
                        className={`group relative overflow-hidden bg-slate-900/40 p-8 rounded-3xl cursor-pointer border-2 transition-all duration-300
                          ${isTopicCompleted ? 'border-green-500/30 bg-green-500/5' : 'border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/60 hover:-translate-y-2'}
                        `}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all
                            ${isTopicCompleted ? 'bg-green-500/20 text-green-400 scale-110' : 'bg-slate-800 text-slate-500 group-hover:bg-blue-500 group-hover:text-white'}
                          `}>
                            {isTopicCompleted ? '✓' : '💎'}
                          </div>
                          {isTopicCompleted && <span className="bg-green-500/10 text-green-500 text-[9px] font-bold px-3 py-1 rounded-full uppercase border border-green-500/20">Mastered</span>}
                        </div>
                        
                        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors leading-tight">{topic.title}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{topic.description}</p>
                        
                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">+150 XP</span>
                          <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all opacity-0 group-hover:opacity-100">DIVE IN <span className="text-blue-500">→</span></span>
                        </div>
                        
                        {/* Interactive Sparkle Effect */}
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {selectedTopic && (
        <TopicModal
          topic={selectedTopic}
          onClose={() => setSelectedTopic(null)}
          onComplete={handleCompleteTopic}
          isCompleted={progress.completedTopicIds.includes(selectedTopic.id)}
        />
      )}

      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-[2rem] shadow-2xl z-50 flex items-center gap-12 group transition-all hover:px-12">
        <div className="flex flex-col items-center gap-1 text-blue-400">
          <span className="text-2xl group-hover:scale-125 transition-transform">🌍</span>
          <span className="text-[9px] font-bold uppercase tracking-widest">Global Access</span>
        </div>
        <div className="h-8 w-px bg-white/10"></div>
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <span className="text-[9px] font-bold uppercase tracking-widest mb-1">Total Progress</span>
          <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${completionPercentage}%` }}></div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default App;
