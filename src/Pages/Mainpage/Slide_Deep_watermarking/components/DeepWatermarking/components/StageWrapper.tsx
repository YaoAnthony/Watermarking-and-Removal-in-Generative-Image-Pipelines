import React, { ReactNode } from 'react';

interface StageWrapperProps {
  number: string;
  title: string;
  description?: string;
  children: ReactNode;
  active?: boolean;
}

export const StageWrapper: React.FC<StageWrapperProps> = ({ number, title, children, active = true }) => {
  return (
    <div className={`relative flex flex-col h-full transition-all duration-500 group ${active ? 'opacity-100' : 'opacity-40 grayscale'}`}>
      <div className="flex items-center space-x-3 mb-4 px-1">
        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-slate-200 text-blue-600 text-xs font-bold font-mono shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
          {number}
        </span>
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider group-hover:text-blue-700 transition-colors">
            {title}
        </h3>
      </div>
      
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col hover:shadow-xl hover:border-blue-200 transition-all duration-300 relative overflow-hidden">
         {/* Subtle top gradient line */}
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        {children}
      </div>
    </div>
  );
};