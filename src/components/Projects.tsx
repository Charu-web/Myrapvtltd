import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ALL_PROJECTS } from '../data/portfolioData';
import type { FeaturedProject } from '../types';
import { ProjectCard3D } from './ProjectCard3D';

interface ProjectsProps {
  onSelectCaseStudy: (project: FeaturedProject) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectCaseStudy }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Web' | 'App'>('All');
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = ALL_PROJECTS.filter((project) => {
    if (activeFilter === 'All') return true;
    return project.filterCategory === activeFilter;
  });

  return (
    <motion.section 
      id="projects" 
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="py-24 md:py-32 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-[#ece8df]"
    >
      {/* Header & Minimal Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 pb-12 border-b border-[#ece8df] text-left">
        <div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-light text-zinc-900 tracking-tight">
            Projects
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-sans mt-1">
            Selected 3D product showcases, interactive web systems, and full-stack applications.
          </p>
        </div>

        {/* Minimal Filters: All, Web, App */}
        <div className="flex items-center gap-6 text-xs font-sans tracking-wide">
          {(['All', 'Web', 'App'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`transition-colors cursor-pointer py-1 ${
                activeFilter === filter
                  ? 'text-[#2b4b7c] font-semibold border-b border-[#2b4b7c]'
                  : 'text-zinc-400 hover:text-zinc-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Interactive Project Showcase Grid */}
      <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 text-left">
        {filteredProjects.map((project, index) => (
          <ProjectCard3D
            key={project.id}
            project={project}
            onSelectCaseStudy={onSelectCaseStudy}
            isFeatured={index === 0 && activeFilter === 'All'}
          />
        ))}
      </div>

    </motion.section>
  );
};
