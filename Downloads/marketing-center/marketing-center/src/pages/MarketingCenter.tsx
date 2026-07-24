import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import CampaignCard from "../components/CampaignCard";
import MarketingCard from "../components/MarketingCard";
import InsightPanel from "../components/InsightPanel";
import Footer from "../components/Footer";
import { campaigns, marketingTools, type CampaignStatus } from "../data/marketingData";

const statusFilters: { id: CampaignStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "scheduled", label: "Scheduled" },
  { id: "paused", label: "Paused" },
];

export default function MarketingCenter() {
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | "all">("all");

  const filteredCampaigns = useMemo(
    () =>
      statusFilter === "all"
        ? campaigns
        : campaigns.filter((c) => c.status === statusFilter),
    [statusFilter]
  );

  return (
    <div className="flex min-h-full flex-col gap-8">
      <Header />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex-1 flex flex-col gap-6">
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-3xl bg-campaign-gradient p-5 shadow-panel"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-bold text-white">Active Campaigns</h2>
              <div className="flex items-center gap-1.5">
                {statusFilters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setStatusFilter(filter.id)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                      statusFilter === filter.id
                        ? "bg-white text-brand-red-dark"
                        : "bg-white/15 text-white hover:bg-white/25"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {filteredCampaigns.length === 0 ? (
                <p className="rounded-2xl bg-white/10 p-4 text-center text-sm text-white/80">
                  No campaigns match this filter.
                </p>
              ) : (
                filteredCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))
              )}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <div className="mb-4 rounded-full bg-gradient-to-r from-sky-100 via-sky-50 to-transparent px-4 py-2">
              <h2 className="text-sm font-bold text-ink-900">Marketing Tools</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {marketingTools.map((tool) => (
                <MarketingCard key={tool.id} tool={tool} />
              ))}
            </div>
          </motion.section>
        </div>

        <InsightPanel />
      </div>

      <Footer />
    </div>
  );
}
