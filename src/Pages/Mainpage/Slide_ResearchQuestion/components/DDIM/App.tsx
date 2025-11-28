import React, { useState, useEffect, useCallback } from 'react';
import DiffusionCanvas from './components/DiffusionCanvas';
import FormulaCard from './components/FormulaCard';
import { getStepExplanation } from './services/geminiService';
import { ExplanationResponse, ProcessType } from './types';
import { InlineMath } from 'react-katex';

// Constants
const TOTAL_STEPS = 50; 
const IMAGE_URL = "https://picsum.photos/id/237/600/600"; 

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [processType, setProcessType] = useState<ProcessType>(ProcessType.FORWARD);
  const [aiInfo, setAiInfo] = useState<ExplanationResponse | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // Formulas
  // Forward: adding noise
  const simpleForward = `x_t = \\sqrt{\\bar{\\alpha}_t} x_0 + \\sqrt{1 - \\bar{\\alpha}_t} \\epsilon`;
  // Backward: removing noise (DDIM)
  const backwardFormula = `x_{t-1} = \\sqrt{\\bar{\\alpha}_{t-1}} \\underbrace{\\left( \\frac{x_t - \\sqrt{1 - \\bar{\\alpha}_t}\\epsilon_\\theta(x_t)}{\\sqrt{\\bar{\\alpha}_t}} \\right)}_{\\text{pred } x_0} + \\underbrace{\\sqrt{1 - \\bar{\\alpha}_{t-1}} \\epsilon_\\theta(x_t)}_{\\text{direction to } x_t}`;
  
  // Handlers
  const togglePlay = () => setIsPlaying(!isPlaying);

  const switchToForward = () => {
    setProcessType(ProcessType.FORWARD);
    setIsPlaying(false);
    if (step === TOTAL_STEPS) setStep(0);
  };

  const switchToBackward = () => {
    setProcessType(ProcessType.BACKWARD);
    setIsPlaying(false);
    if (step === 0) setStep(TOTAL_STEPS);
  };

  // Animation Loop
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setStep((prev) => {
          if (processType === ProcessType.FORWARD) {
            if (prev >= TOTAL_STEPS) {
              setIsPlaying(false);
              return TOTAL_STEPS;
            }
            return prev + 1;
          } else {
            if (prev <= 0) {
              setIsPlaying(false);
              return 0;
            }
            return prev - 1;
          }
        });
      }, 100); 
    }
    return () => clearInterval(interval);
  }, [isPlaying, processType]);

  // AI Insights Trigger
  const fetchInsight = useCallback(async () => {
    setIsLoadingAi(true);
    const direction = processType === ProcessType.FORWARD ? 'forward' : 'backward';
    const data = await getStepExplanation(step, TOTAL_STEPS, direction);
    setAiInfo(data);
    setIsLoadingAi(false);
  }, [step, processType]);

  useEffect(() => {
    if (!isPlaying) {
        const timer = setTimeout(() => {
            fetchInsight();
        }, 800);
        return () => clearTimeout(timer);
    }
  }, [step, isPlaying, fetchInsight]);


  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      
      {/* Navbar / Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-black rounded flex items-center justify-center text-white font-bold font-math">D</div>
                <div>
                    <h1 className="text-lg font-bold tracking-tight text-slate-900">DDIM <span className="font-normal text-slate-500">Presentation Pipeline</span></h1>
                </div>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-lg">
                <button 
                    onClick={switchToForward}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${processType === ProcessType.FORWARD ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                >
                    Forward Process
                </button>
                <button 
                     onClick={switchToBackward}
                     className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${processType === ProcessType.BACKWARD ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                >
                    Backward Process
                </button>
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 lg:p-10">
        
        {/* Pipeline Visual Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: Visual State (Image) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center shadow-sm">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 w-full text-center">
                        Visual State (<InlineMath math="x_t" />)
                    </h2>
                    
                    <DiffusionCanvas 
                        step={step} 
                        totalSteps={TOTAL_STEPS} 
                        imageUrl={IMAGE_URL} 
                        width={350}
                        height={350}
                    />

                    {/* Timeline Controls */}
                    <div className="w-full mt-8 px-4">
                        <div className="flex items-center justify-between mb-2">
                             <button 
                                onClick={togglePlay}
                                className="h-8 w-8 flex items-center justify-center rounded-full border border-slate-300 hover:border-primary text-slate-600 hover:text-primary transition-colors"
                            >
                                {isPlaying ? (
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                                ) : (
                                    <svg className="w-3 h-3 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                )}
                            </button>
                            <span className="font-mono text-sm text-slate-500">t = {step}</span>
                        </div>
                        <input 
                            type="range" 
                            min={0} 
                            max={TOTAL_STEPS} 
                            value={step} 
                            onChange={(e) => {
                                setIsPlaying(false);
                                setStep(parseInt(e.target.value));
                            }}
                            className="w-full"
                        />
                         <div className="flex justify-between text-[10px] text-slate-400 uppercase font-semibold mt-2">
                            <span><InlineMath math="x_0" /> (Data)</span>
                            <span><InlineMath math="x_T" /> (Noise)</span>
                        </div>
                    </div>
                </div>

                {/* Legend for Visuals */}
                <div className="flex gap-4 justify-center text-sm text-slate-500">
                     <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-slate-900"></span>
                        <span>Signal</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                        <span>Noise</span>
                     </div>
                </div>
            </div>

            {/* MIDDLE: Arrow/Flow Indicator (Hidden on mobile) */}
            <div className="hidden lg:flex lg:col-span-1 h-[400px] items-center justify-center">
                <div className="flex flex-col items-center gap-2 opacity-30">
                     <div className="w-px h-full bg-gradient-to-b from-transparent via-slate-400 to-transparent"></div>
                </div>
            </div>

            {/* RIGHT: Mathematical Model */}
            <div className="lg:col-span-6 flex flex-col gap-6">
                
                {/* AI Explanation Box */}
                <div className="bg-white border-l-4 border-primary shadow-sm p-6 rounded-r-lg">
                    <h3 className="text-sm font-bold text-primary mb-1 uppercase">
                        {isLoadingAi ? "Analyzing..." : (aiInfo?.title || "Pipeline Status")}
                    </h3>
                     {isLoadingAi ? (
                        <div className="animate-pulse space-y-2 mt-2">
                            <div className="h-2 bg-slate-100 rounded w-full"></div>
                            <div className="h-2 bg-slate-100 rounded w-2/3"></div>
                        </div>
                    ) : (
                        <p className="text-slate-600 leading-relaxed text-sm">
                            {aiInfo?.explanation || "Adjust the slider to observe the transformation."}
                        </p>
                    )}
                </div>

                {/* Formula Stack */}
                <div className="space-y-4">
                    <div className="relative">
                         {processType === ProcessType.FORWARD && (
                            <div className="absolute -left-6 top-1/2 -translate-y-1/2 transform -rotate-90 text-xs font-bold text-slate-300 tracking-widest hidden lg:block">
                                ENCODER
                            </div>
                         )}
                        <FormulaCard 
                            title="Forward Diffusion (q)" 
                            latex={simpleForward}
                            isActive={processType === ProcessType.FORWARD}
                            description="Gaussian noise is added at each step. As t increases, the signal fades and noise dominates."
                        />
                    </div>
                    
                    <div className="relative">
                        {processType === ProcessType.BACKWARD && (
                            <div className="absolute -left-6 top-1/2 -translate-y-1/2 transform -rotate-90 text-xs font-bold text-slate-300 tracking-widest hidden lg:block">
                                SAMPLER
                            </div>
                         )}
                        <FormulaCard 
                            title="DDIM Sampling (p)" 
                            latex={backwardFormula}
                            isActive={processType === ProcessType.BACKWARD}
                            description="We predict the original image x0 from the current noisy xt, then step deterministically towards xt-1."
                        />
                    </div>
                </div>

                {/* Variables Definition */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-3 bg-slate-50 rounded border border-slate-100 text-xs text-slate-600">
                        <strong className="block text-slate-900 font-math text-base mb-1"><InlineMath math="x_0" /></strong>
                        Original Clean Data
                    </div>
                    <div className="p-3 bg-slate-50 rounded border border-slate-100 text-xs text-slate-600">
                         <strong className="block text-slate-900 font-math text-base mb-1"><InlineMath math="\epsilon" /></strong>
                        Standard Gaussian Noise
                    </div>
                    <div className="p-3 bg-slate-50 rounded border border-slate-100 text-xs text-slate-600">
                         <strong className="block text-slate-900 font-math text-base mb-1"><InlineMath math="\bar{\alpha}_t" /></strong>
                        Signal Rate Schedule
                    </div>
                    <div className="p-3 bg-slate-50 rounded border border-slate-100 text-xs text-slate-600">
                         <strong className="block text-slate-900 font-math text-base mb-1"><InlineMath math="x_t" /></strong>
                        Latent State at time t
                    </div>
                </div>

            </div>
        </div>
      </main>
    </div>
  );
};

export default App;