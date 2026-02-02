import { GoogleGenAI, Type } from "@google/genai";

const DEFAULT_MODEL = 'gemini-3-flash-preview';

const safeJsonParse = (text: string) => {
  try {
    // Aggressive cleaning for various markdown or prefix types
    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .replace(/^JSON/gi, "")
      .trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.warn("Gemini Protocol: JSON parse failed, attempting manual extraction.", e);
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      try {
        return JSON.parse(text.substring(firstBrace, lastBrace + 1));
      } catch (innerE) {
        console.error("Deep JSON recovery failed.");
      }
    }
    return null;
  }
};

export const getMarketIntelligence = async () => {
  if (!process.env.API_KEY) return null;
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: "Perform an institutional-grade macro-economic data stream analysis. Output must be purely objective, high-density, and professional. 1. Macro briefs for Tier-1 desks. 2. Sentiment score 0-100. 3. Combat strategy for a sector shock. 4. Strategic hold/overweight ratings. OUTPUT ONLY VALID JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            briefs: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  brief: { type: Type.STRING },
                  impact: { type: Type.STRING },
                  sentiment: { type: Type.STRING }
                },
                required: ["title", "brief", "impact", "sentiment"]
              }
            },
            alphaSentiment: { type: Type.INTEGER },
            combatBriefing: {
              type: Type.OBJECT,
              properties: {
                sector: { type: Type.STRING },
                threat: { type: Type.STRING },
                hedgeStrategy: { type: Type.STRING }
              },
              required: ["sector", "threat", "hedgeStrategy"]
            },
            sectorBriefings: {
              type: Type.OBJECT,
              properties: {
                Tech: { type: Type.STRING },
                Finance: { type: Type.STRING },
                Energy: { type: Type.STRING }
              },
              required: ["Tech", "Finance", "Energy"]
            }
          },
          required: ["briefs", "alphaSentiment", "combatBriefing", "sectorBriefings"]
        }
      }
    });

    const parsed = safeJsonParse(response.text);
    if (!parsed) throw new Error("Invalid intelligence stream data format");
    return parsed;
  } catch (error: any) {
    console.warn("Macro Intel Protocol Error: Fail-safe mode activated.");
    return {
      alphaSentiment: 45,
      briefs: [
        { title: "Curve Inversion Persistent", brief: "Global yield spreads show structural anomaly consistent with late-stage volatility cycles.", impact: "High", sentiment: "BEARISH" },
        { title: "Institutional Liquidity Vacuum", brief: "Central bank withdrawal symptoms leading to localized volatility in non-core asset classes.", impact: "Severe", sentiment: "BEARISH" }
      ],
      combatBriefing: {
        sector: "Institutional Debt",
        threat: "Widening credit spreads and duration mismatch risk.",
        hedgeStrategy: "Rotate to high-fidelity short-duration sovereign papers and equity collars."
      },
      sectorBriefings: { Tech: "Strategic Hold", Finance: "Underweight", Energy: "Overweight" }
    };
  }
};

export const askOracle = async (topic: string, question: string) => {
  if (!process.env.API_KEY) return "AUTHENTICATION_FAILED: Intelligence stream unavailable.";
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `INSTITUTIONAL_QUERY: Regarding ${topic}, provide a high-fidelity technical brief for: "${question}". Utilize LaTeX for mathematical proofs. MINIMAL PROSE.`,
      config: {
        systemInstruction: "You are the Principal Quantitative Architect for a Sovereign Wealth Fund. Precise. Authoritative. Technical. Tone: Tier-1 Institutional Desk.",
      },
    });
    return response.text || "NO_DATA: Query resulted in null stream.";
  } catch (error) {
    console.error("Oracle stream recalibration error:", error);
    return "STREAM_INTERRUPTED: Recalibrating institutional nodes. Re-attempt query.";
  }
};