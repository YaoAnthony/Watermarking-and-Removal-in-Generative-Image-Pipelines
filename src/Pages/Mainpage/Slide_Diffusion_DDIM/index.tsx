
import { withSlide } from "../../../HOC/withSlide";


const DDIMWithoutHOC: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-start pt-24 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="w-full px-12 flex flex-col">

                {/* Header */}
                <div className="mb-12">
                    <h2 className="font-grotesk text-5xl font-bold mb-4 text-left text-black dark:text-white">
                        DDIM
                    </h2>
                    <div className="w-20 h-1 bg-blue-700 dark:bg-blue-500" />
                </div>
                
            </div>
            <div>
                开始讲DDIM下，大家吧水印放在哪里
            </div>
        </div>
    );
};  

const DDIM = withSlide(DDIMWithoutHOC);
    
export default DDIM;