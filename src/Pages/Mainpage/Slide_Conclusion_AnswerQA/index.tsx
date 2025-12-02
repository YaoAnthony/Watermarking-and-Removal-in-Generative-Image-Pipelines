import React from "react";
import { withSlide } from "../../../HOC/withSlide";
import { 
    Database, 
    Layers, 
    Zap, 
    CheckCircle2, 
    XCircle, 
    AlertTriangle, 
    RefreshCw, 
    TrendingUp, 
    ShieldAlert,
    Box,
    Cpu,
    Fingerprint
} from "lucide-react";

const ConclusionWithoutHOC: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-start pt-12 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-hidden">
            <div className="w-full px-12 flex flex-col h-full max-w-[1600px]">

                {/* Header */}
                <div className="mb-8 shrink-0">
                    <h2 className="font-grotesk text-4xl font-bold mb-3 text-left text-black dark:text-white tracking-tight">
                        Summary of Findings: <span className="text-gray-500 dark:text-gray-400 font-normal">From Taxonomy to Weaknesses</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-[#5F6F52] via-[#8D9F87] to-[#A98467] rounded-full" />
                </div>
                
                {/* Main Grid Content */}
                <div className="flex-1 grid grid-cols-3 gap-6 pb-8 overflow-y-auto min-h-0">
                    
                    {/* Column 1: RQ1 - Taxonomy */}
                    <div className="flex flex-col gap-4 h-full">
                        <div className="flex items-center gap-3 pb-2 border-b border-[#5F6F52]/30 dark:border-[#5F6F52]/50">
                            <div className="p-2 bg-[#5F6F52]/10 dark:bg-[#5F6F52]/30 rounded-lg text-[#5F6F52] dark:text-[#D6C0B3]">
                                <Layers size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">RQ1 – Taxonomy</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">How are methods classified?</p>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col gap-4">
                            <div className="p-4 rounded-xl bg-[#5F6F52]/5 dark:bg-[#5F6F52]/10 border border-[#5F6F52]/20 dark:border-[#5F6F52]/30 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 mb-2 text-[#5F6F52] dark:text-[#D6C0B3] font-semibold">
                                    <Database size={18} />
                                    <span>Model-Tuned</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Watermarks/fingerprints written into <span className="font-semibold text-[#5F6F52] dark:text-[#D6C0B3]">model weights</span> (UNet, decoder, LoRA, DNN).
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-[#5F6F52]/5 dark:bg-[#5F6F52]/10 border border-[#5F6F52]/20 dark:border-[#5F6F52]/30 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 mb-2 text-[#5F6F52] dark:text-[#D6C0B3] font-semibold">
                                    <Cpu size={18} />
                                    <span>Deep Watermarking</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Separate neural encoder/decoder; host model treated as a <span className="font-semibold text-[#5F6F52] dark:text-[#D6C0B3]">distortion channel</span> or ignored.
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-[#5F6F52]/5 dark:bg-[#5F6F52]/10 border border-[#5F6F52]/20 dark:border-[#5F6F52]/30 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 mb-2 text-[#5F6F52] dark:text-[#D6C0B3] font-semibold">
                                    <Zap size={18} />
                                    <span>Tuning-Free</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    No training, watermarks embedded via <span className="font-semibold text-[#5F6F52] dark:text-[#D6C0B3]">noise / late during sampling</span>.
                                </p>
                            </div>

                            <div className="mt-auto p-3 bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700 text-xs text-gray-500 dark:text-gray-400 italic">
                                This taxonomy covers both image-level and model-level watermarking, and maps cleanly onto DDPM / DDIM / LDM pipelines.
                            </div>
                        </div>
                    </div>

                    {/* Column 2: RQ2 - Performance Trade-offs */}
                    <div className="flex flex-col gap-4 h-full">
                        <div className="flex items-center gap-3 pb-2 border-b border-[#8D9F87]/30 dark:border-[#8D9F87]/50">
                            <div className="p-2 bg-[#8D9F87]/10 dark:bg-[#8D9F87]/30 rounded-lg text-[#8D9F87] dark:text-[#D6C0B3]">
                                <Box size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">RQ2 – Trade-offs</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Im + Rob + Eff</p>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
                            {/* Model-Tuned Trade-offs */}
                            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 p-4 shadow-sm">
                                <h4 className="font-semibold text-[#8D9F87] dark:text-[#D6C0B3] mb-2 text-sm uppercase tracking-wide">Model-Tuned</h4>
                                <ul className="space-y-2">
                                    <li className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <CheckCircle2 className="w-4 h-4 text-[#5F6F52] shrink-0 mt-0.5" />
                                        <span>Strong coupling, high capacity, supports user fingerprints.</span>
                                    </li>
                                    <li className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <XCircle className="w-4 h-4 text-[#A98467] shrink-0 mt-0.5" />
                                        <span>Sensitive to fine-tuning/LoRA; expensive deployment; safety concerns.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Deep Watermarking Trade-offs */}
                            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 p-4 shadow-sm">
                                <h4 className="font-semibold text-[#8D9F87] dark:text-[#D6C0B3] mb-2 text-sm uppercase tracking-wide">Deep Watermarking</h4>
                                <ul className="space-y-2">
                                    <li className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <CheckCircle2 className="w-4 h-4 text-[#5F6F52] shrink-0 mt-0.5" />
                                        <span>End-to-end control; approximates complex distortions.</span>
                                    </li>
                                    <li className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <XCircle className="w-4 h-4 text-[#A98467] shrink-0 mt-0.5" />
                                        <span>Training-heavy; pixel-domain issues; backbone limited.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Tuning-Free Trade-offs */}
                            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 p-4 shadow-sm">
                                <h4 className="font-semibold text-[#8D9F87] dark:text-[#D6C0B3] mb-2 text-sm uppercase tracking-wide">Tuning-Free</h4>
                                <ul className="space-y-2">
                                    <li className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <CheckCircle2 className="w-4 h-4 text-[#5F6F52] shrink-0 mt-0.5" />
                                        <span>No retraining; works with frozen models; API-friendly.</span>
                                    </li>
                                    <li className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <XCircle className="w-4 h-4 text-[#A98467] shrink-0 mt-0.5" />
                                        <span>Lower capacity; fragile against model countermeasures.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: RQ3 - Vulnerabilities */}
                    <div className="flex flex-col gap-4 h-full">
                        <div className="flex items-center gap-3 pb-2 border-b border-[#A98467]/30 dark:border-[#A98467]/50">
                            <div className="p-2 bg-[#A98467]/10 dark:bg-[#A98467]/30 rounded-lg text-[#A98467] dark:text-[#D6C0B3]">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">RQ3 – Vulnerabilities</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Core Failure Modes</p>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col gap-4">
                            <div className="p-4 bg-[#A98467]/5 dark:bg-[#A98467]/10 rounded-xl border border-[#A98467]/20 dark:border-[#A98467]/30">
                                <h4 className="flex items-center gap-2 font-semibold text-[#A98467] dark:text-[#D6C0B3] mb-2">
                                    <RefreshCw size={16} />
                                    Regeneration Attacks
                                </h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Re-running diffusion (img2img, style transfer, inpainting) multiple times washes out watermarks.
                                </p>
                            </div>

                            <div className="p-4 bg-[#A98467]/5 dark:bg-[#A98467]/10 rounded-xl border border-[#A98467]/20 dark:border-[#A98467]/30">
                                <h4 className="flex items-center gap-2 font-semibold text-[#A98467] dark:text-[#D6C0B3] mb-2">
                                    <TrendingUp size={16} />
                                    Model Evolution
                                </h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Long-term fine-tuning, safety alignment, distillation, and compression remove traces.
                                </p>
                            </div>

                            <div className="p-4 bg-[#A98467]/5 dark:bg-[#A98467]/10 rounded-xl border border-[#A98467]/20 dark:border-[#A98467]/30">
                                <h4 className="flex items-center gap-2 font-semibold text-[#A98467] dark:text-[#D6C0B3] mb-2">
                                    <ShieldAlert size={16} />
                                    Targeted Removal
                                </h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Adversarial un-watermarking networks, UnMarker-style attacks, or backdoor defenses.
                                </p>
                            </div>

                            <div className="mt-auto p-4 bg-gradient-to-r from-[#A98467] to-[#998475] rounded-xl shadow-lg text-white">
                                <div className="flex items-start gap-3">
                                    <Fingerprint className="w-6 h-6 shrink-0 opacity-80" />
                                    <div>
                                        <h5 className="font-bold text-sm mb-1 uppercase tracking-wider opacity-90">Critical Insight</h5>
                                        <p className="text-sm font-medium leading-snug">
                                            No existing paradigm simultaneously guarantees high imperceptibility, regeneration robustness, low cost, and formal security.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};  

const Conclusion = withSlide(ConclusionWithoutHOC);
    
export default Conclusion;