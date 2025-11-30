import { TIMESTEPS } from '../constants';

// --- Types ---
export interface ScheduleData {
  t: number;
  alphaBar: number; // Cumulative product of alphas (Signal strength)
  noiseLevel: number; // Sqrt(1 - alphaBar) (Noise strength)
  beta: number;
}

// --- Schedule Generation ---

// Linear Beta Schedule
export const generateSchedule = (): ScheduleData[] => {
  const betaStart = 0.0001;
  const betaEnd = 0.02;
  const schedule: ScheduleData[] = [];

  let alphaBar = 1.0;

  for (let t = 0; t <= TIMESTEPS; t++) {
    // Linear interpolation for beta
    const beta = betaStart + (t / TIMESTEPS) * (betaEnd - betaStart);
    const alpha = 1 - beta;
    
    // In strict DDPM, alphaBar_t = alpha_t * alphaBar_{t-1}
    // We start t=0 as "clean image", so effectively alphaBar starts at 1.
    // However, usually t=1 is the first noise step. 
    // We treat index 0 as "clean" (alphaBar=1) for visualization purposes.
    if (t > 0) {
      alphaBar *= alpha;
    }

    schedule.push({
      t,
      alphaBar,
      noiseLevel: Math.sqrt(1 - alphaBar),
      beta,
    });
  }
  return schedule;
};

// Box-Muller transform for generating standard Gaussian noise
// Returns a random number from N(0, 1)
export const randn = (): number => {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

// Mix signal and noise based on the closed-form formula:
// x_t = sqrt(alphaBar_t) * x_0 + sqrt(1 - alphaBar_t) * epsilon
export const diffuionStep = (
  originalPixel: number, // 0-255
  alphaBar: number, 
  noiseVal: number // Standard Gaussian sample
): number => {
  const signalPart = Math.sqrt(alphaBar) * (originalPixel / 255.0); // Normalize to 0-1
  const noisePart = Math.sqrt(1 - alphaBar) * noiseVal;
  
  // Combine and clamp back to 0-255
  let result = signalPart + noisePart;
  
  // Simple clamping for visualization (in real diffusion models, values can drift outside [-1, 1] before final clamp)
  result = Math.max(0, Math.min(1, result));
  
  return Math.floor(result * 255);
};