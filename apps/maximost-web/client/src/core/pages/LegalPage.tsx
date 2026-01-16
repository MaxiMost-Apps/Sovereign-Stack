import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function LegalPage({ title, content }: { title: string, content: string }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 p-8 md:p-20 font-serif">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-blue-500 mb-12 hover:text-blue-400 transition-colors font-sans text-sm font-bold uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4" /> Return to Base
      </button>
      <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter sans-serif">{title}</h1>
      <div className="prose prose-invert prose-lg max-w-3xl opacity-80 leading-relaxed whitespace-pre-line">
        {content}
      </div>
    </div>
  );
}
