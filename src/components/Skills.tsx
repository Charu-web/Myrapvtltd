import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';

interface InteractiveSkillItemProps {
  name: string;
}

const InteractiveSkillItem: React.FC<InteractiveSkillItemProps> = ({ name }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.05, color: '#2b4b7c' }}
      transition={{ type: 'spring', damping: 15, stiffness: 300 }}
      className="inline-block cursor-default transition-colors duration-200"
    >
      {name}
    </motion.span>
  );
};

export const Skills: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section 
      id="skills" 
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-[#ece8df] text-left"
    >
      <div className="pb-10 border-b border-[#ece8df]">
        <h2 className="text-3xl sm:text-4xl font-editorial font-light text-zinc-900 tracking-tight">
          Skills &amp; Tooling
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 font-sans mt-1">
          Interactive technology directory. Hover over skills for micro-parallax depth.
        </p>
      </div>

      <div className="pt-8 divide-y divide-[#ece8df]">
        {SKILL_CATEGORIES.map((cat) => (
          <div key={cat.id} className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-8 items-baseline">
            <div className="sm:col-span-4">
              <h3 className="font-editorial text-lg text-zinc-900 font-normal">
                {cat.title}
              </h3>
            </div>
            <div className="sm:col-span-8">
              <div className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans flex flex-wrap gap-x-2 gap-y-1">
                {cat.skills.map((skill, index) => (
                  <React.Fragment key={skill}>
                    <InteractiveSkillItem name={skill} />
                    {index < cat.skills.length - 1 && (
                      <span className="text-zinc-400 select-none">,</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};
