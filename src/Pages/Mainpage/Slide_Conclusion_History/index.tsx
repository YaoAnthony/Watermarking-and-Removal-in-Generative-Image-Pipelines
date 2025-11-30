import React from "react";
import { withSlide } from "../../../HOC/withSlide";
import { 
    History, 
    ArrowRight, 
    Zap, 
    Database, 
    Layers, 
    ShieldCheck, 
    AlertTriangle 
} from "lucide-react";

const ConclusionHistoryWithoutHOC: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-start pt-12 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-hidden">
            <div className="w-full px-12 flex flex-col h-full max-w-[1600px]">

                {/* Header */}
                <div className="mb-8 shrink-0">
                    <h2 className="font-grotesk text-4xl font-bold mb-3 text-left text-black dark:text-white tracking-tight flex items-center gap-3">
                        Big Picture – Where the Field Is Moving
                    </h2>
                    <h3 className="text-xl text-gray-500 dark:text-gray-400 font-normal mb-2">
                        From Deep Watermarking to Diffusion-Native Watermarking
                    </h3>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
                </div>
                
                {/* Main Grid Content */}
                <div className="flex-1 grid grid-cols-12 gap-8 pb-8 overflow-y-auto min-h-0">
                    
                    {/* Left Column: Evolution (7 cols) */}
                    <div className="col-span-7 flex flex-col gap-6">
                        <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-zinc-700">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-700 dark:text-purple-400">
                                <History size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Evolution</h3>
                        </div>

                        <div className="space-y-6 relative pl-4 border-l-2 border-gray-200 dark:border-zinc-700 ml-3">
                            
                            {/* Stage 1 */}
                            <div className="relative">
                                <span className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-gray-400 dark:bg-zinc-600 border-4 border-white dark:border-zinc-900" />
                                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                                    Traditional <ArrowRight size={16} /> Deep Watermarking
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex gap-2 items-start">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0" />
                                        <span>Classical LSB/DCT/DWT methods.</span>
                                    </li>
                                    <li className="flex gap-2 items-start">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0" />
                                        <span>
                                            Deep encoder/decoder models (HiDDeN, TrustMark, UDH, etc.) improved robustness against <span className="font-semibold text-purple-600 dark:text-purple-400">signal-level attacks</span> (JPEG, crop, noise).
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* Stage 2 */}
                            <div className="relative">
                                <span className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-zinc-900" />
                                <h4 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
                                    Deep <ArrowRight size={16} /> Diffusion-Aware
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex gap-2 items-start">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                                        <span>
                                            With DDPM / DDIM / LDM, simply watermarking images is not enough: attackers can <span className="font-semibold text-red-500">re-generate</span> or <span className="font-semibold text-red-500">fine-tune</span> diffusion models.
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* Stage 3 */}
                            <div className="relative">
                                <span className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-green-500 border-4 border-white dark:border-zinc-900" />
                                <h4 className="text-lg font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                                    Diffusion-Native Era
                                </h4>
                                <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-100 dark:border-green-900/30">
                                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                        Recent work targets the <span className="text-green-600 dark:text-green-400">generative pipeline itself</span>:
                                    </p>
                                    <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                        <li className="flex gap-2 items-start">
                                            <Database size={16} className="text-green-600 mt-0.5 shrink-0" />
                                            <span>
                                                <span className="font-bold text-gray-800 dark:text-gray-200">Model-Tuned:</span> modify UNet / decoder / LoRA (ProMark, Stable Signature, AquaLoRA, SleeperMark, WOUAF).
                                            </span>
                                        </li>
                                        <li className="flex gap-2 items-start">
                                            <Zap size={16} className="text-green-600 mt-0.5 shrink-0" />
                                            <span>
                                                <span className="font-bold text-gray-800 dark:text-gray-200">Tuning-Free:</span> modify initial noise / latent trajectories / sampling rules (Tree-Ring, PRC, SEAL, LaWa, TAG-WM, ZoDiac).
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Column: Comparison Table (5 cols) */}
                    <div className="col-span-5 flex flex-col gap-6">
                        <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-zinc-700">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-700 dark:text-blue-400">
                                <Layers size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Comparison</h3>
                        </div>

                        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 shadow-sm overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 dark:bg-zinc-900/50 border-b border-gray-200 dark:border-zinc-700">
                                    <tr>
                                        <th className="p-3 font-semibold text-gray-600 dark:text-gray-400">Paradigm</th>
                                        <th className="p-3 font-semibold text-gray-600 dark:text-gray-400">Typical Strength</th>
                                        <th className="p-3 font-semibold text-gray-600 dark:text-gray-400">Typical Weakness</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-zinc-700">
                                    <tr className="hover:bg-gray-50 dark:hover:bg-zinc-700/30 transition-colors">
                                        <td className="p-3 font-medium text-blue-700 dark:text-blue-400">
                                            Model-Tuned
                                            <div className="text-xs text-gray-400 font-normal mt-0.5">Diffusion / DNN</div>
                                        </td>
                                        <td className="p-3 text-green-600 dark:text-green-400">
                                            <div className="flex items-center gap-1">
                                                <ShieldCheck size={14} /> Strong coupling, high capacity
                                            </div>
                                        </td>
                                        <td className="p-3 text-red-500 dark:text-red-400">
                                            <div className="flex items-center gap-1">
                                                <AlertTriangle size={14} /> Fragile to model updates, high cost
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-zinc-700/30 transition-colors">
                                        <td className="p-3 font-medium text-purple-700 dark:text-purple-400">
                                            Deep WM
                                            <div className="text-xs text-gray-400 font-normal mt-0.5">Images / Features</div>
                                        </td>
                                        <td className="p-3 text-green-600 dark:text-green-400">
                                            <div className="flex items-center gap-1">
                                                <ShieldCheck size={14} /> End-to-end optimization
                                            </div>
                                        </td>
                                        <td className="p-3 text-red-500 dark:text-red-400">
                                            <div className="flex items-center gap-1">
                                                <AlertTriangle size={14} /> Heavy training, weak vs regeneration
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-zinc-700/30 transition-colors">
                                        <td className="p-3 font-medium text-orange-700 dark:text-orange-400">
                                            Tuning-Free
                                            <div className="text-xs text-gray-400 font-normal mt-0.5">Diffusion Models</div>
                                        </td>
                                        <td className="p-3 text-green-600 dark:text-green-400">
                                            <div className="flex items-center gap-1">
                                                <ShieldCheck size={14} /> No training, easy deploy
                                            </div>
                                        </td>
                                        <td className="p-3 text-red-500 dark:text-red-400">
                                            <div className="flex items-center gap-1">
                                                <AlertTriangle size={14} /> Lower capacity
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30 text-xs text-gray-600 dark:text-gray-300 italic">
                            "With DDPM / DDIM / LDM, simply watermarking images is not enough: attackers can re-generate or fine-tune diffusion models."
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};  

const ConclusionHistory = withSlide(ConclusionHistoryWithoutHOC);
    
export default ConclusionHistory;
