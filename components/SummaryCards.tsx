"use client";

import { useEffect, useState } from "react";

type Transaction = {
  _id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
};

export default function SummaryCards({ reload }: { reload: boolean }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]); // ✅ typed array

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data: Transaction[]) => setTransactions(data)); // ✅ type-safe
  }, [reload]);

  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const recent = transactions.slice(0, 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-sm text-gray-500">Total Expenses</h3>
        <p className="text-xl font-bold text-red-600">₹{total.toFixed(2)}</p>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-sm text-gray-500">Most Recent</h3>
        <ul className="text-sm">
          {recent.map((tx) => (
            <li key={tx._id} className="border-b last:border-0 py-1">
              {tx.description}: ₹{tx.amount}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-sm text-gray-500">Categories Used</h3>
        <p className="text-lg font-medium">
          {new Set(transactions.map((t) => t.category)).size}
        </p>
      </div>
    </div>
  );
}
