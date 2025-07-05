"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const categories = [
  "Food",
  "Transport",
  "Utilities",
  "Shopping",
  "Entertainment",
  "Health",
  "General",
];

type Transaction = {
  _id?: string; // optional when creating new
  amount: number;
  description: string;
  date: string;
  category: string;
};

type TransactionFormProps = {
  onSubmit: () => void;
  initialData?: Transaction | null;
  onCancel?: () => void;
};

export default function TransactionForm({ onSubmit, initialData, onCancel }: TransactionFormProps) {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: "",
    category: "General",
  });
  const [error, setError] = useState("");

  // When in edit mode, prefill form values
  useEffect(() => {
    if (initialData) {
      setForm({
        amount: initialData.amount.toString(),
        description: initialData.description,
        date: initialData.date.split("T")[0], // assuming ISO string; show only YYYY-MM-DD
        category: initialData.category || "General",
      });
    } else {
      // Reset the form if initialData is cleared
      setForm({ amount: "", description: "", date: "", category: "General" });
    }
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.amount || !form.description || !form.date) {
      return setError("All fields are required.");
    }

    // Create payload with proper number conversion
    const payload = {
      ...form,
      amount: parseFloat(form.amount),
    };

    let res;
    if (initialData && initialData._id) {
      // We're editing: send PUT request to update
      res = await fetch(`/api/transactions/${initialData._id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      // New transaction: send POST request to create
      res = await fetch("/api/transactions", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    if (res.ok) {
      // Reset form if adding; keep values if editing, or you can reset if desired
      if (!initialData) {
        setForm({ amount: "", description: "", date: "", category: "General" });
      }
      setError("");
      onSubmit();
    } else {
      setError("Failed to save transaction");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label>Amount</Label>
        <Input name="amount" type="number" value={form.amount} onChange={handleChange} />
      </div>
      <div>
        <Label>Description</Label>
        <Input name="description" value={form.description} onChange={handleChange} />
      </div>
      <div>
        <Label>Date</Label>
        <Input name="date" type="date" value={form.date} onChange={handleChange} />
      </div>
      <div>
        <Label>Category</Label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-2 py-2 border rounded-md bg-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex items-center gap-3">
        <Button type="submit">
          {initialData ? "Update Transaction" : "Add Transaction"}
        </Button>
        {initialData && onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
