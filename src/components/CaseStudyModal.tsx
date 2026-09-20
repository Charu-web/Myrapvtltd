import React, { useEffect } from 'react';
import { 
  X, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  Target, 
  Lightbulb, 
  Boxes
} from 'lucide-react';
import { GithubIcon } from './Icons';
import type { FeaturedProject } from '../types';
import { ProjectMockupVisual } from './ProjectMockupVisual';

interface CaseStudyModalProps {
  project: FeaturedProject | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col my-auto text-left">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700">
              {project.category}
            </span>
            <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
              · Case Study
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors focus:outline-none cursor-pointer"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Title & Description */}
          <div className="space-y-2">
            <h2 id="case-study-title" className="text-2xl sm:text-3xl font-display font-bold text-zinc-950 tracking-tight">
              {project.title}
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Visual Mockup */}
          <div className="rounded-xl overflow-hidden border border-zinc-200 shadow-xs">
            <ProjectMockupVisual type={project.visualType} />
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-4 pb-4 border-b border-zinc-100 text-xs font-semibold">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 hover:bg-zinc-200 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            )}
          </div>

          {caseStudy ? (
            <div className="space-y-8 text-sm">
              {/* Problem & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs uppercase tracking-wider">
                    <Target className="w-4 h-4 text-zinc-600" />
                    <span>The Challenge</span>
                  </div>
                  <p className="text-zinc-600 leading-relaxed text-xs sm:text-sm">
                    {caseStudy.problem}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4 text-zinc-600" />
                    <span>Engineering Solution</span>
                  </div>
                  <p className="text-zinc-600 leading-relaxed text-xs sm:text-sm">
                    {caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Key Features &amp; Architecture</span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {caseStudy.keyFeatures.map((feat, i) => (
                    <li key={i} className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Implementation */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-zinc-700" />
                  <span>Technical Implementation Details</span>
                </h3>
                <ul className="space-y-2">
                  {caseStudy.technicalImplementation.map((impl, i) => (
                    <li key={i} className="text-xs text-zinc-600 leading-relaxed flex items-start gap-2">
                      <span className="text-zinc-400 mt-0.5">•</span>
                      <span>{impl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Breakdown */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                  <Boxes className="w-4 h-4 text-zinc-700" />
                  <span>Technology Stack</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {caseStudy.technologyStack.map((stackGroup) => (
                    <div key={stackGroup.category} className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1.5">
                      <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                        {stackGroup.category}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {stackGroup.tools.map((tool) => (
                          <span key={tool} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white border border-zinc-200 text-zinc-700">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome */}
              <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-zinc-600" />
                  <span>Outcome &amp; Key Takeaways</span>
                </div>
                <p className="text-zinc-600 leading-relaxed text-xs sm:text-sm">
                  {caseStudy.outcome}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-sm text-zinc-600">
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                <h4 className="font-semibold text-zinc-900">Engineering Focus</h4>
                <p className="text-xs sm:text-sm leading-relaxed">{project.highlight}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-zinc-900 text-xs">Technologies Used</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-100 border border-zinc-200 text-zinc-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
