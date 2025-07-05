import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

// GET all transactions
export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

// ADD a transaction
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const { amount, description, date, category } = body;

  try {
    const newTx = await Transaction.create({
      amount,
      description,
      date,
      category,
    });
    return NextResponse.json(newTx, { status: 201 });
  } catch  {
    return NextResponse.json({ error: "Error creating transaction" }, { status: 500 });
  }
}
