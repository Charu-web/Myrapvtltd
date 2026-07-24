import { motion } from "framer-motion";
import { Headphones, Settings, Plus } from "lucide-react";
import SearchBar from "./SearchBar";
import NotificationMenu from "./NotificationMenu";

export default function Header() {
  return (
    <header className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-brand-red text-sm font-extrabold text-white">
            CH
          </div>
          <div className="leading-tight">
            <p className="text-sm font-extrabold text-ink-900">Business</p>
            <p className="-mt-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-500">
              Account
            </p>
          </div>
        </div>

        <SearchBar />

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Support"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ink-100"
          >
            <Headphones size={18} />
          </button>
          <NotificationMenu />
          <button
            type="button"
            aria-label="Settings"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ink-100"
          >
            <Settings size={18} />
          </button>
          <button
            type="button"
            aria-label="Profile"
            className="ml-1 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-ink-900 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            <span aria-hidden>CH</span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900">
            Marketing Center
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Promote your restaurant and reach more customers.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          className="flex items-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-sm font-semibold text-white shadow-card transition-colors hover:bg-black"
        >
          <Plus size={16} />
          Create New Campaign
        </motion.button>
      </div>
    </header>
  );
}
