
import { Level, LevelStatus } from './types';

export const CURRICULUM: Level[] = [
  {
    id: 1,
    name: "PHASE 0: THE GENESIS",
    tagline: "From Bartering Goats to Digital Gold.",
    status: LevelStatus.AVAILABLE,
    icon: "📜",
    topics: [
      {
        id: "t0-1",
        title: "What is a Market?",
        description: "The 'Who, What, Why' of global exchange. Understanding the core concept of trade.",
        missionStrategy: "Deconstruct the market into its simplest form. Learn why markets exist, who controls them, and why they are the heartbeat of civilization.",
        funnyTake: "A market is just a giant group chat where everyone is arguing over what a piece of paper is worth. We're here to win the argument.",
        subTopics: [
          {
            title: "Why Do Markets Exist?",
            explanation: "Markets solve the 'Double Coincidence of Wants.' Instead of trading a goat for a chair, we use money as a medium to trade anything with anyone.",
            institutionalSecret: "Institutions view markets as 'Liquidity Pools.' They don't just trade value; they trade the ability to enter and exit positions without moving the price.",
            vocabulary: [
              { word: "Liquidity", definition: "How easily an asset can be turned into cash without affecting its market price." },
              { word: "Double Coincidence of Wants", definition: "An economic phenomenon where two parties each hold an item the other wants." }
            ],
            videoEmbedId: "fS8S4Y4qGxw"
          },
          {
            title: "Who Runs the Show?",
            explanation: "Retail traders (you), Institutional giants (Banks/Hedge Funds), and Market Makers (the house) all fight for a slice of the pie.",
            institutionalSecret: "Market Makers make money on the 'Spread'—the difference between the buy and sell price. They win regardless of which way the market goes.",
            vocabulary: [
              { word: "Bid-Ask Spread", definition: "The difference between the highest price a buyer will pay and the lowest price a seller will accept." },
              { word: "Market Maker", definition: "A firm that stands ready to buy and sell a particular stock on a regular basis." }
            ],
            videoEmbedId: "Z7p8_z_Lh_g"
          }
        ],
        resources: [
          { title: "Brief History of Markets", url: "https://www.investopedia.com/articles/07/stock-exchange-history.asp", type: "article" }
        ],
        isQuizCompleted: false
      },
      {
        id: "t1-1",
        title: "Dopamine & Debt",
        description: "Psychological warfare: Why your brain is programmed to stay broke.",
        missionStrategy: "Identify the 'Consumer OS' and replace it with the 'Investor OS'. Learn how marketing triggers impulsive spending via dopamine loops.",
        funnyTake: "Your brain is a lab rat addicted to clicking 'Buy Now'. We're here to kill the rat and hire a CEO.",
        subTopics: [
          { 
            title: "The Neuro-Marketing Trap", 
            explanation: "Companies use red buttons and 'limited time' timers to bypass your logic and hit your dopamine receptors.", 
            institutionalSecret: "The 'VIX' or Fear Index measures how panicked the crowd is. Institutions buy when your dopamine is low and your fear is high.",
            vocabulary: [
              { word: "VIX", definition: "A ticker symbol for the CBOE Volatility Index, a popular measure of the stock market's expectation of volatility." }
            ],
            videoEmbedId: "D8C7796uM_0" 
          }
        ],
        resources: [
          { title: "Psychology of Money", url: "https://www.youtube.com/watch?v=R0S_Lp7hI0k", type: "video" }
        ],
        isQuizCompleted: false
      }
    ]
  },
  {
    id: 2,
    name: "PHASE 1: THE EQUITY CASINO",
    tagline: "Own the means of production.",
    status: LevelStatus.AVAILABLE,
    icon: "📈",
    topics: [
      {
        id: "t4-1",
        title: "The Equity Game",
        description: "Moving from working for money to owning the machines that make money.",
        missionStrategy: "Learn how to value a company. We look at the 'Wh' of analysis: What does it make? Where is it going? How does it survive?",
        funnyTake: "Stop buying the shoes, buy the company that makes the shoes. Let everyone else pay YOU for their dopamine hits.",
        subTopics: [
          { 
            title: "Fundamental Analysis: The 'How'", 
            explanation: "To truly understand a company, you must master the 'Big Three' statements:\n\n1. THE BALANCE SHEET (A Snapshot of Wealth): Shows what a company OWNS (Assets) vs what it OWES (Liabilities). Formula: Assets = Liabilities + Shareholders' Equity. Example: If a tech giant has $100B in cash but $80B in debt, they only 'really' have $20B.\n\n2. THE INCOME STATEMENT (The Performance Review): Tracks Revenue minus Expenses over time. It ends with 'Net Income' (the bottom line). If Revenue is growing but Net Income is shrinking, the company is getting inefficient.\n\n3. THE CASH FLOW STATEMENT (The Truth Detector): Profits on paper can be faked, but cash is king. This tracks cash coming in from Ops, going out for Investing, and moving via Financing. A company with high 'Net Income' but negative 'Operating Cash Flow' is often cooking the books.", 
            whyThisMatters: "If you don't know what a company actually owns and earns, you're just gambling. Knowing the numbers helps you spot a bargain before everyone else does.",
            institutionalSecret: "Top hedge funds now use Large Language Models (LLMs) and custom AI to ingest 500-page 10-K filings in seconds. These AI agents don't just read the numbers; they perform 'Sentiment Scouring' on the management's tone during earnings calls to detect hidden anxiety or deception that a human might miss.",
            vocabulary: [
              { word: "P/E Ratio", definition: "Price-to-Earnings ratio. How much you pay for every dollar of profit." },
              { word: "EPS", definition: "Earnings Per Share. A portion of a company's profit allocated to each outstanding share." },
              { word: "10-K", definition: "A comprehensive annual report filed by public companies with the SEC, containing a detailed summary of financial performance." }
            ],
            videoEmbedId: "1kvknZoU--M" 
          },
          {
            title: "Market Mechanics: Where is the Price?",
            explanation: "Price isn't a fixed number; it's the result of the 'Limit Order Book'—a list of everyone wanting to buy and sell. High-Frequency Trading (HFT) algorithms scan this book thousands of times per second, looking to exploit millisecond gaps between buyers and sellers. When you click 'Buy', these bots often 'front-run' you, changing the price before your finger even leaves the mouse.",
            whyThisMatters: "Ever wonder why the price jumps $0.05 the exact microsecond you try to buy? That's HFT bots eating your lunch. Using 'Limit Orders' instead of 'Market Orders' is your only defense against these high-speed digital pickpockets.",
            funnyTake: "The market is like a massive high-speed auction where the auctioneer is a robot on espresso and you're still trying to find your paddle.",
            institutionalSecret: "The 'real' big trades don't happen on public charts. Big banks use 'Dark Pools'—private exchanges where they trade millions of shares without showing up in the public order book. They do this to hide their tracks so they don't crash the price before they're done selling.",
            vocabulary: [
              { word: "Limit Order", definition: "An order to buy or sell a stock at a specific price or better." },
              { word: "Dark Pool", definition: "Private exchanges for trading securities that are not accessible to the investing public, allowing institutions to trade large blocks without moving the market." },
              { word: "HFT", definition: "High-Frequency Trading. Algorithmic trading characterized by high speeds, high turnover rates, and high order-to-trade ratios." }
            ],
            videoEmbedId: "_8_v-I-t9mQ"
          },
          {
            title: "Understanding Market Cycles",
            explanation: "Markets move in waves. The 'Boom' is driven by greed and easy money, while the 'Bust' is driven by fear and liquidation. Knowing where you are in the cycle prevents you from buying the 'Top'.",
            whyThisMatters: "Markets have seasons just like the weather. Buying in a 'boom' is like buying a winter coat in July—you're likely paying way too much. Knowing the cycle saves your skin.",
            institutionalSecret: "Big players use the 'Wyckoff Theory' to identify accumulation and distribution phases. They buy when everyone is crying and sell when everyone is celebrating.",
            funnyTake: "Buying at the top of a boom is like being the last person at a party when the cops show up. You're left holding the bill.",
            vocabulary: [
              { word: "Bull Market", definition: "A period where stock prices are rising or are expected to rise." },
              { word: "Bear Market", definition: "A period where stock prices are falling and widespread pessimism causes the negative sentiment to be self-sustaining." }
            ],
            videoEmbedId: "wf91baAL27M"
          },
          {
            title: "Behavioral Finance: The Mind Games",
            explanation: "Your brain is a legacy system designed for running away from lions, not trading tech stocks. Biases like 'Confirmation Bias' (only reading what you agree with) and 'Herding' (doing what the crowd does) are the primary reasons retail traders lose money.",
            whyThisMatters: "Understanding your own mental glitches is the ultimate 'hack'. If you know you're prone to panic-selling just because everyone else is, you can build systems to stop yourself from being your own worst enemy.",
            funnyTake: "Following the herd is great if you're a sheep. It's terrible if you're an investor, because sheep usually end up as dinner.",
            institutionalSecret: "Hedge funds use 'Sentiment Analysis' bots to track exactly how panicked or greedy you are on social media. They trade against your emotions.",
            vocabulary: [
              { word: "Confirmation Bias", definition: "The tendency to search for, interpret, favor, and recall information in a way that confirms one's prior beliefs." },
              { word: "Herding", definition: "When investors follow what they perceive other investors are doing, rather than their own analysis." }
            ],
            videoEmbedId: "fT8M1xHwT6k"
          },
          {
            title: "Introduction to Options Trading",
            explanation: "Options are financial contracts that give you the right, but not the obligation, to buy or sell an asset at a set price within a specific timeframe. A 'Call' is a bet that the price will go UP, while a 'Put' is a bet that the price will go DOWN. Basic strategies include 'Buying Calls' for profit or 'Covered Calls' to generate income from stocks you already own.",
            whyThisMatters: "Options allow you to control 100 shares of a stock for a fraction of the cost of buying them outright. They are the ultimate tool for leverage and hedging.",
            funnyTake: "Options are like paying for the right to buy a pizza at yesterday's price. If the price of pizza doubles, you're a genius. If it drops, you just lost your pizza coupon fee.",
            institutionalSecret: "Professional 'Theta Gang' traders make money by selling options that are likely to expire worthless. They aren't betting on price; they are betting on the passage of time (Time Decay). They are the house, and retail 'Option Buyers' are the gamblers.",
            vocabulary: [
              { word: "Call", definition: "An option contract that gives the holder the right to buy an asset." },
              { word: "Put", definition: "An option contract that gives the holder the right to sell an asset." },
              { word: "Strike Price", definition: "The specific price at which an option holder can buy or sell the underlying asset." },
              { word: "Premium", definition: "The price paid to acquire an option contract." }
            ],
            videoEmbedId: "7PM4rNDr4NI"
          }
        ],
        resources: [
          { title: "Stock Market for Beginners", url: "https://www.youtube.com/watch?v=n7O7uS_Y6Lw", type: "video" },
          { title: "Guide to Behavioral Finance", url: "https://www.investopedia.com/behavioral-finance-4687178", type: "article" },
          { title: "Options Trading 101", url: "https://www.investopedia.com/options-trading-strategy-and-education-center-4427786", type: "article" }
        ],
        isQuizCompleted: false
      },
      {
        id: "t4-2",
        title: "Dividends & Cashflow",
        description: "Getting paid to wait. The ultimate passive income stream.",
        missionStrategy: "Identify companies that share their success. Learn how to build a portfolio that pays your rent without you lifting a finger.",
        funnyTake: "Dividends are like a 'thank you' note from a company, but the note is made of actual money.",
        subTopics: [
          {
            title: "Yield Chasing vs. Growth",
            explanation: "A high dividend yield can be a 'trap' if the company is dying. Look for 'Dividend Aristocrats'.",
            institutionalSecret: "The 'Dividend Payout Ratio' tells us if the company is over-extending. If they pay out 100% of profits, they can't grow.",
            vocabulary: [
              { word: "Dividend Yield", definition: "Annual dividends per share divided by the share price." },
              { word: "Payout Ratio", definition: "The proportion of earnings paid out as dividends to shareholders." }
            ],
            videoEmbedId: "f5j9v9uK_rk"
          }
        ],
        resources: [{ title: "DRIP Investing", url: "https://www.investopedia.com/terms/d/drip.asp", type: "article" }],
        isQuizCompleted: false
      }
    ]
  },
  {
    id: 3,
    name: "PHASE 2: TECHNICAL WARFARE",
    tagline: "Reading the psychology of the crowd through charts.",
    status: LevelStatus.AVAILABLE,
    icon: "🕯️",
    topics: [
      {
        id: "t5-0",
        title: "Reading the Tape",
        description: "Technical Analysis (TA): Why 'When' you buy is as important as 'What' you buy.",
        missionStrategy: "Interpret price action and volume. Charts are just a map of human greed and fear.",
        funnyTake: "If the chart looks like a rollercoaster that just fell off the tracks, maybe don't get on.",
        subTopics: [
          {
            title: "The 'When': Market Timing",
            explanation: "We use 'Support' and 'Resistance' to find entry points. Support is where buyers step in; Resistance is where sellers take over.",
            institutionalSecret: "Algos place 'Stop Loss' orders just below support. Institutions then drive the price down to hit those stops and buy your cheap shares.",
            vocabulary: [
              { word: "Resistance", definition: "A price level where a stock historically has difficulty rising above." },
              { word: "RSI", definition: "Relative Strength Index. Tells you if a stock is overbought or oversold." }
            ],
            videoEmbedId: "gMAtV0Nf-f0"
          },
          {
            title: "Volume: The Confirmation",
            explanation: "Price movement without volume is a lie. High volume confirms that a move is real and sustainable.",
            institutionalSecret: "Volume 'Spikes' usually signify an institutional 'Whale' entering or exiting the water.",
            vocabulary: [
              { word: "Volume Profile", definition: "An advanced charting study that displays trading activity over a specified time period at specified price levels." }
            ],
            videoEmbedId: "8fL-I4L2Kgs"
          }
        ],
        resources: [{ title: "TA for Beginners", url: "https://www.youtube.com/watch?v=fM5Zre7mX_I", type: "video" }],
        isQuizCompleted: false
      }
    ]
  },
  {
    id: 4,
    name: "PHASE 3: THE GLOBAL MACHINE",
    tagline: "The Fed, Interest Rates, and Macro Cycles.",
    status: LevelStatus.AVAILABLE,
    icon: "🌍",
    topics: [
      {
        id: "t6-1",
        title: "The DJ of the World: The Fed",
        description: "How interest rates control the temperature of the global economy.",
        missionStrategy: "Understand the 'Macro' environment. If interest rates go up, assets go down. If rates go down, everything pumps.",
        funnyTake: "The Federal Reserve is the DJ of the economy. If they turn down the volume (raise rates), the party stops.",
        subTopics: [
          {
            title: "Inflation: The Hidden Tax",
            explanation: "Inflation is when your money buys less over time. It's caused by printing too much currency or supply shocks.",
            institutionalSecret: "Hedge funds use 'TIPS' (Treasury Inflation-Protected Securities) to ensure their wealth doesn't evaporate while they sleep.",
            vocabulary: [
              { word: "CPI", definition: "Consumer Price Index. The main tool for measuring inflation." },
              { word: "Quantitative Easing", definition: "When the central bank buys securities to increase the money supply." }
            ],
            videoEmbedId: "pS-LOnK0Q28"
          },
          {
            title: "The Big Cycle",
            explanation: "Economies breathe in and out. There is a short cycle (8-10 years) and a long cycle (75-100 years).",
            institutionalSecret: "Ray Dalio's 'Holy Grail' of investing is diversifying into 15-20 uncorrelated return streams to survive the 'Deleveraging' phase.",
            vocabulary: [
              { word: "Recession", definition: "Two consecutive quarters of declining GDP." },
              { word: "Deleveraging", definition: "The reduction of the leverage ratio, or the percentage of debt in a balance sheet." }
            ],
            videoEmbedId: "PHe0bXAIuk0"
          }
        ],
        resources: [
          { title: "Economic Machine Works", url: "https://www.youtube.com/watch?v=PHe0bXAIuk0", type: "video" }
        ],
        isQuizCompleted: false
      }
    ]
  },
  {
    id: 5,
    name: "PHASE 4: DIGITAL SOVEREIGNTY",
    tagline: "Crypto, Blockchain, and the 24/7 Market.",
    status: LevelStatus.AVAILABLE,
    icon: "₿",
    topics: [
      {
        id: "t5-1",
        title: "Bitcoin: Hard Money",
        description: "Why the world is shifting toward un-printable, digital gold.",
        missionStrategy: "Learn the difference between 'Currency' (unlimited) and 'Money' (scarce). Understand the 'Halving' cycle.",
        funnyTake: "Bitcoin is like gold, but you can send it across the world in an email and the government can't stop it.",
        subTopics: [
          { 
            title: "The 21 Million Limit", 
            explanation: "There will only ever be 21 million Bitcoins. This absolute scarcity is what gives it value against infinite fiat.", 
            institutionalSecret: "BlackRock and Fidelity have launched ETFs because they know their clients want 'Asymmetric Upside'.",
            vocabulary: [
              { word: "Satoshi", definition: "The smallest unit of Bitcoin (0.00000001 BTC)." },
              { word: "Halving", definition: "An event where the reward for mining Bitcoin is cut in half, happening every 4 years." }
            ],
            videoEmbedId: "yubzJw0uiE4" 
          }
        ],
        resources: [
          { title: "Bitcoin Whitepaper", url: "https://bitcoin.org/bitcoin.pdf", type: "article" }
        ],
        isQuizCompleted: false
      }
    ]
  },
  {
    id: 6,
    name: "PHASE 5: THE EXIT STRATEGY",
    tagline: "Tax Hacking and Wealth Defense.",
    status: LevelStatus.AVAILABLE,
    icon: "🏰",
    topics: [
      {
        id: "t8-1",
        title: "Stay Wealthy: Taxes",
        description: "Taxes are your biggest expense. Learn how the rich pay almost zero.",
        missionStrategy: "Understand 'Long Term Capital Gains' vs 'Short Term'. Learn about 'Cost Basis' and 'Step-ups'.",
        funnyTake: "Taxes are the only game where the rules are written in a secret language and the prize for losing is your house.",
        subTopics: [
          { 
            title: "The 1031 Real Estate Hack", 
            explanation: "You can sell a property and buy another one without paying taxes. It's called 'Deferring'.", 
            institutionalSecret: "The ultra-wealthy use 'Buy, Borrow, Die'. They buy assets, borrow against them for cash, and never sell to avoid taxes forever.",
            vocabulary: [
              { word: "Capital Gains", definition: "Profit from the sale of an asset." },
              { word: "Tax Deferral", definition: "Postponing payment of taxes to a future date." }
            ],
            videoEmbedId: "9o4vR_Ff-30" 
          }
        ],
        resources: [
          { title: "Tax Free Wealth Summary", url: "https://www.youtube.com/watch?v=9_7fQ0v_Kiw", type: "video" }
        ],
        isQuizCompleted: false
      }
    ]
  }
];
