import React from 'react';
import { 
  Sliders, 
  Grid, 
  Rocket, 
  Zap, 
  ShieldCheck, 
  Users, 
  Sparkles,
  LayoutDashboard,
  Layers,
  Globe,
  Radio,
  FileText
} from 'lucide-react';

interface VisualProps {
  type: 'pixel-art' | 'space-shooter' | 'doodle-duel' | 'dsa-crm' | 'hda-production' | 'yuvahub' | 'dsa-sathi-crm' | 'bubble-shooter';
}

export const ProjectMockupVisual: React.FC<VisualProps> = ({ type }) => {
  if (type === 'pixel-art') {
    return (
      <div className="w-full h-full min-h-[220px] bg-zinc-950 p-4 font-mono text-xs flex flex-col justify-between text-zinc-300">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-[11px]">
          <span className="text-zinc-400 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" /> Pixel Quantizer Engine
          </span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-200 text-[10px]">
            16 Colors
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 my-3">
          <div className="bg-zinc-900 rounded p-2 border border-zinc-800 flex flex-col items-center justify-center">
            <span className="text-[10px] text-zinc-500 mb-1">Source Buffer</span>
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-zinc-600 to-zinc-200 opacity-60 blur-xs" />
          </div>

          <div className="bg-zinc-900 rounded p-2 border border-zinc-800 flex flex-col items-center justify-center">
            <span className="text-[10px] text-emerald-400 mb-1 flex items-center gap-1">
              <Grid className="w-2.5 h-2.5" /> Quantized
            </span>
            <div className="grid grid-cols-6 gap-[1px] w-16 h-16 bg-black p-1 rounded">
              {Array.from({ length: 36 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`${i % 3 === 0 ? 'bg-zinc-200' : i % 2 === 0 ? 'bg-zinc-500' : 'bg-zinc-800'} rounded-[1px]`} 
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-zinc-900 px-2.5 py-1.5 rounded border border-zinc-800 text-[10px]">
          <span className="text-zinc-400 flex items-center gap-1">
            <Sliders className="w-3 h-3 text-zinc-400" /> K-Means Color Clustering
          </span>
          <div className="flex gap-1">
            {['#f4f4f5', '#a1a1aa', '#71717a', '#3f3f46'].map((c, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'space-shooter') {
    return (
      <div className="w-full h-full min-h-[220px] bg-[#070913] p-4 font-mono text-xs flex flex-col justify-between text-zinc-300 relative overflow-hidden">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-[11px]">
          <span className="text-cyan-400 font-medium flex items-center gap-1.5">
            <Rocket className="w-3.5 h-3.5 text-cyan-400" /> Canvas Arcade (60 FPS)
          </span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px]">
            Score: 4,850
          </span>
        </div>

        <div className="my-3 h-28 bg-[#04060c] rounded border border-zinc-800/80 relative flex items-center justify-center overflow-hidden">
          <div className="absolute top-3 left-1/4 w-3 h-3 rounded-full bg-rose-500 shadow-sm" />
          <div className="absolute top-5 right-1/3 w-4 h-4 rounded-full bg-purple-500 shadow-sm" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-0.5 h-6 bg-cyan-400 shadow-xs" />
            <div className="w-6 h-6 border-b-2 border-l-2 border-r-2 border-cyan-400 rotate-45" />
          </div>
        </div>

        <div className="flex items-center justify-between bg-zinc-900/90 px-2.5 py-1.5 rounded border border-zinc-800 text-[10px] text-zinc-400">
          <span className="flex items-center gap-1 text-zinc-300">
            <Zap className="w-3 h-3 text-amber-400" /> Zero Garbage Collection
          </span>
          <span>Object Pooling</span>
        </div>
      </div>
    );
  }

  if (type === 'doodle-duel') {
    return (
      <div className="w-full h-full min-h-[220px] bg-zinc-950 p-4 font-mono text-xs flex flex-col justify-between text-zinc-300">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-[11px]">
          <span className="text-zinc-300 font-medium flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-zinc-400" /> Socket.io Multi-User Arena
          </span>
          <span className="text-emerald-400 text-[10px] flex items-center gap-1">
            <Radio className="w-3 h-3" /> LIVE (42ms)
          </span>
        </div>

        <div className="my-3 h-28 bg-zinc-900 rounded border border-zinc-800 p-2.5 flex flex-col justify-between relative">
          <div className="flex justify-between items-center text-[10px] text-zinc-500">
            <span>Canvas Delta Sync</span>
            <span className="text-amber-400 font-semibold">AI Match: 98% "Guitar"</span>
          </div>
          
          <div className="h-14 flex items-center justify-center relative">
            <svg className="w-full h-12 stroke-zinc-200 fill-none" strokeWidth="2">
              <path d="M 20 30 Q 60 5, 100 25 T 180 20 T 260 30" />
            </svg>
          </div>

          <div className="text-[10px] text-zinc-400 flex justify-between">
            <span>P1: Drawing</span>
            <span className="text-zinc-500">P2: Guessing</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-zinc-900 px-2.5 py-1.5 rounded border border-zinc-800 text-[10px] text-zinc-400">
          <span>OpenAI Vision / Classification</span>
          <span className="text-zinc-300 font-semibold">JWT Session Auth</span>
        </div>
      </div>
    );
  }

  if (type === 'dsa-crm' || type === 'dsa-sathi-crm') {
    return (
      <div className="w-full h-full min-h-[220px] bg-zinc-950 p-4 font-mono text-xs flex flex-col justify-between text-zinc-300">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-[11px]">
          <span className="text-zinc-300 font-medium flex items-center gap-1.5">
            <LayoutDashboard className="w-3.5 h-3.5 text-zinc-400" /> Operations Pipeline
          </span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px]">
            RBAC Protected
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 my-3 text-[10px]">
          <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
            <span className="text-zinc-500">Leads</span>
            <div className="text-base font-bold text-zinc-100 mt-1">1,240</div>
          </div>
          <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
            <span className="text-zinc-500">Verified</span>
            <div className="text-base font-bold text-emerald-400 mt-1">94%</div>
          </div>
          <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
            <span className="text-zinc-500">Active</span>
            <div className="text-base font-bold text-zinc-100 mt-1">18 Agents</div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-zinc-900 px-2.5 py-1.5 rounded border border-zinc-800 text-[10px] text-zinc-400">
          <span className="flex items-center gap-1 text-zinc-300">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Multi-Tier Permissions
          </span>
          <span>MongoDB Indexing</span>
        </div>
      </div>
    );
  }

  if (type === 'hda-production') {
    return (
      <div className="w-full h-full min-h-[220px] bg-zinc-950 p-4 font-mono text-xs flex flex-col justify-between text-zinc-300">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-[11px]">
          <span className="text-zinc-300 font-medium flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-zinc-400" /> HDA Production Platform
          </span>
          <span className="text-emerald-400 text-[10px]">Deployed</span>
        </div>

        <div className="my-3 h-28 bg-zinc-900 rounded border border-zinc-800 p-3 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-zinc-600" />
            <div className="w-2 h-2 rounded-full bg-zinc-600" />
            <div className="w-2 h-2 rounded-full bg-zinc-600" />
            <span className="text-[10px] text-zinc-500 ml-1">hdaproduction.com</span>
          </div>

          <div className="space-y-1.5 py-1">
            <div className="h-2.5 bg-zinc-800 rounded w-3/4" />
            <div className="h-2.5 bg-zinc-800/60 rounded w-1/2" />
          </div>

          <div className="flex justify-between items-center text-[10px] text-zinc-500 pt-1 border-t border-zinc-800">
            <span>Media Showcase Engine</span>
            <span>REST API Integration</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-zinc-900 px-2.5 py-1.5 rounded border border-zinc-800 text-[10px] text-zinc-400">
          <span>React · Express · Node.js</span>
          <span className="text-zinc-300">Client Portal</span>
        </div>
      </div>
    );
  }

  if (type === 'yuvahub') {
    return (
      <div className="w-full h-full min-h-[220px] bg-zinc-950 p-4 font-mono text-xs flex flex-col justify-between text-zinc-300">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-[11px]">
          <span className="text-zinc-300 font-medium flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-zinc-400" /> YuvaHub Career Portal
          </span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px]">
            Community Hub
          </span>
        </div>

        <div className="my-3 h-28 bg-zinc-900 rounded border border-zinc-800 p-3 flex flex-col justify-between">
          <div className="flex justify-between items-center text-[10px] text-zinc-400">
            <span>Event &amp; Opportunity Directory</span>
            <span className="text-emerald-400">Active</span>
          </div>

          <div className="grid grid-cols-2 gap-2 my-1">
            <div className="bg-zinc-950 p-1.5 rounded border border-zinc-800 text-[9px] text-zinc-400">
              Tech Mentorship
            </div>
            <div className="bg-zinc-950 p-1.5 rounded border border-zinc-800 text-[9px] text-zinc-400">
              Career Resources
            </div>
          </div>

          <div className="text-[10px] text-zinc-500">
            Interactive Search &amp; Filter Logic
          </div>
        </div>

        <div className="flex items-center justify-between bg-zinc-900 px-2.5 py-1.5 rounded border border-zinc-800 text-[10px] text-zinc-400">
          <span>Dynamic Data Fetching</span>
          <span className="text-zinc-300">Responsive UI</span>
        </div>
      </div>
    );
  }

  // Fallback: bubble-shooter
  return (
    <div className="w-full h-full min-h-[220px] bg-zinc-950 p-4 font-mono text-xs flex flex-col justify-between text-zinc-300">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-[11px]">
        <span className="text-zinc-300 font-medium flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-zinc-400" /> Bubble Shooter Physics
        </span>
        <span className="text-zinc-400 text-[10px]">HTML5 Canvas</span>
      </div>

      <div className="my-3 h-28 bg-zinc-900 rounded border border-zinc-800 p-2 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="flex gap-2 mb-2">
          <span className="w-4 h-4 rounded-full bg-cyan-400" />
          <span className="w-4 h-4 rounded-full bg-rose-400" />
          <span className="w-4 h-4 rounded-full bg-amber-400" />
          <span className="w-4 h-4 rounded-full bg-cyan-400" />
        </div>
        <div className="flex gap-2">
          <span className="w-4 h-4 rounded-full bg-rose-400" />
          <span className="w-4 h-4 rounded-full bg-amber-400" />
          <span className="w-4 h-4 rounded-full bg-cyan-400" />
        </div>
      </div>

      <div className="flex items-center justify-between bg-zinc-900 px-2.5 py-1.5 rounded border border-zinc-800 text-[10px] text-zinc-400">
        <span>Recursive Flood Fill Math</span>
        <span className="text-zinc-300">Ray Trajectory</span>
      </div>
    </div>
  );
};
