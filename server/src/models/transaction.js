import mongoose from "mongoose";
const Schema = mongoose.Schema;

const transaction = new Schema({
  data: { type: String },
  type: { type: String },
  category: { type: String },
  comment: { type: String },
  summ: { type: Number },
});

export const Transaction = mongoose.model("transaction", transaction);
