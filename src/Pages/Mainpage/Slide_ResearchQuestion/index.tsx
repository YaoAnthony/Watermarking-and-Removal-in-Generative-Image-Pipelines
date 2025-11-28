import React from "react";
import { withSlide } from "../../../HOC/withSlide";
import { motion } from "framer-motion";
import { Split, Scale, ShieldAlert } from "lucide-react";

interface RQCardProps {
    number: string;
    title: string;
    question: string;
    icon: React.ElementType;
    delay: number;
}

const ResearchQuestionCard: React.FC<RQCardProps> = ({ number, title, question, icon: Icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
    className="flex gap-8 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-blue-200 dark:hover:border-blue-800 transition-colors group"
  >
    <div className="shrink-0">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-zinc-800 flex items-center justify-center text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            <Icon size={32} strokeWidth={1.5} />
        </div>
    </div>
    <div className="flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-3">
            <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-xs font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase border border-blue-100 dark:border-blue-900/30">
                RQ {number}
            </span>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                {title}
            </h3>
        </div>
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
            {question}
        </p>
    </div>
  </motion.div>
);

const Slide5withOutHOC: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-6xl w-full px-8 flex flex-col h-[85%]">

                {/* Header */}
                <div className="mb-12 shrink-0">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-grotesk text-6xl font-bold mb-6 text-left text-slate-900 dark:text-white tracking-tight">
                            Research Questions
                        </h2>
                        <div className="w-32 h-2 bg-blue-600 dark:bg-blue-500 rounded-full" />
                    </motion.div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-center gap-6">
                    <ResearchQuestionCard 
                        number="1"
                        title="Taxonomy"
                        question="How are current watermarking techniques for Diffusion Models classified? (e.g., Model-Tuned vs. Tuning-Free)"
                        icon={Split}
                        delay={0.2}
                    />
                    <ResearchQuestionCard 
                        number="2"
                        title="Performance Trade-offs"
                        question="How do Model-tuned and Tuning-free methods balance Imperceptibility, Robustness, and Efficiency?"
                        icon={Scale}
                        delay={0.4}
                    />
                    <ResearchQuestionCard 
                        number="3"
                        title="Core Vulnerabilities"
                        question="Under what specific attacks (e.g., Diff-Attack, VAE reconstruction) do existing techniques fail completely?"
                        icon={ShieldAlert}
                        delay={0.6}
                    />
                </div>

            </div>
        </div>
    );
};

const Slide5 = withSlide(Slide5withOutHOC);

export default Slide5;