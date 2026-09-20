import React, { useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue, useReducedMotion } from 'framer-motion';

interface HeroPhotoMotionProps {
  mouseX: number;
  mouseY: number;
}

export const HeroPhotoMotion: React.FC<HeroPhotoMotionProps> = ({ mouseX, mouseY }) => {
  const shouldReduceMotion = useReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Dynamic spring values for smooth mouse parallax
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  React.useEffect(() => {
    rawMouseX.set(mouseX);
    rawMouseY.set(mouseY);
  }, [mouseX, mouseY, rawMouseX, rawMouseY]);

  const springConfig = { damping: 28, stiffness: 110, mass: 0.3 };
  const smoothX = useSpring(rawMouseX, springConfig);
  const smoothY = useSpring(rawMouseY, springConfig);

  const photoParallaxX = useTransform(smoothX, [-400, 400], [-10, 10]);
  const photoParallaxY = useTransform(smoothY, [-400, 400], [-8, 8]);
  const photoRotate = useTransform(smoothX, [-400, 400], [-2, 2]);

  const editorialEase = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
      {/* Interactive Mouse Parallax Layer */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : photoParallaxX,
          y: shouldReduceMotion ? 0 : photoParallaxY,
          rotate: shouldReduceMotion ? 0 : photoRotate,
        }}
        className="relative flex items-center justify-center pointer-events-none"
      >
        {/* Continuous Subtle Floating & Breathing Movement */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [-4, 4, -4],
                  x: [-2, 2, -2],
                  rotate: [-0.8, 0.8, -0.8],
                  scale: [0.99, 1.01, 0.99],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative flex items-center justify-center pointer-events-none"
        >
          {/* Photo Only: Zero Card, Zero Border, Zero Shadow Box, Zero Layout Displacement */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, scale: 0.88, y: 16 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.0,
              delay: 0.45,
              ease: editorialEase,
            }}
            className="w-28 h-36 sm:w-36 sm:h-48 md:w-44 md:h-56 lg:w-48 lg:h-60 overflow-hidden relative pointer-events-none"
            style={{
              // Soft organic editorial silhouette mask with no hard card edges
              maskImage: 'radial-gradient(ellipse at center, black 65%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 65%, transparent 100%)',
            }}
          >
            {/* Direct Personal Photograph */}
            {!imageError ? (
              <img
                src="/images/charu-hero.jpg"
                alt="Charu Sonker"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover object-center filter contrast-[1.03] transition-opacity duration-700 pointer-events-none ${
                  imageLoaded ? 'opacity-95' : 'opacity-0'
                }`}
                loading="eager"
                decoding="async"
              />
            ) : null}

            {/* Subtle transparent fallback initial if charu-hero.jpg not yet mounted */}
            {(!imageLoaded || imageError) && (
              <div className="w-full h-full flex flex-col items-center justify-center pointer-events-none text-zinc-400">
                <span className="font-editorial text-4xl sm:text-5xl text-[#2b4b7c]/40 font-light select-none">
                  CS
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
