import React from 'react';
import { ENGINEERING_STEPS } from '../data/portfolioData';

export const EngineeringApproach: React.FC = () => {
  return (
    <section id="methodology" className="py-28 md:py-36 relative border-b border-zinc-800/80 bg-[#090a0d]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-16 border-b border-zinc-800/80">
          <div className="space-y-3">
            <div className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
              // 05 — ENGINEERING LIFECYCLE
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-zinc-100 tracking-tight uppercase">
              How I Build
            </h2>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md font-normal">
            A disciplined product-development philosophy taking ideas from requirements to deployed, observable systems.
          </p>
        </div>

        {/* Editorial 6-Step Progression */}
        <div className="pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-14">
          {ENGINEERING_STEPS.map((step) => (
            <div key={step.number} className="space-y-4 border-t border-zinc-800 pt-6">
              
              <div className="flex items-center justify-between font-mono text-xs text-zinc-500 uppercase tracking-widest">
                <span>PHASE {step.number}</span>
                <span className="text-zinc-600">/ 06</span>
              </div>

              <h3 className="text-2xl font-heading font-bold text-zinc-100">
                {step.title}
              </h3>

              <p className="text-zinc-300 text-sm leading-relaxed font-normal">
                {step.summary}
              </p>

              <ul className="space-y-1.5 pt-3 font-mono text-xs text-zinc-400 border-t border-zinc-900">
                {step.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-zinc-600">›</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
