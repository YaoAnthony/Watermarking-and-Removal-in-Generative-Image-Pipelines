
import { PhaseCard } from './PhaseCard';
import { ProcessPhase } from '../types';
import { Database, Filter, Layers, CheckCircle } from 'lucide-react';

const methodologyData: ProcessPhase[] = [
  {
    id: 1,
    title: "Seed & Expansion",
    subtitle: "Discovery & Snowballing",
    icon: Layers,
    items: [
      { label: "Core Identification", value: "8 Papers", description: "AI-assisted Discovery (GPT)" },
      { label: "Snowballing Expansion", value: "23 Papers", description: "Citation chaining (Intro/Related Works)" }
    ],
    description: "Goal: Establish the foundational knowledge graph."
  },
  {
    id: 2,
    title: "Systematic Search",
    subtitle: "Google Scholar (>2017)",
    icon: Database,
    items: [
      { label: "Model-tuned Candidates", value: "72", highlight: true },
      { label: "Tuning-free Candidates", value: "548", highlight: true, description: "High volume noise" }
    ],
    description: "Filters: Keyword 'Image Watermarking'"
  },
  {
    id: 3,
    title: "Rigorous Screening",
    subtitle: "Title, Abstract, Limit Check",
    icon: Filter,
    items: [
      { label: "Model-tuned Selection", value: "72", subValue: "38", highlight: true },
      { label: "Tuning-free Selection", value: "548", subValue: "150", highlight: true }
    ],
    description: "Deep filtering applied to remove noise."
  },
  {
    id: 4,
    title: "Final Corpus",
    subtitle: "The Final Selection",
    icon: CheckCircle,
    items: [
      { label: "Deep Review Selected", value: "~58 Papers", highlight: true }
    ],
    description: "Selected for detailed analysis & presentation."
  }
];

export default function Methodology() {
  return (
    <div className=" bg-white text-slate-900 flex flex-col relative overflow-hidden selection:bg-blue-100">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50/50 rounded-bl-[100px] -z-10 blur-3xl" />
      

      {/* Main Content Area */}
      <main className="flex-1 px-12 md:px-20 pb-32 overflow-y-auto">
        
        {/* Process Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 lg:gap-12 relative">
          {methodologyData.map((phase, index) => (
            <PhaseCard 
              key={phase.id} 
              phase={phase} 
              isLast={index === methodologyData.length - 1} 
            />
          ))}
        </div>

        {/* Legend/Note at bottom of main content */}
        <div className="mt-16 flex items-center justify-center space-x-8 opacity-60">
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-blue-100 border border-blue-200"></div>
             <span className="text-sm font-medium text-slate-500">Filtered Set</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-slate-50 border border-slate-200"></div>
             <span className="text-sm font-medium text-slate-500">Raw Data</span>
           </div>
        </div>

      </main>
    </div>
  );
}
