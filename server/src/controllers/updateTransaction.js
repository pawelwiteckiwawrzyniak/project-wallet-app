import { Transactions } from "../models/transactions.js";
import { User } from "../models/users.js";

export async function updateTransaction(req, res, next) {
  try {
    const owner = req.user.id;
    const { transactionId } = req.params;
    const { type, category, value, description, date } = req.body;
    const requestedTransaction = await Transactions.findOne({
      _id: transactionId,
    });
    if (owner === requestedTransaction.owner.toString()) {
      const user = await User.findOne({ _id: owner });
      let newBalance = user.balance;
      if (type === "Income" && requestedTransaction.type === "Income") {
        newBalance = user.balance - requestedTransaction.value + value;
      } else if (type === "Income" && requestedTransaction.type === "Expense") {
        newBalance = user.balance - requestedTransaction.value - value;
      } else if (type === "Expense" && requestedTransaction.type === "Income") {
        newBalance = user.balance + requestedTransaction.value - value;
      } else if (
        type === "Expense" &&
        requestedTransaction.type === "Expense"
      ) {
        newBalance = user.balance + requestedTransaction.value + value;
      }
      await User.findByIdAndUpdate(owner, { balance: newBalance });
      await Transactions.updateOne(
        { _id: transactionId },
        { $set: { type, category, value, description, date } }
      );
      return res
        .status(200)
        .json({ description: "Transaction successfully updated" });
    }
    return res
      .status(401)
      .json({ description: "You dont have permission to that transaction" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
