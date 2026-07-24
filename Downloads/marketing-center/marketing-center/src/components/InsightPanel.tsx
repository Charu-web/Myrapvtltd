import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import InsightChart from "./InsightChart";
import { insightSummary, recentActivity } from "../data/marketingData";

export default function InsightPanel() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
      className="flex w-full flex-col gap-5 rounded-2xl border border-ink-100 bg-white/80 p-5 shadow-panel backdrop-blur-sm lg:w-[280px]"
    >
      <h2 className="text-sm font-bold text-ink-900">Marketing Insights</h2>

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-500">
          {insightSummary.totalReachLabel}
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-ink-900">
            {insightSummary.totalReach}
          </span>
          <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
            <TrendingUp size={12} />
            {insightSummary.reachGrowth}
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "72%" }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-brand-amber to-brand-orange"
          />
        </div>
      </div>

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-500">
          {insightSummary.estimatedRoiLabel}
        </p>
        <p className="mt-1 text-2xl font-extrabold text-ink-900">
          {insightSummary.estimatedRoi}
        </p>
        <InsightChart />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-bold text-ink-900">Recent History</p>
        </div>
        <ul className="flex flex-col gap-2.5">
          {recentActivity.map((item) => (
            <li key={item.id} className="flex items-center justify-between text-xs">
              <div>
                <p className="font-medium text-ink-900">{item.title}</p>
                <p className="text-ink-500">{item.detail}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2 py-1 font-semibold text-emerald-700">
                {item.roi}
              </span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-3 w-full text-center text-xs font-semibold text-brand-amber transition-colors hover:text-brand-orange"
        >
          View All History
        </button>
      </div>
    </motion.aside>
  );
}
