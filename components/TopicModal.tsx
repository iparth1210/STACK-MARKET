
import React, { useState, useEffect, useRef } from 'react';
import { Topic, SubTopic, Resource } from '../types';
import OracleChat from './OracleChat';
import InteractiveWidget from './InteractiveWidget';
import { getQuickQuiz, getStockFundamentals, analyzeVideo } from '../services/geminiService';

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
  const [showProLevel, setShowProLevel] = useState(false);
  
  const [stockSymbol, setStockSymbol] = useState('NVDA');
  const [fundamentals, setFundamentals] = useState<any>(null);
  const [loadingFundamentals, setLoadingFundamentals] = useState(false);

  // Video Analysis states
  const [videoAnalysis, setVideoAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startQuiz = async () => {
    setQuizLoading(true);
    setQuizFeedback(null);
    const data = await getQuickQuiz(topic.title);
    setQuizData(data);
    setQuizLoading(false);
  };

  const handleAnswer = (index: number) => {
    if (index === quizData.correctIndex) {
      setQuizFeedback(`✅ MISSION SUCCESS: ${quizData.funnyExplanation}`);
      setQuizAnswered(true);
    } else {
      setQuizFeedback("❌ CRITICAL ERROR: Your portfolio just crashed. Try again!");
    }
  };

  const fetchFundamentals = async () => {
    if (!stockSymbol) return;
    setLoadingFundamentals(true);
    const result = await getStockFundamentals(stockSymbol);
    setFundamentals(result);
    setLoadingFundamentals(false);
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setVideoAnalysis(null);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const result = await analyzeVideo(base64, file.type);
      setVideoAnalysis(result);
      setIsAnalyzing(false);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (topic.id === 't4-1' && !fundamentals) fetchFundamentals();
  }, [topic.id]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-2xl">
      <div className="bg-[#020617] w-full max-w-7xl max-h-[95vh] overflow-y-auto rounded-[3rem] border border-sky-500/30 shadow-[0_0_100px_rgba(14,165,233,0.2)] relative scrollbar-hide">
        
        {/* CLOSE BUTTON */}
        <button onClick={onClose} className="fixed top-14 right-14 z-[110] bg-white/5 hover:bg-red-500/20 p-4 rounded-full transition-all border border-white/10 hover:border-red-500/50 group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-8 p-8 md:p-16 space-y-20 border-r border-white/5">
            <header>
              <span className="text-[10px] font-bungee text-sky-500 mb-2 block tracking-widest uppercase">INTELLIGENCE BRIEFING</span>
              <h2 className="text-5xl md:text-8xl font-bungee text-white leading-tight mb-8 uppercase">{topic.title}</h2>
              <div className="bg-sky-500/5 border-l-4 border-sky-500 p-8 rounded-r-3xl">
                <h4 className="text-xs font-bungee text-sky-400 mb-4 tracking-widest uppercase">Mission Strategy: What you will learn</h4>
                <p className="text-xl text-slate-300 font-light leading-relaxed">{topic.missionStrategy}</p>
              </div>
            </header>

            {/* FUNDAMENTALS TERMINAL (Stock Specific - t4-1) */}
            {topic.id === 't4-1' && (
              <section className="bg-slate-950 p-10 rounded-[3rem] border-2 border-sky-500/20 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 font-bungee text-sky-500 text-4xl select-none uppercase">DATA TERMINAL</div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
                  <h3 className="text-3xl font-bungee text-white uppercase">Live Fundamentals</h3>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={stockSymbol} 
                      onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono uppercase focus:border-sky-500 outline-none w-32 shadow-inner"
                      placeholder="TICKER"
                    />
                    <button 
                      onClick={fetchFundamentals} 
                      disabled={loadingFundamentals}
                      className={`px-8 py-3 rounded-xl font-bungee text-xs text-white transition-all active:scale-95 ${loadingFundamentals ? 'bg-sky-900 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-500'}`}
                    >
                      {loadingFundamentals ? 'SCANNING...' : 'EXECUTE'}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                  {loadingFundamentals ? (
                    Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="bg-slate-900/50 p-5 rounded-2xl border border-white/5 h-24 shimmer"></div>
                    ))
                  ) : fundamentals?.data ? (
                    <>
                      {[
                        { label: 'Market Cap', value: fundamentals.data.marketCap },
                        { label: 'P/E Ratio', value: fundamentals.data.peRatio },
                        { label: 'Div Yield', value: fundamentals.data.dividendYield },
                        { label: '52W High', value: fundamentals.data.fiftyTwoWeekHigh },
                        { label: '52W Low', value: fundamentals.data.fiftyTwoWeekLow },
                        { label: 'Debt/Equity', value: fundamentals.data.debtToEquity },
                        { label: 'ROE', value: fundamentals.data.roe },
                        { label: 'Consensus', value: fundamentals.data.analystConsensus, highlight: true }
                      ].map((item, i) => (
                        <div key={i} className={`bg-slate-900 p-5 rounded-2xl border border-white/5 transition-all duration-300 transform hover:scale-[1.02] ${item.highlight ? 'bg-sky-900/20 border-sky-500/50' : ''}`}>
                          <p className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-widest">{item.label}</p>
                          <p className={`text-lg font-mono font-bold truncate ${item.highlight ? 'text-sky-400' : 'text-white'}`}>{item.value}</p>
                        </div>
                      ))}
                      
                      {/* AI SUMMARY & GROUNDING */}
                      <div className="col-span-full mt-6 bg-slate-900/80 p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-5 font-bungee text-sky-400 text-sm">ORACLE INSIGHT</div>
                        <p className="text-sm text-slate-300 font-mono leading-relaxed italic border-l-2 border-sky-500 pl-4">
                          "{fundamentals.data.summary}"
                        </p>
                        
                        {fundamentals.sources?.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-white/5">
                            <p className="text-[8px] font-bungee text-slate-500 mb-2 uppercase tracking-[0.2em]">Verified Intelligence Sources:</p>
                            <div className="flex flex-wrap gap-2">
                              {fundamentals.sources.map((chunk: any, i: number) => (
                                <a 
                                  key={i} 
                                  href={chunk.web?.uri || chunk.maps?.uri} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-[9px] font-mono text-sky-500/70 hover:text-sky-400 underline decoration-sky-500/30"
                                >
                                  [{chunk.web?.title || 'Source'}]
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="col-span-full py-10 text-center text-slate-500 font-mono">
                      No fundamental data available. Execute a scan.
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* VIDEO PLAYER & ANALYZER */}
            <section className="space-y-6">
              <div className="bg-black rounded-[3rem] overflow-hidden border border-white/10 aspect-video relative group shadow-2xl">
                {activeVideoId ? (
                  <iframe
                    width="100%" height="100%"
                    src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&mute=1&rel=0&modestbranding=1&enablejsapi=1&origin=${window.location.origin}`}
                    title="Educational Intel" 
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen 
                    className="absolute inset-0"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500 font-bungee p-10 text-center">
                    <span className="text-5xl mb-4">📺</span>
                    <p className="uppercase">Intelligence Feed Offline</p>
                    <p className="text-xs font-mono opacity-50 mt-2">Select a chapter below to view briefing</p>
                  </div>
                )}
              </div>

              {/* VIDEO UNDERSTANDING FEATURE */}
              <div className="bg-slate-900/60 p-8 rounded-[3rem] border border-sky-500/20 shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-bungee text-white uppercase tracking-tighter">Video Intel Analyzer</h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">Ingest media clips for key Alpha extraction (Powered by Gemini Pro)</p>
                  </div>
                  <div className="flex gap-3">
                    <input 
                      type="file" 
                      accept="video/*" 
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleVideoUpload}
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isAnalyzing}
                      className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bungee text-[10px] rounded-xl transition-all shadow-lg flex items-center gap-2"
                    >
                      {isAnalyzing ? (
                        <><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> PROCESSING...</>
                      ) : 'UPLOAD CLIP'}
                    </button>
                  </div>
                </div>

                {videoAnalysis ? (
                  <div className="bg-black/40 p-6 rounded-2xl border border-white/5 animate-in fade-in slide-in-from-bottom duration-700">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-bungee text-sky-500 tracking-widest uppercase">Decrypted Alpha Report</span>
                    </div>
                    <div className="text-sm text-slate-300 font-mono leading-relaxed prose prose-invert max-w-none">
                      {videoAnalysis.split('\n').map((line, i) => (
                        <p key={i} className="mb-2">{line}</p>
                      ))}
                    </div>
                  </div>
                ) : isAnalyzing ? (
                  <div className="py-12 flex flex-col items-center gap-4 text-slate-500">
                    <div className="w-12 h-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
                    <p className="font-bungee text-xs animate-pulse">Running Neural Net Analysis...</p>
                  </div>
                ) : (
                  <div className="py-10 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
                    <p className="text-slate-500 font-mono text-xs italic">No video content analyzed. Upload a clip to extract market intel.</p>
                  </div>
                )}
              </div>
            </section>

            {/* THE LEARNING PATHS */}
            <div className="space-y-12">
              <div className="flex items-center gap-4 p-2 bg-slate-900/50 rounded-full w-fit border border-white/5">
                <button 
                  onClick={() => setShowProLevel(false)}
                  className={`px-10 py-4 rounded-full font-bungee text-xs transition-all uppercase ${!showProLevel ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                >
                  LEVEL 1: THE BASICS
                </button>
                <button 
                  onClick={() => setShowProLevel(true)}
                  className={`px-10 py-4 rounded-full font-bungee text-xs transition-all uppercase ${showProLevel ? 'bg-pink-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                >
                  LEVEL 2: PRO SECRETS
                </button>
              </div>

              {topic.subTopics.map((sub, idx) => {
                const isRiskTopic = sub.title === 'Risk Management Essentials';
                const explanationText = showProLevel ? sub.institutionalSecret : sub.explanation;
                
                return (
                  <div key={idx} className="space-y-8">
                    <div className={`p-10 rounded-[3rem] border-2 transition-all duration-500 ${showProLevel ? 'border-pink-500/30 bg-pink-500/5' : 'border-sky-500/30 bg-sky-500/5'}`}>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <h3 className="text-3xl font-bungee text-white uppercase">{sub.title}</h3>
                        <div className="flex gap-2">
                          {sub.videoEmbedId && (
                            <button 
                              onClick={() => setActiveVideoId(sub.videoEmbedId!)}
                              className="text-[8px] font-bungee px-4 py-2 rounded-full bg-red-600/20 text-red-500 border border-red-500/50 hover:bg-red-600 hover:text-white transition-all uppercase"
                            >
                              ▶ Watch Intel
                            </button>
                          )}
                          <span className={`text-[10px] font-bungee px-4 py-2 rounded-full border uppercase ${showProLevel ? 'border-pink-500 text-pink-500' : 'border-sky-500 text-sky-500'}`}>
                            {showProLevel ? 'INSTITUTIONAL INTEL' : 'CORE PRINCIPLE'}
                          </span>
                        </div>
                      </div>
                      <div className="text-xl text-slate-300 leading-relaxed font-mono mb-6 whitespace-pre-wrap font-medium">
                        {explanationText}
                      </div>

                      {/* WHY THIS MATTERS SECTION */}
                      {sub.whyThisMatters && (
                        <div className="mb-8 p-6 bg-emerald-500/10 border-l-4 border-emerald-500 rounded-r-2xl">
                          <p className="text-[10px] font-bungee text-emerald-400 mb-2 uppercase tracking-widest">💡 The Real-World Impact</p>
                          <p className="text-sm text-slate-300 font-light leading-relaxed">{sub.whyThisMatters}</p>
                        </div>
                      )}

                      {isRiskTopic && (
                        <div className="mb-10 p-6 bg-slate-950/50 rounded-[2rem] border border-pink-500/20 shadow-2xl">
                          <p className="text-[10px] font-bungee text-pink-500 mb-6 tracking-widest uppercase">Visual Survival Kit: Position Sizing Visualization</p>
                          <InteractiveWidget topicId="t4-1" />
                        </div>
                      )}

                      {sub.vocabulary && sub.vocabulary.length > 0 && (
                        <div className="mt-12 bg-black/40 p-8 rounded-[2rem] border border-white/5">
                          <h4 className="text-[10px] font-bungee text-slate-500 mb-6 tracking-[0.2em] flex items-center gap-2 uppercase">
                            <span className="text-sky-500">◈</span> Vocabulary Vault
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {sub.vocabulary.map((v, i) => (
                              <div key={i} className="group border-l border-white/10 pl-4 hover:border-sky-500 transition-colors">
                                <span className="text-sky-400 font-bold block mb-1 group-hover:text-sky-300 font-mono text-sm tracking-tight uppercase">[{v.word}]</span>
                                <p className="text-xs text-slate-500 leading-relaxed italic">{v.definition}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <section className="bg-slate-900/40 p-12 rounded-[4rem] border border-white/5">
               <h3 className="text-2xl font-bungee text-white mb-8 uppercase">Tactical Financial Simulator</h3>
               <InteractiveWidget topicId={topic.id} />
            </section>

            <section className="bg-gradient-to-br from-slate-900 to-black p-12 rounded-[4rem] border border-sky-500/20 shadow-inner">
               <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">📝</div>
                 <h3 className="text-3xl font-bungee text-white uppercase tracking-tighter">Mission Recap</h3>
               </div>
               <p className="text-xl text-slate-400 leading-relaxed italic">
                 "Wealth isn't just about what you earn, it's about what you keep and how you multiply it. You've just decrypted the mechanics of <span className="text-white font-bold">{topic.title}</span>."
               </p>
            </section>
          </div>

          {/* SIDEBAR AREA */}
          <div className="lg:col-span-4 bg-slate-950/50 p-8 md:p-12 space-y-12">
            <section className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 shadow-2xl">
              <h3 className="text-xl font-bungee text-sky-500 mb-6 uppercase">Mastery Exam</h3>
              {!quizData && !quizLoading && (
                <button onClick={startQuiz} className="w-full py-6 bg-sky-600 hover:bg-sky-500 text-white font-bungee rounded-2xl transition-all shadow-xl text-lg uppercase">Initiate Assessment</button>
              )}
              {quizLoading && <div className="text-center font-mono text-sky-400 animate-pulse py-8 uppercase">Generating Questionnaire...</div>}
              {quizData && (
                <div className="space-y-8">
                  <p className="text-lg text-white font-bold leading-snug font-mono">{quizData.question}</p>
                  <div className="space-y-2">
                    {quizData.options.map((opt: string, i: number) => (
                      <button key={i} onClick={() => !quizAnswered && handleAnswer(i)} className={`w-full text-left p-4 text-[11px] rounded-xl border-2 transition-all uppercase ${quizAnswered ? i === quizData.correctIndex ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-slate-800 opacity-30 border-transparent' : 'bg-slate-800 border-white/5 hover:border-sky-500'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {quizFeedback && <p className="text-xs font-mono text-slate-400 bg-black/40 p-4 rounded-xl border border-white/5">{quizFeedback}</p>}
                </div>
              )}
            </section>

            <OracleChat currentTopic={topic.title} />

            <section className="space-y-4">
              <h4 className="text-[10px] font-bungee text-slate-500 tracking-widest uppercase mb-6">Recommended Intelligence</h4>
              {topic.resources.map((res, i) => (
                <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-white/5 hover:bg-sky-500/10 rounded-2xl border border-white/5 transition-all group">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{res.type === 'video' ? '📺' : res.type === 'book' ? '📚' : '📖'}</span>
                    <span className="text-[11px] font-bold text-slate-300 group-hover:text-white uppercase tracking-tighter">{res.title}</span>
                  </div>
                  <span className="text-sky-500 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              ))}
            </section>

            <button 
              onClick={() => { onComplete(topic.id); onClose(); }}
              className={`w-full py-10 rounded-[3rem] font-bungee text-2xl transition-all transform hover:-translate-y-2 uppercase shadow-2xl ${isCompleted ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-sky-500 hover:text-white'}`}
            >
              {isCompleted ? 'Mastered ✓' : 'Complete Mission'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicModal;
