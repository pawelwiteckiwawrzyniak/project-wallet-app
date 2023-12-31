import { model, Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Income", "Expense"],
      required: [true, "Transaction type is required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    value: {
      type: Number,
      required: [true, "Value is required"],
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

export const Transactions = model("transactions", transactionSchema);
