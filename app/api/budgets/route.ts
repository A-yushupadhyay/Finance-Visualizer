import { connectDB } from "@/lib/db";
import Budget from "@/models/Budget";
import { NextResponse } from "next/server";

// Get all budgets
export async function GET() {
  await connectDB();
  const budgets = await Budget.find();
  return NextResponse.json(budgets);
}

// Set a new budget
export async function POST(req: Request) {
  await connectDB();
  const { category, amount, month } = await req.json();

  // Upsert logic (replace existing)
  const budget = await Budget.findOneAndUpdate(
    { category, month },
    { amount },
    { upsert: true, new: true }
  );

  return NextResponse.json(budget);
}
