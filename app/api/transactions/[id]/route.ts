import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";

// Correct context type for dynamic route params
type Context = {
  params: {
    id: string;
  };
};

// PUT: Update transaction by ID
export async function PUT(req: NextRequest, context: Context) {
  await connectDB();

  const body = await req.json();

  const updated = await Transaction.findByIdAndUpdate(
    context.params.id,
    {
      description: body.description,
      amount: body.amount,
      date: body.date,
      category: body.category,
    },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

// DELETE: Delete transaction by ID
export async function DELETE(req: NextRequest, context: Context) {
  await connectDB();

  const deleted = await Transaction.findByIdAndDelete(context.params.id);

  if (!deleted) {
    return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted" });
}
