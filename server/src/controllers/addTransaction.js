import { Transactions } from "../models/transactions.js";
import { User } from "../models/users.js";

export async function addTransaction(req, res, next) {
  try {
    const { type, category, value, description, date } = req.body;
    const owner = req.user.id;
    const newTransaction = await Transactions.create({
      type,
      category,
      value,
      description,
      date,
      owner: owner,
    });

    const user = await User.findOne({ _id: owner });
    let newBalance = user.balance;
    if (type === "Income") {
      newBalance += parseFloat(value);
    } else if (type === "Expense") {
      newBalance -= parseFloat(value);
    }
    await User.findByIdAndUpdate(owner, { balance: newBalance });
    return res.status(201).json({ data: newTransaction });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
