"use client";

import { cn } from "@/lib/utils";

const OPTIONS: { value: "7d" | "30d" | "all"; label: string }[] = [
  { value: "7d", label: "7 jours" },
  { value: "30d", label: "30 jours" },
  { value: "all", label: "Depuis le début" },
];

export default function PeriodTabs({
  value,
  onChange,
}: {
  value: "7d" | "30d" | "all";
  onChange: (v: "7d" | "30d" | "all") => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-ink-800/10 bg-white p-1">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-full px-4 py-1.5 font-sans text-sm font-medium transition-colors",
            value === opt.value ? "bg-ink-800 text-white" : "text-slate-450 hover:text-ink-900"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
