import { useState } from "react";
import { motion } from "framer-motion";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { primaryNav, bottomNav, type NavItem } from "../data/marketingData";

interface SidebarProps {
  activeId?: string;
}

function NavRow({
  item,
  isActive,
  collapsed,
  emphasis = "default",
}: {
  item: NavItem;
  isActive: boolean;
  collapsed: boolean;
  emphasis?: "default" | "solid";
}) {
  const Icon = item.icon;

  const base =
    "group relative flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ease-out";

  if (emphasis === "solid") {
    return (
      <button
        type="button"
        className={`${base} bg-ink-900 text-white hover:bg-black justify-center`}
      >
        <Icon size={17} strokeWidth={2} className="shrink-0" />
        {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`${base} ${
        isActive
          ? "bg-white text-brand-red-dark shadow-md"
          : "text-white/85 hover:bg-white/10 hover:text-white"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon
        size={17}
        strokeWidth={2}
        className={`shrink-0 transition-transform duration-200 ${
          isActive ? "" : "group-hover:translate-x-0.5"
        }`}
      />
      {!collapsed && (
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          {item.label}
        </span>
      )}
    </button>
  );
}

export default function Sidebar({ activeId = "marketing" }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`relative flex h-full flex-col rounded-[30px] bg-sidebar-gradient shadow-sidebar transition-all duration-300 ${
        collapsed ? "w-[84px]" : "w-[248px]"
      }`}
    >
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-8 flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-red-dark shadow-card transition-transform hover:scale-105"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />}
      </button>

      <div className="flex flex-col gap-1 overflow-y-auto scrollbar-none px-4 pb-4 pt-6">
        <div
          className={`mb-4 flex items-center justify-center rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white ${
            collapsed ? "mx-auto w-fit" : ""
          }`}
        >
          {collapsed ? "•" : "Active Now"}
        </div>

        <nav className="flex flex-col gap-1">
          {primaryNav.map((item) => (
            <NavRow
              key={item.id}
              item={item}
              isActive={item.id === activeId}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </div>

      <div className="mt-auto flex flex-col gap-1.5 px-4 pb-6 pt-3">
        <div className="mb-1 h-px bg-white/15" />
        <NavRow
          item={bottomNav[0]}
          isActive={false}
          collapsed={collapsed}
          emphasis="solid"
        />
        {bottomNav.slice(1).map((item) => (
          <NavRow key={item.id} item={item} isActive={false} collapsed={collapsed} />
        ))}
      </div>
    </motion.aside>
  );
}
