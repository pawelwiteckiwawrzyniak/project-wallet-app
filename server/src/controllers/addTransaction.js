import { Transactions } from "../models/transactions.js";
import { User } from "../models/users.js";

export async function addTransaction(req, res, next) {
  try {
    const { type, category, value, description, date } = req.body;
    const ownedBy = req.user.id;
    const newTransaction = await Transactions.create({
      type,
      category,
      value,
      description,
      date,
      owner: ownedBy,
    });
    const user = await User.findOne({ _id: ownedBy });
    if (type === "Income") {
      await User.findByIdAndUpdate(ownedBy, { balance: user.balance + value });
    } else if (type === "Expense") {
      await User.findByIdAndUpdate(ownedBy, { balance: user.balance - value });
    }

    return res.status(201).json({ data: newTransaction });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
