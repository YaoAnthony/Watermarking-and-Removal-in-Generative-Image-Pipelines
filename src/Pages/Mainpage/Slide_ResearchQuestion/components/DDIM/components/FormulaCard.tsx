import React, { useEffect, useRef } from 'react';

interface FormulaCardProps {
  title: string;
  latex: string;
  isActive: boolean;
  description?: string;
}

declare global {
  interface Window {
    MathJax: any;
  }
}

const FormulaCard: React.FC<FormulaCardProps> = ({ title, latex, isActive, description }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.MathJax && containerRef.current) {
      containerRef.current.innerHTML = `\\[${latex}\\]`;
      window.MathJax.typesetPromise?.([containerRef.current]).catch((err: any) => console.log(err));
    }
  }, [latex]);

  return (
    <div 
      className={`
        relative p-6 rounded-lg border transition-all duration-300 ease-in-out
        ${isActive 
            ? 'bg-white border-primary shadow-lg scale-[1.02] z-10 opacity-100' 
            : 'bg-slate-50 border-transparent opacity-60 scale-95 grayscale'}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-sm font-bold tracking-wide uppercase ${isActive ? 'text-primary' : 'text-slate-400'}`}>
            {title}
        </h3>
        {isActive && <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>}
      </div>
      
      <div className="min-h-[60px] flex items-center justify-center text-lg text-slate-800" ref={containerRef}>
        {/* MathJax renders here */}
        {`$$ ${latex} $$`}
      </div>

      {isActive && description && (
        <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
            {description}
        </div>
      )}
    </div>
  );
};

export default FormulaCard;