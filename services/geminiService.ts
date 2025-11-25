
import { GoogleGenAI } from "@google/genai";
import { MessageRole } from '../types';

const getAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

  if (!apiKey) {
    console.error('❌ Gemini API Key not found. Please add VITE_GEMINI_API_KEY to your .env file.');
    throw new Error('Gemini API Key not configured. Please check your .env file.');
  }

  return new GoogleGenAI({ apiKey });
};

const MODEL_NAME = 'gemini-2.5-flash';

export const generateLeadPersonalization = async (leadName: string, company: string, title: string): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Generate a short, professional, and casual "icebreaker" personalization line for a cold email to a potential client.
      Lead Name: ${leadName}
Company: ${company}
Title: ${title}
      The line should compliment them on their role or company growth.Keep it under 20 words.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 50,
      }
    });
    return response.text || "Could not generate personalization.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Check API Key in Settings.";
  }
};

export const analyzeMetrics = async (metricsDescription: string): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `You are an expert Automation Agency consultant.Analyze the following agency metrics and provide 3 brief, actionable bullet points to improve performance:
      ${metricsDescription}
      
      Focus on efficiency, conversion rates, and automation health.`,
    });
    return response.text || "No analysis available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Check API Key in Settings.";
  }
};

export const chatWithAgent = async (history: { role: MessageRole, text: string }[], message: string): Promise<string> => {
  const ai = getAI();
  try {
    const chat = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: "You are AutoFlow, an AI assistant for a one-person automation agency. You help with prospecting strategies, debugging Make.com/Zapier workflows, and writing client reports. You are concise, technical, and helpful."
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Chat Error:", error);
    return "I'm having trouble connecting to the brain. Please check your API key in Settings.";
  }
}
