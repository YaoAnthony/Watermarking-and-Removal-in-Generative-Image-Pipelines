import React from "react";
import { withSlide } from "../../../HOC/withSlide";
import { steganography } from "../../../assets";
import Silde1tool from "./Silde1tool";
import Typewriter from "../../../Component/Typewriter";

const InformationHiding = () => { 
    return (
        <div className="flex flex-col h-full">
            <div className="bg-gray-100 dark:bg-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center h-full border border-gray-200 dark:border-zinc-700 shadow-inner">
                <h3 className="text-xl font-semibold mb-6 self-start text-gray-800 dark:text-gray-200">
                    Context: Information Hiding
                </h3>
                
                <div className="relative w-full max-w-md">
                    <img 
                        src={steganography} 
                        alt="Steganography Diagram" 
                        className="w-full h-auto rounded-lg shadow-lg border border-gray-300 dark:border-zinc-600" 
                    />
                    <div className="absolute -bottom-8 -right-4 bg-white dark:bg-zinc-700 px-4 py-2 rounded-lg shadow-md border border-gray-200 dark:border-zinc-600 text-sm font-mono">
                        Fig 1.1: Steganography
                    </div>
                </div>

                <div className="mt-10 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg w-full">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                        <span className="font-bold">Distinction:</span> While Steganography aims to hide the <em>existence</em> of the message, Watermarking focuses on the <em>persistence</em> of the message (ownership) even if its existence is known.
                    </p>
                </div>
            </div>
        </div>
    )
}

const Question = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <Typewriter
                text="There is no perfect algorithm, only perfect compromises"
                delay={0}
            />
            <Typewriter
                text="the key is achieving a dynamic balance among capacity, imperceptibility, and robustness."
                delay={3}
            />
        </div>
    )
}

const Slide4withoutHOC: React.FC = () => {
    const [showConnection, setShowConnection] = React.useState(0);
    

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-7xl w-full flex flex-col h-[85%]">

                {showConnection === 1 ? (
                    <div className="w-full h-full relative rounded-xl shadow-2xl overflow-hidden">
                        <div className="h-full w-full bg-white dark:bg-zinc-900">
                             <Silde1tool onBack={() => setShowConnection(0)} onNext={() => setShowConnection(2)} />
                        </div>
                    </div>
                ) : 
                    showConnection === 2 ? (
                        <div className="w-full h-full relative flex justify-center items-center">
                            <Question />
                        </div>
                    ) : (
                    <>
                        {/* Header */}
                        <div className="mb-8 shrink-0">
                            <h2 className="font-grotesk text-5xl font-bold mb-4 text-left text-black dark:text-white">
                                Digital Watermarking
                            </h2>
                            <div className="w-24 h-1.5 bg-blue-700 dark:bg-blue-500 rounded-full" />
                        </div>

                        {/* Content Grid */}
                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start overflow-y-auto">
                            
                            {/* Left Column: Theoretical Framework */}
                            <div className="flex flex-col gap-8">
                                
                                {/* Definition Card */}
                                <div className="p-6 bg-gray-50 dark:bg-zinc-800/50 border-l-4 border-blue-700 dark:border-blue-500 rounded-r-lg shadow-sm">
                                    <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-400">Definition</h3>
                                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 italic">
                                        "The process of embedding information into a digital signal (audio, video, or image) in a way that is difficult to remove and can be used for copyright protection or integrity verification."
                                    </p>
                                </div>

                                {/* Key Characteristics */}
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                        <span className="w-2 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm"></span>
                                        Key Characteristics
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="group">
                                            <div className="flex items-baseline gap-3 mb-1">
                                                <span className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0"></span>
                                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Imperceptibility</h4>
                                            </div>
                                            <p className="pl-6 text-gray-600 dark:text-gray-400">
                                                The embedded watermark should be statistically invisible to the human eye (HVS) and not degrade the aesthetic quality of the host image.
                                            </p>
                                        </div>

                                        <div className="group">
                                            <div className="flex items-baseline gap-3 mb-1">
                                                <span className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0"></span>
                                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Robustness</h4>
                                            </div>
                                            <p className="pl-6 text-gray-600 dark:text-gray-400">
                                                Resilience against common signal processing attacks (compression, filtering, cropping) and geometric distortions.
                                            </p>
                                        </div>

                                        <div className="group">
                                            <div className="flex items-baseline gap-3 mb-1">
                                                <span className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0"></span>
                                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Capacity</h4>
                                            </div>
                                            <p className="pl-6 text-gray-600 dark:text-gray-400">
                                                The maximum amount of information (payload) that can be reliably embedded and recovered from the host signal.
                                            </p>
                                        </div>

                                        <div className="group pt-4">
                                            <button 
                                                onClick={() => setShowConnection(1)} 
                                                className="flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-md hover:shadow-lg font-medium"
                                            >
                                                <span>Explore Connections</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Visual Context */}
                            <InformationHiding />

                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const Slide4 = withSlide(Slide4withoutHOC);

export default Slide4;