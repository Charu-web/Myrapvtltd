import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PRODUCTION_PROJECTS } from '../data/portfolioData';
import type { ProductionProject } from '../types';

export const ProductionWork: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="production" className="py-28 relative border-b border-zinc-800/60 bg-[#07080a]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-16 border-b border-zinc-800/80">
          <div className="space-y-3">
            <div className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
              // 02 — PRODUCTION SYSTEMS
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-zinc-100 tracking-tight uppercase">
              Selected Production Work
            </h2>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md font-normal">
            Commercial websites, operations CRM suites, and production web deployments.
          </p>
        </div>

        {/* Editorial Horizontal Rows */}
        <div className="divide-y divide-zinc-800/80">
          {PRODUCTION_PROJECTS.map((project: ProductionProject, index) => {
            const isExpanded = expandedId === project.id;

            return (
              <div
                key={project.id}
                className="py-8 transition-all duration-200 group hover:pl-2"
              >
                <div 
                  onClick={() => toggleExpand(project.id)}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                >
                  {/* Left: Number & Title */}
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono text-xs text-zinc-600 font-semibold">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-heading font-bold text-zinc-100 group-hover:text-white transition-colors">
                        {project.title}
                      </h3>
                      <div className="text-xs font-mono text-zinc-400 mt-1">
                        {project.type} · {project.role}
                      </div>
                    </div>
                  </div>

                  {/* Right: Technologies & Expand indicator */}
                  <div className="flex items-center justify-between md:justify-end gap-6 pl-10 md:pl-0">
                    <div className="hidden lg:flex items-center gap-2">
                      {project.technologies.slice(0, 4).map(tech => (
                        <span key={tech} className="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button 
                      className="font-mono text-xs uppercase tracking-wider text-zinc-400 group-hover:text-zinc-200 flex items-center gap-1.5"
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? 'CLOSE' : 'DETAILS'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Expandable Details Container */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-zinc-900 pl-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm animate-in fade-in duration-150">
                    <div className="space-y-1.5">
                      <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                        WHAT WAS BUILT
                      </div>
                      <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                        {project.whatWasBuilt}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                        KEY CONTRIBUTION
                      </div>
                      <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                        {project.keyContribution}
                      </p>
                    </div>

                    <div className="md:col-span-2 pt-2 flex flex-wrap gap-1.5">
                      {project.technologies.map(t => (
                        <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
