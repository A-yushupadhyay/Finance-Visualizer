"use client";

import { useEffect, useState } from "react";

type Transaction = {
  _id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
};

type Budget = {
  _id: string;
  category: string;
  amount: number;
  month: string;
};

type Alert = {
  category: string;
  spent: number;
  budget: number;
};

export default function Insights({ reload }: { reload: boolean }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

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

      const overspendingAlerts: Alert[] = budgets
        .filter((b) => b.month === month && actualMap[b.category] > b.amount)
        .map((b) => ({
          category: b.category,
          spent: actualMap[b.category],
          budget: b.amount,
        }));

      setAlerts(overspendingAlerts);
    };

    fetchData();
  }, [reload]);

  return (
    <div className="mt-6 space-y-2">
      <h2 className="text-lg font-semibold">💡 Spending Insights</h2>
      {alerts.length === 0 ? (
        <p className="text-green-600">All spending is within budget 🚀</p>
      ) : (
        alerts.map((a, i) => (
          <div
            key={i}
            className="p-3 bg-red-100 border-l-4 border-red-500 text-sm rounded"
          >
            Overspent in <strong>{a.category}</strong>: ₹{a.spent} (Budget: ₹{a.budget})
          </div>
        ))
      )}
    </div>
  );
}
