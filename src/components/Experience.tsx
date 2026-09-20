import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EXPERIENCE_ITEMS } from '../data/portfolioData';

export const Experience: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section 
      id="experience" 
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-[#ece8df] text-left"
    >
      <div className="pb-10 border-b border-[#ece8df]">
        <h2 className="text-3xl sm:text-4xl font-editorial font-light text-zinc-900 tracking-tight">
          Experience
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 font-sans mt-1">
          Work history and software engineering background.
        </p>
      </div>

      <div className="pt-8 divide-y divide-[#ece8df]">
        {EXPERIENCE_ITEMS.map((item) => (
          <motion.div 
            key={item.id} 
            whileHover={shouldReduceMotion ? {} : { x: 6, scale: 1.008 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="py-8 first:pt-0 last:pb-0 space-y-3 p-4 sm:p-6 rounded-xl hover:bg-white/80 hover:shadow-xs transition-colors duration-300 group cursor-default"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl sm:text-2xl font-editorial font-normal text-zinc-900 group-hover:text-[#2b4b7c] transition-colors">
                    {item.company}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-white px-2 py-0.5 rounded border border-[#ece8df]">
                    {item.status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-zinc-700 mt-0.5">
                  {item.role}
                </p>
              </div>

              <span className="font-mono text-xs text-zinc-400">
                {item.period}
              </span>
            </div>

            <ul className="space-y-1.5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {item.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-zinc-400 mt-0.5">—</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {item.technologies.map((tech) => (
                <span key={tech} className="text-[10px] font-mono text-zinc-500 bg-white px-2 py-0.5 rounded border border-[#ece8df]">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
