import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user = new Schema({
  user: { name: { type: String }, email: { type: String } },
  token: { type: String },
  balance: { type: Number },
  isAuth: { type: Boolean, default: false },
  isRefresh: { type: Boolean, default: false },
});

export const User = mongoose.model("user", user);
