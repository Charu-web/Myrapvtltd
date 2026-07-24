import { motion } from "framer-motion";
import { Star, Truck, Pencil, Pause, Trash2 } from "lucide-react";
import type { Campaign } from "../data/marketingData";

const statusStyles: Record<Campaign["status"], string> = {
  live: "bg-emerald-100 text-emerald-700",
  scheduled: "bg-sky-100 text-sky-700",
  paused: "bg-amber-100 text-amber-700",
  ended: "bg-ink-100 text-ink-500",
};

const statusLabel: Record<Campaign["status"], string> = {
  live: "Live",
  scheduled: "Scheduled",
  paused: "Paused",
  ended: "Ended",
};

interface CampaignCardProps {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const Icon = campaign.icon === "star" ? Star : Truck;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-card sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            campaign.icon === "star"
              ? "bg-brand-amber/15 text-brand-amber"
              : "bg-sky-100 text-sky-600"
          }`}
        >
          <Icon size={18} fill={campaign.icon === "star" ? "currentColor" : "none"} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-ink-900">{campaign.title}</p>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusStyles[campaign.status]}`}
            >
              {statusLabel[campaign.status]}
            </span>
          </div>
          <p className="text-xs text-ink-500">{campaign.subtitle}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-6 sm:justify-end">
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wide text-ink-500">Impressions</p>
          <p className="text-sm font-semibold text-ink-900">{campaign.impressions}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wide text-ink-500">Clicks</p>
          <p className="text-sm font-semibold text-ink-900">{campaign.clicks}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wide text-ink-500">Conv.</p>
          <p
            className={`text-sm font-semibold ${
              campaign.conversionTrend === "up" ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {campaign.conversion}
          </p>
        </div>

        <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            type="button"
            aria-label="Edit campaign"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 hover:text-ink-900"
          >
            <Pencil size={14} />
          </button>
          <button
            type="button"
            aria-label="Pause campaign"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 hover:text-ink-900"
          >
            <Pause size={14} />
          </button>
          <button
            type="button"
            aria-label="Delete campaign"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
