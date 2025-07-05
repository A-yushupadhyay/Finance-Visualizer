import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true }, // e.g., "Jul 2025"
});

const Budget =
  mongoose.models.Budget || mongoose.model("Budget", budgetSchema);

export default Budget;
