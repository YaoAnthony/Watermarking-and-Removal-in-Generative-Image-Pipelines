
import { withSlide } from "../../../HOC/withSlide";

import DiffusionProcess from "./components/DiffusionProcess";

const Slide7withoutHOC: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-start pt-24 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-6xl w-full px-12 flex flex-col">

                {/* Header */}
                <div className="mb-12">
                    <h2 className="font-grotesk text-5xl font-bold mb-4 text-left text-black dark:text-white">
                        Diffusion Models (DDPM)
                    </h2>
                    <div className="w-20 h-1 bg-blue-700 dark:bg-blue-500" />
                </div>
                
            </div>
            <div>
                <DiffusionProcess />
            </div>
        </div>
    );
};  

const Slide7 = withSlide(Slide7withoutHOC);
    
export default Slide7;