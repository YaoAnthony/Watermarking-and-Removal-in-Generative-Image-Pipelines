export interface NoiseParams {
  gaussian: number; // 0-100
  blur: number; // 0-10
  dropout: number; // 0-100
}

export interface SimulationState {
  originalImage: string | null; // Data URL
  payload: string;
  encodedImage: string | null; // Data URL
  noisyImage: string | null; // Data URL
  recoveredPayload: string;
  bitErrorRate: number; // 0-100%
  confidence: number; // 0-100%
  embeddingStrength: number; // 0.1 - 2.0
}

export enum ProcessStage {
  INPUT = 0,
  ENCODER = 1,
  NOISE = 2,
  DECODER = 3
}