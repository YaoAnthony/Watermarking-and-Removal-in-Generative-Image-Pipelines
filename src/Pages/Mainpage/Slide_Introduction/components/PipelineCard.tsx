import React from 'react';

interface PipelineCardProps {
  stepNumber: number;
  title: string;
  description?: string;
  children: React.ReactNode;
  extraAction?: React.ReactNode;
}

export const PipelineCard: React.FC<PipelineCardProps> = ({ stepNumber, title, description, children, extraAction }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full min-w-[280px] w-full md:w-[280px] shrink-0 overflow-hidden relative group">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-sm font-bold shadow-sm ring-1 ring-blue-500/10">
            {stepNumber}
          </div>
          <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
        </div>
        {extraAction}
      </div>
      
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col items-center justify-center bg-white min-h-[300px]">
        {children}
      </div>

      {/* Footer Description */}
      {description && (
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      )}
    </div>
  );
};
