import React from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onCopyEmail: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onCopyEmail }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 bg-[#f7f5f0] border-t border-[#ece8df] text-left text-zinc-600 text-xs font-sans">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 space-y-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#ece8df]">
          <div>
            <div className="text-base font-editorial font-normal text-zinc-900 tracking-wide uppercase">
              CHARU SONKER
            </div>
            <div className="text-zinc-500 text-xs mt-0.5 font-sans">
              Full Stack Developer
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-zinc-600 font-medium">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#2b4b7c] transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#2b4b7c] transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <button
              onClick={onCopyEmail}
              className="hover:text-[#2b4b7c] transition-colors cursor-pointer"
            >
              Email
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-[#2b4b7c] transition-colors ml-2 cursor-pointer font-mono text-[11px] text-zinc-400"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-zinc-400 text-xs font-mono">
          <div>
            © 2026 CHARU SONKER
          </div>
          <div>
            Minimal Editorial Design System
          </div>
        </div>

      </div>
    </footer>
  );
};
