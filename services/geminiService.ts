import { GoogleGenAI, Type } from "@google/genai";

// Security audit code using Google Gemini API
export const auditCode = async (code: string) => {
  // Always create a new instance to ensure the most up-to-date API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    // Using gemini-3-pro-preview as it is best suited for complex coding and reasoning tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
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

    // Access the text property directly as it returns the generated string
    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response from AI model");
    }
    
    return JSON.parse(resultText);
  } catch (error) {
    console.error("Audit Service Error:", error);
    throw error;
  }
};