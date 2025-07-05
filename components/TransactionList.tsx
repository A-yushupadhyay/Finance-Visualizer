"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";

type Transaction = {
  _id: string;
  description: string;
  date: string;
  amount: number;
  category: string;
};

export default function TransactionList({
  reload,
  onEdit,
  onChange,
}: {
  reload: boolean;
  onEdit: (tx: Transaction) => void;
  onChange: () => void;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data: Transaction[]) => setTransactions(data));
  }, [reload]);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this transaction?");
    if (!confirmed) return;

    await fetch(`/api/transactions/${id}`, {
      method: "DELETE",
    });

    onChange(); // refresh list
  };

  return (
    <div className="mt-6 space-y-2">
      <h2 className="text-lg font-semibold">Transactions</h2>
      {transactions.map((tx) => (
        <div
          key={tx._id}
          className="flex justify-between items-center p-2 border rounded-md bg-white shadow-sm"
        >
          <div>
            <p className="font-medium">{tx.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(tx.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">₹{tx.amount}</p>
            <p className="text-xs text-gray-400">{tx.category}</p>
          </div>

          <div className="flex gap-3 items-center">
            <button
              className="text-blue-600 hover:text-blue-800"
              onClick={() => onEdit(tx)}
              title="Edit"
            >
              <Pencil size={16} />
            </button>
            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => handleDelete(tx._id)}
              title="Delete"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
