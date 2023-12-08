import { Transactions } from "../models/transactions.js";

export async function getStatistics(req, res, next) {
  try {
    const { year, month } = req.body;
    const owner = req.user.id;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const transactions = await Transactions.find({
      owner: owner,
      date: { $gte: startDate, $lte: endDate },
    });
    console.log(transactions);

    const totalIncome = transactions.reduce((sum, transaction) => {
      return transaction.type === "Income" ? sum + transaction.value : sum;
    }, 0);
    const totalExpense = transactions.reduce((sum, transaction) => {
      return transaction.type === "Expense" ? sum + transaction.value : sum;
    }, 0);
    const statisticsData = {
      transactions,
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
    return res.status(201).json({
      statisticsData,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}
