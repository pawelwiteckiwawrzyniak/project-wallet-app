import { Transactions } from "../models/transactions.js";
import { User } from "../models/users.js";

export async function deleteTransaction(req, res, next) {
  try {
    const { transactionId } = req.params;
    const owner = req.user.id;
    const requestedTransaction = await Transactions.findOne({
      _id: transactionId,
    });
    if (owner === requestedTransaction.owner.toString()) {
      const user = await User.findOne({ _id: owner });
      let newBalance = user.balance;
      if (requestedTransaction.type === "Income") {
        newBalance -= requestedTransaction.value;
      } else if (requestedTransaction.type === "Expense") {
        newBalance += requestedTransaction.value;
      }
      await User.findByIdAndUpdate(owner, { balance: newBalance });
      await Transactions.findByIdAndDelete(transactionId);
      return res
        .status(200)
        .json({ description: "Transaction successfully deleted" });
    }
    return res
      .status(401)
      .json({ description: "You dont have permission to that transaction" });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}
