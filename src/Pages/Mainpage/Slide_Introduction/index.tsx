import React, { useState } from "react";
import { withSlide } from "../../../HOC/withSlide";
import { motion } from "motion/react";
import { Binary, Waves, Check, AlertTriangle } from "lucide-react";

import LSBModal from "./LSBModal";
import DWTModal from "./DWTModal";
import DeepWatermarkingModal from "./DeepWatermarkingModal";

const Slide3withOutHOC: React.FC = () => {
    const [lsbModalOpen, setLsbModalOpen] = useState(false);
    const [dwtModalOpen, setDwtModalOpen] = useState(false);
    const [deepWatermarkingModalOpen, setDeepWatermarkingModalOpen] = useState(false);

    const openLsbModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLsbModalOpen(true);
    };

    const openDwtModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDwtModalOpen(true);
    };

    const openDeepWatermarkingModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDeepWatermarkingModalOpen(true);
    };

    const sectionVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" }
        })
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-start bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 overflow-hidden relative transition-colors duration-300">
            
            <LSBModal isOpen={lsbModalOpen} onClose={() => setLsbModalOpen(false)} />
            <DWTModal isOpen={dwtModalOpen} onClose={() => setDwtModalOpen(false)} />
            <DeepWatermarkingModal isOpen={deepWatermarkingModalOpen} onClose={() => setDeepWatermarkingModalOpen(false)} />

            <div className="max-w-5xl w-full px-12 py-12 flex flex-col h-full">

                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 shrink-0 border-b border-gray-200 dark:border-zinc-700 pb-4"
                >
                    <div className="mb-8 shrink-0">
                        <h2 className="font-grotesk text-5xl font-bold mb-4 text-left text-black dark:text-white">
                            Evolution of Watermarking
                        </h2>
                        <div className="w-24 h-1.5 bg-blue-700 dark:bg-blue-500 rounded-full" />
                    </div>
                </motion.div>

                {/* Timeline Container */}
                <div className="flex-1 relative pl-8 border-l-2 border-gray-200 dark:border-zinc-700 ml-4 space-y-12">
                    
                    {/* 1. Traditional Era */}
                    <motion.div 
                        custom={1}
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative"
                    >
                        {/* Timeline Node */}
                        <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border-4 border-gray-300 dark:border-zinc-600" />
                        
                        <div className="space-y-3">
                            <div className="flex items-baseline gap-3">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Traditional Era</h3>
                                <span className="text-sm font-mono text-gray-500 dark:text-gray-400">~1997</span>
                            </div>
                            
                            <div className="flex flex-wrap gap-3">
                                <button 
                                    onClick={openLsbModal}
                                    className="group flex items-center gap-2 px-3 py-1.5 rounded border border-gray-300 dark:border-zinc-600 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all bg-transparent"
                                >
                                    <Binary size={16} className="text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                                    <span className="font-medium">Spatial (LSB)</span>
                                </button>
                                <button 
                                    onClick={openDwtModal}
                                    className="group flex items-center gap-2 px-3 py-1.5 rounded border border-gray-300 dark:border-zinc-600 hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all bg-transparent"
                                >
                                    <Waves size={16} className="text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400" />
                                    <span className="font-medium">Frequency (DCT/DWT)</span>
                                </button>
                            </div>

                            <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-base mt-2">
                                <AlertTriangle size={18} className="mt-1 shrink-0 text-amber-600 dark:text-amber-500" />
                                <p><span className="font-semibold text-amber-700 dark:text-amber-500">Limitation:</span> Fragile to compression & geometric attacks.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. Deep Learning Era */}
                    <motion.div 
                        custom={2}
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative"
                    >
                        {/* Timeline Node */}
                        <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border-4 border-blue-500 dark:border-blue-500" />

                        <div className="space-y-3">
                            <div className="flex items-baseline gap-3">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Deep Learning Era</h3>
                                <span className="text-sm font-mono text-blue-600 dark:text-blue-400">2015~</span>
                            </div>
                            <button 
                                onClick={openDeepWatermarkingModal}
                                className="group flex items-center gap-2 px-3 py-1.5 rounded border border-gray-300 dark:border-zinc-600 hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all bg-transparent"
                            >
                                <Waves size={16} className="text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400" />
                                <span className="font-medium">Deep Learning</span>
                            </button>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-1">
                                <li><span className="font-semibold">End-to-End:</span> Jointly training Encoder/Decoder (e.g., HiDDeN).</li>
                                <li><span className="font-semibold">GAN-based:</span> Enhancing visual quality via adversarial loss.(e.g., ARWGAN etc)</li>
                            </ul>

                            <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-base mt-2">
                                <Check size={18} className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-500" />
                                <p><span className="font-semibold text-emerald-700 dark:text-emerald-500">Solved:</span> Robustness against signal processing (JPEG, Crop, Noise).</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 3. Current Challenges */}
                    <motion.div 
                        custom={3}
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative"
                    >
                        {/* Timeline Node */}
                        <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border-4 border-red-500 dark:border-red-500" />

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Current Challenges</h3>
                                <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-red-600 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400 rounded">The Gap</span>
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 border-l-4 border-red-500 rounded-r-lg">
                                <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                                    Existing DL methods cannot survive <span className="font-bold text-red-700 dark:text-red-400">Generative Attacks</span>.
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 italic">
                                    (e.g., Diffusion Models, Stable Diffusion Inpainting)
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 4. Future Era */}
                    <motion.div 
                        custom={2}
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative"
                    >
                        {/* Timeline Node */}
                        <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border-4 border-blue-500 dark:border-blue-500" />

                        <div className="space-y-3">
                            <div className="flex items-baseline gap-3">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Addressing Generative Threats</h3>
                                <span className="text-sm font-mono text-blue-600 dark:text-blue-400">2023~</span>
                            </div>

                            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-1">
                                <li><span className="font-semibold">Model-Dependent Approaches (e.g., Stable-Signature)</span></li>
                                <li><span className="font-semibold">Tuning-free watermarking approaches (e.g., Tree-ring)</span></li>
                            </ul>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

const Slide3 = withSlide(Slide3withOutHOC);

export default Slide3;
