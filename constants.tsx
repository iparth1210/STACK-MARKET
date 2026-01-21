
import { Level, LevelStatus } from './types';

export const CURRICULUM: Level[] = [
  {
    id: 1,
    name: "Level 1: The Foundation",
    tagline: "Fixing your brain before you fix your wallet.",
    status: LevelStatus.AVAILABLE,
    icon: "🧱",
    topics: [
      {
        id: "t1-1",
        title: "Psychology of Money",
        description: "Why you buy things you don't need with money you don't have.",
        funnyTake: "Your brain is a caveman that thinks a 'Sale' sign is a successful hunt. Spoiler: You're the one being hunted.",
        subTopics: [
          { title: "The Dopamine Loop", explanation: "That high you feel when clicking 'Buy Now' lasts 4 minutes. The credit card bill lasts 4 years.", videoEmbedId: "D8C7796uM_0" },
          { title: "Lifestyle Creep", explanation: "When you get a raise, your car suddenly looks older. If you upgrade your life every time you upgrade your pay, you'll be 'rich broke' forever.", videoEmbedId: "N5WIs79_t2E" },
          { title: "Loss Aversion", explanation: "Losing $100 hurts twice as much as finding $100 feels good. This makes you panic-sell stocks at the bottom.", videoEmbedId: "mO2P2h-fX5c" }
        ],
        resources: [
          { title: "Psychology of Money (Summary)", url: "https://www.collabfund.com/blog/the-psychology-of-money/", type: "article" },
          { title: "The Marshmallow Test", url: "https://www.youtube.com/watch?v=QX_oy9614HQ", type: "video" },
          { title: "Nudge: Improving Decisions", url: "https://www.amazon.com/Nudge-Improving-Decisions-Health-Happiness/dp/014311526X", type: "book" }
        ],
        isQuizCompleted: false
      },
      {
        id: "t1-2",
        title: "The Ultimate Budget",
        description: "Give every single dollar a job to do.",
        funnyTake: "A budget isn't a cage. It's a map. Without it, you're just wandering in the woods with a wallet full of meat.",
        subTopics: [
          { title: "The 50/30/20 Rule", explanation: "50% Needs, 30% Wants, 20% Savings. It's the 'I want a life but also don't want to be homeless' plan.", videoEmbedId: "Y8E_O2mQpWw" },
          { title: "Zero-Based Budgeting", explanation: "Income - Outgo = Zero. Every dollar is assigned a task before the month starts.", videoEmbedId: "vB-S3OInO88" },
          { title: "Sinking Funds", explanation: "Saving for things you KNOW are coming (Xmas, Tires, Vacations) so they aren't 'surprises'.", videoEmbedId: "B75_v3X6lms" }
        ],
        resources: [
          { title: "YNAB Method", url: "https://www.ynab.com/the-four-rules", type: "article" },
          { title: "EveryDollar App", url: "https://www.ramseysolutions.com/ramseyplus/everydollar", type: "article" },
          { title: "Budgeting 101 Guide", url: "https://www.nerdwallet.com/article/finance/how-to-budget", type: "article" }
        ],
        isQuizCompleted: false
      }
    ]
  },
  {
    id: 2,
    name: "Level 2: Banking & Buffers",
    tagline: "Turning your bank account into a fortress.",
    status: LevelStatus.AVAILABLE,
    icon: "🏰",
    topics: [
      {
        id: "t2-1",
        title: "The Interest Machine",
        description: "How banks make money off your ignorance.",
        funnyTake: "Traditional banks pay you 0.01% interest. They're basically charging you for the privilege of letting them lend your money to your neighbor for 24%.",
        subTopics: [
          { title: "High-Yield Savings (HYSA)", explanation: "The absolute minimum effort way to make money. If you're at a big bank, move your savings to an online bank today.", videoEmbedId: "XU0K92D7fEc" },
          { title: "Compound Interest", explanation: "The 8th wonder of the world. Time is your greatest asset. Starting at 20 vs 30 is a multi-million dollar difference.", videoEmbedId: "wf91baAL27M" },
          { title: "Emergency Funds", explanation: "3-6 months of expenses. It's not an investment; it's a 'Keep the Lights On' insurance policy.", videoEmbedId: "HhX5P9T4bU4" }
        ],
        resources: [
          { title: "Best HYSA Rates", url: "https://www.bankrate.com/banking/savings/best-high-yield-interests-rates/", type: "article" },
          { title: "Compound Interest Calculator", url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator", type: "article" }
        ],
        isQuizCompleted: false
      }
    ]
  },
  {
    id: 3,
    name: "Level 3: Debt Destruction",
    tagline: "Murdering high interest before it murders you.",
    status: LevelStatus.AVAILABLE,
    icon: "💣",
    topics: [
      {
        id: "t3-1",
        title: "Credit Score Sorcery",
        description: "Decoding the 3 digits that rule your life.",
        funnyTake: "Your credit score is the world's way of asking: 'If I give you a sandwich, will you give it back or eat it and run?'",
        subTopics: [
          { title: "The 30% Utilization Rule", explanation: "Using 90% of your limit makes you look desperate. Keep it under 30% to look like a pro.", videoEmbedId: "j63n3M8YFuo" },
          { title: "Payment History", explanation: "The #1 factor. One late payment can haunt you for 7 years like a bad ex.", videoEmbedId: "L9Y19q-9M2Q" },
          { title: "Credit Mix", explanation: "Having a credit card, a car loan, and a mortgage shows you can handle different types of debt.", videoEmbedId: "GjQ3yYV67v4" }
        ],
        resources: [
          { title: "MyFICO Education", url: "https://www.myfico.com/credit-education", type: "article" },
          { title: "Free Annual Credit Report", url: "https://www.annualcreditreport.com/", type: "article" }
        ],
        isQuizCompleted: false
      },
      {
        id: "t3-2",
        title: "The Debt War",
        description: "Snowball vs Avalanche: Pick your weapon.",
        funnyTake: "Paying off debt is like fighting a dragon. You can either cut off its small toes first (Snowball) or aim for the fire-breathing head (Avalanche).",
        subTopics: [
          { title: "Debt Snowball", explanation: "Pay smallest balance first to build momentum and dopamine.", videoEmbedId: "vB-S3OInO88" },
          { title: "Debt Avalanche", explanation: "Pay highest interest first to save the most money mathematically.", videoEmbedId: "Y8E_O2mQpWw" }
        ],
        resources: [
          { title: "Undebt.it Calculator", url: "https://undebt.it/", type: "article" }
        ],
        isQuizCompleted: false
      }
    ]
  },
  {
    id: 4,
    name: "Level 4: Stock Market Engine",
    tagline: "Owning the greatest wealth machine in history.",
    status: LevelStatus.AVAILABLE,
    icon: "📈",
    topics: [
      {
        id: "t4-1",
        title: "Stocks: The Equity Game",
        description: "Thinking like an owner, not just a consumer.",
        funnyTake: "If you spend $1000 on an iPhone, you have a phone. If you spend $1000 on Apple stock, you own a piece of the factory. Be the factory.",
        subTopics: [
          { title: "Tech Titan Showdown", explanation: "Comparing NVIDIA, Apple, and Microsoft. Why fundamentals matter more than hype.", videoEmbedId: "1kvknZoU--M" },
          { title: "Dividends & Payouts", explanation: "How big tech companies return cash to you for just holding their stock.", videoEmbedId: "u_m9zG6A618" },
          { title: "P/E Ratios", explanation: "Price to Earnings. It tells you if a stock is 'Expensive' or 'On Sale'.", videoEmbedId: "u57tM0_H96s" }
        ],
        resources: [
          { title: "NVDA vs AAPL vs MSFT Deep Dive", url: "https://www.youtube.com/watch?v=1kvknZoU--M", type: "video" },
          { title: "Investopedia Stock Basics", url: "https://www.investopedia.com/stocks-4427785", type: "article" },
          { title: "Yahoo Finance Market Data", url: "https://finance.yahoo.com/", type: "article" }
        ],
        isQuizCompleted: false
      },
      {
        id: "t4-2",
        title: "Index Funds & ETFs",
        description: "Why picking one stock is for suckers.",
        funnyTake: "Don't try to find the needle in the haystack. Just buy the whole haystack and take every needle that's inside.",
        subTopics: [
          { title: "S&P 500 Deep Dive", explanation: "Owning the 500 biggest companies in America. The most reliable wealth builder.", videoEmbedId: "Y8E_O2mQpWw" },
          { title: "Expense Ratios", explanation: "The hidden fee that can steal 30% of your future wealth. Keep it low!", videoEmbedId: "D8C7796uM_0" }
        ],
        resources: [
          { title: "Bogleheads Wiki", url: "https://www.bogleheads.org/", type: "article" }
        ],
        isQuizCompleted: false
      }
    ]
  },
  {
    id: 5,
    name: "Level 5: Real Estate Empire",
    tagline: "Making money from things you can kick.",
    status: LevelStatus.AVAILABLE,
    icon: "🏠",
    topics: [
      {
        id: "t5-1",
        title: "Rent vs Buy",
        description: "Is your house an investment or a place to sleep?",
        funnyTake: "A house is a giant piggy bank that you have to pay to fix when the plumbing explodes at 3 AM.",
        subTopics: [
          { title: "Amortization", explanation: "How your mortgage works and why you pay interest for the first 10 years.", videoEmbedId: "wf91baAL27M" },
          { title: "Equity Growth", explanation: "How owning a home builds wealth over decades through forced savings.", videoEmbedId: "HhX5P9T4bU4" }
        ],
        resources: [
          { title: "NYT Rent vs Buy Calculator", url: "https://www.nytimes.com/interactive/2014/upshot/buy-rent-calculator.html", type: "article" }
        ],
        isQuizCompleted: false
      },
      {
        id: "t5-2",
        title: "House Hacking",
        description: "Living for free while your neighbors pay you.",
        funnyTake: "Buy a duplex, live in one half, rent the other. Congratulations, you're now a landlord and a tenant at the same time.",
        subTopics: [
          { title: "The 1% Rule", explanation: "Does the rent cover the mortgage? A simple rule for real estate investors.", videoEmbedId: "u_m9zG6A618" }
        ],
        resources: [
          { title: "BiggerPockets Guide", url: "https://www.biggerpockets.com/", type: "article" }
        ],
        isQuizCompleted: false
      }
    ]
  },
  {
    id: 6,
    name: "Level 6: The Tax Matrix",
    tagline: "Legally keeping what you earn.",
    status: LevelStatus.AVAILABLE,
    icon: "⚖️",
    topics: [
      {
        id: "t6-1",
        title: "Tax Brackets Decoded",
        description: "How not to fear earning more money.",
        funnyTake: "Earning more money NEVER makes you take home less. Marginal tax rates mean you only pay more on the extra dollars.",
        subTopics: [
          { title: "Marginal Rates", explanation: "Understanding that your first $12k is taxed at 0%, and only the top dollars hit higher brackets.", videoEmbedId: "XU0K92D7fEc" }
        ],
        resources: [
          { title: "IRS Tax Brackets 2024", url: "https://taxfoundation.org/data/all/federal/2024-tax-brackets/", type: "article" }
        ],
        isQuizCompleted: false
      }
    ]
  },
  {
    id: 7,
    name: "Level 7: Retirement Sprint",
    tagline: "Setting up your 80-year-old self for a yacht.",
    status: LevelStatus.AVAILABLE,
    icon: "🍹",
    topics: [
      {
        id: "t7-1",
        title: "Roth vs Traditional",
        description: "The two best tax gifts from the government.",
        funnyTake: "Roth IRA is 'Pay tax now, never pay again'. Traditional is 'Save tax now, pay when you're old'. Pick your poison.",
        subTopics: [
          { title: "401k Match", explanation: "It is a 100% instant return on your money. If you don't take it, you're literally burning cash.", videoEmbedId: "HhX5P9T4bU4" }
        ],
        resources: [
          { title: "Vanguard Retirement Plans", url: "https://investor.vanguard.com/retirement/iras", type: "article" }
        ],
        isQuizCompleted: false
      }
    ]
  },
  {
    id: 8,
    name: "Level 8: Alternative Chaos",
    tagline: "Crypto, Gold, and Magic Beans.",
    status: LevelStatus.AVAILABLE,
    icon: "💎",
    topics: [
      {
        id: "t8-1",
        title: "Crypto & Blockchain",
        description: "Digital gold or digital trash?",
        funnyTake: "Bitcoin is like gold you can email. Dogecoin is like a joke that got out of hand. Use with extreme caution.",
        subTopics: [
          { title: "Volatility", explanation: "Why crypto can go up 1000% and down 99% in the same week.", videoEmbedId: "XQ9O2S88sQk" },
          { title: "Cold Storage", explanation: "Keeping your digital keys on a physical device so hackers can't touch them.", videoEmbedId: "u57tM0_H96s" }
        ],
        resources: [
          { title: "Coinbase Learning Hub", url: "https://www.coinbase.com/learn", type: "article" }
        ],
        isQuizCompleted: false
      }
    ]
  },
  {
    id: 9,
    name: "Level 9: Estate Legacy",
    tagline: "Don't let the government play with your toys.",
    status: LevelStatus.AVAILABLE,
    icon: "👑",
    topics: [
      {
        id: "t9-1",
        title: "Wills & Trusts",
        description: "Ensuring your money goes where you want after you're gone.",
        funnyTake: "If you don't have a will, the state decides who gets your stuff. They might give your Ferrari to your annoying cousin Steve.",
        subTopics: [
          { title: "Living Trusts", explanation: "Avoiding probate court so your heirs get their money immediately and privately.", videoEmbedId: "j63n3M8YFuo" }
        ],
        resources: [
          { title: "Estate Planning 101", url: "https://www.fidelity.com/life-events/estate-planning/overview", type: "article" }
        ],
        isQuizCompleted: false
      }
    ]
  },
  {
    id: 10,
    name: "Level 10: FIRE Independence",
    tagline: "Quitting the rat race forever.",
    status: LevelStatus.AVAILABLE,
    icon: "🔥",
    topics: [
      {
        id: "t10-1",
        title: "The 4% Rule",
        description: "The mathematical formula for early retirement.",
        funnyTake: "If you have 25 times your annual expenses invested, you are technically a free human. You can tell your boss 'no' in 15 different languages.",
        subTopics: [
          { title: "Withdrawal Rates", explanation: "How much you can take out of your portfolio without it ever running out.", videoEmbedId: "Y8E_O2mQpWw" }
        ],
        resources: [
          { title: "Mr. Money Mustache", url: "https://www.mrmoneymustache.com/", type: "article" }
        ],
        isQuizCompleted: false
      }
    ]
  },
  {
    id: 11,
    name: "Level 11: Scaling Income",
    tagline: "Side hustles and business building.",
    status: LevelStatus.AVAILABLE,
    icon: "🚀",
    topics: [
      {
        id: "t11-1",
        title: "The Side Hustle",
        description: "Trading time for more than just a paycheck.",
        funnyTake: "A side hustle is how you buy your way to freedom faster. It's like doing extra credit, but the reward is a beach in Bali.",
        subTopics: [
          { title: "Active vs Passive", explanation: "Uber is active. A blog is passive. One needs your hands, the other needs your brain once.", videoEmbedId: "D8C7796uM_0" }
        ],
        resources: [
          { title: "Side Hustle Nation", url: "https://www.sidehustlenation.com/", type: "article" }
        ],
        isQuizCompleted: false
      }
    ]
  },
  {
    id: 12,
    name: "Level 12: Economics & Inflation",
    tagline: "Understanding the world's giant machine.",
    status: LevelStatus.AVAILABLE,
    icon: "🌍",
    topics: [
      {
        id: "t12-1",
        title: "Inflation: The Silent Thief",
        description: "Why $100 today buys fewer tacos than it did in 1990.",
        funnyTake: "Inflation is the thief that lives in your bank account. It doesn't steal your dollars, it steals what those dollars can buy.",
        subTopics: [
          { title: "Purchasing Power", explanation: "How to protect your wealth from the melting iceberg of fiat currency.", videoEmbedId: "mO2P2h-fX5c" }
        ],
        resources: [
          { title: "Consumer Price Index Data", url: "https://www.bls.gov/cpi/", type: "article" }
        ],
        isQuizCompleted: false
      }
    ]
  }
];
