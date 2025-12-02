import React from 'react';
import type { TradeoffState } from '../types';
// import { generateTradeoffExplanation } from '../services/geminiService';

interface InfoPanelProps {
  state: TradeoffState;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ state }) => {

  // Determine dominant trait for static info
  const getDominant = () => {
    if (state.robustness >= state.imperceptibility && state.robustness >= state.capacity) return 'robustness';
    if (state.capacity >= state.imperceptibility && state.capacity >= state.robustness) return 'capacity';
    return 'imperceptibility';
  };

  const dominant = getDominant();

  const staticContent = {
    robustness: {
      title: "Focus: Robustness",
      subtitle: "The Shield",
      color: "text-[#5F6F52]",
      desc: "Robustness is the watermark's ability to survive attacks. High robustness is critical for copyright protection where adversaries may try to remove the mark via compression, cropping, or filtering.",
      tradeoff: "High robustness often requires stronger signal modifications, which can reduce imperceptibility or limit the amount of data (capacity) available.",
    },
    imperceptibility: {
      title: "Focus: Imperceptibility",
      subtitle: "The Ghost",
      color: "text-[#8D9F87]",
      desc: "Imperceptibility (Fidelity) ensures the media looks or sounds identical to the original. The distortion should be invisible to human senses.",
      tradeoff: "To be truly invisible, the watermark signal must be weak. This makes it vulnerable to attacks (low robustness) and limits the data space (low capacity).",
    },
    capacity: {
      title: "Focus: Embedded Capacity",
      subtitle: "The Payload",
      color: "text-[#A98467]",
      desc: "Capacity is the volume of information (bits) hidden within the media. High capacity is essential for detailed metadata, subtitles, or transaction IDs.",
      tradeoff: "Hiding more bits requires changing more pixels/samples. This increases the risk of visible artifacts (low imperceptibility) and makes the signal harder to defend (low robustness).",
    }
  };

  const content = staticContent[dominant];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] flex flex-col gap-5 min-h-[350px]">
       <div>
         <div className="flex items-baseline justify-between mb-2">
            <h2 className={`text-xl font-bold ${content.color}`}>
                {content.title}
            </h2>
         </div>
         
         <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {content.desc}
         </p>
         
         <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h4 className="text-slate-800 font-bold text-xs uppercase mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                The Trade-off
            </h4>
            <p className="text-slate-500 text-sm italic leading-relaxed">{content.tradeoff}</p>
         </div>
       </div>
    </div>
  );
};

export default InfoPanel;