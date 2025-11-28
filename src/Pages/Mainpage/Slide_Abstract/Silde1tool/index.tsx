import React, { useState } from 'react';
import TriangleSelector from './components/TriangleSelector';
import Visualizer from './components/Visualizer';
import InfoPanel from './components/InfoPanel';
import type { TradeoffState } from './types';

interface Silde1toolProps {
  onBack?: () => void;
  onNext?: () => void;
}

const Silde1tool: React.FC<Silde1toolProps> = ({ onBack, onNext }) => {
  const [tradeoff, setTradeoff] = useState<TradeoffState>({
    robustness: 33,
    imperceptibility: 33,
    capacity: 33,
  });

  return (
    <div className="min-h-screen p-4 md:p-5 max-w-7xl mx-auto flex flex-col gap-3 bg-slate-50 text-slate-900">
      
      {/* Header with Back Button */}
      {onBack && (
        <div className="flex justify-end gap-5">
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors text-sm font-medium shadow-sm flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Overview
          </button>
          <button 
            onClick={onNext}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors text-sm font-medium shadow-sm flex items-center gap-2"
          >
            Next
          </button>
        </div>
      )}

      {/* Main Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Controls & Info */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* 1. Triangle Controller */}
          <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col items-center justify-center">
             <h3 className="text-slate-800 font-bold w-full border-b border-slate-100 pb-2 text-sm uppercase tracking-wider">Strategy Balance</h3>
             <TriangleSelector onChange={setTradeoff} />
          </div>

          {/* 2. Concept Explanations */}
          <InfoPanel state={tradeoff} />
        </div>

        {/* Right Column: Visualization */}
        <div className="lg:col-span-8 min-h-[400px]">
          <Visualizer state={tradeoff} />
        </div>
      </main>

    </div>
  );
};

export default Silde1tool;