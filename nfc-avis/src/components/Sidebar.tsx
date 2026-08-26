"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import LogoutButton from "./LogoutButton";
import { LucideIcon } from "lucide-react";

export type NavItem = { href: string; label: string; icon: LucideIcon };

export default function Sidebar({
  items,
  title,
  subtitle,
}: {
  items: NavItem[];
  title: string;
  subtitle: string;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex h-[100dvh] w-64 shrink-0 flex-col justify-between bg-ink-900 px-4 py-6">
      <div>
        <div className="mb-8 px-2">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brass-500 font-display text-lg font-semibold text-ink-900">
            A
          </div>
          <p className="font-display text-lg font-medium text-white">{title}</p>
          <p className="font-sans text-xs text-white/40">{subtitle}</p>
        </div>
        <nav className="space-y-1">
          {items.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 font-sans text-sm font-medium transition-colors",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <LogoutButton />
    </aside>
  );
}
