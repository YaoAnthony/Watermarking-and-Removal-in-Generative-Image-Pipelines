import React, { createContext, useContext, useState } from "react";

interface PresentationContextProps {
    currentSlide: number;
    setCurrentSlide: (idx: number) => void;
    totalSlides: number;
    setTotalSlides: (n: number) => void;
}

const PresentationContext = createContext<PresentationContextProps | undefined>(undefined);

export const usePresentation = () => {
    const ctx = useContext(PresentationContext);
    if (!ctx) throw new Error("usePresentation must be used within PresentationProvider");
    return ctx;
};

export const PresentationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);

    return (
        <PresentationContext.Provider value={{ currentSlide, setCurrentSlide, totalSlides, setTotalSlides }}>
        {children}
        </PresentationContext.Provider>
    );
};