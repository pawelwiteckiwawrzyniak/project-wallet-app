import { model, Schema } from "mongoose";

const currencySchema = new Schema(
  {
    code: {
      type: String,
    },
    name: {
      type: String,
    },
    bid: {
      type: Number,
    },
    ask: {
      type: Number,
    },
  },
  { versionKey: false }
);

export const Currency = model("currency", currencySchema);
