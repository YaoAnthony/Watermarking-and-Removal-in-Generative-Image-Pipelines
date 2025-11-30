import React, { useEffect } from "react";
import { usePresentation } from "../../Provider/Slide/PresentationContext";
import Title from "./Slide_Title";
import Abstract from "./Slide_Abstract";
import Introduction from "./Slide_Introduction";
import Methodology from "./Slide_Methodology";
import Topic from "./Slide_Topic";

import DataShown from "./Slide_Data_Shown";

import Deep_watermarking from "./Slide_Deep_watermarking";
import ResearchQuestion from "./Slide_ResearchQuestion";


import Intro_DiffusionModel from "./Slide_DM_ForwardProcess";
import Intro_DiffusionModel2 from "./Slide_DM_ReverseProcess";
import Diffusion_Architecture from "./Slide_Diffusion_Architecture";
import DDIM from "./Slide_Diffusion_DDIM";
import LDM_Watermark_pipeline from "./Slide_LDM_Watermark_pipeline";
import LDM_Concept from "./Slide_LDM_Concept";
import Conclusion from "./Slide_Conclusion_AnswerQA";
import Conclusion_History from "./Slide_Conclusion_History";
import Conclusion_FutureDirection from "./Slide_Conclusion_FutureDirections";
import SlideEnd from "./Slide_End";

const slides = [
  Title, 
  Abstract,
  Introduction,

  ResearchQuestion, 
  Methodology, 
  Topic,
  DataShown,
  
  Deep_watermarking,
  Diffusion_Architecture,
  Intro_DiffusionModel,
  Intro_DiffusionModel2,

  DDIM,
  LDM_Concept,
  LDM_Watermark_pipeline,
  Conclusion,
  Conclusion_History,
  Conclusion_FutureDirection,
  SlideEnd,
];

export const Deck: React.FC = () => {
  const { currentSlide, setTotalSlides } = usePresentation();

  useEffect(() => {
    setTotalSlides(slides.length);
  }, [setTotalSlides]);

  const SlideComponent = slides[currentSlide];

  return <SlideComponent />;
};