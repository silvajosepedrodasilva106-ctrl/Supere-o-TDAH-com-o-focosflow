
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDailyInsight = async (mood: string, challenge: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é um assistente empático para pessoas com TDAH. O usuário está se sentindo ${mood} e o principal desafio hoje é ${challenge}. Dê uma dica curta (máximo 3 frases) motivacional e prática para ajudá-lo. Use um tom acolhedor e calmo.`,
      config: {
        temperature: 0.7,
      }
    });
    // Access response.text property directly and provide fallback for potential undefined value
    return response.text ?? "Lembre-se: você é capaz de superar qualquer obstáculo, um passo de cada vez.";
  } catch (error) {
    console.error("Erro ao buscar insight:", error);
    return "Lembre-se: você é capaz de superar qualquer obstáculo, um passo de cada vez.";
  }
};
