
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
      { label: "Core Identification", value: "13 Papers", description: "AI-assisted Discovery (GPT)" },
      { label: "Snowballing Expansion", value: "32 Papers", description: "Citation chaining (Intro/Related Works)" }
    ],
    description: "Goal: Establish the foundational knowledge graph."
  },
  {
    id: 2,
    title: "Systematic Search",
    subtitle: "Google Scholar,NeurLPS, ICML, ICLR, ICCV(>2017)",
    icon: Database,
    items: [
      { label: "Deep watermarking", value: "172", highlight: true },
      { label: "Model-tuned", value: "52", highlight: true },
      { label: "Tuning-free", value: "553", highlight: true },
    ],
    description: "Filters: Keyword 'Image Watermarking'"
  },
  {
    id: 3,
    title: "Rigorous Screening",
    subtitle: "Title, Abstract, Limit Check",
    icon: Filter,
    items: [
      { label: "Deep watermarking", value: "172", subValue: "21", highlight: true },
      { label: "Model-tuned", value: "52", subValue: "18", highlight: true },
      { label: "Tuning-free", value: "553", subValue: "12", highlight: true },
    ],
    description: "Deep filtering applied to remove noise."
  },
  {
    id: 4,
    title: "Final Corpus",
    subtitle: "The Final Selection",
    icon: CheckCircle,
    items: [
      { label: "Deep Review Selected", value: "~51 Papers", highlight: true }
    ],
    description: "Selected for detailed analysis & presentation."
  }
];

export default function Methodology() {
  return (
      <main className="relative">
        {/* Process Flow Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '3rem', position: 'relative' }}>
          {methodologyData.map((phase, index) => (
            <PhaseCard 
              key={phase.id} 
              phase={phase} 
              isLast={index === methodologyData.length - 1} 
            />
          ))}
        </div>
      </main>
  );
}
