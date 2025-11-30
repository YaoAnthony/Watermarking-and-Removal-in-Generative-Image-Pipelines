
import { withSlide } from "../../../HOC/withSlide";

import LDM_Watermark from "./components/LDM_Watermark";

const Slide8withoutHOC: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-start pt-24 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="w-full px-12 flex flex-col">

                {/* Header */}
                <div className="mb-12">
                    <h2 className="font-grotesk text-5xl font-bold mb-4 text-left text-black dark:text-white">
                        LDM Watermarking
                    </h2>
                    <div className="w-20 h-1 bg-blue-700 dark:bg-blue-500" />
                </div>
                
            </div>
            <div>
                <LDM_Watermark />
            </div>
        </div>
    );
};  

const Slide8 = withSlide(Slide8withoutHOC);
    
export default Slide8;