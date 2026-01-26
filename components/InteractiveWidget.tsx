
import React, { useState, useMemo, useEffect, useRef } from 'react';

interface DataPoint {
  date: string;
  price: number;
  volume: number;
}

interface InteractiveWidgetProps {
  topicId: string;
}

const InteractiveWidget: React.FC<InteractiveWidgetProps> = ({ topicId }) => {
  // --- Common states ---
  const [amount, setAmount] = useState(1000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(7);
  const [monthlyContribution, setMonthlyContribution] = useState(500);

  // --- Topic Specific: t4-1 (Equity & Technical Analysis) ---
  const [activeTool, setActiveTool] = useState<'terminal' | 'risk'>('terminal');
  const [stockData, setStockData] = useState<DataPoint[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Indicators Toggles
  const [showSMA50, setShowSMA50] = useState(true);
  const [showSMA200, setShowSMA200] = useState(false);
  const [showRSI, setShowRSI] = useState(true);
  const [displayWindowSize, setDisplayWindowSize] = useState(80); 
  
  const lastSimDateRef = useRef<Date>(new Date());

  // Risk Calculator States
  const [portfolioSize, setPortfolioSize] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(1); // 1%
  const [entryPrice, setEntryPrice] = useState(200);
  const [stopLoss, setStopLoss] = useState(180);

  const riskMetrics = useMemo(() => {
    const riskAmount = portfolioSize * (riskPercent / 100);
    const riskPerShare = entryPrice - stopLoss;
    const maxShares = riskPerShare > 0 ? Math.floor(riskAmount / riskPerShare) : 0;
    const totalPositionValue = maxShares * entryPrice;
    const stopLossPercent = ((entryPrice - stopLoss) / entryPrice) * 100;

    return {
      riskAmount,
      riskPerShare,
      maxShares,
      totalPositionValue,
      stopLossPercent
    };
  }, [portfolioSize, riskPercent, entryPrice, stopLoss]);

  const compoundResult = useMemo(() => {
    const P = amount;
    const r = rate / 100;
    const n = 12; // monthly compounding
    const t = years;
    const PMT = monthlyContribution;

    if (r === 0) return P + (PMT * 12 * t);

    const principalCompounded = P * Math.pow(1 + r / n, n * t);
    const contributionsCompounded = PMT * (Math.pow(1 + r / n, n * t) - 1) / (r / n);
    
    return principalCompounded + contributionsCompounded;
  }, [amount, rate, years, monthlyContribution]);

  // Initial Data Generation
  useEffect(() => {
    if (topicId === 't4-1' && stockData.length === 0) {
      const initialData: DataPoint[] = [];
      let lastPrice = 180;
      const today = new Date();
      lastSimDateRef.current = new Date(today);
      
      const numPoints = 400; 
      for (let i = 0; i < numPoints; i++) {
        const volatility = 0.015;
        const change = lastPrice * (Math.random() - 0.49) * volatility * 2;
        lastPrice = Number((lastPrice + change).toFixed(2));
        const volume = Math.floor(Math.random() * 500000) + 100000;
        
        const d = new Date(today);
        d.setDate(today.getDate() - (numPoints - 1 - i));
        
        initialData.push({ 
          date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          price: lastPrice, 
          volume 
        });
      }
      setStockData(initialData);
    }
  }, [topicId]);

  const simulateNextDay = () => {
    setStockData(prev => {
      const lastItem = prev[prev.length - 1];
      const lastPrice = lastItem.price;
      const volatility = 0.035;
      const change = lastPrice * (Math.random() - 0.47) * volatility * 2;
      const nextPrice = Number((lastPrice + change).toFixed(2));
      const nextVolume = Math.floor(Math.random() * 800000) + 100000;
      
      const nextDate = new Date(lastSimDateRef.current);
      nextDate.setDate(nextDate.getDate() + 1);
      lastSimDateRef.current = nextDate;
      const nextDateStr = nextDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      const newData = [...prev, { date: nextDateStr, price: nextPrice, volume: nextVolume }];
      return newData.length > 500 ? newData.slice(1) : newData;
    });
  };

  // --- Technical Indicators Calculation ---
  const calculateSMA = (period: number) => {
    const smaValues: (number | null)[] = [];
    for (let i = 0; i < stockData.length; i++) {
      if (i < period - 1) {
        smaValues.push(null);
      } else {
        const slice = stockData.slice(i - period + 1, i + 1);
        const sum = slice.reduce((acc, curr) => acc + curr.price, 0);
        smaValues.push(sum / period);
      }
    }
    return smaValues;
  };

  const calculateRSI = (period: number = 14) => {
    const rsiValues: (number | null)[] = [];
    let avgGain = 0;
    let avgLoss = 0;

    for (let i = 1; i < stockData.length; i++) {
      const change = stockData[i].price - stockData[i - 1].price;
      const gain = Math.max(0, change);
      const loss = Math.max(0, -change);

      if (i <= period) {
        avgGain += gain / period;
        avgLoss += loss / period;
        if (i === period) {
          const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
          rsiValues.push(100 - 100 / (1 + rs));
        } else {
          rsiValues.push(null);
        }
      } else {
        avgGain = (avgGain * (period - 1) + gain) / period;
        avgLoss = (avgLoss * (period - 1) + loss) / period;
        const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        rsiValues.push(100 - 100 / (1 + rs));
      }
    }
    return [null, ...rsiValues];
  };

  const sma50 = useMemo(() => calculateSMA(50), [stockData]);
  const sma200 = useMemo(() => calculateSMA(200), [stockData]);
  const rsi = useMemo(() => calculateRSI(14), [stockData]);

  // --- Chart Drawing Logic ---
  const displayData = stockData.slice(-displayWindowSize);
  const displaySMA50 = sma50.slice(-displayWindowSize);
  const displaySMA200 = sma200.slice(-displayWindowSize);
  const displayRSI = rsi.slice(-displayWindowSize);

  const chartWidth = 800;
  const chartHeight = 300;
  const prices = displayData.map(d => d.price);
  
  const visibleIndicators = [
    ...(showSMA50 ? displaySMA50.filter(v => v !== null) : []),
    ...(showSMA200 ? displaySMA200.filter(v => v !== null) : [])
  ] as number[];

  const priceMax = Math.max(...prices, ...visibleIndicators) * 1.05;
  const priceMin = Math.min(...prices, ...visibleIndicators) * 0.95;
  const priceRange = priceMax - priceMin || 1;

  const getPoints = (data: (number | null)[]) => {
    return data
      .map((val, i) => {
        if (val === null) return null;
        const x = (i / (displayWindowSize - 1)) * chartWidth;
        const y = chartHeight - ((val - priceMin) / priceRange) * chartHeight;
        return `${x},${y}`;
      })
      .filter(p => p !== null)
      .join(' ');
  };

  const pricePoints = getPoints(displayData.map(d => d.price));
  const sma50Points = getPoints(displaySMA50);
  const sma200Points = getPoints(displaySMA200);

  const hoverStats = useMemo(() => {
    if (hoveredIndex === null || !displayData[hoveredIndex]) return null;
    const current = displayData[hoveredIndex];
    const prev = hoveredIndex > 0 ? displayData[hoveredIndex - 1] : null;
    const dailyChange = prev ? ((current.price - prev.price) / prev.price) * 100 : 0;
    return {
      date: current.date,
      price: current.price,
      volume: current.volume,
      change: dailyChange,
      isPositive: dailyChange >= 0,
      rsi: displayRSI[hoveredIndex],
      sma50: displaySMA50[hoveredIndex],
      sma200: displaySMA200[hoveredIndex],
      x: (hoveredIndex / (displayWindowSize - 1)) * chartWidth
    };
  }, [hoveredIndex, displayData, displayRSI, displaySMA50, displaySMA200, displayWindowSize]);

  // --- Topic Specific Render Logic ---
  switch (topicId) {
    case 't4-1':
      return (
        <div className="bg-[#020617] p-8 md:p-12 rounded-[3.5rem] border border-sky-500/20 shadow-2xl overflow-hidden relative group">
          <div className="flex flex-col gap-8 mb-12">
            <div className="flex flex-wrap justify-between items-center gap-6">
              <div className="flex gap-4 p-1.5 bg-white/5 rounded-2xl border border-white/5">
                <button 
                  onClick={() => setActiveTool('terminal')}
                  className={`px-8 py-3 rounded-xl font-bungee text-[10px] transition-all flex items-center gap-2 ${activeTool === 'terminal' ? 'bg-sky-600 text-white shadow-[0_0_20px_rgba(14,165,233,0.4)]' : 'text-slate-500 hover:text-white'}`}
                >
                  <span className="text-sm">📈</span> MARKET TERMINAL
                </button>
                <button 
                  onClick={() => setActiveTool('risk')}
                  className={`px-8 py-3 rounded-xl font-bungee text-[10px] transition-all flex items-center gap-2 ${activeTool === 'risk' ? 'bg-pink-600 text-white shadow-[0_0_20px_rgba(244,114,182,0.4)]' : 'text-slate-500 hover:text-white'}`}
                >
                  <span className="text-sm">🛡️</span> RISK CALCULATOR
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 overflow-hidden">
                  {[
                    { label: '1M', value: 22 },
                    { label: '3M', value: 66 },
                    { label: '1Y', value: 252 }
                  ].map(range => (
                    <button 
                      key={range.label}
                      onClick={() => setDisplayWindowSize(range.value)}
                      className={`text-[9px] font-mono font-bold px-4 py-2 transition-all ${displayWindowSize === range.value ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
                <button onClick={simulateNextDay} className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white text-[10px] font-bungee rounded-xl shadow-lg transition-all active:scale-95 uppercase">Advance Market ⏩</button>
              </div>
            </div>

            {activeTool === 'terminal' && (
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-[10px] font-bungee text-slate-500 tracking-widest uppercase border-r border-white/10 pr-4 mr-2">Technicals</span>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowSMA50(!showSMA50)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-mono font-bold transition-all ${showSMA50 ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-white/10 text-slate-500 hover:border-white/20'}`}
                  >
                    <div className="w-2 h-0.5 bg-orange-500"></div> SMA 50
                  </button>
                  <button 
                    onClick={() => setShowSMA200(!showSMA200)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-mono font-bold transition-all ${showSMA200 ? 'border-purple-500 bg-purple-500/10 text-purple-400' : 'border-white/10 text-slate-500 hover:border-white/20'}`}
                  >
                    <div className="w-2 h-0.5 bg-purple-500"></div> SMA 200
                  </button>
                  <button 
                    onClick={() => setShowRSI(!showRSI)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-mono font-bold transition-all ${showRSI ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-white/10 text-slate-500 hover:border-white/20'}`}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500"></div> RSI (14)
                  </button>
                </div>
              </div>
            )}
          </div>

          {activeTool === 'terminal' ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* MAIN CHART CONTAINER */}
              <div className="relative bg-slate-900/40 rounded-[2.5rem] border border-white/5 p-8 shadow-inner group/chart overflow-hidden">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-80 overflow-visible relative z-10 cursor-crosshair">
                  {/* Grid System */}
                  {[0.25, 0.5, 0.75].map(v => (
                    <line key={v} x1="0" y1={chartHeight * v} x2={chartWidth} y2={chartHeight * v} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  ))}
                  
                  {/* Sync Hover Line */}
                  {hoveredIndex !== null && (
                    <line 
                      x1={hoverStats?.x} 
                      y1="0" 
                      x2={hoverStats?.x} 
                      y2={chartHeight} 
                      stroke="rgba(14, 165, 233, 0.4)" 
                      strokeWidth="2" 
                      strokeDasharray="4"
                    />
                  )}

                  {/* Gradient Area under price */}
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path 
                    d={`M ${pricePoints} V ${chartHeight} H 0 Z`} 
                    fill="url(#priceGradient)" 
                    className="transition-all duration-300"
                  />

                  {/* Indicator Polylines */}
                  {showSMA50 && <polyline fill="none" stroke="#f97316" strokeWidth="2.5" strokeDasharray="6" points={sma50Points} className="opacity-80 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)] transition-all" />}
                  {showSMA200 && <polyline fill="none" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="8" points={sma200Points} className="opacity-80 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)] transition-all" />}
                  
                  {/* Main Price Polyline */}
                  <polyline 
                    fill="none" 
                    stroke="#0ea5e9" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    points={pricePoints} 
                    className="drop-shadow-[0_0_12px_rgba(14,165,233,0.6)]" 
                  />
                  
                  {/* Y-Axis Current Labels (Right Side) */}
                  <g className="font-mono text-[9px] font-bold">
                     <rect x={chartWidth - 5} y={chartHeight - ((displayData[displayData.length-1].price - priceMin) / priceRange) * chartHeight - 8} width="45" height="16" rx="4" fill="#0ea5e9" className="opacity-90" />
                     <text x={chartWidth} y={chartHeight - ((displayData[displayData.length-1].price - priceMin) / priceRange) * chartHeight + 4} fill="white">${displayData[displayData.length-1].price.toFixed(0)}</text>
                     
                     {showSMA50 && displaySMA50[displaySMA50.length-1] && (
                       <g>
                         <rect x={chartWidth - 5} y={chartHeight - ((displaySMA50[displaySMA50.length-1]! - priceMin) / priceRange) * chartHeight - 8} width="45" height="16" rx="4" fill="#f97316" className="opacity-90" />
                         <text x={chartWidth} y={chartHeight - ((displaySMA50[displaySMA50.length-1]! - priceMin) / priceRange) * chartHeight + 4} fill="white">${displaySMA50[displaySMA50.length-1]?.toFixed(0)}</text>
                       </g>
                     )}
                  </g>

                  {/* Interactive Zones */}
                  {displayData.map((_, i) => {
                    const x = (i / (displayWindowSize - 1)) * chartWidth;
                    const step = chartWidth / (displayWindowSize - 1);
                    return (
                      <rect 
                        key={i} 
                        x={x - step/2} 
                        y="0" 
                        width={step} 
                        height={chartHeight} 
                        fill="transparent" 
                        onMouseEnter={() => setHoveredIndex(i)} 
                        onMouseLeave={() => setHoveredIndex(null)} 
                      />
                    );
                  })}
                </svg>

                {/* DYNAMIC HUD TOOLTIP */}
                <div className="absolute top-8 left-8 bg-slate-950/90 border border-white/10 p-6 rounded-3xl pointer-events-none shadow-2xl min-w-[280px] z-20 backdrop-blur-xl border-l-4 border-l-sky-500">
                  <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                    <div>
                      <p className="text-[9px] text-slate-500 font-bungee tracking-widest uppercase mb-1">Session Date</p>
                      <p className="text-sm text-white font-mono font-bold">{hoverStats ? hoverStats.date : displayData[displayData.length - 1]?.date}</p>
                    </div>
                    {hoverStats && (
                      <div className={`flex flex-col items-end`}>
                        <p className="text-[9px] text-slate-500 font-bungee tracking-widest uppercase mb-1">Momentum</p>
                        <span className={`text-xs font-mono font-black ${hoverStats.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                          {hoverStats.isPositive ? '▲' : '▼'} {Math.abs(hoverStats.change).toFixed(2)}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-[9px] text-sky-500 font-bungee tracking-widest uppercase mb-2">Market Valuation</p>
                      <p className="text-5xl font-bungee text-white leading-none tracking-tighter">
                        ${hoverStats ? hoverStats.price.toFixed(2) : displayData[displayData.length - 1]?.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                      {showSMA50 && hoverStats?.sma50 && (
                        <div className="animate-in fade-in slide-in-from-left duration-300">
                          <p className="text-[8px] text-orange-500 font-bungee tracking-tighter uppercase mb-1">SMA 50</p>
                          <p className="text-sm font-mono text-white font-bold">${hoverStats.sma50.toFixed(2)}</p>
                        </div>
                      )}
                      {showSMA200 && hoverStats?.sma200 && (
                        <div className="animate-in fade-in slide-in-from-left duration-300">
                          <p className="text-[8px] text-purple-500 font-bungee tracking-tighter uppercase mb-1">SMA 200</p>
                          <p className="text-sm font-mono text-white font-bold">${hoverStats.sma200.toFixed(2)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* RSI SUB-CHART (SYNCED) */}
              {showRSI && (
                <div className="animate-in slide-in-from-bottom duration-700 bg-slate-900/60 p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-6 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                      <h4 className="text-[10px] font-bungee text-white uppercase tracking-widest">RSI OSCILLATOR (14)</h4>
                    </div>
                    {hoverStats && (
                       <div className="px-4 py-1 bg-black/50 border border-white/5 rounded-full">
                          <span className={`text-[10px] font-mono font-black ${hoverStats.rsi! > 70 ? 'text-red-500' : hoverStats.rsi! < 30 ? 'text-green-500' : 'text-slate-400'}`}>
                             VALUE: {hoverStats.rsi?.toFixed(2)}
                          </span>
                       </div>
                    )}
                  </div>
                  
                  <div className="relative h-28">
                    {/* Zones Overlay */}
                    <div className="absolute inset-0 bg-red-500/5 h-[30%] border-b border-red-500/10"></div>
                    <div className="absolute bottom-0 inset-x-0 bg-green-500/5 h-[30%] border-t border-green-500/10"></div>
                    
                    <svg viewBox={`0 0 ${chartWidth} 100`} className="w-full h-full overflow-visible relative z-10">
                      {/* Horizontal Ref Lines */}
                      <line x1="0" y1="30" x2={chartWidth} y2="30" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="0.5" strokeDasharray="4" />
                      <line x1="0" y1="70" x2={chartWidth} y2="70" stroke="rgba(34, 197, 94, 0.4)" strokeWidth="0.5" strokeDasharray="4" />
                      
                      {/* Sync Hover Vertical Line */}
                      {hoveredIndex !== null && (
                        <line x1={hoverStats?.x} y1="0" x2={hoverStats?.x} y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2" />
                      )}

                      <polyline 
                        fill="none" 
                        stroke="#22c55e" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                        points={displayRSI.map((v, i) => {
                          if (v === null) return null;
                          const x = (i / (displayWindowSize - 1)) * chartWidth;
                          const y = 100 - v; // 0-100 scale
                          return `${x},${y}`;
                        }).filter(p => p !== null).join(' ')} 
                        className="drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                      />

                      {/* Hover Node on RSI Line */}
                      {hoverStats?.rsi && (
                        <circle cx={hoverStats.x} cy={100 - hoverStats.rsi} r="5" fill="#22c55e" className="shadow-[0_0_10px_white]" />
                      )}
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in slide-in-from-right duration-500">
              <div className="space-y-10">
                <h4 className="text-[10px] font-bungee text-pink-500 tracking-[0.3em] mb-4 uppercase">Risk Protocol Inputs</h4>
                <div className="space-y-8">
                  <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                    <div className="flex justify-between text-[11px] font-mono mb-4">
                      <span className="text-slate-400 uppercase font-black">Account Value</span>
                      <span className="text-white font-black">${portfolioSize.toLocaleString()}</span>
                    </div>
                    <input type="range" min="1000" max="100000" step="1000" value={portfolioSize} onChange={(e) => setPortfolioSize(Number(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                      <p className="text-[9px] font-bungee text-sky-500 mb-2 uppercase">Entry ($)</p>
                      <input type="number" value={entryPrice} onChange={(e) => setEntryPrice(Number(e.target.value))} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white font-mono font-bold focus:border-sky-500 outline-none" />
                    </div>
                    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                      <p className="text-[9px] font-bungee text-red-500 mb-2 uppercase">Stop ($)</p>
                      <input type="number" value={stopLoss} onChange={(e) => setStopLoss(Math.min(Number(e.target.value), entryPrice - 1))} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white font-mono font-bold focus:border-red-500 outline-none" />
                    </div>
                  </div>

                  <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                    <div className="flex justify-between text-[11px] font-mono mb-4">
                      <span className="text-slate-400 uppercase font-black">Trade Risk %</span>
                      <span className="text-pink-500 font-black">{riskPercent}%</span>
                    </div>
                    <input type="range" min="0.1" max="5" step="0.1" value={riskPercent} onChange={(e) => setRiskPercent(Number(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-10 rounded-[3.5rem] border-2 border-pink-500/20 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 font-bungee text-pink-500 text-4xl select-none">BATTLE REPORT</div>
                
                <div className="space-y-10 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-pink-500/30">⚔️</div>
                    <div>
                      <h5 className="text-[10px] font-bungee text-white uppercase tracking-widest">Engagement Strategy</h5>
                      <p className="text-xs text-slate-400 font-mono">Calculated for maximum survivability</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                      <span className="text-[11px] text-slate-500 font-mono font-black uppercase">UNIT QUANTITY:</span>
                      <span className="text-5xl font-bungee text-white tracking-tighter">{riskMetrics.maxShares} Shares</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                      <span className="text-[11px] text-slate-500 font-mono font-black uppercase">FATAL RISK:</span>
                      <span className="text-2xl font-mono font-black text-red-500">-${riskMetrics.riskAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-10 border-t border-white/5 relative z-10">
                  <div className="h-4 w-full bg-slate-900 rounded-full relative overflow-hidden flex items-center shadow-inner">
                    <div className="absolute left-0 top-0 h-full bg-red-500/30 w-1/4"></div>
                    <div className="absolute right-0 top-0 h-full bg-green-500/30 w-3/4"></div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bungee text-red-500 uppercase mb-1">Abandon Position</span>
                      <span className="text-sm font-mono text-white font-bold">${stopLoss}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] font-bungee text-sky-500 uppercase mb-1">Execution Entry</span>
                      <span className="text-sm font-mono text-white font-bold">${entryPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );

    case 't2-1':
      return (
        <div className="bg-slate-900/80 p-10 rounded-[3rem] border border-sky-500/30 shadow-2xl space-y-10 animate-in zoom-in-95 duration-500">
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
             <div className="text-4xl">⏳</div>
             <h4 className="text-3xl font-bungee text-white uppercase tracking-tighter">The Compound Interest Engine</h4>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <div className="flex justify-between text-[11px] font-mono mb-4">
                  <span className="text-slate-400 uppercase font-black">Initial Seed ($)</span>
                  <span className="text-white font-black">${amount.toLocaleString()}</span>
                </div>
                <input type="range" min="0" max="100000" step="1000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                  <div className="flex justify-between text-[11px] font-mono mb-4">
                    <span className="text-slate-400 uppercase font-black">Time (Years)</span>
                    <span className="text-white font-black">{years}</span>
                  </div>
                  <input type="range" min="1" max="50" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500" />
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                  <div className="flex justify-between text-[11px] font-mono mb-4">
                    <span className="text-slate-400 uppercase font-black">Annual ROI (%)</span>
                    <span className="text-sky-500 font-black">{rate}%</span>
                  </div>
                  <input type="range" min="0" max="25" step="0.5" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 bg-sky-600/10 p-10 rounded-[3rem] border-2 border-sky-500/30 flex flex-col justify-center items-center text-center shadow-[inset_0_0_30px_rgba(14,165,233,0.1)]">
              <p className="text-[10px] text-sky-500 font-bungee uppercase tracking-[0.3em] mb-6">Estimated Terminal Wealth</p>
              <p className="text-6xl md:text-7xl font-bungee text-white mb-4 tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">${Math.round(compoundResult).toLocaleString()}</p>
              <div className="w-full h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-sky-500 w-full animate-[pulse_2s_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="p-16 text-center bg-slate-900/40 rounded-[3rem] border border-white/5 shadow-inner">
          <div className="text-6xl mb-6">🏦</div>
          <h4 className="text-xl font-bungee text-white mb-2 uppercase">Lab Terminal Restricted</h4>
          <p className="text-slate-500 italic font-mono text-sm max-w-md mx-auto">Tactical simulators are available for Phase 1 and Phase 2 missions. Select a relevant topic to unlock data visualization.</p>
        </div>
      );
  }
};

export default InteractiveWidget;
