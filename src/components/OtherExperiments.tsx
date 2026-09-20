import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { OTHER_EXPERIMENTS } from '../data/portfolioData';

export const OtherExperiments: React.FC = () => {
  return (
    <section className="py-20 relative border-b border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
        
        <div className="space-y-1 mb-8">
          <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
            // EXPERIMENTAL LAB
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-zinc-100">
            Canvas Physics &amp; Algorithms
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OTHER_EXPERIMENTS.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-lg bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  <span>{exp.category}</span>
                  <span>CANVAS 2D</span>
                </div>

                <h4 className="text-lg font-heading font-bold text-zinc-100">
                  {exp.title}
                </h4>

                <p className="text-zinc-400 text-xs leading-relaxed">
                  {exp.description}
                </p>

                <div className="p-3 rounded bg-[#090a0d] border border-zinc-800 text-[11px] text-zinc-300 font-mono">
                  <strong className="text-zinc-400">Logic: </strong>
                  {exp.highlight}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {exp.technologies.map(t => (
                    <span key={t} className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 text-[10px] font-mono">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {exp.githubUrl && (
                    <a
                      href={exp.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-400 hover:text-white transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {exp.liveUrl && (
                    <a
                      href={exp.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-400 hover:text-white transition-colors"
                      aria-label="Live Demo"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
