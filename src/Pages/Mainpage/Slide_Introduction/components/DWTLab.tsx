import React, { useState, useEffect, useRef } from 'react';
import { PipelineCard } from './PipelineCard';
import { Arrow } from './Arrow';
import type { SubbandType, DWTResult } from '../types';
import { 
  loadImage, 
  getImageData, 
  rgbaToGrayscale, 
  grayscaleToRgba, 
  imageDataToBase64 
} from '../utils/imageProcessing';
import { dwt2d, idwt2d, visualizeDWT } from '../utils/dwt';
import { processImage } from '../../../../assets';

// Constants
const PROCESS_SIZE = 512; // Working resolution (Power of 2)
const WATERMARK_SIZE = 256; // Half of Process Size (for quadrant embedding)

const WATERMARK_LOGO = "https://picsum.photos/id/237/500/500"; // Dog logo

const DWTLab: React.FC = () => {
  // State
  const [alpha, setAlpha] = useState<number>(15);
  const [subband, setSubband] = useState<SubbandType>('HL');
  const [isProcessing, setIsProcessing] = useState<boolean>(true);
  
  // Pipeline Visuals (Base64 strings)
  const [sourcePreview, setSourcePreview] = useState<string>('');
  const [watermarkPreview, setWatermarkPreview] = useState<string>('');
  const [dwtPreview, setDwtPreview] = useState<string>('');
  const [resultPreview, setResultPreview] = useState<string>('');
  const [diffPreview, setDiffPreview] = useState<string>('');

  // Source Data Refs (to avoid re-loading images constantly)
  const sourceImageRef = useRef<HTMLImageElement | null>(null);
  const watermarkImageRef = useRef<HTMLImageElement | null>(null);

  // --- Initialization ---
  useEffect(() => {
    const init = async () => {
      try {
        const [srcImg, wmImg] = await Promise.all([
          loadImage(processImage),
          loadImage(WATERMARK_LOGO)
        ]);
        sourceImageRef.current = srcImg;
        watermarkImageRef.current = wmImg;
        runPipeline();
      } catch (err) {
        console.error("Failed to load initial images", err);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Pipeline Trigger ---
  useEffect(() => {
    if (sourceImageRef.current && watermarkImageRef.current) {
      const timer = setTimeout(() => {
        runPipeline();
      }, 50); // Debounce slider slightly
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alpha, subband]);

  // --- Core Processing Logic ---
  const runPipeline = () => {
    if (!sourceImageRef.current || !watermarkImageRef.current) return;
    setIsProcessing(true);

    // 1. Prepare Source Image
    const sourceData = getImageData(sourceImageRef.current, PROCESS_SIZE, PROCESS_SIZE);
    const sourceGray = rgbaToGrayscale(sourceData);
    setSourcePreview(imageDataToBase64(sourceData));

    // 2. Prepare Watermark Image
    // The watermark needs to fit into one quadrant (Subband), so it must be half size
    const wmData = getImageData(watermarkImageRef.current, WATERMARK_SIZE, WATERMARK_SIZE);
    const wmGray = rgbaToGrayscale(wmData);
    setWatermarkPreview(imageDataToBase64(wmData));

    // 3. Apply DWT to Source
    // Note: DWT returns { ll, hl, lh, hh } which are Float32Arrays of size 256x256
    const dwtResult: DWTResult = dwt2d(sourceGray, PROCESS_SIZE, PROCESS_SIZE);

    // 4. Visualization of DWT (before embedding for clarity, or after? let's do modified)
    // Actually, let's visualize the modified one in the middle step.

    // 5. Embedding
    // Formula: Coefficient_New = Coefficient_Old + (Alpha * Watermark_Pixel)
    // We modify the selected subband in place (or copy)
    const targetBand = dwtResult[subband.toLowerCase() as keyof DWTResult] as Float32Array;
    
    // Create a copy to keep purity if needed, but here we modify dwtResult for IDWT
    // The watermark is 0-255. Alpha is usually small (e.g. 0.05 if normalized, or 10-20 if raw).
    // Let's treat alpha as a factor. 
    // Usually: Coeff' = Coeff + alpha * W. 
    // Since our coefficients can be large, and W is 0-255.
    
    for (let i = 0; i < targetBand.length; i++) {
        // Simple additive embedding
        // Normalize watermark slightly? No, let's just use raw value scaled by alpha.
        // Alpha range 0-100 scales to 0.0-1.0 factor? 
        // Let's use Alpha as a direct multiplier: Coeff += Alpha * (Pixel/255 * Sign?)
        // Standard blind watermarking: Coeff += Alpha * WatermarkPixel.
        
        // Use a simpler approach for visibility:
        // Alpha slider 0.01 to 0.5 effectively.
        // Let's map UI slider 0-100 to 0.0-2.0
        const strength = alpha / 50.0; 
        
        // Centering watermark around 0 helps minimize visual artifact in LL, 
        // but for high freq bands, raw addition is fine.
        targetBand[i] += wmGray[i] * strength;
    }

    // Visualize the Frequency Domain (Modified)
    const visGray = visualizeDWT(dwtResult);
    const visData = grayscaleToRgba(visGray, PROCESS_SIZE, PROCESS_SIZE);
    
    // Draw subband selection box on visualization
    const canvas = document.createElement('canvas');
    canvas.width = PROCESS_SIZE;
    canvas.height = PROCESS_SIZE;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.putImageData(visData, 0, 0);
        // Draw highlight rect
        ctx.strokeStyle = '#3b82f6'; // blue-500
        ctx.lineWidth = 4;
        const half = PROCESS_SIZE / 2;
        let x = 0, y = 0;
        if (subband === 'HL') x = half;
        if (subband === 'LH') y = half;
        if (subband === 'HH') { x = half; y = half; }
        
        ctx.strokeRect(x, y, half, half);
        
        // Add label
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(x, y, 40, 24);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(subband, x + 8, y + 17);
        
        setDwtPreview(canvas.toDataURL());
    }

    // 6. Inverse DWT
    const reconGray = idwt2d(dwtResult);
    const reconData = grayscaleToRgba(reconGray, PROCESS_SIZE, PROCESS_SIZE);
    setResultPreview(imageDataToBase64(reconData));

    // 7. Calculate Difference
    // |Original - Reconstructed| * Gain
    const diffGray = new Float32Array(PROCESS_SIZE * PROCESS_SIZE);
    const diffGain = 10; // Make differences visible
    for(let i=0; i<sourceGray.length; i++) {
        diffGray[i] = Math.abs(sourceGray[i] - reconGray[i]) * diffGain;
    }
    const diffDisplay = grayscaleToRgba(diffGray, PROCESS_SIZE, PROCESS_SIZE);
    setDiffPreview(imageDataToBase64(diffDisplay));

    setIsProcessing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'source' | 'watermark') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          if (type === 'source') sourceImageRef.current = img;
          else watermarkImageRef.current = img;
          runPipeline();
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 md:p-8 mx-auto">

      {/* Global Controls */}
      <div className="bg-white p-3 shadow-sm border border-slate-200 mb-8 sticky top-2 z-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Global Parameters
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 w-full md:w-auto">
            {/* Strength Slider */}
            <div className="flex items-center gap-4 flex-1">
              <label className="text-sm font-medium text-slate-600 whitespace-nowrap">Strength (Alpha)</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={alpha} 
                onChange={(e) => setAlpha(Number(e.target.value))}
                className="w-full md:w-48 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-blue-600 font-mono font-bold w-12 text-right">{(alpha / 50).toFixed(2)}</span>
            </div>

            {/* Subband Selector */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-600">Embed Subband:</span>
              <div className="flex rounded-lg overflow-hidden border border-slate-200">
                {(['LL', 'HL', 'LH', 'HH'] as SubbandType[]).map((band) => (
                  <button
                    key={band}
                    onClick={() => setSubband(band)}
                    className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                      subband === band 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {band}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Visualizer */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-2 overflow-x-auto pb-8">
        
        {/* Stage 1: Source */}
        <PipelineCard 
          stepNumber={1} 
          title="Source Image" 
          description="Carrier Signal C(x,y)"
          extraAction={
            <label className="cursor-pointer text-xs text-blue-600 hover:underline">
              Upload
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'source')} />
            </label>
          }
        >
          <div className="relative w-full aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
             {sourcePreview && <img src={sourcePreview} alt="Source" className="w-full h-full object-cover" />}
             <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">Original</div>
          </div>
        </PipelineCard>

        <Arrow />

        {/* Stage 2: Watermark */}
        <PipelineCard 
          stepNumber={2} 
          title="Watermark Signal" 
          description="Signal to embed W(x,y)"
          extraAction={
            <label className="cursor-pointer text-xs text-blue-600 hover:underline">
              Upload
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'watermark')} />
            </label>
          }
        >
          <div className="relative w-48 aspect-square bg-slate-50 rounded-lg overflow-hidden border border-slate-200 p-4 flex items-center justify-center">
            {watermarkPreview && <img src={watermarkPreview} alt="Watermark" className="max-w-full max-h-full object-contain mix-blend-multiply" />}
          </div>
        </PipelineCard>

        <Arrow />

        {/* Stage 3: Frequency Domain */}
        <PipelineCard 
          stepNumber={3} 
          title="Freq Domain (DWT)" 
          description={`Embedding W into ${subband} band`}
        >
           <div className={`relative w-full aspect-square bg-slate-900 rounded-lg overflow-hidden border border-slate-200 shadow-inner group ${isProcessing ? 'opacity-80' : ''}`}>
             {dwtPreview && <img src={dwtPreview} alt="DWT" className="w-full h-full object-contain" />}
             
             {/* Labels for quadrants */}
             <div className="absolute top-1 left-1 text-[10px] text-green-400 font-mono opacity-50">LL</div>
             <div className="absolute top-1 right-1 text-[10px] text-yellow-400 font-mono opacity-50">HL</div>
             <div className="absolute bottom-1 left-1 text-[10px] text-yellow-400 font-mono opacity-50">LH</div>
             <div className="absolute bottom-1 right-1 text-[10px] text-red-400 font-mono opacity-50">HH</div>
          </div>
        </PipelineCard>

        <Arrow />

        {/* Stage 4: Result */}
        <PipelineCard 
          stepNumber={4} 
          title="Synthesized (IDWT)" 
          description="Visually Imperceptible C'(x,y)"
        >
          <div className="relative w-full aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
             {resultPreview && <img src={resultPreview} alt="Result" className="w-full h-full object-cover" />}
             <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                WATERMARKED
             </div>
          </div>
        </PipelineCard>

        <Arrow />

        {/* Stage 5: Difference */}
        <PipelineCard 
          stepNumber={5} 
          title="Difference & Extract" 
          description="|Original - Watermarked| x 10"
        >
          <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden border border-slate-800">
             {diffPreview && <img src={diffPreview} alt="Difference" className="w-full h-full object-cover" />}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Overlay if image is purely black */}
                {!diffPreview && <span className="text-slate-700 text-xs">No difference</span>}
             </div>
          </div>
        </PipelineCard>

      </div>
    </div>
  );
};

export default DWTLab;
