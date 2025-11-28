import React, { useState, useEffect } from "react";
import { withSlide } from "../../HOC/withSlide";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, RotateCcw, Cpu, Box, Scan, FileText, Layers, Disc } from "lucide-react";
import { processImage } from "../../assets";

// --- Visual Components (Defined Outside) ---

// 1. Holographic Terminal
const HoloTerminal = ({ step }: { step: number }) => (
    <motion.div 
        className="relative w-64 h-40 bg-black/80 border-2 border-cyan-500/50 rounded-lg overflow-hidden flex flex-col p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
    >
        {/* Scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />
        <div className="flex items-center gap-2 mb-2 border-b border-cyan-500/30 pb-1">
            <Scan size={16} className="text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest">INPUT_TERMINAL_V1</span>
        </div>
        <div className="flex-1 font-mono text-sm text-cyan-100 leading-relaxed relative z-0">
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                &gt; PROMPT_INIT:<br/>
                <span className="text-white text-shadow-cyan">"A cyberpunk astronaut riding a horse in neon space"</span>
            </motion.span>
        </div>
        {/* Emitting Data Blocks */}
        {step >= 1 && (
            <motion.div 
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-3 h-3 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                        animate={{ 
                            x: [0, 100], 
                            opacity: [1, 0],
                            scale: [1, 0.5]
                        }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 1, 
                            delay: i * 0.2,
                            ease: "linear"
                        }}
                    />
                ))}
            </motion.div>
        )}
    </motion.div>
);

// 2. UNet Machinery
const UNetMachinery = ({ step }: { step: number }) => (
    <motion.div 
        className="relative w-96 h-64 bg-slate-900/50 border border-slate-700 rounded-xl backdrop-blur-sm flex flex-col items-center justify-center p-4 overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
            opacity: step >= 1 ? 1 : 0.3, 
            scale: step >= 1 ? 1 : 0.9,
            borderColor: step >= 2 ? "rgba(168,85,247,0.6)" : "rgba(51,65,85,1)"
        }}
    >
        {/* Label */}
        <div className="absolute top-2 left-4 flex items-center gap-2">
            <Layers size={14} className="text-purple-400" />
            <span className="text-[10px] font-mono text-purple-400 tracking-widest">UNET_DENOISER_CORE</span>
        </div>

        {/* Slices Container */}
        <div className="flex items-center justify-between w-full h-full mt-4 px-2 gap-2">
            {/* Slice 1: Noise */}
            <motion.div 
                className="w-16 h-32 bg-gray-800 rounded border border-gray-600 relative overflow-hidden"
                animate={{ opacity: step >= 2 ? 1 : 0.5 }}
            >
                <div className="absolute inset-0 opacity-80 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150" />
                <span className="absolute bottom-1 left-1 text-[8px] text-gray-400 font-mono">Z_T</span>
            </motion.div>

            <ArrowRight size={16} className="text-gray-600" />

            {/* Slice 2: Vague Shapes */}
            <motion.div 
                className="w-16 h-32 bg-gray-800 rounded border border-gray-600 relative overflow-hidden"
                animate={{ opacity: step >= 2 ? 1 : 0.2 }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 blur-md opacity-60" />
            </motion.div>

            <ArrowRight size={16} className="text-gray-600" />

            {/* Slice 3: Structure */}
            <motion.div 
                className="w-16 h-32 bg-gray-800 rounded border border-gray-600 relative overflow-hidden"
                animate={{ opacity: step >= 2 ? 1 : 0.2 }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 blur-sm opacity-80" />
            </motion.div>

            <ArrowRight size={16} className="text-gray-600" />

            {/* Slice 4: Latent Cube */}
            <motion.div 
                className="w-20 h-32 flex items-center justify-center relative"
                animate={{ opacity: step >= 2 ? 1 : 0.2 }}
            >
                <motion.div 
                    className="w-12 h-12 bg-purple-600 shadow-[0_0_20px_rgba(147,51,234,0.8)] border-2 border-purple-300"
                    animate={{ 
                        rotateY: [0, 360],
                        rotateX: [0, 180]
                    }}
                    transition={{ 
                        repeat: Infinity, 
                        duration: 8, 
                        ease: "linear" 
                    }}
                />
                <span className="absolute bottom-0 text-[8px] text-purple-400 font-mono font-bold">Z_0 (LATENT)</span>
            </motion.div>
        </div>

        {/* Processing Beam */}
        {step === 2 && (
            <motion.div 
                className="absolute top-1/2 left-0 w-full h-1 bg-purple-500/50 blur-sm"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />
        )}
    </motion.div>
);

// 3. VAE Decoder
const VAEDecoder = ({ step }: { step: number }) => (
    <motion.div 
        className="relative w-64 h-56 bg-slate-900 border-2 border-orange-500/30 rounded-xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.1)]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
            opacity: step >= 3 ? 1 : 0.3,
            scale: step >= 3 ? 1 : 0.8,
            borderColor: step >= 3 ? "rgba(249,115,22,0.6)" : "rgba(51,65,85,1)"
        }}
    >
        <div className="absolute -top-3 bg-slate-900 px-2 border border-orange-500/30 rounded text-xs font-mono text-orange-400 flex items-center gap-2">
            <Cpu size={12} /> VAE_DECODER_UNIT
        </div>

        {/* Core Processor */}
        <div className="w-32 h-32 border border-orange-500/20 rounded-full flex items-center justify-center relative">
            <motion.div 
                className="absolute inset-0 border-2 border-dashed border-orange-500/40 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            />
            <Box size={40} className="text-orange-500" />
        </div>

        {/* Watermark Injection Port */}
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex items-center">
            <div className="w-8 h-1 bg-red-500/50" />
            <motion.div 
                className="w-12 h-12 bg-slate-900 border-2 border-red-500 rounded-lg flex flex-col items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.6)] z-20 relative"
                animate={{ 
                    boxShadow: ["0 0 10px rgba(239,68,68,0.4)", "0 0 25px rgba(239,68,68,0.8)", "0 0 10px rgba(239,68,68,0.4)"]
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <Disc size={20} className="text-red-500" />
                <div className="absolute -bottom-6 w-32 text-center">
                    <span className="text-[8px] font-bold text-red-400 bg-black/80 px-1 rounded uppercase">Watermark Injection</span>
                </div>
            </motion.div>
        </div>

        {/* Decoding Text */}
        {step >= 3 && (
            <motion.div 
                className="absolute bottom-4 text-[10px] font-mono text-orange-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                DECODING_LATENT...
            </motion.div>
        )}
    </motion.div>
);

// 4. Final Output
const FinalOutput = ({ step }: { step: number }) => (
    <motion.div 
        className="relative w-56 h-64 p-1 bg-gradient-to-b from-green-500/50 to-transparent rounded-xl"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: step >= 4 ? 1 : 0.3, x: step >= 4 ? 0 : 50 }}
    >
        <div className="w-full h-full bg-black rounded-lg overflow-hidden relative border border-green-500/30">
            <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-black/60 px-2 py-1 rounded border border-green-500/30">
                <FileText size={10} className="text-green-400" />
                <span className="text-[8px] font-mono text-green-400">OUTPUT.PNG</span>
            </div>
            
            <AnimatePresence>
                {step >= 4 && (
                    <motion.img 
                        src={processImage} 
                        alt="Final Result" 
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, filter: "blur(20px) brightness(2)" }}
                        animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                )}
            </AnimatePresence>

            {/* Scanning Effect */}
            {step >= 4 && (
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/20 to-transparent h-1/4 w-full pointer-events-none"
                    animate={{ top: ["-25%", "125%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
            )}
        </div>
    </motion.div>
);

// Energy Conduit (SVG)
const EnergyConduit = ({ active, delay = 0 }: { active: boolean, delay?: number }) => (
    <div className="w-16 h-2 relative overflow-visible flex items-center">
        <motion.div 
            className="w-full h-[2px] bg-slate-700"
        />
        {active && (
            <motion.div 
                className="absolute top-0 left-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay }}
            />
        )}
    </div>
);

const Slide6withOutHOC: React.FC = () => {
    const [step, setStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);

    // Auto-play logic
    useEffect(() => {
        if (isAutoPlaying) {
            const timer = setInterval(() => {
                setStep((prev) => {
                    if (prev >= 4) {
                        setIsAutoPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 3500); // Slower for cinematic effect
            return () => clearInterval(timer);
        }
    }, [isAutoPlaying]);

    const reset = () => {
        setStep(0);
        setIsAutoPlaying(false);
    };

    const play = () => {
        if (step >= 4) setStep(0);
        setIsAutoPlaying(true);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-gray-100 overflow-hidden relative">
            
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.3)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            
            {/* Ambient Light */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-900/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[90%] w-full flex flex-col h-[90%] relative z-10">

                {/* Header */}
                <div className="mb-8 shrink-0 flex items-end justify-between">
                    <div>
                        <h2 className="font-grotesk text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                            Stable Diffusion Pipeline
                        </h2>
                        <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500" />
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={play}
                            disabled={isAutoPlaying && step < 4}
                            className="px-6 py-2 bg-cyan-900/30 border border-cyan-500/50 hover:bg-cyan-800/50 text-cyan-300 rounded-lg font-mono text-sm transition flex items-center gap-2 disabled:opacity-50"
                        >
                            <Play size={16} />
                            {step >= 4 ? "REBOOT_SEQUENCE" : "INITIATE_GEN"}
                        </button>
                        <button 
                            onClick={reset}
                            className="px-4 py-2 bg-slate-800/50 border border-slate-600 hover:bg-slate-700/50 text-slate-300 rounded-lg transition"
                        >
                            <RotateCcw size={16} />
                        </button>
                    </div>
                </div>

                {/* Main Visualization Area */}
                <div className="flex-1 flex items-center justify-center gap-2 min-h-0 scale-90 lg:scale-100 origin-center">
                    
                    {/* 1. Input */}
                    <div className="flex flex-col items-center gap-2">
                        <HoloTerminal step={step} />
                        <span className="text-[10px] font-mono text-cyan-500/70 tracking-widest uppercase mt-2">Stage 1: Text Embedding</span>
                    </div>

                    <EnergyConduit active={step >= 1} />

                    {/* 2. UNet */}
                    <div className="flex flex-col items-center gap-2">
                        <UNetMachinery step={step} />
                        <span className="text-[10px] font-mono text-purple-500/70 tracking-widest uppercase mt-2">Stage 2: Iterative Diffusion</span>
                    </div>

                    <EnergyConduit active={step >= 3} />

                    {/* 3. VAE */}
                    <div className="flex flex-col items-center gap-2">
                        <VAEDecoder step={step} />
                        <span className="text-[10px] font-mono text-orange-500/70 tracking-widest uppercase mt-2">Stage 3: Decoding & Watermarking</span>
                    </div>

                    <EnergyConduit active={step >= 4} />

                    {/* 4. Output */}
                    <div className="flex flex-col items-center gap-2">
                        <FinalOutput step={step} />
                        <span className="text-[10px] font-mono text-green-500/70 tracking-widest uppercase mt-2">Stage 4: Final Render</span>
                    </div>

                </div>

            </div>
        </div>
    );
};

const Slide6 = withSlide(Slide6withOutHOC);

export default Slide6;
