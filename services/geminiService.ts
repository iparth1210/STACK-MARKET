
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

export const askOracle = async (topic: string, question: string) => {
  if (!API_KEY) return "The Oracle is currently sleeping (Missing API Key).";
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const model = 'gemini-3-flash-preview';

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

export const getQuickQuiz = async (topic: string) => {
  if (!API_KEY) return null;
  const ai = new GoogleGenAI({ apiKey: API_KEY });
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

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Quiz Error:", error);
    return null;
  }
};

export const getStockFundamentals = async (symbol: string = "NVDA") => {
  if (!API_KEY) return null;
  // Use Pro model for search grounding to get real-time accurate data
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Find the latest stock fundamentals for ${symbol}. 
      I need: Market Cap, P/E Ratio, Dividend Yield, and 52-week High/Low.
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
            summary: { type: Type.STRING, description: "A 1-sentence funny take on this stock's current state." }
          },
          required: ["symbol", "companyName", "marketCap", "peRatio", "dividendYield", "fiftyTwoWeekHigh", "fiftyTwoWeekLow", "summary"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Fundamentals Fetch Error:", error);
    return null;
  }
};
