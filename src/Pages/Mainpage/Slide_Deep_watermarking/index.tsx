import React, { useState } from "react";
import { withSlide } from "../../../HOC/withSlide";
import DeepWatermarkingModal from "./components/DeepWatermarkingModal";
import NetworkDetailsModal, { NetworkDetailData } from "./components/NetworkDetailsModal";
import { Waves, Shield, Zap, Eye, Network, Brain, Box } from "lucide-react";
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const Deep_watermarkingWithoutHOC: React.FC = () => {
    const [deepWatermarkingModalOpen, setDeepWatermarkingModalOpen] = useState(false);
    const [networkDetailModalOpen, setNetworkDetailModalOpen] = useState(false);
    const [selectedNetworkData, setSelectedNetworkData] = useState<NetworkDetailData | null>(null);

    const openDeepWatermarkingModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDeepWatermarkingModalOpen(true);
    };

    const openNetworkDetail = (data: NetworkDetailData) => {
        setSelectedNetworkData(data);
        setNetworkDetailModalOpen(true);
    };

    const cnnData: NetworkDetailData = {
    title: "CNN Encoder-Decoder (Pixel-domain)",
    representatives: [
        "HiDDeN", "Distortion-agnostic DW", "TrustMark", "StegaStamp", "EditGuard", "UDH", "CIN (Partially)"
    ],
    pros: [
        "Simple structure, easy to implement, fast inference.",
        "Convolutions model local textures well → good for embedding residuals and resisting local noise.",
        "Many works follow a common 'standard template' (U-Net + skip connections, ResNet blocks)."
    ],
    cons: [
        "Limited ability to handle large semantic changes (e.g., strong edits, major style shifts).",
        "Resolution generalization often depends on interpolation or patch-based approaches.",
        "May overfit to known attacks and remain fragile to unseen distortions."
    ]
};

// GAN-style Networks
const ganData: NetworkDetailData = {
    title: "GAN-style Networks",
    representatives: [
        "Distortion-agnostic DW (Attack CNN)", "DiffusionShield (Deep Decoder + Robustness Regularization)", "Zhu's Adversarial-example Watermark"
    ],
    pros: [
        "GAN / adversarial training makes the encoded image look very natural, hard to detect visually or statistically.",
        "Attack networks learn worst-case distortions, improving robustness against unknown attacks."
    ],
    cons: [
        "Training is unstable and hard to reproduce.",
        "High model complexity with heavy tuning cost (especially for high-resolution images).",
        "Difficult to analyze security theoretically (vulnerable to adversarial removal)."
    ]
};

const dnnData: NetworkDetailData = {
    title: "DNN (Model IP Protection)",
    representatives: [
        "Margin-based (Classification Boundary)", "Trigger-set / Backdoor-style", "Parameter-space (Weights, BN, Low-rank)", "Structure-based (Lottery-ticket, Sparse Mask)"
    ],
    pros: [
        "Protects the model itself rather than a specific set of images.",
        "Supports black-box verification: trigger-set watermarks can be checked through model outputs.",
        "Compatible with standard training pipelines and common CNN / Transformer architectures.",
        "Once designed, the same mechanism works across different datasets or tasks."
    ],
    cons: [
        "Very sensitive to model modifications (fine-tuning, pruning, quantization).",
        "Backdoor-style methods are essentially backdoors, conflicting with security goals.",
        "Evidence is statistical, raising concerns about legal reliability.",
        "Vulnerable to overwriting attacks (multiple ownership claims).",
        "Lacks long-term evaluation in real industrial environments."
    ]
};


    return (
        <div className="w-full h-full flex flex-col items-center justify-start bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <DeepWatermarkingModal isOpen={deepWatermarkingModalOpen} onClose={() => setDeepWatermarkingModalOpen(false)} />
            <NetworkDetailsModal 
                isOpen={networkDetailModalOpen} 
                onClose={() => setNetworkDetailModalOpen(false)} 
                data={selectedNetworkData} 
            />
            
            <div className="max-w-7xl w-full flex flex-col h-[85%] px-12 pt-8">
                {/* Header */}
                <div className="mb-8 shrink-0">
                    <h2 className="font-grotesk text-5xl font-bold mb-4 text-left text-black dark:text-white">
                        Deep Watermarking
                    </h2>
                    <div className="w-24 h-1.5 bg-purple-600 dark:bg-purple-500 rounded-full" />
                </div>

                {/* Content Grid */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start overflow-y-auto">
                    
                    {/* Left Column: Core Concepts */}
                    <div className="flex flex-col gap-8">
                        
                        {/* Optimization Goal Card */}
                        <div className="p-6 bg-purple-50 dark:bg-zinc-800/50 border-l-4 border-purple-600 dark:border-purple-500 rounded-r-lg shadow-sm">
                            <h3 className="text-xl font-semibold mb-3 text-purple-800 dark:text-purple-400 flex items-center gap-2">
                                <Zap className="w-5 h-5" />
                                End-to-End Optimization
                            </h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                                Unlike traditional methods, deep learning approaches optimize robustness and imperceptibility simultaneously through a unified loss function.
                            </p>
                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-md border border-purple-100 dark:border-zinc-700 shadow-inner flex justify-center overflow-x-auto">
                                <div className="text-xl text-gray-800 dark:text-gray-200">
                                    <BlockMath math="\mathcal{L}_{total} = \lambda_1 \mathcal{L}_{image} + \lambda_2 \mathcal{L}_{message} + \lambda_3 \mathcal{L}_{attack}" />
                                </div>
                            </div>
                        </div>

                        {/* Robustness Strategy */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <span className="w-2 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm"></span>
                                Robustness Strategy
                            </h3>
                            <div className="space-y-4">
                                <div className="group bg-gray-50 dark:bg-zinc-800/30 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                                            <Shield size={20} />
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Adversarial Training</h4>
                                    </div>
                                    <p className="pl-11 text-gray-600 dark:text-gray-400 text-sm">
                                        Simulating attacks during training (Attack Network / GAN) to make the encoder "distortion-agnostic".
                                    </p>
                                    <div className="pl-11 mt-2 flex gap-2">
                                        <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-zinc-700 rounded text-gray-600 dark:text-gray-300">Distortion-agnostic DW</span>
                                        <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-zinc-700 rounded text-gray-600 dark:text-gray-300">TrustMark</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Architecture & Interactive */}
                    <div className="flex flex-col gap-8 h-full">
                        
                        {/* Common Architectures */}
                        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-gray-200 dark:border-zinc-700 shadow-lg flex-1 flex flex-col">
                            <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                <Network className="w-5 h-5" />
                                Common Architectures
                            </h3>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1">
                                <button 
                                    onClick={() => openNetworkDetail(cnnData)}
                                    className="border border-gray-100 dark:border-zinc-700 rounded-lg p-4 flex flex-col justify-center items-center text-center hover:shadow-md transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20 group"
                                >
                                    <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="font-bold text-xl text-blue-600 dark:text-blue-400 mb-1">CNN</span>
                                    <span className="text-xs text-gray-400">Pixel-domain Encoder-Decoder</span>
                                </button>

                                <button 
                                    onClick={() => openNetworkDetail(dnnData)}
                                    className="border border-gray-100 dark:border-zinc-700 rounded-lg p-4 flex flex-col justify-center items-center text-center hover:shadow-md transition-all hover:bg-green-50 dark:hover:bg-green-900/20 group"
                                >
                                    <Shield className="w-8 h-8 text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="font-bold text-xl text-green-600 dark:text-green-400 mb-1">DNN</span>
                                    <span className="text-xs text-gray-400">Model IP Protection</span>
                                </button>

                                <button 
                                    onClick={() => openNetworkDetail(ganData)}
                                    className="border border-gray-100 dark:border-zinc-700 rounded-lg p-4 flex flex-col justify-center items-center text-center hover:shadow-md transition-all hover:bg-purple-50 dark:hover:bg-purple-900/20 group"
                                >
                                    <Box className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="font-bold text-xl text-purple-600 dark:text-purple-400 mb-1">GAN</span>
                                    <span className="text-xs text-gray-400">Generative Adversarial Networks</span>
                                </button>

                                
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-700">
                                <button 
                                    onClick={openDeepWatermarkingModal}
                                    className="w-full group flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                                >
                                    <Waves className="w-6 h-6" />
                                    <span className="font-bold text-lg">Explore Deep Learning Model</span>
                                    <Eye className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-3">
                                    Click to view the interactive model architecture
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};  

const Deep_watermarking = withSlide(Deep_watermarkingWithoutHOC);
    
export default Deep_watermarking;