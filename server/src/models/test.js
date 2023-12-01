import mongoose from "mongoose";
const Schema = mongoose.Schema;

const test = new Schema({
  name: {
    type: String,
  },
});

export const Test = mongoose.model("test", test);
