import React from "react";
import { withSlide } from "../../../HOC/withSlide";

import Methodology from "./components/Methodology";
import { styles } from "../../../style";
import { motion } from "motion/react";

const Slide3withOutHOC: React.FC = () => {

    return (
        <div className={`${styles.slideContainer} `}>
            <div className={`${styles.slideContent} `}>

                {/* Header */}
                <div className="mb-12 shrink-0">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-grotesk text-6xl font-bold mb-6 text-left text-slate-900 dark:text-white tracking-tight">
                            Methodology: Literature Selection Process
                        </h2>
                        <div className="w-32 h-2 bg-blue-600 dark:bg-blue-500 rounded-full" />
                    </motion.div>
                </div>
                <div className="flex-1 flex flex-col justify-center gap-12">
                    <Methodology /> 
                </div>
            </div>
            
        </div>
    );
};

const Slide3 = withSlide(Slide3withOutHOC);

export default Slide3;