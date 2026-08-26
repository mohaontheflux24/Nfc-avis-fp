"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function TrendChart({
  data,
}: {
  data: { date: string; scans: number; reviews: number }[];
}) {
  return (
    <div className="card-surface p-5">
      <p className="mb-4 font-sans text-[13px] font-medium text-slate-450">
        Scans &amp; avis par jour
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ left: -20, right: 10 }}>
          <defs>
            <linearGradient id="scans" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14141c" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#14141c" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="reviews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c9a15a" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#c9a15a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#14141c0f" />
          <XAxis
            dataKey="date"
            tickFormatter={(d) => d.slice(5)}
            tick={{ fontSize: 11, fill: "#7a7a86" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fontSize: 11, fill: "#7a7a86" }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #14141c14",
              fontSize: 12,
              fontFamily: "var(--font-inter)",
            }}
          />
          <Area type="monotone" dataKey="scans" name="Scans" stroke="#14141c" fill="url(#scans)" strokeWidth={2} />
          <Area type="monotone" dataKey="reviews" name="Avis" stroke="#c9a15a" fill="url(#reviews)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
