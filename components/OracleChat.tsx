
import React, { useState, useEffect, useRef } from 'react';
import { askOracle } from '../services/geminiService';

interface OracleChatProps {
  currentTopic: string;
}

const OracleChat: React.FC<OracleChatProps> = ({ currentTopic }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleAsk = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    const result = await askOracle(currentTopic, input);
    setResponse(result);
    setLoading(false);
    setInput('');
  };

  useEffect(() => {
    const win = window as any;
    if (win.renderMathInElement && chatRef.current && response) {
      try {
        win.renderMathInElement(chatRef.current, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
          ],
          throwOnError: false
        });
      } catch (e) {
        console.warn("KaTeX render failure in OracleChat:", e);
      }
    }
  }, [response]);

  return (
    <div className="h-full flex flex-col gap-6">
      <div ref={chatRef} className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
        {response ? (
          <div className="space-y-4 animate-fade-up">
            <div className="flex gap-4 items-start">
               <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm font-bold shrink-0">Ω</div>
               <div className="bg-white/5 border border-white/5 p-6 rounded-[24px] text-sm text-slate-300 leading-relaxed italic font-light whitespace-pre-wrap">
                 {response}
               </div>
            </div>
            <button 
              onClick={() => setResponse('')} 
              className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest pl-12 transition-colors"
            >
              Clear Session
            </button>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30 space-y-4 px-10">
             <div className="text-4xl">🔮</div>
             <p className="text-xs text-white leading-relaxed font-light uppercase tracking-widest italic">The Principal Advisor is awaiting interrogation regarding {currentTopic}.</p>
          </div>
        )}
      </div>

      <div className="relative group shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Query institutional node..."
          className="w-full bg-white/5 border border-white/10 rounded-[20px] px-6 py-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-white/20"
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
        />
        <button
          onClick={handleAsk}
          disabled={loading || !input.trim()}
          className="absolute right-3 top-3 bottom-3 px-4 bg-accent hover:bg-white disabled:opacity-30 text-[#050A10] rounded-xl transition-all flex items-center justify-center font-bold"
        >
          {loading ? (
             <div className="w-4 h-4 border-2 border-[#050A10]/30 border-t-[#050A10] rounded-full animate-spin" />
          ) : (
             <span className="text-[10px] uppercase tracking-tight">Sync</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default OracleChat;
