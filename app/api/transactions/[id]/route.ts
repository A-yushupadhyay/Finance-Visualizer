import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
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
    return Response.json({ message: "Transaction not found" }, { status: 404 });
  }

  return Response.json(updated);
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await connectDB();
  const deleted = await Transaction.findByIdAndDelete(context.params.id);

  if (!deleted) {
    return Response.json({ message: "Transaction not found" }, { status: 404 });
  }

  return Response.json({ message: "Deleted" });
}
