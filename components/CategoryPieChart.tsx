"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Transaction = {
  _id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A78BFA", "#EF4444", "#22C55E"];

export default function CategoryPieChart({ reload }: { reload: boolean }) {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((transactions: Transaction[]) => {
        const totals: { [key: string]: number } = {};

        transactions.forEach((tx) => {
          const cat = tx.category || "General";
          if (!totals[cat]) totals[cat] = 0;
          totals[cat] += tx.amount;
        });

        const chartData = Object.keys(totals).map((cat) => ({
          name: cat,
          value: totals[cat],
        }));

        setData(chartData);
      });
  }, [reload]);

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
      <div className="h-64 bg-white rounded-md shadow p-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
