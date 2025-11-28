import React from 'react';
import { NoiseParams } from '../types';
import { AlertTriangle } from 'lucide-react';

interface NoiseStageProps {
  noiseParams: NoiseParams;
  setNoiseParams: React.Dispatch<React.SetStateAction<NoiseParams>>;
  noisyImage: string | null;
}

export const NoiseStage: React.FC<NoiseStageProps> = ({ noiseParams, setNoiseParams, noisyImage }) => {
  
  const handleChange = (key: keyof NoiseParams, value: number) => {
    setNoiseParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Noisy Image Preview */}
      <div className="relative w-full aspect-square bg-slate-900 rounded-lg overflow-hidden border border-slate-200 mb-4 shadow-inner">
        {noisyImage ? (
            <img src={noisyImage} alt="Attacked" className="w-full h-full object-cover" />
        ) : (
            <div className="flex items-center justify-center w-full h-full text-slate-600 text-xs">No Signal</div>
        )}
        <div className="absolute top-2 right-2 flex items-center space-x-1 bg-red-500/90 text-white text-[10px] px-2 py-1 rounded shadow-sm">
            <AlertTriangle size={10} />
            <span>Attack Layer</span>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-3 mt-auto">
        {/* Gaussian Noise */}
        <div>
            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mb-1">
                <span>Gaussian Noise</span>
                <span className="text-red-500">{noiseParams.gaussian}%</span>
            </div>
            <input 
                type="range" min="0" max="100" value={noiseParams.gaussian}
                onChange={(e) => handleChange('gaussian', parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
        </div>

        {/* Blur */}
        <div>
            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mb-1">
                <span>Gaussian Blur</span>
                <span className="text-orange-500">{noiseParams.blur}px</span>
            </div>
            <input 
                type="range" min="0" max="10" step="0.5" value={noiseParams.blur}
                onChange={(e) => handleChange('blur', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
        </div>

        {/* Dropout */}
        <div>
            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mb-1">
                <span>Dropout / Crop</span>
                <span className="text-yellow-600">{noiseParams.dropout}%</span>
            </div>
            <input 
                type="range" min="0" max="80" value={noiseParams.dropout}
                onChange={(e) => handleChange('dropout', parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
            />
        </div>

        <button 
            onClick={() => setNoiseParams({ gaussian: 0, blur: 0, dropout: 0 })}
            className="w-full py-1 text-xs text-slate-400 hover:text-slate-600 border border-slate-200 rounded hover:bg-slate-50 transition-colors"
        >
            Reset Attacks
        </button>
      </div>
    </div>
  );
};