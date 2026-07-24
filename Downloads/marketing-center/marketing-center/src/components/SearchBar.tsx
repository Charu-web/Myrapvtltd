import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search activities...",
}: SearchBarProps) {
  const [value, setValue] = useState("");

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch?.(value);
      }}
      className="flex w-full max-w-sm items-center gap-2 rounded-full border border-ink-100 bg-white px-4 py-2.5 shadow-sm transition-colors focus-within:border-brand-red/40"
    >
      <Search size={16} className="shrink-0 text-ink-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onSearch?.(e.target.value);
        }}
        placeholder={placeholder}
        aria-label="Search activities"
        className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-500 focus:outline-none"
      />
    </form>
  );
}
