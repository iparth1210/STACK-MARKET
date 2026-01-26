
import { GoogleGenAI, Type } from "@google/genai";

// SDK Guidelines: Create a new GoogleGenAI instance right before making an API call 
// to ensure it always uses the most up-to-date API key from the environment.

export const askOracle = async (topic: string, question: string) => {
  if (!process.env.API_KEY) return "The Oracle is currently sleeping (Missing API Key).";
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // Use gemini-2.5-flash-lite-latest for low-latency responses
  const model = 'gemini-2.5-flash-lite-latest';

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `You are 'The Wall Street Oracle', a hilarious, slightly sarcastic, but deeply expert financial advisor. 
      Answer this question using tough love, street smarts, and accurate financial theory.
      
      Topic: ${topic}
      User Question: ${question}
      
      Keep it short, punchy, include a financial pun.`,
      config: {
        temperature: 0.8,
        maxOutputTokens: 250,
      }
    });

    return response.text || "I'm too busy counting my virtual dividends to answer right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oops! My market analysis machine broke. Buy the dip?";
  }
};

export const analyzeVideo = async (videoBase64: string, mimeType: string) => {
  if (!process.env.API_KEY) return "Intelligence system offline (Missing API Key).";
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // Use gemini-3-pro-preview for high-quality video understanding
  const model = 'gemini-3-pro-preview';

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          {
            inlineData: {
              data: videoBase64,
              mimeType: mimeType,
            },
          },
          {
            text: "Act as a high-level financial intelligence officer. Analyze this video and extract the 'Alpha' (key hidden information, market sentiment, and actionable insights). Present it in a punchy, professional, and slightly cynical tone. Use bullet points for key takeaways.",
          },
        ],
      },
    });

    return response.text || "No actionable intel found in this broadcast.";
  } catch (error) {
    console.error("Video Analysis Error:", error);
    return "Error decoding the video stream. The signal might be jammed by the SEC.";
  }
};

export const getQuickQuiz = async (topic: string) => {
  if (!process.env.API_KEY) return null;
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `Generate a single, high-stakes, funny multiple-choice question about: ${topic}.
      Return the response in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctIndex: { type: Type.INTEGER },
            funnyExplanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctIndex", "funnyExplanation"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Quiz Error:", error);
    return null;
  }
};

export const getStockFundamentals = async (symbol: string = "NVDA") => {
  if (!process.env.API_KEY) return null;
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Find the absolute latest stock fundamentals for ${symbol}. 
      I need: Market Cap, P/E Ratio, Dividend Yield, 52-week High/Low, Debt-to-Equity Ratio, ROE (Return on Equity), and current Analyst Consensus (Buy/Hold/Sell).
      Format the output as a clean JSON object.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            symbol: { type: Type.STRING },
            companyName: { type: Type.STRING },
            marketCap: { type: Type.STRING },
            peRatio: { type: Type.STRING },
            dividendYield: { type: Type.STRING },
            fiftyTwoWeekHigh: { type: Type.STRING },
            fiftyTwoWeekLow: { type: Type.STRING },
            debtToEquity: { type: Type.STRING },
            roe: { type: Type.STRING },
            analystConsensus: { type: Type.STRING },
            summary: { type: Type.STRING, description: "A 1-sentence funny take on this stock's current institutional standing." }
          },
          required: [
            "symbol", "companyName", "marketCap", "peRatio", "dividendYield", 
            "fiftyTwoWeekHigh", "fiftyTwoWeekLow", "debtToEquity", "roe", 
            "analystConsensus", "summary"
          ]
        }
      }
    });

    return {
      data: JSON.parse(response.text.trim()),
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Fundamentals Fetch Error:", error);
    return null;
  }
};
