import React from "react";
import { withSlide } from "../../../HOC/withSlide";

import Methodology from "./components/Methodology";

const Slide3withOutHOC: React.FC = () => {

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-6xl w-full px-12 flex flex-col">

                {/* Header */}
                <div className="mb-12">
                    <h2 className="font-grotesk text-5xl font-bold mb-4 text-left text-black dark:text-white">
                        Methodology: Literature Selection Process
                    </h2>
                    <div className="w-20 h-1 bg-blue-700 dark:bg-blue-500" />
                </div>

                
            </div>
            <Methodology /> 
        </div>
    );
};

const Slide3 = withSlide(Slide3withOutHOC);

export default Slide3;