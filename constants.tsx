
import { Level, LevelStatus } from './types';

export const CURRICULUM: Level[] = [
  {
    id: 1,
    name: "PHASE 0: MONETARY GENESIS",
    tagline: "Architecture of Trust and Global Ledger Systems.",
    status: LevelStatus.AVAILABLE,
    icon: "📜",
    topics: [
      {
        id: "t0-1",
        title: "The Velocity of Value",
        description: "Deconstructing the evolution from physical commodity to digital fiat-centralization.",
        missionStrategy: "Analyze the 'Double Coincidence of Wants' and the emergence of institutional clearing houses.",
        category: 'CORE',
        funnyTake: "Money is the most successful shared hallucination in human history.",
        subTopics: [
          {
            title: "The Equation of Exchange",
            streetExplanation: "If money moves too fast with fixed supply, prices explode. If it stops, the system seizes.",
            boardroomExplanation: "The fundamental identity of classical monetary theory relating money supply to price stability.",
            technicalBriefing: "$$MV = PY$$",
            explainerVideoId: "pY-x8M_6Acs",
            institutionalSecret: "Central banks target the 2% inflation rate not for stability, but to ensure perpetual debt-service viability.",
            imagePrompt: "Intricate architectural blueprints of a global central bank vault, obsidian glass and gold circuits.",
            vocabulary: [{ word: "Velocity", streetAnalogy: "How fast a dollar changes hands.", boardroomDefinition: "The frequency at which one unit of currency is used to purchase goods and services within a given time period." }]
          }
        ],
        resources: [
          { title: "Principles for Dealing with the Changing World Order", url: "https://www.youtube.com/watch?v=xguam0TKMw8", type: "video", provider: "Ray Dalio" }
        ],
        isQuizCompleted: false
      }
    ]
  },
  {
    id: 2,
    name: "PHASE 1: CAPITAL VALUATION",
    tagline: "Equity Risk Premiums and Intrinsic Logic.",
    status: LevelStatus.AVAILABLE,
    icon: "📈",
    topics: [
      {
        id: "t1-1",
        title: "Intrinsic Value Architecture",
        description: "The mathematical core of asset pricing and capital allocation.",
        missionStrategy: "Identify market mispricing by calculating the Net Present Value of future liquidity streams.",
        category: 'EQUITIES',
        funnyTake: "A stock price is just a consensus opinion on a company's future stress levels.",
        subTopics: [
          {
            title: "Discounted Cash Flow (DCF)",
            streetExplanation: "How much would you pay today for a guaranteed stream of income tomorrow?",
            boardroomExplanation: "The definitive valuation methodology used to estimate investment value based on risk-adjusted future cash flows.",
            technicalBriefing: "$$PV = \\sum_{t=1}^{n} \\frac{CF_t}{(1+r)^t} + \\frac{TV}{(1+r)^n}$$",
            explainerVideoId: "fd_emLLzJnk",
            institutionalSecret: "Institutional desks focus on the Weighted Average Cost of Capital (WACC) to manipulate hurdle rates for strategic acquisitions.",
            imagePrompt: "A high-fidelity digital projection of future cash flows emerging from a platinum-coated server.",
            vocabulary: [{ word: "Discount Rate", streetAnalogy: "The price of waiting.", boardroomDefinition: "The interest rate used in DCF analysis to determine the present value of future cash flows." }]
          }
        ],
        resources: [
          { title: "Valuation Foundations (Vanguard)", url: "https://institutional.vanguard.com/insights-and-education.html", type: "paper", provider: "Vanguard" }
        ],
        isQuizCompleted: false
      }
    ]
  },
  {
    id: 10,
    name: "PHASE 10: SOVEREIGN LEGACY",
    tagline: "Dynastic Wealth and Multi-Jurisdictional Arbitrage.",
    status: LevelStatus.AVAILABLE,
    icon: "💎",
    topics: [
      {
        id: "t10-1",
        title: "The 'Buy, Borrow, Die' Protocol",
        description: "Mastering the institutional loop for perpetual tax-free liquidity.",
        missionStrategy: "Leverage Securities-Based Lines of Credit (SBLOCs) to fund lifestyle while shielding the cost-basis.",
        category: 'SOVEREIGN',
        funnyTake: "The elite don't spend money; they spend the bank's money backed by their own.",
        institutionalBriefing: "By utilizing non-purpose SBLOCs, a Sovereign preserves exposure to capital growth while accessing liquidity through low-interest debt.",
        subTopics: [
          {
            title: "Debt Shield Efficiency",
            streetExplanation: "Never sell your winners. Borrow against them. Pay the bank 4% so you don't pay the government 25%.",
            boardroomExplanation: "Optimizing the spread between the cost of institutional debt and the expected equity risk premium.",
            technicalBriefing: "$$\\Delta_{Alpha} = (CAGR \\times (1 - Tax_{Rate})) - (Borrow\\_Rate)$$",
            explainerVideoId: "mX4_X7A8K9A",
            institutionalSecret: "The key is combining SBLOCs with Private Placement Life Insurance (PPLI) for secondary layers of tax-deferred compounding.",
            imagePrompt: "A golden geometric shield protecting a crystal-encased stack of stock certificates from a digital grim reaper.",
            vocabulary: [{ word: "SBLOC", streetAnalogy: "A credit card for billionaires.", boardroomDefinition: "Securities-Based Line of Credit; a revolving credit facility secured by a portfolio of marketable securities." }]
          }
        ],
        resources: [
          { title: "Buy, Borrow, Die (WSJ)", url: "https://www.wsj.com/articles/buy-borrow-die-how-the-rich-live-off-their-stock-portfolios-11626159601", type: "article", provider: "WSJ" }
        ],
        isQuizCompleted: false
      },
      {
        id: "t10-2",
        title: "Jurisdictional Arbitrage",
        description: "Optimizing Legality and Mobility via Flag Theory.",
        missionStrategy: "Distribute legal, physical, and financial presence across global jurisdictions to minimize sovereign risk.",
        category: 'SOVEREIGN',
        funnyTake: "The world is a shopping mall for laws. Pick the ones that treat your wealth with respect.",
        subTopics: [
          {
            title: "The Jurisdictional Matrix",
            streetExplanation: "Don't just hide your money; place it where it is legally un-touchable.",
            boardroomExplanation: "Comparative analysis of global tax and trust frameworks for maximum asset protection.",
            jurisdictionalMatrix: [
              { nation: "Cook Islands", taxRate: "0%", assetProtection: "Ultimate", sovereignRisk: "Low", keyAdvantage: "Disregards all foreign civil judgments." },
              { nation: "Singapore", taxRate: "17%", assetProtection: "Institutional", sovereignRisk: "Low", keyAdvantage: "Stable banking and zero capital gains tax." },
              { nation: "Switzerland", taxRate: "Variable", assetProtection: "Tier-1 Legacy", sovereignRisk: "Low", keyAdvantage: "Deeply entrenched culture of financial privacy." }
            ],
            imagePrompt: "A high-tech terminal showing a world map with glowing nodes in gold and platinum representing sovereign jurisdictions.",
            vocabulary: [{ word: "Arbitrage", streetAnalogy: "Buying low here, selling high there.", boardroomDefinition: "The simultaneous purchase and sale of an asset to profit from an imbalance in the price or legal treatment." }]
          }
        ],
        resources: [
          { title: "Asset Protection Trusts", url: "https://www.investopedia.com/terms/a/asset-protection-trust.asp", type: "article", provider: "Investopedia" }
        ],
        isQuizCompleted: false
      }
    ]
  }
];
