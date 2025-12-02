import React from 'react';
import { 
  ArrowRight, 
  Fingerprint, 
  Database, 
  Sparkles,
  ArrowDown
} from 'lucide-react';

// --- Components ---

const MathText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`math-font italic ${className}`}>{children}</span>
);

const SectionTitle: React.FC<{ number: string; title: string; subtitle: React.ReactNode }> = ({ number, title, subtitle }) => (
  <div className="mb-6 border-l-4 border-blue-600 pl-4">
    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
      <span className="text-blue-600">{number}.</span> {title}
    </h2>
    <div className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium flex items-center gap-2">
      {subtitle}
    </div>
  </div>
);

const ImageCard: React.FC<{ 
  src?: string; 
  label: React.ReactNode; 
  subLabel?: string;
  isNoise?: boolean; 
  isStack?: boolean;
  watermarkType?: 'tree-ring' | 'mid-gen' | 'training';
  opacity?: number;
}> = ({ src, label, subLabel, isNoise, isStack, watermarkType, opacity = 1 }) => {
  
  return (
    <div className="flex flex-col items-center group relative z-10">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-3">
        {/* Stack Effect for Forward Process */}
        {isStack && (
          <>
            <div className="absolute top-0 left-0 w-full h-full bg-slate-200 dark:bg-slate-700 rounded-lg transform translate-x-2 -translate-y-2 opacity-60 border border-slate-300 dark:border-slate-600 shadow-sm" />
            <div className="absolute top-0 left-0 w-full h-full bg-slate-200 dark:bg-slate-700 rounded-lg transform translate-x-4 -translate-y-4 opacity-40 border border-slate-300 dark:border-slate-600 shadow-sm" />
          </>
        )}

        {/* Main Image Container */}
        <div className={`relative w-full h-full rounded-lg overflow-hidden border-2 shadow-md bg-white dark:bg-slate-800 transition-all duration-300 ${
          watermarkType ? 'border-red-500 ring-2 ring-red-200 dark:ring-red-900/30' : 'border-slate-200 dark:border-slate-600'
        }`}>
          {isNoise ? (
            <div className="w-full h-full noise-bg opacity-90 contrast-125 brightness-90" />
          ) : (
            <img 
              src={src} 
              alt="Data" 
              className="w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity }}
            />
          )}

          {/* Noise Overlay for gradual diffusion */}
          {!isNoise && opacity < 1 && (
            <div className="absolute inset-0 noise-bg mix-blend-overlay" style={{ opacity: 1 - opacity }} />
          )}

          {/* Tree-Ring Watermark Overlay */}
          {watermarkType === 'tree-ring' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute inset-0 bg-red-500/10 animate-pulse" />
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
                <circle cx="50" cy="50" r="40" fill="none" stroke="red" strokeWidth="1" strokeDasharray="4 2" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="red" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="red" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="red" strokeWidth="2" />
              </svg>
              <div className="absolute bottom-1 right-1 bg-red-600 text-white text-[9px] px-1 rounded font-bold uppercase tracking-wider shadow-sm">
                Tree-Ring
              </div>
            </div>
          )}

           {/* Training Watermark Overlay */}
           {watermarkType === 'training' && (
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="absolute inset-0 bg-amber-500/10" />
               <Fingerprint className="text-amber-600 w-12 h-12 opacity-80" />
               <div className="absolute bottom-1 right-1 bg-amber-600 text-white text-[9px] px-1 rounded font-bold uppercase tracking-wider shadow-sm">
                Poisoned
              </div>
            </div>
          )}
        </div>
        
        {/* Connection Arrow Overlay for Mid-Gen */}
        {watermarkType === 'mid-gen' && (
             <div className="absolute -right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center animate-bounce">
                <span className="text-[10px] font-bold text-red-600 bg-red-100 dark:bg-red-900/50 px-1 rounded border border-red-200 dark:border-red-800 mb-1 whitespace-nowrap">Inject</span>
                <ArrowDown className="w-5 h-5 text-red-500" />
             </div>
        )}
      </div>

      <div className="text-center">
        <div className="math-font font-bold text-lg text-slate-800 dark:text-slate-100">{label}</div>
        {subLabel && <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{subLabel}</div>}
      </div>
    </div>
  );
};

const ProcessArrow: React.FC<{ label?: React.ReactNode, active?: boolean }> = ({ label, active }) => (
  <div className="flex flex-col items-center justify-center px-2 sm:px-4 h-32 opacity-70">
    <div className="text-[10px] sm:text-xs text-slate-500 mb-1 text-center font-serif italic">{label}</div>
    <ArrowRight className={`w-5 h-5 sm:w-6 sm:h-6 ${active ? 'text-blue-500' : 'text-slate-300 dark:text-slate-600'}`} />
  </div>
);

const WatermarkExplanation: React.FC<{ title: string; description: string; colorClass: string; icon: React.ReactNode }> = ({ title, description, colorClass, icon }) => (
  <div className={`flex items-start gap-3 p-3 rounded-lg border ${colorClass} bg-opacity-5 dark:bg-opacity-10 backdrop-blur-sm`}>
    <div className="mt-1">{icon}</div>
    <div>
      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{title}</h4>
      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
  </div>
);

// --- Main DDIM ---

export default function DDIM() {

  return (
    <div className={`transition-colors duration-300 dark:bg-[#0f1117] bg-slate-50 pb-20`}>
      
      <main className=" mx-auto px-4 sm:px-6 py-8 space-y-12">

        {/* Section 0: Training Phase */}
        <section className="bg-white dark:bg-[#161b22] rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800/60 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
           </div>
           
           <SectionTitle 
            number="Option 1" 
            title="Training Phase (Concept Injection)" 
            subtitle={<><span>Watermarking the</span> <MathText>x_0</MathText> <span>(Dataset)</span></>} 
          />
          
          <div className="flex flex-wrap items-center justify-start gap-8 sm:gap-12 pl-4">
             <div className="flex gap-4">
                <ImageCard 
                  src="https://picsum.photos/seed/dog/300/300" 
                  label={<>x_{"{data}"}</>} 
                  subLabel="Clean Data"
                  isStack
                />
                <div className="flex items-center text-2xl text-slate-300">+</div>
                <ImageCard 
                  src="https://picsum.photos/seed/cat/300/300" 
                  label={<>x_{"{poison}"}</>} 
                  subLabel="Trigger Set"
                  watermarkType="training"
                  isStack
                />
             </div>
             
             <ProcessArrow label="Training" active />
             
             <div className="h-28 w-28 sm:h-32 sm:w-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg flex flex-col items-center justify-center text-white p-2 text-center">
                <Database className="w-8 h-8 mb-2 opacity-80" />
                <span className="font-bold text-sm">Model Weights</span>
                <span className="text-[10px] opacity-70 math-font">p_θ</span>
             </div>
          </div>
        </section>


        {/* Section 1: Forward Process */}
        <section className="bg-white dark:bg-[#161b22] rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800/60">
          <SectionTitle 
            number="1" 
            title="Forward Process (Diffusion)" 
            subtitle={<>
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded text-xs font-mono">q(x_t | x_0)</span>
              <span>— Gradually adding Gaussian noise to a batch</span>
            </>} 
          />

          <div className="flex flex-nowrap overflow-x-auto pb-4 items-center justify-between sm:justify-start sm:gap-8 min-w-full">
            
            {/* Step 0 */}
            <ImageCard 
              src="https://picsum.photos/seed/dog/300/300" 
              label={<>x_0</>} 
              subLabel="Data Distribution"
              isStack
            />

            <ProcessArrow label={<>q(x_t|x_0)</>} />

            {/* Step 300 */}
            <ImageCard 
              src="https://picsum.photos/seed/dog/300/300" 
              label={<>x_{"{300}"}</>} 
              subLabel="t = 300"
              opacity={0.6}
              isStack
            />

            <ProcessArrow label={<>Gaussian Noise <br/> ε ~ N(0,I)</>} />

            {/* Step 700 */}
            <ImageCard 
              src="https://picsum.photos/seed/dog/300/300" 
              label={<>x_{"{700}"}</>} 
              subLabel="t = 700"
              opacity={0.3}
              isStack
            />

            <ProcessArrow />

            {/* Step T */}
            <ImageCard 
              label={<>x_T</>} 
              subLabel="Isotropic Gaussian"
              isNoise
              isStack
            />
          </div>
          
          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800 inline-block">
             <p className="text-sm text-slate-600 dark:text-slate-400 math-font">
               x_t = √α_t x_0 + √(1 - α_t)ε
             </p>
          </div>
        </section>

        {/* Section 2: Reverse Process */}
        <section className="bg-white dark:bg-[#161b22] rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800/60 ring-1 ring-slate-200 dark:ring-slate-800">
          <SectionTitle 
            number="2" 
            title="Reverse Process (Denoising)" 
            subtitle={<>
              <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-0.5 rounded text-xs font-mono">p_θ(x_&#123;t-1&#125; | x_t)</span>
              <span>— Removing noise (DDIM Deterministic)</span>
            </>} 
          />

          <div className="flex flex-nowrap overflow-x-auto pb-4 items-center justify-between sm:justify-start sm:gap-8 min-w-full relative">
            
            {/* Step T (Tree Ring) */}
            <div className="relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                 <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-red-500 mb-1 animate-bounce">1. Initial Noise</span>
                    <ArrowDown className="w-4 h-4 text-red-500" />
                 </div>
              </div>
              <ImageCard 
                label={<>x_T</>} 
                subLabel="Latent (Watermarked)"
                isNoise
                watermarkType="tree-ring"
              />
            </div>

            <ProcessArrow label={<>Denoise <br/> Model(x_t, t)</>} active />

            {/* Step 700 */}
            <ImageCard 
              src="https://picsum.photos/seed/dog/300/300" 
              label={<>x_{"{700}"}</>} 
              subLabel="t = 700"
              opacity={0.3}
            />

            {/* Mid-Gen Indicator Area */}
            <div className="relative flex items-center">
                 <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap z-30">
                   <div className="flex flex-col items-center">
                      <span className="text-xs font-bold text-red-500 mb-1">2. Mid-Generation</span>
                      <Fingerprint className="w-4 h-4 text-red-500 mb-1" />
                      <ArrowDown className="w-4 h-4 text-red-500" />
                   </div>
                 </div>
                 <ProcessArrow label={<>Implicit <br/> Gradient Step</>} />
                 {/* Invisible box to spacing the mid-gen arrow */}
                 <div className="w-1"></div>
            </div>

            {/* Step 300 (Mid-Gen Highlight) */}
            <ImageCard 
              src="https://picsum.photos/seed/dog/300/300" 
              label={<>x_{"{300}"}</>} 
              subLabel="Watermark Injected"
              opacity={0.6}
              watermarkType="mid-gen"
            />

            <ProcessArrow label={<>x_&#123;t-1&#125; ← f(x_t, ε_θ)</>} />

            {/* Step 0 */}
            <ImageCard 
              src="https://picsum.photos/seed/dog/300/300" 
              label={<>x_0</>} 
              subLabel="Generated Image"
            />
          </div>

          <div className="mt-6 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800/30">
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-3 uppercase tracking-wide">Watermarking Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <WatermarkExplanation 
                  title="1. Tree-Ring (Initial)"
                  description="A Fourier-space pattern is embedded into the initial Gaussian noise (x_T). The model preserves this pattern through the denoising process."
                  colorClass="border-red-200 bg-red-50"
                  icon={<Fingerprint className="w-5 h-5 text-red-500" />}
               />
               <WatermarkExplanation 
                  title="2. Mid-Generation"
                  description="The watermark is injected during the sampling steps (e.g., at t=300), altering the trajectory of the generation towards a watermarked region."
                  colorClass="border-purple-200 bg-purple-50"
                  icon={<Sparkles className="w-5 h-5 text-purple-500" />}
               />
               <WatermarkExplanation 
                  title="3. Training (Backdoor)"
                  description="The model learns to associate a specific trigger or pattern in the training data with a specific output, effectively watermarking the model weights."
                  colorClass="border-amber-200 bg-amber-50"
                  icon={<Database className="w-5 h-5 text-amber-500" />}
               />
            </div>
          </div>
        </section>

      </main>

      {/* Legend Footer */}
      <footer className="fixed bottom-0 w-full bg-white dark:bg-[#0f1117] border-t border-slate-200 dark:border-slate-800 py-3 px-6 text-xs text-slate-500 dark:text-slate-400 hidden md:block">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-300"></span> x_0: Original Data</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-800 dark:bg-slate-500"></span> x_T: Pure Gaussian Noise</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> Watermark Injection Point</span>
          </div>
          <div className="math-font">DDIM / DDPM Visualization</div>
        </div>
      </footer>
    </div>
  );
}