import { GoogleGenAI, Type } from "@google/genai";
import { ExplanationResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

export const getStepExplanation = async (
  step: number,
  totalSteps: number,
  direction: 'forward' | 'backward'
): Promise<ExplanationResponse> => {
  // const isNoise = step === totalSteps; // Unused
  // const isClean = step === 0; // Unused
  
  let context = "";
  if (direction === 'forward') {
    context = `We are in the Forward Diffusion Process (q sample). We are adding Gaussian noise to the image. 
    Current timestep t=${step} out of ${totalSteps}.
    Formula: X_t = sqrt(alpha_bar_t) * X_0 + sqrt(1 - alpha_bar_t) * epsilon.`;
  } else {
    context = `We are in the DDIM Backward/Sampling Process (Reverse). We are iteratively denoising the image deterministically.
    Current timestep t=${step} out of ${totalSteps}.
    Formula involves predicting X_0 and stepping towards X_{t-1}.`;
  }

  const prompt = `
    You are a computer vision expert explaining DDIM (Denoising Diffusion Implicit Models) during a live presentation.
    
    Context:
    ${context}
    
    Task:
    Provide a concise, engaging explanation for what is happening mathematically and visually at this specific step.
    Keep it brief (max 3 sentences for explanation).
    
    Return JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            explanation: { type: Type.STRING },
            keyTakeaway: { type: Type.STRING }
          },
          required: ["title", "explanation", "keyTakeaway"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ExplanationResponse;
    }
    throw new Error("No response text");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      title: direction === 'forward' ? "Adding Noise" : "Denoising",
      explanation: "Gemini is currently unavailable. The process involves transforming the data distribution.",
      keyTakeaway: "Observe the signal-to-noise ratio change."
    };
  }
};
