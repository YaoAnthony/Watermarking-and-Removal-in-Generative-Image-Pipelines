import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { StageWrapper } from './components/StageWrapper';
import { InputStage } from './components/InputStage';
import { EncoderStage } from './components/EncoderStage';
import { NoiseStage } from './components/NoiseStage';
import { DecoderStage } from './components/DecoderStage';
import { simulateEncoding, applyAttacks, simulateDecoding } from './services/watermarkService';
import { NoiseParams } from './types';



import { processImage } from '../../../../../assets';

// Default placeholder image
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1544352427-72c1c3d553a5?q=80&w=1000&auto=format&fit=crop";

const DeepWatermarking: React.FC = () => {
  // --- State ---
  const [originalImage, setOriginalImage] = useState<string | null>(processImage);
  const [payload, setPayload] = useState<string>("SECRET");
  
  // const [encodedImage, setEncodedImage] = useState<string | null>(null);
  const [residualMap, setResidualMap] = useState<string | null>(null);
  const [embeddingStrength, setEmbeddingStrength] = useState<number>(1.2);
  
  const [noiseParams, setNoiseParams] = useState<NoiseParams>({ gaussian: 0, blur: 0, dropout: 0 });
  const [noisyImage, setNoisyImage] = useState<string | null>(null);
  
  const [recoveredPayload, setRecoveredPayload] = useState<string>("");
  const [metrics, setMetrics] = useState({ ber: 0, confidence: 100 });

  const [isProcessing, setIsProcessing] = useState(false);

  // --- Handlers ---

  // 1. Load default image on mount
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        setOriginalImage(canvas.toDataURL());
    };
    img.src = DEFAULT_IMAGE;
  }, []);

  // 2. Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 3. Pipeline Simulation
  const runPipeline = useCallback(async () => {
    if (!originalImage || !payload) return;

    setIsProcessing(true);

    try {
        // Step 1: Encode
        const { encodedUrl, residualMapUrl } = await simulateEncoding(originalImage, embeddingStrength);
        //setEncodedImage(encodedUrl);
        setResidualMap(residualMapUrl);

        // Step 2: Apply Noise to the Encoded Image
        const noisyUrl = await applyAttacks(encodedUrl, noiseParams);
        setNoisyImage(noisyUrl);

        // Step 3: Decode
        const { recovered, ber, confidence } = simulateDecoding(payload, noiseParams, embeddingStrength);
        setRecoveredPayload(recovered);
        setMetrics({ ber, confidence });

    } catch (error) {
        console.error("Pipeline failed", error);
    } finally {
        setIsProcessing(false);
    }
  }, [originalImage, payload, embeddingStrength, noiseParams]);

  // Trigger pipeline when inputs change with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
        runPipeline();
    }, 400); 
    return () => clearTimeout(timer);
  }, [runPipeline]);


  // --- Render ---
  return (
    <div className="bg-slate-50 text-slate-800 p-4 md:p-8 flex flex-col font-sans">

      {/* Main Flow Container - Flexbox for correct arrow flow */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:h-[650px]">
          
          {/* Stage 1: Input */}
          <div className="flex-1 min-w-0">
            <StageWrapper number="01" title="Inputs">
                <InputStage 
                    image={originalImage} 
                    onImageUpload={handleImageUpload}
                    payload={payload}
                    setPayload={setPayload}
                />
            </StageWrapper>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex flex-col justify-center items-center text-slate-300">
             <ArrowRight className="w-8 h-8 opacity-50" strokeWidth={3} />
          </div>

          {/* Stage 2: Encoder */}
          <div className="flex-1 min-w-0">
            <StageWrapper number="02" title="Encoder Network">
                <EncoderStage 
                    processing={isProcessing}
                    residualMap={residualMap}
                    strength={embeddingStrength}
                    setStrength={setEmbeddingStrength}
                />
            </StageWrapper>
          </div>

          {/* Arrow (Noise) */}
           <div className="hidden lg:flex flex-col justify-center items-center text-slate-300 relative group">
             <ArrowRight className="w-8 h-8 opacity-50" strokeWidth={3} />
             <div className="absolute -top-6 bg-red-100 text-red-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border border-red-200">
                Attack
             </div>
          </div>

          {/* Stage 3: Noise Layer */}
          <div className="flex-1 min-w-0">
            <StageWrapper number="03" title="Noise Layer ">
                <NoiseStage 
                    noiseParams={noiseParams}
                    setNoiseParams={setNoiseParams}
                    noisyImage={noisyImage}
                />
            </StageWrapper>
          </div>

           {/* Arrow */}
           <div className="hidden lg:flex flex-col justify-center items-center text-slate-300">
             <ArrowRight className="w-8 h-8 opacity-50" strokeWidth={3} />
          </div>

          {/* Stage 4: Decoder & Output */}
          <div className="flex-1 min-w-0">
            <StageWrapper number="04" title="Decoder ($D$) & Output">
                <DecoderStage 
                    recoveredPayload={recoveredPayload}
                    ber={metrics.ber}
                    confidence={metrics.confidence}
                />
            </StageWrapper>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DeepWatermarking;