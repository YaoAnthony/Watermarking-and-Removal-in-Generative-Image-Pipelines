import React, { useEffect } from "react";
import { usePresentation } from "../../Provider/Slide/PresentationContext";
import Title from "./Slide_Title";
import Abstract from "./Slide_Abstract";
import Introduction from "./Slide_Introduction";
import Methodology from "./Slide_Methodology";
import ResearchQuestion from "./Slide_ResearchQuestion";
import Slide6 from "./Slide6";

const slides = [
  Title, 
  Abstract,
  Introduction,
  ResearchQuestion, 
  Methodology, 
  Slide6
];

export const Deck: React.FC = () => {
  const { currentSlide, setTotalSlides } = usePresentation();

  useEffect(() => {
    setTotalSlides(slides.length);
  }, [setTotalSlides]);

  const SlideComponent = slides[currentSlide];

  return <SlideComponent />;
};