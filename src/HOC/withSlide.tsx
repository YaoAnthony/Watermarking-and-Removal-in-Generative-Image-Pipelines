import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePresentation } from "../Provider/Slide/PresentationContext";


import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
const slideVariants = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
};

export function withSlide(SlideComponent: React.FC) {
  return function SlideWrapper(props: any) {
    const { currentSlide, setCurrentSlide, totalSlides } = usePresentation();
    const theme = useSelector((state: RootState) => state.theme.mode); // expects 'light' or 'dark'

    useEffect(() => {
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight" && currentSlide < totalSlides - 1) setCurrentSlide(currentSlide + 1);
        if (e.key === "ArrowLeft" && currentSlide > 0) setCurrentSlide(currentSlide - 1);
      };
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }, [currentSlide, totalSlides, setCurrentSlide]);

    // Theme-based classes for controls
    const buttonBg = theme === "light"
      ? "bg-gray-200/50 hover:bg-gray-300/80 text-gray-900"
      : "bg-white/10 hover:bg-white/20 text-white";
    const progressBg = theme === "light" ? "bg-gray-300/50" : "bg-white/10";
    const progressText = theme === "light" ? "text-gray-700/80" : "text-white/80";

    return (
      <div className="relative w-screen h-screen overflow-hidden bg-white dark:bg-zinc-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <SlideComponent {...props} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute bottom-8 right-8 flex gap-4 z-50">
          <button
            className={`rounded-full ${buttonBg} p-3 shadow-lg backdrop-blur-md transition disabled:opacity-0`}
            onClick={() => setCurrentSlide(currentSlide - 1)}
            disabled={currentSlide === 0}
            aria-label="Previous Slide"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            className={`rounded-full ${buttonBg} p-3 shadow-lg backdrop-blur-md transition disabled:opacity-0`}
            onClick={() => setCurrentSlide(currentSlide + 1)}
            disabled={currentSlide === totalSlides - 1}
            aria-label="Next Slide"
          >
            <ArrowRight size={24} />
          </button>
        </div>

        {/* Progress Bar / Page Number */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center w-40 z-50">
          <div className={`w-full h-1 ${progressBg} rounded-full mb-1`}>
            <div
              className="h-1 bg-blue-500 rounded-full transition-all"
              style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            />
          </div>
          <span className={`text-xs ${progressText}`}>{currentSlide + 1} / {totalSlides}</span>
        </div>
      </div>
    );
  };
}