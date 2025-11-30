import React, { useEffect, useRef, useState, useMemo } from 'react';
import { CANVAS_SIZE } from '../constants';
import { ScheduleData, randn, diffuionStep } from '../utils/diffusionMath';

interface DiffusionSimulatorProps {
  imageUrl: string;
  currentStep: number; // 0 to TIMESTEPS
  schedule: ScheduleData[];
  label?: string;
  subLabel?: string;
}

const useFixedNoiseMap = (width: number, height: number) => {
  return useMemo(() => {
    const map = new Float32Array(width * height * 4); // RGBA
    for (let i = 0; i < map.length; i++) {
      map[i] = randn(); 
    }
    return map;
  }, [width, height]);
};

export const DiffusionSimulator: React.FC<DiffusionSimulatorProps> = ({
  imageUrl,
  currentStep,
  schedule,
  label,
  subLabel
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageBitmap, setImageBitmap] = useState<ImageBitmap | null>(null);
  const [dimensions, setDimensions] = useState({ width: CANVAS_SIZE, height: CANVAS_SIZE });
  const noiseMap = useFixedNoiseMap(dimensions.width, dimensions.height);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    img.onload = async () => {
      const bitmap = await createImageBitmap(img);
      const scale = Math.min(CANVAS_SIZE / bitmap.width, CANVAS_SIZE / bitmap.height);
      const w = Math.floor(bitmap.width * scale);
      const h = Math.floor(bitmap.height * scale);
      setDimensions({ width: w, height: h });
      setImageBitmap(bitmap);
    };
  }, [imageUrl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageBitmap || !schedule[currentStep]) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    ctx.drawImage(imageBitmap, 0, 0, dimensions.width, dimensions.height);
    
    const imageData = ctx.getImageData(0, 0, dimensions.width, dimensions.height);
    const pixels = imageData.data;
    const { alphaBar } = schedule[currentStep];

    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = diffuionStep(pixels[i], alphaBar, noiseMap[i]);
      pixels[i + 1] = diffuionStep(pixels[i+1], alphaBar, noiseMap[i+1]);
      pixels[i + 2] = diffuionStep(pixels[i+2], alphaBar, noiseMap[i+2]);
    }

    ctx.putImageData(imageData, 0, 0);

  }, [imageBitmap, currentStep, schedule, dimensions, noiseMap]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-white p-2 rounded-xl shadow-sm border border-slate-200">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="block rounded-lg"
          style={{ width: '100%', height: 'auto', maxWidth: '200px', aspectRatio: '1/1' }}
        />
      </div>
      {label && (
        <div className="mt-3 text-center">
           <div className="font-serif text-xl font-bold text-slate-800 italic" dangerouslySetInnerHTML={{__html: label}} />
           {subLabel && <div className="text-xs font-mono text-slate-500 mt-1">{subLabel}</div>}
        </div>
      )}
    </div>
  );
};