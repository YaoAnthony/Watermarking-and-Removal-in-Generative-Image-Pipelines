import React from 'react';
import type { TradeoffState } from '../types';

interface VisualizerProps {
  state: TradeoffState;
}

const Visualizer: React.FC<VisualizerProps> = ({ state }) => {
  // Normalize values 0-1
  const r = state.robustness / 100;
  const i = state.imperceptibility / 100;
  const c = state.capacity / 100;

  // Visual Logic:
  const noiseOpacity = (1 - i) * 0.8;
  const gridCells = Math.floor(c * 60) + 4; // 4 to 64 cells
  
  // Robustness Simulation (Blur Attack)
  // Higher robustness = stronger signal, less affected by attack visualization
  const detectedSignalStrength = r; 
  const attackBlurAmount = 2; 
  
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
         <h3 className="text-xl font-bold text-slate-800">Visual Simulation</h3>
         <div className="text-xs text-slate-400 font-mono bg-slate-50 px-2 py-1 rounded">LIVE PREVIEW</div>
      </div>
      
      <div className="flex-1 relative overflow-hidden rounded-xl bg-slate-900 group shadow-inner">
        
        {/* Base Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out"
          style={{ 
            backgroundImage: 'url("https://picsum.photos/600/400")',
            filter: `blur(${attackBlurAmount}px) grayscale(20%)`, 
            opacity: 0.8
          }}
        />

        {/* The Watermark Payload (Capacity Visualization) */}
        {/* Refined: Less neon, more subtle data blocks */}
        <div 
          className="absolute inset-0 grid gap-0.5 p-4 transition-all duration-500"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(${200 / Math.sqrt(gridCells)}px, 1fr))`,
            opacity: noiseOpacity + 0.1 // Visibility linked to noise/imperceptibility
          }}
        >
          {Array.from({ length: gridCells }).map((_, idx) => (
             <div 
               key={idx} 
               className="bg-indigo-400 rounded-[1px] transition-opacity duration-300"
               style={{ 
                 opacity: 0.2 + (c * 0.5), // Higher capacity = denser/stronger visual
               }}
             />
          ))}
        </div>

        {/* Robustness Indicator Overlay - Light Theme Glassmorphism */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-white/50 shadow-sm min-w-[180px]">
           <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-2">Signal Integrity</div>
           
           {/* Status Badge */}
           <div className="flex items-center gap-2 mb-3">
              <div 
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${detectedSignalStrength > 0.5 ? 'bg-emerald-500' : 'bg-rose-500'}`}
              ></div>
              <span className={`text-sm font-bold ${detectedSignalStrength > 0.5 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {detectedSignalStrength > 0.5 ? 'RECOVERABLE' : 'CORRUPTED'}
              </span>
           </div>

           {/* Signal Bar */}
           <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ease-out ${detectedSignalStrength > 0.5 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                style={{ width: `${detectedSignalStrength * 100}%` }}
              />
           </div>
        </div>

        {/* Imperceptibility Warning (Subtle) */}
        {noiseOpacity > 0.3 && (
          <div className="absolute bottom-4 left-4 bg-rose-50 text-rose-600 border border-rose-200 px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Artifacts Visible to Human Eye
          </div>
        )}
      </div>

      {/* Metrics Panel - Cleaner Look */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center p-3 rounded-xl bg-blue-50/50 border border-blue-100">
           <div className="text-blue-600 font-bold text-xl">{Math.round(state.robustness)}%</div>
           <div className="text-blue-900/60 text-[10px] font-bold uppercase tracking-wider mt-1">Robustness</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
           <div className="text-emerald-600 font-bold text-xl">{Math.round(state.imperceptibility)}%</div>
           <div className="text-emerald-900/60 text-[10px] font-bold uppercase tracking-wider mt-1">Imperceptibility</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-purple-50/50 border border-purple-100">
           <div className="text-purple-600 font-bold text-xl">{Math.round(state.capacity)}%</div>
           <div className="text-purple-900/60 text-[10px] font-bold uppercase tracking-wider mt-1">Capacity</div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;