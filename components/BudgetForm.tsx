"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const categories = [
  "Food", "Transport", "Utilities", "Shopping", "Entertainment", "Health", "General",
];

type BudgetFormProps = {
  onSubmit: () => void;
};

export default function BudgetForm({ onSubmit }: BudgetFormProps) {
  const [form, setForm] = useState({
    category: "Food",
    amount: "",
    month: new Date().toLocaleString("default", { month: "short", year: "numeric" }),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/budgets", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        amount: parseFloat(form.amount),
      }),
    });

    if (res.ok) {
      setForm({ ...form, amount: "" });
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Category</Label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-2 py-2 border rounded-md bg-white"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <Label>Amount</Label>
        <Input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
        />
      </div>
      <Button type="submit">Set Budget</Button>
    </form>
  );
}
