
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const auditCode = async (code: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Perform a professional security audit on the following code snippet. Identify one primary vulnerability if it exists, explain its severity, and provide a remediation. If no obvious vulnerability, explain the best security practices for this context. Output in JSON format only. Code: \n${code}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            vulnerability: { type: Type.STRING, description: "Name of the vulnerability found" },
            severity: { type: Type.STRING, enum: ["CRITICAL", "HIGH", "MEDIUM", "LOW"] },
            remediation: { type: Type.STRING, description: "How to fix the issue" },
            explanation: { type: Type.STRING, description: "Detailed explanation" }
          },
          required: ["vulnerability", "severity", "remediation", "explanation"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Audit Service Error:", error);
    throw error;
  }
};
