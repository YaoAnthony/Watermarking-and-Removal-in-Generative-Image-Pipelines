import React, { useRef, useEffect, useState } from 'react';

interface DiffusionCanvasProps {
  step: number;
  totalSteps: number;
  width?: number;
  height?: number;
  imageUrl: string;
}

const DiffusionCanvas: React.FC<DiffusionCanvasProps> = ({
  step,
  totalSteps,
  width = 300,
  height = 300,
  imageUrl
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageBitmap, setImageBitmap] = useState<ImageBitmap | null>(null);

  // Pre-calculate alpha schedule (Visual approximation)
  const getAlphaBar = (t: number, T: number) => {
    const ratio = t / T;
    const alphaBar = Math.pow(1 - ratio, 2); 
    return Math.max(0, Math.min(1, alphaBar));
  };

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    img.onload = async () => {
      const bitmap = await createImageBitmap(img);
      setImageBitmap(bitmap);
    };
  }, [imageUrl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageBitmap) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Fill background with white first to avoid transparency issues
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Draw original resized
    ctx.drawImage(imageBitmap, 0, 0, width, height);
    
    if (step === 0) return; // Clean image

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    const alphaBar = getAlphaBar(step, totalSteps);
    const signalStrength = Math.sqrt(alphaBar);
    const noiseStrength = Math.sqrt(1 - alphaBar);

    // Box-Muller transform for Gaussian noise approximation
    for (let i = 0; i < data.length; i += 4) {
      // RGB channels
      for (let j = 0; j < 3; j++) {
        const originalPixel = data[i + j];
        
        let noise = 0;
        for(let n=0; n<3; n++) noise += Math.random(); 
        noise = (noise - 1.5) * 2; 
        
        const noisyValue = (signalStrength * originalPixel) + (noiseStrength * noise * 255);
        
        data[i + j] = Math.min(255, Math.max(0, noisyValue));
      }
      // Alpha channel remains 255
      data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);

  }, [step, totalSteps, imageBitmap, width, height]);

  return (
    <div className="relative flex flex-col items-center">
        <div className="relative rounded bg-white shadow-sm border border-slate-200 overflow-hidden">
            <canvas 
                ref={canvasRef} 
                width={width} 
                height={height} 
                className="block w-full h-auto"
            />
            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-slate-900 text-xs font-mono px-2 py-0.5 rounded shadow-sm border border-slate-200">
                t = {step}
            </div>
        </div>
    </div>
  );
};

export default DiffusionCanvas;