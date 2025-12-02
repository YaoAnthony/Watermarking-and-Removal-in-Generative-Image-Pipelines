import React from 'react';
import { Layers, Zap, Cpu } from 'lucide-react';

interface EncoderStageProps {
  processing: boolean;
  residualMap: string | null;
  strength: number;
  setStrength: (val: number) => void;
}

export const EncoderStage: React.FC<EncoderStageProps> = ({ processing, residualMap, strength, setStrength }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Network Visualization */}
      <div className="flex-none h-32 bg-slate-50 rounded-xl p-4 relative overflow-hidden mb-5 border border-slate-100 group">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
        </div>
        
        <div className="relative z-10 flex items-center justify-between h-full px-2">
            {/* Input Conv */}
            <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-14 bg-white border-2 border-[#8D9F87]/30 rounded-lg shadow-sm flex items-center justify-center group-hover:border-[#8D9F87] transition-colors">
                    <Layers size={16} className="text-[#8D9F87]" />
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Conv2D</span>
            </div>
            
            {/* Connection */}
            <div className="flex-1 h-[2px] bg-slate-200 mx-2 relative overflow-hidden">
                {processing && <div className="absolute inset-0 bg-[#5F6F52] animate-progress"></div>}
            </div>

            {/* Deep Block */}
            <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 bg-[#A98467]/10 border-2 border-[#A98467]/30 rounded-lg shadow-sm flex items-center justify-center">
                    <Cpu size={16} className="text-[#A98467]" />
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">ResNet</span>
            </div>

            {/* Connection */}
            <div className="flex-1 h-[2px] bg-slate-200 mx-2 relative overflow-hidden">
                 {processing && <div className="absolute inset-0 bg-[#5F6F52] animate-progress" style={{animationDelay: '0.2s'}}></div>}
            </div>

            {/* Output Conv */}
            <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-14 bg-white border-2 border-[#5F6F52]/30 rounded-lg shadow-sm flex items-center justify-center group-hover:border-[#5F6F52] transition-colors">
                     <Layers size={16} className="text-[#5F6F52]" />
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">ConvTr</span>
            </div>
        </div>
      </div>

      {/* Residual Map Preview */}
      <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-200 mb-5 flex items-center justify-center group/map shadow-inner">
        {residualMap ? (
            <>
                <img src={residualMap} alt="Residual Map" className="w-full h-full object-cover opacity-90 transition-opacity group-hover/map:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/map:opacity-100 transition-opacity duration-300"></div>
            </>
        ) : (
            <span className="text-[10px] text-slate-500 font-medium">Processing...</span>
        )}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[9px] font-mono text-white border border-white/10 shadow-lg">
            Residual Map ($\Delta$)
        </div>
      </div>

      {/* Strength Control */}
      <div className="mt-auto bg-slate-50 rounded-xl p-4 border border-slate-100">
        <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5 uppercase">
                <Zap size={12} className="text-amber-500" /> Embedding Strength ($\alpha$)
            </label>
            <span className="text-xs font-mono font-bold text-[#5F6F52] bg-[#5F6F52]/10 px-2 py-0.5 rounded border border-[#5F6F52]/20">
                {strength.toFixed(1)}
            </span>
        </div>
        <input 
            type="range" 
            min="0.1" 
            max="2.0" 
            step="0.1" 
            value={strength}
            onChange={(e) => setStrength(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#5F6F52] hover:accent-[#5F6F52]"
        />
        <div className="flex justify-between mt-1 text-[9px] text-slate-400 font-medium">
            <span>Invisible</span>
            <span>Robust</span>
        </div>
      </div>
      
      <style>{`
        @keyframes progress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .animate-progress {
            animation: progress 1s infinite linear;
        }
      `}</style>
    </div>
  );
};