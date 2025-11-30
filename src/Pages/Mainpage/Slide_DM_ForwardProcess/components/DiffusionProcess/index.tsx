import { DiffusionSimulator } from './components/DiffusionSimulator';
import { generateSchedule } from './utils/diffusionMath';
import { TIMESTEPS, DEFAULT_IMAGE_URL } from './constants';
import { ArrowRight } from 'lucide-react';

const schedule = generateSchedule();

// Define the steps we want to visualize in our pipeline
const STEPS_TO_SHOW = [0, 300, 700, 1000];

export default function DiffusionProcess() {

  return (
    <div className=" relative">

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">

        {/* --- Section 1: Forward Process --- */}
        <section>
          <div className="mb-8 border-l-4 border-blue-600 pl-4">
            <h2 className="text-3xl font-bold text-slate-900">1. Forward Process (Diffusion)</h2>
            <div className="mt-2 text-lg text-slate-600 flex items-center gap-3">
               <span className="font-serif italic bg-blue-50 px-2 py-1 rounded text-blue-800 border border-blue-100">
                 q(x_t | x_0)
               </span>
               <span>— Gradually adding Gaussian noise</span>
            </div>
            <div className="mt-4 bg-slate-100 p-4 rounded-lg inline-block text-slate-700 font-serif text-lg">
               x<sub>t</sub> = √ᾱ<sub>t</sub> x<sub>0</sub> + √(1 - ᾱ<sub>t</sub>) ε
               <span className="ml-4 text-sm font-sans text-slate-500 not-italic">where ε ~ N(0, I)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
            {/* Arrow indicators between steps (Desktop only) */}
            <div className="absolute top-1/2 left-0 w-full hidden md:flex justify-between px-[10%] -z-10 text-slate-200">
               <ArrowRight className="w-12 h-12" />
               <ArrowRight className="w-12 h-12" />
               <ArrowRight className="w-12 h-12" />
            </div>

            {STEPS_TO_SHOW.map((step) => {
               // Determine label
               let label = `x_{${step}}`;
               if (step === 0) label = "x_0 (Data)";
               if (step === TIMESTEPS) label = "x_T (Noise)";
               
               return (
                <DiffusionSimulator
                  key={`fwd-${step}`}
                  imageUrl={DEFAULT_IMAGE_URL}
                  currentStep={step}
                  schedule={schedule}
                  label={label}
                  subLabel={`t = ${step}`}
                />
               );
            })}
          </div>
        </section>


        {/* Footer / Legend */}
        <div className="mt-16 p-8 bg-blue-50 rounded-2xl border border-blue-100 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
           <div>
             <h4 className="font-bold text-blue-900 mb-2">Variables</h4>
             <ul className="flex whitespace-nowrap gap-10">
               <li>x<sub>0</sub> : Original Data Image</li>
               <li>x<sub>T</sub> : Pure Gaussian Noise</li>
               <li>ε : Added Gaussian Noise</li>
               <li>t : Timestep (0 to {TIMESTEPS})</li>
             </ul>
           </div>
        </div>

      </main>
    </div>
  );
}