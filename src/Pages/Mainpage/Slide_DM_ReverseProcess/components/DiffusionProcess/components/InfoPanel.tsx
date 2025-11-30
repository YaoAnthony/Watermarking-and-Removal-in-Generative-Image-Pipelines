import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ScheduleData } from '../utils/diffusionMath';
import { COLOR_SIGNAL, COLOR_NOISE, TIMESTEPS } from '../constants';
import { Microscope } from 'lucide-react';

interface InfoPanelProps {
  schedule: ScheduleData[];
  currentStep: number;
  mode: 'forward' | 'reverse';
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ schedule, currentStep, mode }) => {
  // We want to display the schedule graph
  // We'll downsample the data for the chart to improve performance
  const chartData = React.useMemo(() => {
    return schedule.filter((_, i) => i % 10 === 0).map(s => ({
      t: s.t,
      signal: s.alphaBar, // Signal Strength (Variance)
      noise: 1 - s.alphaBar, // Noise Strength (Variance approx)
    }));
  }, [schedule]);

  const currentData = schedule[currentStep] || schedule[0];

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 h-full flex flex-col">
      <div className="flex items-center space-x-2 mb-6">
        <Microscope className="w-5 h-5 text-cyan-400" />
        <h2 className="text-xl font-bold text-white">Theory & Mechanics</h2>
      </div>

      <div className="space-y-6 flex-grow overflow-y-auto pr-2 custom-scrollbar">
        {/* Math Equation */}
        <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-700/50">
           <h3 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">The Process</h3>
           <div className="font-mono text-center text-lg md:text-xl py-2 overflow-x-auto whitespace-nowrap">
             {mode === 'forward' ? (
                <span>
                  <span className="text-cyan-400">x_t</span> = <span className="text-purple-400">√ᾱ</span>·x₀ + <span className="text-pink-400">√(1-ᾱ)</span>·ε
                </span>
             ) : (
                <span>
                  x_{'{t-1}'} ← <span className="text-cyan-400">Model</span>(x_t, t)
                </span>
             )}
           </div>
           <p className="text-xs text-slate-400 mt-2 text-center">
             {mode === 'forward' 
               ? "The Forward Process q(x_t | x_0) adds Gaussian noise according to a fixed schedule." 
               : "The Reverse Process p(x_{t-1} | x_t) uses a neural network to predict and subtract noise."}
           </p>
        </div>

        {/* Dynamic Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
             <div className="text-xs text-slate-400">Signal Strength (√ᾱ)</div>
             <div className="text-2xl font-mono text-cyan-400 mt-1">
               {Math.sqrt(currentData.alphaBar).toFixed(3)}
             </div>
          </div>
          <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
             <div className="text-xs text-slate-400">Noise Strength (√(1-ᾱ))</div>
             <div className="text-2xl font-mono text-pink-400 mt-1">
               {currentData.noiseLevel.toFixed(3)}
             </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-48 w-full mt-4">
          <h3 className="text-sm font-semibold text-slate-400 mb-2">Noise Schedule</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSignal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLOR_SIGNAL} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={COLOR_SIGNAL} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNoise" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLOR_NOISE} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={COLOR_NOISE} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="t" hide />
              <YAxis hide domain={[0, 1]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                itemStyle={{ fontSize: '12px' }}
                labelStyle={{ display: 'none' }}
              />
              <Area 
                type="monotone" 
                dataKey="signal" 
                stroke={COLOR_SIGNAL} 
                fillOpacity={1} 
                fill="url(#colorSignal)" 
                name="Signal Variance"
              />
              <Area 
                type="monotone" 
                dataKey="noise" 
                stroke={COLOR_NOISE} 
                fillOpacity={1} 
                fill="url(#colorNoise)" 
                name="Noise Variance"
              />
              {/* Current Position Indicator Line */}
              {/* Not easily doable natively in AreaChart without ComposedChart, but we can visualize it via ReferenceLine if needed. 
                  Simplifying for now. */}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="text-sm text-slate-300 leading-relaxed">
          <p className="mb-2">
            <strong>Forward Diffusion:</strong> We slowly destroy the image structure by mixing it with Gaussian noise. 
            At t={TIMESTEPS}, the image is indistinguishable from pure random noise.
          </p>
          <p>
            <strong>Reverse Diffusion:</strong> The "Magic" of generative AI. A neural network (U-Net) looks at the noisy image 
            and predicts the noise that was added. Subtracting this predicted noise recovers a slightly cleaner image. 
            Repeating this hundreds of times hallucinates a detailed image from random static.
          </p>
        </div>
      </div>
    </div>
  );
};