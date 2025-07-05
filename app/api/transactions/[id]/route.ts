import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";

export async function PUT(
  req: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    await connectDB();
    const body = await req.json();

    const updated = await Transaction.findByIdAndUpdate(
      params.id,
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
  } catch (err) {
    return NextResponse.json({ error: "PUT Error", details: String(err) }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    await connectDB();

    const deleted = await Transaction.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "DELETE Error", details: String(err) }, { status: 500 });
  }
}
