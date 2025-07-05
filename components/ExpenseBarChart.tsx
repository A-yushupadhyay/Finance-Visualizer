"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Define Transaction type
interface Transaction {
  _id?: string;
  amount: number;
  description: string;
  date: string;
  category?: string;
}

export default function ExpenseBarChart({ reload }: { reload: boolean }) {
  const [monthlyData, setMonthlyData] = useState<{ month: string; total: number }[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((transactions: Transaction[]) => {
        const monthlyTotals: Record<string, number> = {};

        transactions.forEach((tx) => {
          const month = new Date(tx.date).toLocaleString("default", {
            month: "short",
            year: "numeric",
          });

          if (!monthlyTotals[month]) {
            monthlyTotals[month] = 0;
          }

          monthlyTotals[month] += tx.amount;
        });

        const chartData = Object.keys(monthlyTotals).map((month) => ({
          month,
          total: monthlyTotals[month],
        }));

        setMonthlyData(chartData);
      });
  }, [reload]);

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-4">Monthly Expenses</h2>
      <div className="h-64 bg-white rounded-md shadow p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
