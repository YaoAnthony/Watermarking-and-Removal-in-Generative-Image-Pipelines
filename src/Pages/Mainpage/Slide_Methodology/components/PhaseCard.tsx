import React from 'react';
import { ProcessPhase } from '../types';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface PhaseCardProps {
  phase: ProcessPhase;
  isLast: boolean;
}

export const PhaseCard: React.FC<PhaseCardProps> = ({ phase, isLast }) => {
  return (
    <div className="flex flex-col h-full relative group">
      {/* Header */}
      <div className="mb-6 relative">
        <div className="text-[#5F6F52] font-bold text-sm tracking-widest uppercase mb-1">
          Phase 0{phase.id}
        </div>
        <h3 className="text-xl font-bold text-slate-900 leading-tight">
          {phase.title}
        </h3>
        <p className="text-slate-500 text-sm mt-1">{phase.subtitle}</p>
      </div>

      {/* Content Container */}
      <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5F6F52] to-[#8D9F87] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

        <div className="space-y-6">
          {phase.items.map((item, idx) => (
            <div key={idx} className="relative">
              {idx > 0 && (
                <div className="absolute -top-4 left-3 text-slate-300">
                  <ChevronDown size={14} />
                </div>
              )}
              
              <div className={`p-3 rounded-lg ${item.highlight ? 'bg-white border border-[#8D9F87]/30 shadow-sm' : ''}`}>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                  {item.label}
                </div>
                <div className="flex items-baseline gap-2">
                   {/* Logic to show value transition if subValue exists (e.g., 72 -> 38) */}
                   {item.subValue ? (
                     <div className="flex items-center gap-2 font-mono">
                        <span className="text-slate-400 line-through text-sm">{item.value}</span>
                        <ArrowRight size={14} className="text-[#5F6F52]" />
                        <span className="text-lg font-bold text-slate-900">{item.subValue}</span>
                     </div>
                   ) : (
                      <span className="text-lg font-bold text-slate-900">{item.value}</span>
                   )}
                </div>
              </div>
            </div>
          ))}
          
          {phase.description && (
             <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-600 italic">
               {phase.description}
             </div>
          )}
        </div>
      </div>

      {/* Connector Arrow (Hidden on last item, visible on desktop) */}
      {!isLast && (
        <div className="hidden md:flex absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 text-slate-300">
          <ArrowRight size={24} />
        </div>
      )}
    </div>
  );
};
