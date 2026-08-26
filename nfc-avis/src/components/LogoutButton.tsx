"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 font-sans text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
    >
      <LogOut size={17} />
      Se déconnecter
    </button>
  );
}
