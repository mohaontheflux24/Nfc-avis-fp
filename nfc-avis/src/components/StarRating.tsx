"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LABELS: Record<number, string> = {
  1: "Très déçu",
  2: "Déçu",
  3: "Mitigé",
  4: "Satisfait",
  5: "Conquis",
};

export default function StarRating({
  value,
  onChange,
  accentColor = "#c9a15a",
}: {
  value: number;
  onChange: (v: number) => void;
  accentColor?: string;
}) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 sm:gap-3" role="radiogroup" aria-label="Note de 1 à 5 étoiles">
        {[1, 2, 3, 4, 5].map((star) => {
          const active = star <= display;
          return (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={value === star}
              aria-label={`${star} étoile${star > 1 ? "s" : ""} — ${LABELS[star]}`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => onChange(star)}
              className="p-1 outline-none"
            >
              <motion.svg
                animate={value === star ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                width="44"
                height="44"
                viewBox="0 0 24 24"
                className="sm:h-14 sm:w-14"
                fill={active ? accentColor : "none"}
                stroke={active ? accentColor : "#c7c4bb"}
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2.75l2.9 6.06 6.6.77-4.86 4.53 1.28 6.5L12 17.6l-5.92 3.01 1.28-6.5-4.86-4.53 6.6-.77L12 2.75z"
                />
              </motion.svg>
            </button>
          );
        })}
      </div>
      <div className="h-5 font-sans text-sm font-medium tracking-wide text-slate-450">
        {display > 0 ? LABELS[display] : "Touchez pour noter"}
      </div>
    </div>
  );
}
