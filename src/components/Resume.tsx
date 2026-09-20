import React from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Resume: React.FC = () => {
  return (
    <section id="resume" className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-[#ece8df] text-left">
      <div className="pb-10 border-b border-[#ece8df] flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-light text-zinc-900 tracking-tight">
            Resume
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-sans mt-1">
            Overview of professional qualifications and full-stack technical background.
          </p>
        </div>

        <a
          href={`mailto:${PERSONAL_INFO.email}?subject=Resume%20Request%20-%20Charu%20Sonker`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2b4b7c] hover:text-[#1d3557] transition-colors self-start sm:self-auto"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Request Full PDF</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs sm:text-sm">
        <div className="space-y-2">
          <div className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
            CORE ROLE
          </div>
          <p className="font-editorial text-lg text-zinc-900">
            Full Stack Developer (MERN)
          </p>
          <p className="text-zinc-600 leading-relaxed">
            AI-Integrated Web Applications, Web &amp; Mobile App Development.
          </p>
        </div>

        <div className="space-y-2">
          <div className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
            EXPERIENCE
          </div>
          <p className="font-editorial text-lg text-zinc-900">
            Empire IT Xpert &amp; Hi-Tech Eng.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            Production web platforms, real-time architectures, CRM tools, and scalable REST APIs.
          </p>
        </div>

        <div className="space-y-2">
          <div className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
            STATUS &amp; LOCATION
          </div>
          <p className="font-editorial text-lg text-zinc-900">
            Lucknow, India · Open to Roles
          </p>
          <p className="text-zinc-600 leading-relaxed">
            Available for full-time software engineering roles and selected contract opportunities.
          </p>
        </div>
      </div>
    </section>
  );
};
