import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";

//  Correct function signature per Next.js 13+/14+ App Router
export async function PUT(
  req: NextRequest,
  context: { params: Record<string, string> }
) {
  try {
    await connectDB();

    const { id } = context.params;
    const body = await req.json();

    const updated = await Transaction.findByIdAndUpdate(
      id,
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
  } catch (error) {
    return NextResponse.json({ error: "PUT error", details: error }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Record<string, string> }
) {
  try {
    await connectDB();

    const { id } = context.params;

    const deleted = await Transaction.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: "DELETE error", details: error }, { status: 500 });
  }
}
