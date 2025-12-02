import React from "react";
import { withSlide } from "../../../HOC/withSlide";
    // Icons removed as requested for simple list
const ConclusionFutureDirectionsWithoutHOC: React.FC = () => {
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
                

            {/* Simple List Content */}
            <div className="flex-1 overflow-y-auto">
                <ul className="space-y-8 pl-4">
                    <li className="flex items-start gap-4">
                        <div className="mt-2 w-3 h-3 rounded-full bg-[#5F6F52] shrink-0" />
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Regeneration-Robust Watermarks
                            </h3>
                            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
                                Design schemes that remain verifiable after multi-step editing and re-generation pipelines, not just single JPEG / crop attacks.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-4">
                        <div className="mt-2 w-3 h-3 rounded-full bg-[#8D9F87] shrink-0" />
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Lifecycle-Aware Model Watermarks
                            </h3>
                            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
                                Understand how model-tuned watermarks survive fine-tuning, LoRA stacking, safety alignment, and distillation across the full model lifecycle.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-4">
                        <div className="mt-2 w-3 h-3 rounded-full bg-[#A98467] shrink-0" />
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Security and Removal-Resistance
                            </h3>
                            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
                                Develop formally grounded threat models and benchmarks for un-watermarking attacks (e.g., UnMarker, adversarial removal, model surgery).
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-4">
                        <div className="mt-2 w-3 h-3 rounded-full bg-[#6B705C] shrink-0" />
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Safe and Non-Backdoor Designs
                            </h3>
                            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
                                Move beyond backdoor-style behaviors to watermarking mechanisms that are compatible with security and alignment requirements.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-4">
                        <div className="mt-2 w-3 h-3 rounded-full bg-[#C7B198] shrink-0" />
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Standardized Benchmarks for Diffusion Watermarking
                            </h3>
                            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
                                Community-wide benchmarks specifying host models (SD1.5/2.1/SDXL), attack suites (editing, fine-tuning), and metrics (fidelity, AUC).
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            </div>
        </div>
    );
};  

const ConclusionFutureDirections = withSlide(ConclusionFutureDirectionsWithoutHOC);
    
export default ConclusionFutureDirections;
