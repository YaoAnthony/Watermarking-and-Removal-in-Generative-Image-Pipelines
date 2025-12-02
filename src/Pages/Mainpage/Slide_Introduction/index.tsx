import React, { useState } from "react";
import { withSlide } from "../../../HOC/withSlide";
import { motion } from "motion/react";
import { Binary, Waves, Check, AlertTriangle } from "lucide-react";

import LSBModal from "./LSBModal";
import DWTModal from "./DWTModal";
import DeepWatermarkingModal from "../Slide_Deep_watermarking/components/DeepWatermarkingModal";
import { styles } from "../../../style";

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



    const sectionVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" }
        })
    };

    return (
        <div className={styles.slideContainer}>
            
            <LSBModal isOpen={lsbModalOpen} onClose={() => setLsbModalOpen(false)} />
            <DWTModal isOpen={dwtModalOpen} onClose={() => setDwtModalOpen(false)} />
            <DeepWatermarkingModal isOpen={deepWatermarkingModalOpen} onClose={() => setDeepWatermarkingModalOpen(false)} />

            <div className={styles.slideContent}>

                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-2 shrink-0 border-b border-gray-200 dark:border-zinc-700 pb-4"
                >
                    <div className="mb-8 shrink-0">
                        <h2 className="font-grotesk text-5xl font-bold mb-4 text-left text-black dark:text-white">
                            Evolution of Watermarking
                        </h2>
                        <div className="w-24 h-1.5 bg-[#8D9F87] dark:bg-[#8D9F87] rounded-full" />
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
                                    className="group flex items-center gap-2 px-3 py-1.5 rounded border border-gray-300 dark:border-zinc-600 hover:border-[#8D9F87] dark:hover:border-[#8D9F87] hover:text-[#5F6F52] dark:hover:text-[#D6C0B3] transition-all bg-transparent"
                                >
                                    <Binary size={16} className="text-gray-400 group-hover:text-[#5F6F52] dark:group-hover:text-[#D6C0B3]" />
                                    <span className="font-medium">Spatial (LSB)</span>
                                </button>
                                <button 
                                    onClick={openDwtModal}
                                    className="group flex items-center gap-2 px-3 py-1.5 rounded border border-gray-300 dark:border-zinc-600 hover:border-[#A98467] dark:hover:border-[#A98467] hover:text-[#A98467] dark:hover:text-[#D6C0B3] transition-all bg-transparent"
                                >
                                    <Waves size={16} className="text-gray-400 group-hover:text-[#A98467] dark:group-hover:text-[#D6C0B3]" />
                                    <span className="font-medium">Frequency (DCT/DWT)</span>
                                </button>
                            </div>

                            <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-base mt-2">
                                <AlertTriangle size={18} className="mt-1 shrink-0 text-amber-600 dark:text-amber-500" />
                                <p><span className="font-semibold text-amber-700 dark:text-amber-500">Limitation:</span> Fragile to compression & geometric attacks.</p>
                            </div>
                        </div>
                    </motion.div>
                    {/* 2. Current Challenges */}
                    <motion.div 
                        custom={2}
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
                                <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-[#A98467] border border-[#A98467]/20 bg-[#A98467]/10 dark:bg-[#A98467]/20 dark:border-[#A98467]/30 dark:text-[#D6C0B3] rounded">The Gap</span>
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 border-l-4 border-red-500 rounded-r-lg">
                                <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                                    Traditional methods hardly survive <span className="font-bold text-[#A98467] dark:text-[#D6C0B3]">many Attacks</span>.
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 italic">
                                    (e.g., JPEG, Crop, Noise Attacks)
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 3. Deep Learning Era */}
                    <motion.div 
                        custom={3}
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative"
                    >
                        {/* Timeline Node */}
                        <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border-4 border-[#8D9F87] dark:border-[#8D9F87]" />

                        <div className="space-y-3">
                            <div className="flex items-baseline gap-3">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Deep Learning Era</h3>
                                <span className="text-sm font-mono text-[#5F6F52] dark:text-[#D6C0B3]">2015~</span>
                            </div>
                            
                            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-1">
                                <li><span className="font-semibold">End-to-End:</span> Jointly training Encoder/Decoder (e.g., HiDDeN).</li>
                                <li><span className="font-semibold">GAN-based:</span> Enhancing visual quality via adversarial loss.(e.g., ARWGAN etc)</li>
                            </ul>

                            <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-base mt-2">
                                <Check size={18} className="mt-1 shrink-0 text-[#5F6F52] dark:text-[#D6C0B3]" />
                                <p><span className="font-semibold text-[#5F6F52] dark:text-[#D6C0B3]">Solved:</span> Robustness against signal processing (JPEG, Crop, Noise).</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 4. New Challenges */}
                    <motion.div 
                        custom={4}
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
                                <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-red-600 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400 rounded">2017</span>
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 border-l-4 border-red-500 rounded-r-lg">
                                <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                                    <span className="font-bold text-[#A98467] dark:text-[#D6C0B3]">Diffusion Models</span>.
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
                        <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border-4 border-[#8D9F87] dark:border-[#8D9F87]" />

                        <div className="space-y-3">
                            <div className="flex items-baseline gap-3">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Addressing Generative Threats</h3>
                                <span className="text-sm font-mono text-[#5F6F52] dark:text-[#D6C0B3]">2023~</span>
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
