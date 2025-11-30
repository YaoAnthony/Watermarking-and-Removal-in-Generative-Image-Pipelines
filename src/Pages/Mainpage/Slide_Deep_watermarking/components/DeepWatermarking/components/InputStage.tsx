import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { InlineMath } from 'react-katex';

interface InputStageProps {
  image: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  payload: string;
  setPayload: (s: string) => void;
}

export const InputStage: React.FC<InputStageProps> = ({ image, onImageUpload, payload, setPayload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Image Uploader */}
      <div className="group relative w-full aspect-square bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors cursor-pointer overflow-hidden" onClick={handleBoxClick}>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={onImageUpload}
        />
        
        {image ? (
          <img src={image} alt="Cover" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Upload className="w-10 h-10 mb-2 group-hover:text-blue-500 transition-colors" />
            <span className="text-xs font-medium">Click to upload Cover Image</span>
          </div>
        )}
        
        {image && (
          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
            <InlineMath math="I_{cover}" />
          </div>
        )}
      </div>

      {/* Secret Payload Input */}
      <div className="mt-auto">
        <label className="text-xs font-semibold text-slate-500 uppercase mb-1 flex items-center gap-1">
            Secret Payload (<InlineMath math="M" />)
        </label>
        <div className="relative">
          <input
            type="text"
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-md py-2 px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono"
            placeholder="Enter secret..."
          />
          <div className="flex space-x-1 mt-2">
             {/* Binary visualization dots */}
             {Array.from({ length: 24 }).map((_, i) => (
               <div key={i} className={`w-1 h-1 rounded-full ${i < payload.length * 2 ? 'bg-blue-500' : 'bg-slate-200'}`} />
             ))}
          </div>
          <div className="text-[10px] text-slate-400 mt-1 text-right">Length: {payload.length * 8} bits</div>
        </div>
      </div>
    </div>
  );
};