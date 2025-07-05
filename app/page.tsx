"use client";

import { useRef, useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import ExpenseBarChart from "@/components/ExpenseBarChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import SummaryCards from "@/components/SummaryCards";
import BudgetForm from "@/components/BudgetForm";
import BudgetBarChart from "@/components/BudgetBarChart";
import Insights from "@/components/Insights";

type Transaction = {
  _id: string;
  description: string;
  date: string;
  amount: number;
  category: string;
};

export default function Home() {
  const [reload, setReload] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const formRef = useRef<HTMLDivElement>(null); // 👈 ref to scroll to form

  const handleSubmit = () => {
    setReload(!reload);
    setEditing(null); // reset edit mode
  };

  const handleEdit = (tx: Transaction) => {
    setEditing(tx);
    formRef.current?.scrollIntoView({ behavior: "smooth" }); // 👈 smooth scroll
  };

  return (
    <main className="max-w-5xl mx-auto p-4 space-y-10">
      <h1 className="text-3xl font-bold text-center">💰 Personal Finance Dashboard</h1>

      {/* 👇 scroll target */}
      <div ref={formRef}>
        <TransactionForm
          onSubmit={handleSubmit}
          initialData={editing}
          onCancel={() => setEditing(null)}
        />
      </div>

      <BudgetForm onSubmit={handleSubmit} />
      <SummaryCards reload={reload} />
      <TransactionList
        reload={reload}
        onEdit={handleEdit} // 👈 call scroll + setEditing
        onChange={handleSubmit}
      />
      <ExpenseBarChart reload={reload} />
      <CategoryPieChart reload={reload} />
      <BudgetBarChart reload={reload} />
      <Insights reload={reload} />
    </main>
  );
}
