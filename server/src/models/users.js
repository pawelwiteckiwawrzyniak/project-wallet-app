import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "User password is required"],
    },
    balance: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "PLN",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

usersSchema.pre("save", async function () {
  if (!this.password) return;
  const salt = await bcrypt.genSalt(8);
  this.password = await bcrypt.hash(this.password, salt);
});

usersSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = model("user", usersSchema);
