import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { FeaturedProject } from '../types';
import { ProjectMockupVisual } from './ProjectMockupVisual';

interface ProjectCard3DProps {
  project: FeaturedProject;
  onSelectCaseStudy: (project: FeaturedProject) => void;
  isFeatured?: boolean;
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
  project,
  onSelectCaseStudy,
  isFeatured = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Mouse Coordinates inside card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 220, mass: 0.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-7, 7]);
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="VIEW"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative flex flex-col bg-white rounded-xl border border-[#ece8df] overflow-hidden transition-all duration-300 ${
        isFeatured
          ? 'md:col-span-2 shadow-sm border-[#ded8cb]'
          : 'hover:border-[#d0cbbf] hover:shadow-md'
      }`}
    >
      <motion.div
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full flex flex-col flex-grow"
      >
        {/* Dynamic 3D Specular Highlight Overlay */}
        {!shouldReduceMotion && isHovered && (
          <motion.div
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.28) 0%, transparent 60%)`,
            }}
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
          />
        )}

        {/* Project Visual Display Frame */}
        <div 
          onClick={() => onSelectCaseStudy(project)}
          className={`cursor-pointer overflow-hidden bg-zinc-950 relative flex items-center justify-center border-b border-[#ece8df] ${
            isFeatured ? 'aspect-[21/9] sm:aspect-[2/1]' : 'aspect-[16/10]'
          }`}
        >
          <motion.div 
            style={{ transform: isHovered && !shouldReduceMotion ? 'translateZ(24px) scale(1.02)' : 'translateZ(0px) scale(1)' }}
            className="w-full h-full transition-transform duration-300"
          >
            <ProjectMockupVisual type={project.visualType} />
          </motion.div>

          {isFeatured && (
            <div className="absolute top-3 left-3 bg-[#2b4b7c] text-white text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded shadow-xs z-20">
              Featured 3D Showcase
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              <span>{project.category}</span>
              <span className="text-zinc-500 font-sans lowercase">{project.filterCategory}</span>
            </div>

            <h3 
              onClick={() => onSelectCaseStudy(project)}
              className="text-xl sm:text-2xl font-editorial font-normal text-zinc-900 group-hover:text-[#2b4b7c] transition-colors cursor-pointer"
            >
              {project.title}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
              {project.description}
            </p>
          </div>

          {/* Footer Tech Stack & Links */}
          <div className="pt-3 border-t border-[#f2efe9] flex items-center justify-between text-xs">
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 4).map((tech) => (
                <span 
                  key={tech} 
                  className="text-[10px] font-mono text-zinc-500 bg-[#faf9f6] px-2 py-0.5 rounded border border-[#ece8df]"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-[10px] font-mono text-zinc-400 px-1 py-0.5">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 font-sans text-xs">
              <button
                onClick={() => onSelectCaseStudy(project)}
                className="inline-flex items-center gap-1 text-[#2b4b7c] hover:text-[#1d3557] font-medium transition-colors cursor-pointer"
              >
                <span>{isFeatured ? 'VIEW CASE STUDY' : 'Details'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-zinc-800 transition-colors inline-flex items-center gap-0.5"
                  title="Live Demo"
                >
                  <span>Live</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-zinc-800 transition-colors"
                  title="Source Code"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};
