import React from "react";
import { withSlide } from "../../../HOC/withSlide";

const Slide1WithOutHOC: React.FC = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <div className="max-w-4xl px-12 w-full">

      {/* Top Decoration Line (Optional, very subtle) */}
      <div className="w-20 h-1 bg-blue-700 dark:bg-blue-500 mb-12" />

      {/* Main Title */}
      <h1 className="font-grotesk text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight text-left">
        Watermarking and Removal <br />
        in Generative Image Pipelines
      </h1>

      {/* Subtitle */}
      <p className="text-2xl text-gray-600 dark:text-gray-400 font-normal mb-16 text-left">
        A Systematic Literature Review
      </p>

      {/* Author / Info */}
      <div className="flex flex-col items-start gap-1 text-lg text-gray-700 dark:text-gray-300">
        <p className="font-semibold">Zhifeng (Anthony) Yao</p>
        <p className="text-base text-gray-500 dark:text-gray-500">Luarentain University</p>
        <p className="text-base text-gray-500 dark:text-gray-500">Research Presentation • 2025</p>
      </div>

    </div>
  </div>
);

const Slide1 = withSlide(Slide1WithOutHOC);

export default Slide1;