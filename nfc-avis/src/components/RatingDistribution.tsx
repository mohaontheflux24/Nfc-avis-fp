export default function RatingDistribution({
  distribution,
}: {
  distribution: { star: number; count: number }[];
}) {
  const max = Math.max(1, ...distribution.map((d) => d.count));

  return (
    <div className="card-surface p-5">
      <p className="mb-4 font-sans text-[13px] font-medium text-slate-450">
        Répartition des notes
      </p>
      <div className="space-y-2.5">
        {[...distribution].reverse().map((d) => (
          <div key={d.star} className="flex items-center gap-3">
            <span className="w-4 font-mono text-sm text-ink-800">{d.star}</span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink-800/[0.06]">
              <div
                className="h-full rounded-full bg-brass-500 transition-all"
                style={{ width: `${(d.count / max) * 100}%` }}
              />
            </div>
            <span className="w-6 text-right font-mono text-xs text-slate-450">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
