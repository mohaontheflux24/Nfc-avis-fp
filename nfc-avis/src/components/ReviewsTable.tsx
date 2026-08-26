"use client";

import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type ReviewRow = {
  id: string;
  rating: number;
  isPrivate: boolean;
  firstName: string | null;
  comment: string | null;
  phone: string | null;
  createdAt: string;
  card?: { label: string } | null;
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="font-mono text-sm tracking-tight text-brass-600">
      {"★".repeat(rating)}
      <span className="text-ink-800/15">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export default function ReviewsTable({ reviews }: { reviews: ReviewRow[] }) {
  if (reviews.length === 0) {
    return (
      <div className="card-surface flex flex-col items-center gap-2 px-6 py-16 text-center">
        <p className="font-display text-lg text-ink-900">Aucun avis pour l&apos;instant</p>
        <p className="font-sans text-sm text-slate-450">
          Les avis apparaîtront ici dès qu&apos;un client scannera une carte.
        </p>
      </div>
    );
  }

  return (
    <div className="card-surface overflow-hidden">
      <div className="max-h-[560px] overflow-y-auto">
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-paper-200/90 backdrop-blur">
            <tr className="font-sans text-xs font-medium uppercase tracking-wide text-slate-450">
              <th className="px-5 py-3">Note</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Client</th>
              <th className="px-5 py-3">Message</th>
              <th className="px-5 py-3">Carte</th>
              <th className="px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-800/[0.06]">
            {reviews.map((r) => (
              <tr key={r.id} className="align-top">
                <td className="whitespace-nowrap px-5 py-3.5"><Stars rating={r.rating} /></td>
                <td className="px-5 py-3.5">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 font-sans text-xs font-medium",
                      r.isPrivate ? "bg-danger/10 text-danger" : "bg-success/10 text-success"
                    )}
                  >
                    {r.isPrivate ? "Retour privé" : "Public"}
                  </span>
                </td>
                <td className="px-5 py-3.5 font-sans text-sm text-ink-900">
                  {r.firstName || "—"}
                  {r.phone && <div className="text-xs text-slate-450">{r.phone}</div>}
                </td>
                <td className="max-w-xs px-5 py-3.5 font-sans text-sm text-ink-800/80">
                  {r.comment || "—"}
                </td>
                <td className="px-5 py-3.5 font-sans text-sm text-slate-450">
                  {r.card?.label || "—"}
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 font-sans text-sm text-slate-450">
                  {formatDate(r.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
