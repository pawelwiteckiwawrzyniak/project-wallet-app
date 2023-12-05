import { model, Schema } from "mongoose";

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
    },
  },
  { versionKey: false }
);

export const Categories = model("category", categoriesSchema);
