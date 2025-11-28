import React from 'react';

export const Arrow: React.FC = () => (
  <div className="hidden md:flex items-center justify-center text-slate-300 mx-2 shrink-0">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  </div>
);
