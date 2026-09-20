import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'project' | 'mail'>('default');
  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(pointer: coarse)').matches;
  });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 24, stiffness: 350, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check for hover target custom data attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor');
        if (type === 'VIEW') {
          setCursorVariant('project');
          setCursorText('VIEW');
        } else if (type === 'MAIL') {
          setCursorVariant('mail');
          setCursorText('MAIL');
        } else if (type === 'CLICK') {
          setCursorVariant('hover');
          setCursorText('');
        }
      } else if (target.closest('a, button, input, textarea')) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isTouchDevice]);

  if (isTouchDevice || shouldReduceMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      <motion.div
        animate={{
          width: cursorVariant === 'project' || cursorVariant === 'mail' ? 56 : cursorVariant === 'hover' ? 32 : 12,
          height: cursorVariant === 'project' || cursorVariant === 'mail' ? 56 : cursorVariant === 'hover' ? 32 : 12,
          backgroundColor: cursorVariant === 'project' || cursorVariant === 'mail' 
            ? 'rgba(43, 75, 124, 0.9)' 
            : cursorVariant === 'hover' 
              ? 'rgba(43, 75, 124, 0.15)' 
              : 'rgba(43, 75, 124, 0.85)',
          borderColor: cursorVariant === 'hover' ? 'rgba(43, 75, 124, 0.4)' : 'transparent',
          borderWidth: cursorVariant === 'hover' ? 1 : 0,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="rounded-full flex items-center justify-center text-white font-mono text-[10px] tracking-wider uppercase backdrop-blur-2xs shadow-xs"
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="font-bold text-[9px]"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};
