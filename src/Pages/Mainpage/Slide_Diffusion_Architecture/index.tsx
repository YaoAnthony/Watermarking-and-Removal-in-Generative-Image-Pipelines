import React from "react";
import { withSlide } from "../../../HOC/withSlide";
import { Layers, Zap, GitBranch, Activity, Database, ArrowRight } from "lucide-react";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const Diffusion_TypeWithoutHOC: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-start bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-7xl w-full flex flex-col h-[85%] px-12 pt-8">
                {/* Header */}
                <div className="mb-8 shrink-0">
                    <h2 className="font-grotesk text-5xl font-bold mb-4 text-left text-black dark:text-white">
                        Diffusion Architectures
                    </h2>
                    <div className="w-24 h-1.5 bg-blue-600 dark:bg-blue-500 rounded-full" />
                </div>

                {/* Content Grid - 3 Columns */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start overflow-y-auto">
                    
                    {/* Column 1: DDPM */}
                    <div className="flex flex-col h-full bg-blue-50 dark:bg-zinc-800/30 rounded-xl border border-blue-100 dark:border-zinc-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-6 border-b border-blue-100 dark:border-zinc-700 bg-blue-100/50 dark:bg-zinc-800/50">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-600 rounded-lg text-white">
                                    <Activity size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">DDPM</h3>
                            </div>
                            <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">Probabilistic Diffusion</p>
                        </div>
                        
                        <div className="p-6 flex-1 flex flex-col gap-6">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                                    <GitBranch className="w-4 h-4 text-blue-500" />
                                    Key Features
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-blue-400 shrink-0" />
                                        High sampling steps (100s ~ 1000s)
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-blue-400 shrink-0" />
                                        Theoretically equivalent to Score Matching
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-blue-100 dark:border-zinc-700 shadow-inner">
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm uppercase tracking-wider">Watermarking Strategy</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                    Manipulating the noisy trajectory <InlineMath math="\{x_t\}" />:
                                </p>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <span className="font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-1.5 rounded">1</span>
                                        Modify Initial Noise <InlineMath math="x_T" />
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <span className="font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-1.5 rounded">2</span>
                                        Modify Intermediate <InlineMath math="x_t" />
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <span className="font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-1.5 rounded">3</span>
                                        Modify Network <InlineMath math="\epsilon_\theta" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: DDIM */}
                    <div className="flex flex-col h-full bg-purple-50 dark:bg-zinc-800/30 rounded-xl border border-purple-100 dark:border-zinc-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-6 border-b border-purple-100 dark:border-zinc-700 bg-purple-100/50 dark:bg-zinc-800/50">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-600 rounded-lg text-white">
                                    <Zap size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">DDIM</h3>
                            </div>
                            <p className="text-sm text-purple-800 dark:text-purple-300 font-medium">Deterministic Sampling</p>
                        </div>
                        
                        <div className="p-6 flex-1 flex flex-col gap-6">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-purple-500" />
                                    Key Features
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-purple-400 shrink-0" />
                                        Accelerated sampling (fewer steps)
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-purple-400 shrink-0" />
                                        Deterministic ODE-based trajectory
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-purple-100 dark:border-zinc-700 shadow-inner">
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm uppercase tracking-wider">Watermarking Strategy</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                    Leveraging the deterministic mapping:
                                </p>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <span className="font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-1.5 rounded">1</span>
                                        Inversion-based Watermarking
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <span className="font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-1.5 rounded">2</span>
                                        Optimization on Trajectory
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: LDM */}
                    <div className="flex flex-col h-full bg-emerald-50 dark:bg-zinc-800/30 rounded-xl border border-emerald-100 dark:border-zinc-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-6 border-b border-emerald-100 dark:border-zinc-700 bg-emerald-100/50 dark:bg-zinc-800/50">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-emerald-600 rounded-lg text-white">
                                    <Layers size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">LDM</h3>
                            </div>
                            <p className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">Latent Diffusion Models</p>
                        </div>
                        
                        <div className="p-6 flex-1 flex flex-col gap-6">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                                    <Database className="w-4 h-4 text-emerald-500" />
                                    Key Features
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-emerald-400 shrink-0" />
                                        Operates in VAE Latent Space
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-emerald-400 shrink-0" />
                                        Efficient high-res synthesis
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-emerald-100 dark:border-zinc-700 shadow-inner">
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm uppercase tracking-wider">Watermarking Strategy</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                    Embedding in various components:
                                </p>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <span className="font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 rounded">1</span>
                                        VAE Latent Space <InlineMath math="z_0" />
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <span className="font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 rounded">2</span>
                                        UNet Weights / Attention
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <span className="font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 rounded">3</span>
                                        Decoder Initial Noise
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};  

const Diffusion_Type = withSlide(Diffusion_TypeWithoutHOC);
    
export default Diffusion_Type;