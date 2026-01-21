
import React, { useState } from 'react';
import { askOracle } from '../services/geminiService';

interface OracleChatProps {
  currentTopic: string;
}

const OracleChat: React.FC<OracleChatProps> = ({ currentTopic }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await askOracle(currentTopic, input);
    setResponse(result);
    setLoading(false);
    setInput('');
  };

  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-blue-500/30 mt-6">
      <h3 className="text-xl font-bungee text-blue-400 mb-2">Ask the Oracle 🔮</h3>
      <p className="text-sm text-slate-400 mb-4">Have a burning question about {currentTopic}? The Wall Street Oracle is ready to judge you (and help you).</p>
      
      {response && (
        <div className="bg-slate-900 p-4 rounded-lg mb-4 border-l-4 border-blue-500 italic text-slate-200">
          "{response}"
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., Should I buy Bitcoin at 2 AM?"
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 text-white font-bold px-6 py-2 rounded-lg transition-colors"
        >
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </div>
    </div>
  );
};

export default OracleChat;
