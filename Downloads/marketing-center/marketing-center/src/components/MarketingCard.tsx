import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { MarketingTool } from "../data/marketingData";

interface MarketingCardProps {
  tool: MarketingTool;
}

export default function MarketingCard({ tool }: MarketingCardProps) {
  const Icon = tool.icon;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-ink-100 bg-white p-4 shadow-card"
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-sky-50" />

      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-ink-900 text-white">
        <Icon size={16} />
      </div>

      <div className="relative">
        <p className="text-sm font-semibold text-ink-900">{tool.title}</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-500">{tool.description}</p>
      </div>

      <button
        type="button"
        className="relative mt-1 flex w-fit items-center gap-1 text-xs font-semibold text-brand-red transition-colors hover:text-brand-red-dark"
      >
        Configure
        <ArrowRight size={12} />
      </button>
    </motion.div>
  );
}
