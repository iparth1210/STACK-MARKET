
import React, { useState, useMemo, useEffect } from 'react';

interface DataPoint {
  price: number;
  volume: number;
}

interface InteractiveWidgetProps {
  topicId: string;
}

const InteractiveWidget: React.FC<InteractiveWidgetProps> = ({ topicId }) => {
  // Common states
  const [amount, setAmount] = useState(1000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(7);
  const [monthlyContribution, setMonthlyContribution] = useState(500);

  // --- Topic Specific: t2-1 (Compound Interest Machine) ---
  const compoundResult = useMemo(() => {
    let total = amount;
    const monthlyRate = (rate / 100) / 12;
    const months = years * 12;
    for (let i = 0; i < months; i++) {
      total = (total + monthlyContribution) * (1 + monthlyRate);
    }
    return total;
  }, [amount, years, rate, monthlyContribution]);

  // --- Topic Specific: t3-2 (Debt Destruction) ---
  const [debtAmount, setDebtAmount] = useState(5000);
  const [apr, setApr] = useState(24);
  const monthlyInterest = (debtAmount * (apr / 100)) / 12;

  // --- Topic Specific: t4-1 (Market Terminal) ---
  const [stockData, setStockData] = useState<DataPoint[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (topicId === 't4-1' && stockData.length === 0) {
      const initialData: DataPoint[] = [];
      let lastPrice = 150;
      for (let i = 0; i < 30; i++) {
        const volatility = 0.03;
        const change = lastPrice * (Math.random() - 0.48) * volatility * 2;
        lastPrice = Number((lastPrice + change).toFixed(2));
        const volume = Math.floor(Math.random() * 500000) + 100000;
        initialData.push({ price: lastPrice, volume });
      }
      setStockData(initialData);
    }
  }, [topicId]);

  const simulateNextDay = () => {
    setStockData(prev => {
      const lastPrice = prev[prev.length - 1].price;
      const volatility = 0.05;
      const change = lastPrice * (Math.random() - 0.48) * volatility * 2;
      const nextPrice = Number((lastPrice + change).toFixed(2));
      const nextVolume = Math.floor(Math.random() * 800000) + 100000;
      return [...prev.slice(1), { price: nextPrice, volume: nextVolume }];
    });
  };

  const chartWidth = 400;
  const chartHeight = 150;
  const prices = stockData.map(d => d.price);
  const maxPrice = Math.max(...prices, 1);
  const minPrice = Math.min(...prices, 1);
  const range = maxPrice - minPrice || 1;

  const points = stockData.map((d, i) => {
    const x = (i / (stockData.length - 1)) * chartWidth;
    const y = chartHeight - ((d.price - minPrice) / range) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  const hoverStats = useMemo(() => {
    if (hoveredIndex === null || !stockData[hoveredIndex]) return null;
    const current = stockData[hoveredIndex];
    const prev = hoveredIndex > 0 ? stockData[hoveredIndex - 1] : null;
    const dailyChange = prev ? ((current.price - prev.price) / prev.price) * 100 : 0;
    return {
      price: current.price,
      volume: current.volume,
      change: dailyChange,
      isPositive: dailyChange >= 0
    };
  }, [hoveredIndex, stockData]);

  // --- Topic Specific: t5-2 (House Hacking) ---
  const [rentIncome, setRentIncome] = useState(2000);
  const [mortgage, setMortgage] = useState(2500);
  const netCost = mortgage - rentIncome;

  // --- Topic Specific: t6-1 (Tax Bracket Visualizer) ---
  const [income, setIncome] = useState(75000);
  const taxEstimate = useMemo(() => {
    if (income <= 11600) return income * 0.10;
    if (income <= 47150) return 1160 + (income - 11600) * 0.12;
    if (income <= 100525) return 5426 + (income - 47150) * 0.22;
    return 17168 + (income - 100525) * 0.24;
  }, [income]);

  // --- Topic Specific: t8-1 (Crypto Crash) ---
  const [cryptoPrice, setCryptoPrice] = useState(60000);
  const [isCrashed, setIsCrashed] = useState(false);
  const triggerCrash = () => {
    setIsCrashed(true);
    const drop = 0.4 + Math.random() * 0.4;
    setCryptoPrice(prev => Number((prev * (1 - drop)).toFixed(0)));
    setTimeout(() => setIsCrashed(false), 2000);
  };

  // --- Topic Specific: t12-1 (Inflation Thief) ---
  const [inflationRate, setInflationRate] = useState(3);
  const futurePurchasingPower = useMemo(() => {
    return amount * Math.pow(1 - inflationRate / 100, years);
  }, [amount, inflationRate, years]);

  switch (topicId) {
    case 't2-1':
      return (
        <div className="bg-slate-800/80 p-6 rounded-2xl border border-blue-500/30 shadow-xl">
          <h4 className="text-lg font-bungee text-blue-400 mb-4">⏳ Compound Interest Machine</h4>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Initial Stash: ${amount.toLocaleString()}</label>
              <input type="range" min="0" max="100000" step="1000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Monthly Deposit: ${monthlyContribution.toLocaleString()}</label>
              <input type="range" min="0" max="5000" step="100" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Years of Growth: {years}</label>
              <input type="range" min="1" max="40" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div className="bg-slate-950 p-6 rounded-xl border border-blue-500/20 text-center">
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Your Future Fortune</p>
              <p className="text-4xl font-bungee text-white">${Math.round(compoundResult).toLocaleString()}</p>
              <p className="text-[9px] text-blue-400 mt-2 font-bold uppercase">Assuming 7% Average Annual Return</p>
            </div>
          </div>
        </div>
      );

    case 't3-2':
      return (
        <div className="bg-slate-800/80 p-6 rounded-2xl border border-red-500/30 shadow-xl">
          <h4 className="text-lg font-bungee text-red-400 mb-4">💣 Debt Interest Trap</h4>
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Debt Amount: ${debtAmount.toLocaleString()}</label>
            <input type="range" min="500" max="50000" step="500" value={debtAmount} onChange={(e) => setDebtAmount(Number(e.target.value))} className="w-full accent-red-500" />
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">APR: {apr}%</label>
            <input type="range" min="5" max="35" value={apr} onChange={(e) => setApr(Number(e.target.value))} className="w-full accent-red-500" />
            <div className="bg-slate-950 p-6 rounded-xl border border-red-500/20 text-center">
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Monthly Interest Payment</p>
              <p className="text-3xl font-bungee text-red-500">${monthlyInterest.toFixed(2)}</p>
              <p className="text-[9px] text-slate-500 mt-2 italic">This money goes straight to the bank's profit. It never touches your debt balance.</p>
            </div>
          </div>
        </div>
      );

    case 't4-1':
      return (
        <div className="bg-slate-800/80 p-6 rounded-2xl border border-blue-500/30 shadow-xl overflow-hidden relative">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-bungee text-blue-400">💹 Market Terminal</h4>
            <button onClick={simulateNextDay} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bungee rounded-lg transition-all shadow-lg active:scale-95">Next Day</button>
          </div>
          <div className="relative mb-6 group">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="absolute inset-0 w-full h-40 opacity-10 pointer-events-none">
              {stockData.map((d, i) => {
                const x = (i / (stockData.length - 1)) * chartWidth;
                const barHeight = (d.volume / 1000000) * chartHeight;
                return <rect key={i} x={x - 2} y={chartHeight - barHeight} width="4" height={barHeight} fill="#3b82f6" />;
              })}
            </svg>
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-40 overflow-visible relative z-10">
              <polyline fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points} className="drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              {stockData.map((_, i) => {
                const x = (i / (stockData.length - 1)) * chartWidth;
                return <rect key={i} x={x - (chartWidth / stockData.length / 2)} y="0" width={chartWidth / stockData.length} height={chartHeight} fill="transparent" onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} className="cursor-crosshair" />;
              })}
              {hoveredIndex !== null && stockData[hoveredIndex] && (
                <g>
                  <line x1={(hoveredIndex / (stockData.length - 1)) * chartWidth} y1="0" x2={(hoveredIndex / (stockData.length - 1)) * chartWidth} y2={chartHeight} stroke="rgba(59,130,246,0.4)" strokeDasharray="4" />
                  <circle cx={(hoveredIndex / (stockData.length - 1)) * chartWidth} cy={chartHeight - ((stockData[hoveredIndex].price - minPrice) / range) * chartHeight} r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
                </g>
              )}
            </svg>
            <div className="absolute top-0 right-0 bg-slate-900 border border-blue-500/50 p-4 rounded-xl pointer-events-none shadow-2xl min-w-[140px] z-20 backdrop-blur-md">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Market Metrics</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bungee text-white">${hoverStats ? hoverStats.price : stockData[stockData.length - 1]?.price}</span>
                  {hoverStats && <span className={`text-[10px] font-bold ${hoverStats.isPositive ? 'text-green-400' : 'text-red-400'}`}>{hoverStats.isPositive ? '▲' : '▼'} {Math.abs(hoverStats.change).toFixed(2)}%</span>}
                </div>
                <div className="mt-1 flex justify-between items-center border-t border-white/10 pt-1">
                  <span className="text-[8px] text-slate-500 font-bold uppercase">Volume</span>
                  <span className="text-[10px] font-bungee text-blue-400">{(hoverStats ? hoverStats.volume : stockData[stockData.length - 1]?.volume || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed italic border-l-2 border-blue-500 pl-3">Pro Tip: Markets are emotional. Sudden high volume with price drops often means panic. Smart money buys the blood.</p>
        </div>
      );

    case 't5-2':
      return (
        <div className="bg-slate-800/80 p-6 rounded-2xl border border-green-500/30 shadow-xl">
          <h4 className="text-lg font-bungee text-green-400 mb-4">🏠 House Hack Simulator</h4>
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monthly Mortgage: ${mortgage.toLocaleString()}</label>
            <input type="range" min="500" max="10000" step="100" value={mortgage} onChange={(e) => setMortgage(Number(e.target.value))} className="w-full accent-green-500" />
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Neighbor's Rent: ${rentIncome.toLocaleString()}</label>
            <input type="range" min="0" max="10000" step="100" value={rentIncome} onChange={(e) => setRentIncome(Number(e.target.value))} className="w-full accent-green-500" />
            <div className="bg-slate-950 p-6 rounded-xl border-2 border-green-500/50 text-center">
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Your Net Living Cost</p>
              <p className={`text-4xl font-bungee ${netCost <= 0 ? 'text-green-400' : 'text-white'}`}>${netCost <= 0 ? 0 : netCost.toLocaleString()}</p>
              {netCost <= 0 && <p className="text-[9px] text-green-400 mt-2 font-bold uppercase animate-bounce">Profit! Living for free!</p>}
            </div>
          </div>
        </div>
      );

    case 't6-1':
      return (
        <div className="bg-slate-800/80 p-6 rounded-2xl border border-indigo-500/30 shadow-xl">
          <h4 className="text-lg font-bungee text-indigo-400 mb-4">⚖️ Tax Bracket Visualizer</h4>
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Annual Taxable Income: ${income.toLocaleString()}</label>
            <input type="range" min="10000" max="250000" step="1000" value={income} onChange={(e) => setIncome(Number(e.target.value))} className="w-full accent-indigo-500" />
            <div className="bg-slate-950 p-6 rounded-xl border border-indigo-500/20 text-center">
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Estimated Fed Tax</p>
              <p className="text-3xl font-bungee text-indigo-400">${Math.round(taxEstimate).toLocaleString()}</p>
              <p className="text-[9px] text-slate-500 mt-2 italic">Effective Rate: {((taxEstimate / income) * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      );

    case 't8-1':
      return (
        <div className="bg-slate-800/80 p-6 rounded-2xl border border-orange-500/30 shadow-xl">
          <h4 className="text-lg font-bungee text-orange-400 mb-4">💎 Crypto Volatility Sim</h4>
          <div className="text-center py-8">
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Bitcoin Price</p>
            <p className={`text-5xl font-bungee transition-all ${isCrashed ? 'text-red-500 scale-110 animate-shake' : 'text-white'}`}>
              ${cryptoPrice.toLocaleString()}
            </p>
          </div>
          <button 
            onClick={triggerCrash}
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bungee rounded-xl transition-all shadow-lg active:scale-95 border-b-4 border-orange-800"
          >
            A Random Billionaire Tweets
          </button>
          <p className="text-[10px] text-slate-500 mt-4 italic text-center leading-relaxed">
            Warning: Crypto can move 50% in an afternoon. This button simulates a "Black Swan" event.
          </p>
        </div>
      );

    case 't12-1':
      return (
        <div className="bg-slate-800/80 p-6 rounded-2xl border border-red-500/30 shadow-xl">
          <h4 className="text-lg font-bungee text-red-400 mb-4">👻 The Inflation Thief</h4>
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount Stashed Under Mattress: ${amount.toLocaleString()}</label>
            <input type="range" min="1000" max="100000" step="1000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full accent-red-500" />
            
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inflation Rate: {inflationRate}%</label>
            <input type="range" min="1" max="15" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} className="w-full accent-red-500" />

            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time (Years): {years}</label>
            <input type="range" min="1" max="30" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-red-500" />

            <div className="bg-slate-950 p-6 rounded-xl border-2 border-red-500/20 text-center">
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Future Purchasing Power</p>
              <p className="text-4xl font-bungee text-red-500">${Math.round(futurePurchasingPower).toLocaleString()}</p>
              <p className="text-[9px] text-slate-500 mt-2 italic font-bold">Your $100 buys half as many tacos.</p>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="p-10 text-center bg-slate-800/40 rounded-2xl border border-slate-700/50">
          <span className="text-4xl mb-3 block">🏦</span>
          <p className="text-slate-400 italic font-medium text-sm">Finance Lab. Real-time modeling active for selected Pro topics.</p>
        </div>
      );
  }
};

export default InteractiveWidget;
