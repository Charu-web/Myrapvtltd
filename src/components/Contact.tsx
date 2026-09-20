import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MapPin, Copy } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactProps {
  onCopyEmail: () => void;
  copiedEmail: boolean;
}

export const Contact: React.FC<ContactProps> = ({ onCopyEmail, copiedEmail }) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Magnetic Button Spring Physics
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const smoothBtnX = useSpring(btnX, springConfig);
  const smoothBtnY = useSpring(btnY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    btnX.set((e.clientX - centerX) * 0.35);
    btnY.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  return (
    <motion.section 
      id="contact" 
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="py-24 md:py-32 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-[#ece8df] text-left"
    >
      <div className="max-w-3xl space-y-8">
        
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl font-editorial font-light text-zinc-900 tracking-tight">
            LET'S BUILD SOMETHING.
          </h2>
          <p className="text-sm text-zinc-500 font-sans">
            Open for full-time engineering roles, AI product development, and contract builds.
          </p>
        </div>

        <div className="space-y-5 pt-2">
          <div>
            <button
              onClick={onCopyEmail}
              data-cursor="MAIL"
              className="group font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#2b4b7c] hover:text-[#1d3557] transition-colors flex items-center gap-3 cursor-pointer"
            >
              <span>{PERSONAL_INFO.email}</span>
              {copiedEmail ? (
                <span className="font-mono text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Copied!
                </span>
              ) : (
                <Copy className="w-4 h-4 text-zinc-400 group-hover:text-[#2b4b7c] transition-colors" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            <span>{PERSONAL_INFO.location}</span>
          </div>

          {/* Magnetic CTA Button */}
          <div className="pt-6">
            <motion.a
              ref={buttonRef}
              href={`mailto:${PERSONAL_INFO.email}?subject=Project%20Inquiry%20-%20Charu%20Sonker`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                x: smoothBtnX,
                y: smoothBtnY,
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2b4b7c] text-white font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#1e385f] transition-colors shadow-sm cursor-pointer"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

      </div>
    </motion.section>
  );
};
