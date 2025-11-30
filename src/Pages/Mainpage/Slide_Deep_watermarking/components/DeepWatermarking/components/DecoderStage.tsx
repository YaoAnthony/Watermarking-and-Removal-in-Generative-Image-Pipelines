import React from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import { InlineMath } from 'react-katex';

interface DecoderStageProps {
  recoveredPayload: string;
  ber: number;
  confidence: number;
}

export const DecoderStage: React.FC<DecoderStageProps> = ({ recoveredPayload, ber, confidence }) => {
  const data = [
    { name: 'BER', value: ber, color: ber > 15 ? '#ef4444' : '#22c55e' },
    { name: 'Conf', value: confidence, color: confidence > 80 ? '#22c55e' : '#f59e0b' },
  ];

  return (
    <div className="flex flex-col h-full">
        {/* Network Schematic Small */}
        <div className="flex items-center justify-center space-x-2 mb-4 opacity-70">
            <div className="w-6 h-6 border border-slate-300 rounded bg-slate-50 text-[8px] flex items-center justify-center">In</div>
            <div className="text-slate-300">→</div>
            <div className="w-6 h-6 border border-blue-300 rounded bg-blue-50 text-[8px] flex items-center justify-center text-blue-600">D</div>
            <div className="text-slate-300">→</div>
            <div className="w-6 h-6 border border-green-300 rounded bg-green-50 text-[8px] flex items-center justify-center text-green-600">Out</div>
        </div>

        {/* Recovered Payload */}
        <div className="text-center mb-6">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Recovered Payload (<InlineMath math="M'" />)
            </div>
            <div className={`text-xl font-mono font-bold tracking-widest break-all p-3 rounded-lg border ${ber === 0 ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-800'}`}>
                {recoveredPayload || "Waiting..."}
            </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-slate-900 rounded-lg p-3 text-center text-white">
                <div className="text-[9px] text-slate-400 uppercase mb-1">Bit Error Rate</div>
                <div className={`text-xl font-bold ${ber > 10 ? 'text-red-400' : 'text-green-400'}`}>
                    {ber.toFixed(1)}%
                </div>
            </div>
            <div className="bg-slate-900 rounded-lg p-3 text-center text-white">
                <div className="text-[9px] text-slate-400 uppercase mb-1">Confidence</div>
                <div className="text-xl font-bold text-blue-400">
                    {confidence}%
                </div>
            </div>
        </div>

        {/* Mini Visualization Bars */}
        <div className="mt-auto h-24 w-full">
            <p className="text-[9px] text-slate-400 mb-1">Signal Integrity Analysis</p>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};