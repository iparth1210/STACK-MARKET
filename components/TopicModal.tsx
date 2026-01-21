
import React, { useState, useEffect } from 'react';
import { Topic, SubTopic, Resource } from '../types';
import OracleChat from './OracleChat';
import InteractiveWidget from './InteractiveWidget';
import { getQuickQuiz, getStockFundamentals } from '../services/geminiService';

interface TopicModalProps {
  topic: Topic;
  onClose: () => void;
  onComplete: (topicId: string) => void;
  isCompleted: boolean;
}

const TopicModal: React.FC<TopicModalProps> = ({ topic, onClose, onComplete, isCompleted }) => {
  const [quizData, setQuizData] = useState<any>(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(topic.subTopics[0]?.videoEmbedId || null);
  
  // Stock Fundamentals State
  const [stockSymbol, setStockSymbol] = useState('NVDA');
  const [fundamentals, setFundamentals] = useState<any>(null);
  const [loadingFundamentals, setLoadingFundamentals] = useState(false);

  const startQuiz = async () => {
    setQuizLoading(true);
    setQuizFeedback(null);
    const data = await getQuickQuiz(topic.title);
    setQuizData(data);
    setQuizLoading(false);
  };

  const handleAnswer = (index: number) => {
    if (index === quizData.correctIndex) {
      setQuizFeedback(`✅ Correct! ${quizData.funnyExplanation}`);
      setQuizAnswered(true);
    } else {
      setQuizFeedback("❌ Ouch! Incorrect. The Oracle is disappointed. Try again!");
    }
  };

  const fetchFundamentals = async () => {
    setLoadingFundamentals(true);
    const data = await getStockFundamentals(stockSymbol);
    setFundamentals(data);
    setLoadingFundamentals(false);
  };

  useEffect(() => {
    if (topic.id === 't4-1' && !fundamentals) {
      fetchFundamentals();
    }
  }, [topic.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/95 backdrop-blur-xl">
      <div className="bg-slate-900 w-full max-w-6xl max-h-[96vh] overflow-y-auto rounded-[2.5rem] border-2 border-blue-500 shadow-[0_0_60px_rgba(59,130,246,0.3)] scroll-smooth">
        <div className="p-6 md:p-10">
          <div className="flex justify-between items-start mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-blue-500/20">Learning Hub</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bungee text-white leading-tight">{topic.title}</h2>
            </div>
            <button onClick={onClose} className="bg-slate-800 hover:bg-slate-700 p-3 rounded-full transition-all text-slate-400 hover:text-white hover:rotate-90">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Extensive Content (8 columns) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Explainer Video Section */}
              <section className="bg-slate-950 rounded-[2rem] overflow-hidden border-2 border-white/5 shadow-2xl group">
                <div className="relative aspect-video bg-black flex items-center justify-center">
                  {activeVideoId ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=0&rel=0`}
                      title="Explainer Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0"
                    />
                  ) : (
                    <div className="text-center p-10">
                      <span className="text-5xl mb-4 block">🎬</span>
                      <p className="text-slate-500 font-bungee">Explainer Terminal Offline</p>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-slate-900/50 flex items-center justify-between border-t border-white/5">
                   <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mastery Explainer Stream</span>
                   </div>
                   <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Interactive Video Intel</p>
                </div>
              </section>

              {/* LIVE FUNDAMENTALS SECTION (Specific for t4-1) */}
              {topic.id === 't4-1' && (
                <section className="bg-slate-800/50 p-8 rounded-[2rem] border border-blue-500/20 shadow-xl">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h3 className="text-2xl font-bungee text-white">📡 Live Fundamentals Scanner</h3>
                    <div className="flex gap-2 w-full md:w-auto">
                      <input 
                        type="text" 
                        value={stockSymbol} 
                        onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                        className="bg-slate-950 border border-blue-500/30 rounded-xl px-4 py-2 text-white font-bungee text-sm w-24 text-center focus:ring-2 focus:ring-blue-500"
                        placeholder="TICKER"
                      />
                      <button 
                        onClick={fetchFundamentals}
                        disabled={loadingFundamentals}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bungee text-[10px] px-4 py-2 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
                      >
                        {loadingFundamentals ? 'SCANNING...' : 'SCAN SYMBOL'}
                      </button>
                    </div>
                  </div>

                  {loadingFundamentals ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-300">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-slate-950 p-4 rounded-2xl border border-white/5 shimmer h-24 relative overflow-hidden">
                           <div className="h-3 w-1/2 bg-slate-800 rounded mb-4"></div>
                           <div className="h-5 w-3/4 bg-slate-800 rounded"></div>
                        </div>
                      ))}
                      <div className="col-span-2 md:col-span-4 mt-4 h-12 bg-slate-950 rounded-2xl border border-white/5 shimmer"></div>
                    </div>
                  ) : fundamentals ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-500">
                      {[
                        { label: 'Market Cap', value: fundamentals.marketCap, icon: '🏦' },
                        { label: 'P/E Ratio', value: fundamentals.peRatio, icon: '📊' },
                        { label: 'Div Yield', value: fundamentals.dividendYield, icon: '💰' },
                        { label: '52W Range', value: `${fundamentals.fiftyTwoWeekLow} - ${fundamentals.fiftyTwoWeekHigh}`, icon: '↔️' }
                      ].map((item, i) => (
                        <div key={i} className="bg-slate-950 p-4 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all">
                          <span className="text-lg mb-1 block">{item.icon}</span>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{item.label}</p>
                          <p className="text-sm font-bungee text-white truncate">{item.value}</p>
                        </div>
                      ))}
                      <div className="col-span-2 md:col-span-4 mt-4 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/20">
                         <p className="text-xs text-blue-400 italic">" {fundamentals.summary} "</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-500 italic text-sm">
                      Initialize scan to fetch real-time fundamental data from the Oracle's network.
                    </div>
                  )}
                </section>
              )}

              <section>
                <h3 className="text-xl font-bungee text-blue-400 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-sm">1</span>
                  Course Modules
                </h3>
                <div className="space-y-4">
                  {topic.subTopics.map((sub, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => sub.videoEmbedId && setActiveVideoId(sub.videoEmbedId)}
                      className={`group cursor-pointer bg-slate-800/30 p-6 rounded-2xl border-2 transition-all duration-300 ${activeVideoId === sub.videoEmbedId ? 'border-blue-500 bg-blue-500/5' : 'border-white/5 hover:border-blue-500/30'}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bungee text-sm shrink-0 transition-colors ${activeVideoId === sub.videoEmbedId ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-500 group-hover:bg-blue-500/20 group-hover:text-blue-400'}`}>
                          0{idx + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-white font-extrabold text-xl tracking-tight">{sub.title}</h4>
                            {sub.videoEmbedId && (
                              <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded border ${activeVideoId === sub.videoEmbedId ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-slate-900 border-white/10 text-slate-500 group-hover:text-blue-400'}`}>
                                {activeVideoId === sub.videoEmbedId ? 'Currently Playing' : 'Watch Explainer'}
                              </span>
                            )}
                          </div>
                          <p className="text-slate-400 leading-relaxed text-sm font-medium">{sub.explanation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-gradient-to-br from-yellow-500/10 to-transparent p-8 rounded-3xl border border-yellow-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 text-4xl opacity-20 rotate-12">🤣</div>
                <h3 className="text-yellow-500 font-bungee text-xl mb-4">The Oracle's Hot Take</h3>
                <p className="text-slate-100 italic text-2xl leading-snug font-medium">"{topic.funnyTake}"</p>
              </section>

              <section>
                <h3 className="text-xl font-bungee text-indigo-400 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-sm">2</span>
                  Simulation Lab
                </h3>
                <InteractiveWidget topicId={topic.id} />
              </section>

              <section className="bg-green-500/5 p-8 rounded-3xl border border-green-500/20">
                <h3 className="text-green-500 font-bungee text-xl mb-6">🔗 Deep Knowledge Base</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {topic.resources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-slate-800/80 hover:bg-slate-700 rounded-2xl transition-all group border border-slate-700 hover:border-green-500"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform text-lg">
                        {res.type === 'video' ? '📺' : res.type === 'book' ? '📚' : '📖'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{res.title}</p>
                        <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest mt-0.5">Open External Intel →</p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: AI & Completion (4 columns) */}
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-0">
              <section className="bg-indigo-900/40 p-6 rounded-3xl border border-indigo-500/30 shadow-2xl backdrop-blur-md">
                <h3 className="text-lg font-bungee text-indigo-400 mb-4 flex items-center gap-2">
                  <span>🧠</span> Mastery Challenge
                </h3>
                
                {!quizData && !quizLoading && (
                  <button 
                    onClick={startQuiz}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bungee rounded-xl transition-all shadow-lg active:scale-[0.98] border-b-4 border-indigo-800"
                  >
                    Initiate Quiz
                  </button>
                )}

                {quizLoading && (
                  <div className="text-center py-8 text-indigo-300 font-bold animate-pulse">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    Synthesizing Question...
                  </div>
                )}

                {quizData && (
                  <div className="space-y-4">
                    <p className="text-sm text-white font-bold leading-relaxed">{quizData.question}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {quizData.options.map((option: string, i: number) => (
                        <button
                          key={i}
                          onClick={() => !quizAnswered && handleAnswer(i)}
                          disabled={quizAnswered}
                          className={`w-full text-left p-4 text-xs rounded-xl border-2 transition-all ${
                            quizAnswered 
                              ? i === quizData.correctIndex 
                                ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                                : 'bg-slate-800 border-slate-700 text-slate-500'
                              : 'bg-slate-800 border-slate-700 hover:border-indigo-400 text-slate-200 hover:bg-slate-700'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {quizAnswered && (
                      <div className="p-4 bg-slate-900 rounded-xl text-xs text-indigo-300 leading-relaxed border border-indigo-500/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {quizFeedback}
                      </div>
                    )}
                  </div>
                )}
              </section>

              <OracleChat currentTopic={topic.title} />

              <div className="pt-4">
                <button
                  onClick={() => {
                    onComplete(topic.id);
                    onClose();
                  }}
                  disabled={isCompleted || (quizData && !quizAnswered)}
                  className={`w-full text-lg font-bungee px-6 py-5 rounded-2xl shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:grayscale disabled:pointer-events-none ${
                    isCompleted ? 'bg-green-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-b-4 border-indigo-900'
                  }`}
                >
                  {isCompleted ? 'Topic Mastered! ✅' : quizData && !quizAnswered ? 'Unlock by Quiz' : 'Finalize Module 🧠'}
                </button>
                <div className="flex items-center justify-between mt-4 px-2">
                   <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">+150 XP Bounty</span>
                   <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Level Progression</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicModal;