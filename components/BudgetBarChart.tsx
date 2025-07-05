"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

// Define proper types instead of `any`
interface Transaction {
  _id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

interface Budget {
  _id: string;
  category: string;
  amount: number;
  month: string;
}

interface ChartData {
  category: string;
  budget: number;
  actual: number;
}

export default function BudgetBarChart({ reload }: { reload: boolean }) {
  const [data, setData] = useState<ChartData[]>([]); // Typed array

  useEffect(() => {
    const fetchData = async () => {
      const txRes = await fetch("/api/transactions");
      const txs: Transaction[] = await txRes.json();

      const budgetRes = await fetch("/api/budgets");
      const budgets: Budget[] = await budgetRes.json();

      const month = new Date().toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      const actualMap: Record<string, number> = {};

      txs.forEach((tx) => {
        const cat = tx.category || "General";
        if (!actualMap[cat]) actualMap[cat] = 0;
        actualMap[cat] += tx.amount;
      });

      const chartData: ChartData[] = budgets
        .filter((b) => b.month === month)
        .map((b) => ({
          category: b.category,
          budget: b.amount,
          actual: actualMap[b.category] || 0,
        }));

      setData(chartData);
    };

    fetchData();
  }, [reload]);

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-4">Budget vs Actual</h2>
      <div className="h-64 bg-white rounded-md shadow p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" fill="#60a5fa" />
            <Bar dataKey="actual" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
