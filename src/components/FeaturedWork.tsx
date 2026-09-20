import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import type { FeaturedProject } from '../types';
import { ProjectMockupVisual } from './ProjectMockupVisual';

interface FeaturedWorkProps {
  onSelectCaseStudy: (project: FeaturedProject) => void;
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ onSelectCaseStudy }) => {
  return (
    <section id="work" className="py-28 md:py-36 relative border-b border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-16 border-b border-zinc-800/80">
          <div className="space-y-3">
            <div className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
              // 01 — SELECTED WORK
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-zinc-100 tracking-tight uppercase">
              Selected Work
            </h2>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md font-normal">
            Selected products, experiments and production systems.
          </p>
        </div>

        {/* Projects Showcase */}
        <div className="divide-y divide-zinc-800/80">
          {FEATURED_PROJECTS.map((project, index) => {
            const indexStr = `0${index + 1} / 0${FEATURED_PROJECTS.length}`;
            
            return (
              <div 
                key={project.id}
                className="py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center"
              >
                {/* Left: Large Project Preview / Mockup (Approx 55-58% width on desktop) */}
                <div className="lg:col-span-7 order-1">
                  <div 
                    onClick={() => onSelectCaseStudy(project)}
                    className="cursor-pointer overflow-hidden rounded-xl border border-zinc-800 hover:border-zinc-600 transition-all duration-300 group bg-[#0a0b0e] shadow-xl hover:shadow-2xl"
                  >
                    <ProjectMockupVisual type={project.visualType} />
                  </div>
                </div>

                {/* Right: Project Information & Actions (Approx 42-45% width on desktop) */}
                <div className="lg:col-span-5 space-y-6 order-2">
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
                    <span className="uppercase tracking-widest text-zinc-400 font-semibold">
                      {project.category}
                    </span>
                    <span>{indexStr}</span>
                  </div>

                  <h3 
                    onClick={() => onSelectCaseStudy(project)}
                    className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-zinc-100 hover:text-zinc-300 transition-colors cursor-pointer leading-tight"
                  >
                    {project.title}
                  </h3>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
                    {project.description}
                  </p>

                  <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/80 text-xs text-zinc-300 space-y-1.5">
                    <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">
                      ENGINEERING FOCUS
                    </div>
                    <p className="text-zinc-300 leading-normal">
                      {project.highlight}
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                      TECH STACK
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="font-mono text-xs px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-wider">
                    <button
                      onClick={() => onSelectCaseStudy(project)}
                      className="inline-flex items-center gap-2 text-zinc-100 font-bold hover:text-zinc-300 transition-colors group cursor-pointer"
                    >
                      <span>VIEW CASE STUDY</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100 transition-colors"
                      >
                        <span>LIVE DEMO</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100 transition-colors"
                      >
                        <span>GITHUB</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
