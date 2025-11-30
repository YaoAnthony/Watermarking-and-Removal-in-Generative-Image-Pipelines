
import React, { useState, useEffect } from 'react';
import { DEFAULT_IMAGE_URL } from './constants';
import { Lock, PenTool, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Types & Components for the Diagram ---

const MathText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`font-serif italic ${className}`}>{children}</span>
);

const NodeBox: React.FC<{
  label: React.ReactNode;
  subLabel?: string;
  color?: 'blue' | 'red' | 'green' | 'orange' | 'slate';
  isWatermarked?: boolean;
}> = ({ label, subLabel, color = 'blue', isWatermarked }) => {
  
  const colorStyles = {
    blue:   "bg-blue-50 border-blue-200 text-blue-900",
    red:    "bg-red-50 border-red-300 text-red-900", // Latent Watermark
    green:  "bg-green-50 border-green-300 text-green-900", // Decoder Watermark
    orange: "bg-orange-50 border-orange-300 text-orange-900", // Noise Watermark
    slate:  "bg-slate-50 border-slate-200 text-slate-700", // Input
  };

  return (
    <div className="relative group mx-2">
      {/* Box - INCREASED SIZE for Presentation Mode */}
      <div className={`
        w-28 h-28 md:w-40 md:h-40 flex flex-col items-center justify-center 
        border-4 rounded-2xl shadow-sm transition-all duration-300
        ${colorStyles[color]}
        ${isWatermarked ? 'ring-4 ring-offset-4 ring-yellow-400/60' : ''}
      `}>
        <div className="text-3xl md:text-5xl font-bold font-serif">{label}</div>
        {subLabel && <div className="text-xs md:text-sm uppercase tracking-wide opacity-70 mt-2 font-sans font-semibold">{subLabel}</div>}
      </div>

      {/* Watermark Icons Overlay - Larger */}
      {isWatermarked && (
        <div className="absolute -top-4 -right-4 flex gap-2 animate-bounce-slow z-10">
          <div className="bg-white p-2 rounded-full shadow-lg border border-slate-200">
            <Lock className="w-5 h-5 text-slate-700" />
          </div>
          <div className="bg-white p-2 rounded-full shadow-lg border border-slate-200">
            <PenTool className="w-5 h-5 text-orange-500" />
          </div>
        </div>
      )}
    </div>
  );
};

const Arrow: React.FC<{ 
  label?: string; 
  subLabel?: string; 
  color?: string; 
  length?: 'short' | 'medium' | 'long' 
}> = ({ label, subLabel, color = "text-slate-400", length = 'medium' }) => {
  
  // Adjusted lengths for larger layout
  const widthClass = length === 'long' ? 'min-w-[160px]' : 'min-w-[100px]';

  return (
    <div className={`flex flex-col items-center justify-center px-2 ${widthClass}`}>
      {(label || subLabel) && (
        <div className="mb-2 text-center">
          <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-500">{label}</div>
          {subLabel && <div className="text-[10px] md:text-xs text-slate-400 leading-tight">{subLabel}</div>}
        </div>
      )}
      <div className={`relative w-full h-[3px] ${color === 'pink' ? 'bg-pink-400' : color === 'orange' ? 'bg-orange-400' : 'bg-slate-300'}`}>
         <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-[3px] border-r-[3px] rotate-45 
           ${color === 'pink' ? 'border-pink-400' : color === 'orange' ? 'border-orange-400' : 'border-slate-300'}`} 
         />
      </div>
    </div>
  );
};

const ImageNode: React.FC<{ src: string; caption?: string }> = ({ src, caption }) => (
  <div className="flex flex-col items-center mx-2">
    <div className="w-28 h-28 md:w-40 md:h-40 bg-slate-100 rounded-2xl overflow-hidden border-4 border-slate-200 shadow-sm relative">
      <img src={src} alt="Output" className="w-full h-full object-cover" />
    </div>
    {caption && <span className="text-xs md:text-sm text-slate-400 mt-3 font-medium uppercase tracking-wide">{caption}</span>}
  </div>
);

// --- Content Data Structure ---

interface StepData {
  id: number;
  title: string;
  description: string;
  render: (imageUrl: string) => React.ReactNode;
}

const STEPS: StepData[] = [
  {
    id: 1,
    title: "Baseline Pipeline",
    description: "The standard latent diffusion process without any modifications.",
    render: (imageUrl) => (
      <>
        <div className="flex flex-col items-center mr-6">
          <span className="text-sm font-mono text-slate-500 mb-2">Seed</span>
          <div className="w-16 h-16 bg-slate-50 rounded-xl border-2 border-slate-200 flex items-center justify-center font-mono text-sm font-bold text-slate-600 shadow-sm">1234</div>
        </div>
        <Arrow label="Gaussian" subLabel="Distribution" />
        <NodeBox label={<MathText>Z<sub className="not-italic text-lg">T</sub></MathText>} subLabel="Noise" color="blue" />
        <Arrow label="Sampling" subLabel="Denoising" />
        <NodeBox label={<MathText>Z<sub className="not-italic text-lg">0</sub></MathText>} subLabel="Latent" color="blue" />
        <Arrow label="Decode" />
        <NodeBox label={<MathText>D</MathText>} subLabel="Decoder" color="blue" />
        <Arrow />
        <ImageNode src={imageUrl} caption="Clean Image" />
      </>
    )
  },
  {
    id: 2,
    title: "Latent Space Watermark",
    description: "Injecting the watermark directly into the denoised latent vector before decoding.",
    render: (imageUrl) => (
      <>
        <div className="flex flex-col items-center mr-6">
          <span className="text-sm font-mono text-slate-500 mb-2">Seed</span>
          <div className="w-16 h-16 bg-slate-50 rounded-xl border-2 border-slate-200 flex items-center justify-center font-mono text-sm font-bold text-slate-600 shadow-sm">1234</div>
        </div>
        <Arrow label="Gaussian" />
        <NodeBox label={<MathText>Z<sub className="not-italic text-lg">T</sub></MathText>} color="blue" />
        <Arrow label="Sampling" />
        <NodeBox 
          label={<MathText>z'<sub className="not-italic text-lg">0</sub></MathText>} 
          subLabel="Modified" 
          color="red" 
          isWatermarked={true} 
        />
        <Arrow />
        <NodeBox label={<MathText>D</MathText>} color="blue" />
        <Arrow />
        <ImageNode src={imageUrl} caption="Watermarked" />
      </>
    )
  },
  {
    id: 3,
    title: "Diffusion Process Watermark",
    description: "Modifying the sampling process itself (e.g., via guidance) to steer generation towards a watermark.",
    render: (imageUrl) => (
      <>
        <div className="flex flex-col items-center mr-6">
          <span className="text-sm font-mono text-slate-500 mb-2">Seed</span>
          <div className="w-16 h-16 bg-slate-50 rounded-xl border-2 border-slate-200 flex items-center justify-center font-mono text-sm font-bold text-slate-600 shadow-sm">1234</div>
        </div>
        <Arrow label="Gaussian" />
        <NodeBox label={<MathText>Z<sub className="not-italic text-lg">T</sub></MathText>} color="blue" />
        
        <Arrow label="Guided Sampling" color="pink" length="long" subLabel="Modified Trajectory" />
        
        <NodeBox 
          label={<MathText>z'<sub className="not-italic text-lg">0</sub></MathText>} 
          color="blue" 
          isWatermarked={true} 
          subLabel="Guided"
        />
        <Arrow />
        <NodeBox label={<MathText>D</MathText>} color="blue" />
        <Arrow />
        <ImageNode src={imageUrl} caption="Watermarked" />
      </>
    )
  },
  {
    id: 4,
    title: "Model Fine-Tuning (LDM)",
    description: "Embedding the watermark into the model weights (epsilon_theta) by fine-tuning on watermarked data.",
    render: (imageUrl) => (
      <>
        <NodeBox 
          label={<MathText>I'</MathText>} 
          color="slate" 
          isWatermarked={true} 
          subLabel="WM Input"
        />
        <Arrow label="Train / FT" />
        <NodeBox label={<MathText>Z<sub className="not-italic text-lg">T</sub></MathText>} color="blue" />
        <Arrow label="Sampling" subLabel="Fine-tuned U-Net" />
        <NodeBox label={<MathText>z'<sub className="not-italic text-lg">0</sub></MathText>} color="blue" />
        <Arrow />
        <NodeBox label={<MathText>D</MathText>} color="blue" />
        <Arrow />
        <ImageNode src={imageUrl} caption="Watermarked" />
      </>
    )
  },
  {
    id: 5,
    title: "Decoder Watermark",
    description: "Using a specially trained Decoder that embeds a invisible watermark during pixel reconstruction.",
    render: (imageUrl) => (
      <>
        <div className="flex flex-col items-center mr-6">
          <span className="text-sm font-mono text-slate-500 mb-2">Seed</span>
          <div className="w-16 h-16 bg-slate-50 rounded-xl border-2 border-slate-200 flex items-center justify-center font-mono text-sm font-bold text-slate-600 shadow-sm">1234</div>
        </div>
        <Arrow label="Gaussian" />
        <NodeBox label={<MathText>Z<sub className="not-italic text-lg">T</sub></MathText>} color="blue" />
        <Arrow label="Sampling" />
        <NodeBox label={<MathText>Z<sub className="not-italic text-lg">0</sub></MathText>} color="blue" />
        <Arrow />
        <NodeBox 
          label={<MathText>D'</MathText>} 
          color="green" 
          isWatermarked={true} 
          subLabel="WM Decoder"
        />
        <Arrow />
        <ImageNode src={imageUrl} caption="Watermarked" />
      </>
    )
  },
  {
    id: 6,
    title: "Initial Noise Watermark",
    description: "Embedding the signal into the initial Gaussian noise distribution before sampling starts.",
    render: (imageUrl) => (
      <>
        <NodeBox label={<MathText>Z<sub className="not-italic text-lg">T</sub></MathText>} color="blue" subLabel="Seed" />
        
        <Arrow label="Distribution" subLabel="Modification" color="orange" length="long" />
        
        <NodeBox label={<MathText>Z'<sub className="not-italic text-lg">T</sub></MathText>} color="blue" />
        <Arrow label="Sampling" />
        <NodeBox label={<MathText>z'<sub className="not-italic text-lg">0</sub></MathText>} color="blue" />
        <Arrow />
        <NodeBox label={<MathText>D</MathText>} color="blue" />
        <Arrow />
        <ImageNode src={imageUrl} caption="Watermarked" />
      </>
    )
  }
];

// --- Main App ---

export default function LDM_Watermark() {
  const [imageUrl] = useState(DEFAULT_IMAGE_URL);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = STEPS[currentStepIndex];
  const totalSteps = STEPS.length;

  const goToNext = () => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const goToPrev = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className=" text-slate-900 font-sans selection:bg-blue-100 flex flex-col relative overflow-hidden">

      {/* Main Content Area - Centered Slide */}
      <main className="flex-grow flex items-center justify-center p-6 md:p-12 relative">
        
        {/* Card */}
        <div className="w-full max-w-8xl relative">
            <div className="p-5 flex flex-col items-center justify-center transition-all duration-500">
              
              {/* Title Section */}
              <div className="text-center mb-16">
                <div className="text-sm font-bold text-blue-500 mb-2 uppercase tracking-widest opacity-80">
                  Method {currentStep.id < 10 ? `0${currentStep.id}` : currentStep.id}
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 tracking-tight">
                  {currentStep.title}
                </h2>
              </div>

              {/* Diagram Area */}
              <div className="flex flex-wrap items-center justify-center gap-y-12 w-full ">
                {currentStep.render(imageUrl)}
              </div>

              {/* Slide Counter inside card */}
              <div className="absolute bottom-6 right-8 text-slate-300 font-mono text-sm tracking-widest font-bold">
                {currentStepIndex + 1} / {totalSteps}
              </div>

            </div>
        </div>

      </main>

      {/* Navigation - Floating Buttons */}
      
      {/* Left Button */}
      <button 
        onClick={goToPrev}
        disabled={currentStepIndex === 0}
        className={`
          fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-30
          w-14 h-14 flex items-center justify-center rounded-full
          bg-white shadow-xl border border-slate-100 text-slate-700
          transition-all duration-300 transform hover:scale-110 active:scale-95
          ${currentStepIndex === 0 ? 'opacity-0 pointer-events-none translate-x-[-20px]' : 'opacity-100 hover:text-blue-600'}
        `}
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Button */}
      <button 
        onClick={goToNext}
        disabled={currentStepIndex === totalSteps - 1}
        className={`
          fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-30
          w-14 h-14 flex items-center justify-center rounded-full
          bg-white shadow-xl border border-slate-100 text-slate-700
          transition-all duration-300 transform hover:scale-110 active:scale-95
          ${currentStepIndex === totalSteps - 1 ? 'opacity-0 pointer-events-none translate-x-[20px]' : 'opacity-100 hover:text-blue-600'}
        `}
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

    </div>
  );
}
