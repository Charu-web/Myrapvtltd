import React from 'react';
import { motion } from 'framer-motion';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  tags: string[];
}

const SERVICES_LIST: ServiceItem[] = [
  {
    number: '01',
    title: 'Full Stack Web Applications',
    description:
      'End-to-end web applications built with React, Node.js, Express, and MongoDB. Clean component architecture paired with robust backend APIs and secure data models.',
    tags: ['React.js', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    number: '02',
    title: 'AI-Integrated Applications',
    description:
      'Practical AI integration utilizing OpenAI GPT-4 APIs, prompt engineering pipelines, dynamic sketch classification, and intelligent data transformation.',
    tags: ['OpenAI API', 'Prompt Engineering', 'AI Pipelines', 'Canvas AI'],
  },
  {
    number: '03',
    title: 'CRM & Business Systems',
    description:
      'Tailored operational systems featuring role-based access control (RBAC), multi-stage workflow pipelines, document verification, and operational dashboards.',
    tags: ['RBAC', 'Pipelines', 'JWT Auth', 'Dashboards'],
  },
  {
    number: '04',
    title: 'Real-Time Web Applications',
    description:
      'Low-latency bidirectional systems with Socket.io and WebSockets. Delta-compressed state synchronization, collaborative canvas, and multi-user room management.',
    tags: ['Socket.io', 'WebSockets', 'Real-Time Sync', 'Lobby State'],
  },
  {
    number: '05',
    title: 'Responsive Frontend Experiences',
    description:
      'High-performance, editorial user interfaces with smooth micro-interactions, responsive typography, HTML5 Canvas graphics, and fluid cross-device layouts.',
    tags: ['Tailwind CSS', 'Framer Motion', 'HTML5 Canvas', 'Responsive UI'],
  },
  {
    number: '06',
    title: 'Web & Mobile Applications',
    description:
      'Cross-platform digital solutions focusing on performance, modular codebases, intuitive usability, and seamless client-side experience.',
    tags: ['React Native / Web', 'JavaScript', 'State Management', 'UI/UX'],
  },
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-28 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-[#ece8df]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest block mb-3">
            05 / CAPABILITIES
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl font-light text-[#2b4b7c] tracking-tight">
            What I Build
          </h2>
        </div>
        <p className="font-sans text-sm text-zinc-600 max-w-md leading-relaxed">
          From concept and system architecture to production deployment. Focused on clean engineering, responsiveness, and practical business value.
        </p>
      </div>

      {/* Services Grid (Numbered Editorial Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES_LIST.map((service, index) => (
          <motion.div
            key={service.number}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-[#f7f5f0] border border-[#ece8df] rounded-lg p-7 hover:border-[#2b4b7c]/30 hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Number and accent */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs font-semibold text-[#2b4b7c]/70 tracking-widest">
                  {service.number}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#2b4b7c]/20 group-hover:bg-[#2b4b7c] transition-colors" />
              </div>

              {/* Service Title */}
              <h3 className="font-editorial text-2xl font-light text-zinc-900 group-hover:text-[#2b4b7c] transition-colors mb-3 leading-snug">
                {service.title}
              </h3>

              {/* Service Description */}
              <p className="font-sans text-xs text-zinc-600 leading-relaxed mb-6">
                {service.description}
              </p>
            </div>

            {/* Service Tags */}
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#ece8df]/60">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] text-zinc-500 bg-[#edeae1] px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
