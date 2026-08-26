export default function StatCard({
  label,
  value,
  suffix,
  hint,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  hint?: string;
}) {
  return (
    <div className="card-surface p-5">
      <p className="font-sans text-[13px] font-medium text-slate-450">{label}</p>
      <p className="mt-2 font-mono text-[28px] font-semibold leading-none text-ink-900">
        {value}
        {suffix && <span className="ml-1 font-sans text-base font-medium text-slate-450">{suffix}</span>}
      </p>
      {hint && <p className="mt-2 font-sans text-xs text-slate-450">{hint}</p>}
    </div>
  );
}
