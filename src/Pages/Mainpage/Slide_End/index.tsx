import React from "react";
import { withSlide } from "../../../HOC/withSlide";
import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";

const SlideEndWithoutHOC: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-4xl w-full px-12 flex flex-col items-center text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="font-grotesk text-7xl font-bold mb-6 text-black dark:text-white tracking-tight">
                        Thanks for Watching
                    </h1>
                    <div className="w-32 h-1.5 bg-blue-600 dark:bg-blue-500 rounded-full mx-auto mb-12" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="space-y-8"
                >
                    <p className="text-2xl text-slate-600 dark:text-slate-400 font-light">
                        Any Questions?
                    </p>

                    {/* Optional: Contact / Social Links Placeholder */}
                    <div className="flex items-center justify-center gap-8 pt-8">
                        <div className="flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="p-4 rounded-full bg-slate-50 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300">
                                <Github size={32} />
                            </div>
                            <span className="text-sm font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
                        </div>

                        <div className="flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="p-4 rounded-full bg-slate-50 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300">
                                <Mail size={32} />
                            </div>
                            <span className="text-sm font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">Email</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

const SlideEnd = withSlide(SlideEndWithoutHOC);

export default SlideEnd;
