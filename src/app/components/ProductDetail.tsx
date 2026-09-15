import React from "react";
import { GlassCard } from "./ui/GlassCard";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface TableData {
  title?: string;
  headers: string[];
  rows: (string | number | boolean)[][];
}

interface ProductDetailProps {
  technical_detail?: string;
  tables?: TableData[];
  gartner?: boolean; // If true, show the Gartner quadrant placeholder
}

export function ProductDetail({ technical_detail, tables, gartner }: ProductDetailProps) {
  if (!technical_detail && !tables && !gartner) return null;

  return (
    <div className="space-y-12 mt-12">
      {/* Technical Detail Section */}
      {technical_detail && (
        <GlassCard className="p-8 bg-white border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Technical Specifications</h3>
          <div 
            className="prose prose-slate max-w-none text-slate-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: technical_detail }} 
          />
        </GlassCard>
      )}

      {/* Tables Section */}
      {tables && tables.map((table, idx) => (
        <GlassCard key={idx} className="p-8 bg-white border-slate-200 overflow-hidden">
          {table.title && (
            <h4 className="text-lg font-semibold text-slate-900 mb-4">{table.title}</h4>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  {table.headers.map((header, hIdx) => (
                    <th key={hIdx} className="py-3 px-4 bg-slate-50 font-semibold text-slate-700 border-b border-slate-200 text-sm uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-3 px-4 text-slate-600 text-sm">
                        {typeof cell === 'boolean' ? (
                          cell ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      ))}

      {/* Gartner Quadrant Placeholder */}
      {gartner && (
        <GlassCard className="p-8 bg-white border-slate-200 flex flex-col items-center">
          <h3 className="text-xl font-bold text-slate-900 mb-6 self-start">Market Position (Gartner Magic Quadrant)</h3>
          <div className="relative w-full max-w-2xl aspect-square bg-slate-50 rounded-xl border border-slate-200 p-8 flex items-center justify-center">
             {/* Simple SVG Placeholder for Gartner Quadrant */}
             <svg viewBox="0 0 400 400" className="w-full h-full text-slate-300">
               {/* Axes */}
               <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="2" />
               <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="2" />
               
               {/* Labels */}
               <text x="390" y="200" textAnchor="end" dominantBaseline="auto" className="text-xs fill-slate-500 font-semibold">Completeness of Vision</text>
               <text x="200" y="20" textAnchor="middle" dominantBaseline="hanging" className="text-xs fill-slate-500 font-semibold">Ability to Execute</text>

               {/* Quadrant Labels */}
               <text x="300" y="100" textAnchor="middle" className="text-sm fill-slate-400 font-bold uppercase tracking-widest">Leaders</text>
               <text x="100" y="100" textAnchor="middle" className="text-sm fill-slate-400 font-bold uppercase tracking-widest">Challengers</text>
               <text x="300" y="300" textAnchor="middle" className="text-sm fill-slate-400 font-bold uppercase tracking-widest">Visionaries</text>
               <text x="100" y="300" textAnchor="middle" className="text-sm fill-slate-400 font-bold uppercase tracking-widest">Niche Players</text>

               {/* Aurix Position (Leader) */}
               <g transform="translate(320, 80)">
                 <circle r="6" fill="#0EA5E9" className="animate-pulse" />
                 <text x="10" y="4" className="text-xs fill-sky-600 font-bold">Aurix AI</text>
               </g>
             </svg>
             
             <div className="absolute bottom-4 right-4 text-xs text-slate-400 italic">
               * Illustrative representation. Source: Internal analysis based on Gartner methodology.
             </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}