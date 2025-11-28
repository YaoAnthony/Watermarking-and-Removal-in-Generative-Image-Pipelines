import React from "react";
import { PresentationProvider } from "../../Provider/Slide/PresentationContext";
import { Deck } from "./Deck";
import Navbar from "../../Component/Navigation/Navbar";
const Mainpage: React.FC = () => (
  <PresentationProvider>
    <Navbar />
    <Deck />
  </PresentationProvider>
);

export default Mainpage;