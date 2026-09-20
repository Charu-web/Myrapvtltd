import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ProjectMockupVisual } from './ProjectMockupVisual';

export const Lab: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const experiments = [
    {
      id: 'doodle-duel',
      title: 'Doodle Duel AI',
      category: 'Real-Time WebSocket & AI Sketch Classification',
      description: 'Collaborative multiplayer canvas synchronized with OpenAI vision evaluation.',
      technologies: ['React', 'Socket.io', 'OpenAI API', 'Canvas API'],
      visualType: 'doodle-duel' as const,
      githubUrl: 'https://github.com',
    },
    {
      id: 'neon-space-shooter',
      title: 'Neon Space Shooter',
      category: 'Canvas Game Loop & Physics Math',
      description: '60FPS arcade space engine with spatial partition collision & zero garbage collection.',
      technologies: ['JavaScript', 'HTML5 Canvas', 'Game Physics'],
      visualType: 'space-shooter' as const,
      githubUrl: 'https://github.com',
    },
    {
      id: 'bubble-shooter',
      title: 'Bubble Shooter Physics',
      category: 'Hexagonal Grid & Recursive Flood Fill',
      description: 'Ray-casting trajectory projection with recursive cluster drop math.',
      technologies: ['Canvas API', 'Math Physics', 'Algorithms'],
      visualType: 'bubble-shooter' as const,
      githubUrl: 'https://github.com',
    },
  ];

  return (
    <motion.section 
      id="lab" 
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-[#ece8df] text-left"
    >
      <div className="pb-10 border-b border-[#ece8df]">
        <h2 className="text-3xl sm:text-4xl font-editorial font-light text-zinc-900 tracking-tight">
          Lab &amp; Creative Coding
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 font-sans mt-1">
          Interactive 3D math, real-time algorithms, and experimental canvases.
        </p>
      </div>

      <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {experiments.map((exp) => (
          <motion.div 
            key={exp.id}
            whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.02 }}
            transition={{ type: 'spring', damping: 18, stiffness: 220 }}
            className="group flex flex-col bg-white rounded-xl border border-[#ece8df] overflow-hidden hover:border-[#d0cbbf] hover:shadow-md transition-all duration-300"
          >
            <div className="h-44 bg-zinc-950 border-b border-[#ece8df] overflow-hidden">
              <ProjectMockupVisual type={exp.visualType} />
            </div>

            <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  {exp.category}
                </div>
                <h3 className="text-lg font-editorial font-normal text-zinc-900 group-hover:text-[#2b4b7c] transition-colors">
                  {exp.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                  {exp.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#f2efe9] flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {exp.technologies.slice(0, 2).map((t) => (
                    <span key={t} className="text-[9px] font-mono text-zinc-500 bg-[#faf9f6] px-1.5 py-0.5 rounded border border-[#ece8df]">
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={exp.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[#2b4b7c] hover:text-[#1d3557] font-medium transition-colors text-xs"
                >
                  <span>Code</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
