import React from "react";
import { withSlide } from "../../../HOC/withSlide";
import { motion } from "framer-motion";
import { Settings2, BrainCircuit, Zap } from "lucide-react";

const TopicWithoutHOC: React.FC = () => {
    const cards = [
        {
            title: "Model-Tuned",
            icon: Settings2,
            description: "Modifies the host model's parameters through training, fine-tuning, LoRA, or weight modulation.",
            subtext: "Directly updates generative model weights.",
            color: "blue"
        },
        {
            title: "Deep Watermarking",
            icon: BrainCircuit,
            description: "Trains a separate watermarking network (Encoder/Decoder) but does not modify the host model.",
            subtext: "Plug-and-play neural networks.",
            color: "purple"
        },
        {
            title: "Tuning-Free",
            icon: Zap,
            description: "Embeds watermarks without training any new networks and without modifying host model parameters.",
            subtext: "Zero-training, inference-time embedding.",
            color: "emerald"
        }
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-start pt-24 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-7xl w-full px-12 flex flex-col h-full">

                {/* Header */}
                <div className="mb-16 shrink-0">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="font-grotesk text-5xl font-bold mb-4 text-left text-black dark:text-white">
                            Watermarking Paradigms
                        </h2>
                        <div className="w-20 h-1 bg-blue-700 dark:bg-blue-500" />
                    </motion.div>
                </div>
                
                {/* Cards Container */}
                <div className="grid grid-cols-3 gap-8 items-start">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className={`h-full p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 hover:border-${card.color}-300 dark:hover:border-${card.color}-700 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg`}
                        >
                            <div className={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center bg-white dark:bg-zinc-800 text-${card.color}-600 dark:text-${card.color}-400 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                <card.icon size={32} />
                            </div>
                            
                            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                                {card.title}
                            </h3>
                            
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                {card.description}
                            </p>

                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-${card.color}-100 text-${card.color}-700 dark:bg-${card.color}-900/30 dark:text-${card.color}-300`}>
                                {card.subtext}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};  

const Topic = withSlide(TopicWithoutHOC);
    
export default Topic;