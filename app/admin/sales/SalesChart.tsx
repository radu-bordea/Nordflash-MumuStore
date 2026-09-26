"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { formatCurrency } from "@/utils/format";

function SalesChart({
  data,
}: {
  data: { period: string; total: number; count: number }[];
}) {
  if (data.length === 0) {
    return (
      <div className="mb-6 flex h-72 items-center justify-center rounded-lg border border-border bg-card text-sm text-muted-foreground">
        Ingen salg i valgt periode
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-lg border border-border bg-card p-4">
      <h3 className="mb-4 text-sm font-medium text-muted-foreground">
        Salgsutvikling
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#556B2F" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#556B2F" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#dee0d0" />
          <XAxis dataKey="period" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} width={90} />
          <Tooltip
            formatter={(value) => formatCurrency(Number(value) || 0)}
            labelFormatter={(label) => `Periode: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#556B2F"
            fill="url(#salesFill)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
export default SalesChart;
