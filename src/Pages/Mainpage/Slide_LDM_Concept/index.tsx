
import React from "react";
import { withSlide } from "../../../HOC/withSlide";
import { motion } from "framer-motion";
import { Layers, Box, ScanLine, ArrowRight } from "lucide-react";
import LDM from "./LDM1.png";

const Slide9withoutHOC: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-start pt-24 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="w-full px-12 flex flex-col h-full">

                {/* Header */}
                <div className="mb-12 shrink-0">
                    <h2 className="font-grotesk text-5xl font-bold mb-4 text-left text-black dark:text-white">
                        Latent Diffusion Models
                    </h2>
                    <div className="w-20 h-1 bg-blue-700 dark:bg-blue-500" />
                </div>

                {/* Main Content */}
                <div className="flex-1 grid grid-cols-12 gap-12 pb-12">
                    
                    {/* Left: Image */}
                    <div className="col-span-7 flex flex-col justify-center">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900"
                        >
                            <img 
                                src={LDM} 
                                alt="Latent Diffusion Model Architecture" 
                                className="w-full h-auto object-contain"
                            />
                        </motion.div>
                        <p className="mt-4 text-sm text-slate-500 text-center font-mono">
                            High-Resolution Image Synthesis with Latent Diffusion Models (CVPR 2022)
                        </p>
                    </div>

                    {/* Right: Key Insight (Latent Space) */}
                    <div className="col-span-5 flex flex-col justify-center gap-6">
                        
                        {/* Insight Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                    <Layers size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                    Latent Space Efficiency
                                </h3>
                            </div>
                            
                            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                                Diffusion in pixel space is computationally expensive. LDMs shift the process to a compressed latent space.
                            </p>

                            {/* Comparison */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
                                    <div className="flex items-center gap-3 text-slate-500">
                                        <ScanLine size={20} />
                                        <span className="font-medium">Pixel Space</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-mono text-lg font-bold text-slate-900 dark:text-slate-200">512×512</span>
                                        <span className="text-xs font-bold px-2 py-1 rounded bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">Slow</span>
                                    </div>
                                </div>

                                <div className="flex justify-center text-slate-400">
                                    <ArrowRight size={20} className="rotate-90" />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
                                    <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-400">
                                        <Box size={20} />
                                        <span className="font-bold">Latent Space</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-mono text-lg font-bold text-emerald-900 dark:text-emerald-100">64×64</span>
                                        <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Fast</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
};

const Slide9 = withSlide(Slide9withoutHOC);

export default Slide9;