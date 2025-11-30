import { NoiseParams } from '../types';

// Helper to convert string to binary (UTF-8 supported)
export const textToBinary = (text: string): string => {
  const encoder = new TextEncoder();
  const uint8 = encoder.encode(text);
  return Array.from(uint8).map(byte => byte.toString(2).padStart(8, '0')).join('');
};

// Helper to convert binary to string (UTF-8 supported)
export const binaryToText = (binary: string): string => {
  const bytes = binary.match(/.{1,8}/g) || [];
  const uint8 = new Uint8Array(bytes.map(byte => parseInt(byte, 2)));
  const decoder = new TextDecoder();
  // We use stream: true to handle potential split multi-byte characters if needed, 
  // but here we just decode the whole block.
  // Using replacement char for invalid sequences which happens with bit errors.
  return decoder.decode(uint8, { stream: false });
};

/**
 * Simulates the "Deep Learning" encoding process.
 */
export const simulateEncoding = async (
  imageUrl: string, 
  strength: number
): Promise<{ encodedUrl: string; residualMapUrl: string }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // In a real simulation, we would embed bits. 
      // For this visual demo, we return the original image as the "encoded" one
      // because subtle watermarks are invisible to the eye anyway.
      
      // We will generate a "Residual Map" to visualize the "Deep Network" changes.
      const resCanvas = document.createElement('canvas');
      const resCtx = resCanvas.getContext('2d');
      if(!resCtx) return;
      resCanvas.width = img.width;
      resCanvas.height = img.height;
      
      const resData = resCtx.createImageData(canvas.width, canvas.height);
      
      // Generate a "heatmap" style residual map
      for (let i = 0; i < resData.data.length; i += 4) {
        const noise = (Math.random() - 0.5) * strength;
        
        // Map noise to color (heatmap style)
        // Stronger embedding = more visible patterns
        const intensity = Math.abs(noise) * 100;
        
        resData.data[i] = intensity * 2;     // R (Hot)
        resData.data[i+1] = intensity * 0.5; // G
        resData.data[i+2] = 50 + intensity;  // B (Cold base)
        resData.data[i+3] = 255;             // Alpha
      }
      
      resCtx.putImageData(resData, 0, 0);
      
      resolve({
        encodedUrl: canvas.toDataURL('image/jpeg', 0.95),
        residualMapUrl: resCanvas.toDataURL('image/png')
      });
    };
    img.src = imageUrl;
  });
};

/**
 * Simulates applying attack layers (Noise, Blur, Dropout)
 */
export const applyAttacks = async (
  imageUrl: string,
  params: NoiseParams
): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      
      // 1. Draw base
      ctx.drawImage(img, 0, 0);

      // 2. Blur
      if (params.blur > 0) {
        ctx.filter = `blur(${params.blur}px)`;
        ctx.drawImage(canvas, 0, 0);
        ctx.filter = 'none'; 
      }

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // 3. Gaussian Noise & Dropout
      for (let i = 0; i < data.length; i += 4) {
        // Dropout (Zero out pixels randomly)
        if (Math.random() * 100 < params.dropout) {
            data[i] = 0;
            data[i+1] = 0;
            data[i+2] = 0;
            continue;
        }

        // Gaussian Noise
        if (params.gaussian > 0) {
            const noise = (Math.random() - 0.5) * params.gaussian * 3; 
            data[i] = Math.min(255, Math.max(0, data[i] + noise));
            data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise));
            data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise));
        }
      }

      ctx.putImageData(imgData, 0, 0);
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.src = imageUrl;
  });
};

/**
 * Decodes the payload based on how much "damage" was inflicted.
 */
export const simulateDecoding = (
  originalPayload: string,
  noise: NoiseParams,
  strength: number
): { recovered: string; ber: number; confidence: number } => {
  
  let totalDamage = 0;
  totalDamage += noise.gaussian * 0.8;
  totalDamage += noise.blur * 12; // Blur is very destructive
  totalDamage += noise.dropout * 0.6;

  // Resistance factor provided by embedding strength
  const resistance = strength * 50; 
  
  // Net probability of a bit flip
  let errorProb = Math.max(0, (totalDamage - resistance)) / 120;
  errorProb = Math.min(0.5, errorProb); // Max entropy is 50%

  // Confidence inversely related to error probability
  const confidence = Math.max(0, 100 - (errorProb * 200));

  const binary = textToBinary(originalPayload);
  let corruptedBinary = "";
  let errorCount = 0;

  for (let i = 0; i < binary.length; i++) {
    if (Math.random() < errorProb) {
      corruptedBinary += binary[i] === '0' ? '1' : '0';
      errorCount++;
    } else {
      corruptedBinary += binary[i];
    }
  }

  const recovered = binaryToText(corruptedBinary);
  const ber = binary.length > 0 ? (errorCount / binary.length) * 100 : 0;

  return {
    recovered: recovered,
    ber: parseFloat(ber.toFixed(2)),
    confidence: Math.round(confidence)
  };
};