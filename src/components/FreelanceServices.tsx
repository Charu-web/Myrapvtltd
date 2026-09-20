import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

interface FreelanceServicesProps {
  onContactClick: () => void;
  onSelectService?: (serviceName: string) => void;
}

export const FreelanceServices: React.FC<FreelanceServicesProps> = ({ 
  onContactClick,
  onSelectService 
}) => {
  return (
    <section className="py-28 relative border-b border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
        
        {/* Main CTA Block */}
        <div className="space-y-8 max-w-4xl">
          <div className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
            // COLLABORATION &amp; CONTRACTS
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-zinc-100 tracking-tight leading-[1.05] uppercase">
            Have a product<br />in mind?
          </h2>

          <p className="text-xl sm:text-2xl font-heading text-zinc-300 font-normal max-w-2xl leading-relaxed">
            Let's turn the idea into something people can use.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onContactClick}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-md bg-zinc-100 text-zinc-950 font-mono text-xs uppercase tracking-wider font-bold hover:bg-zinc-200 transition-colors active:scale-95 shadow-md"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Practice Areas List */}
        <div className="pt-20 border-t border-zinc-800/80 mt-20">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-8">
            AVAILABLE PRACTICE AREAS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((s) => (
              <div
                key={s.id}
                onClick={() => onSelectService && onSelectService(s.title)}
                className="space-y-2 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-semibold text-zinc-200 group-hover:text-white text-base transition-colors">
                    {s.title}
                  </h4>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
