import { Transactions } from "../models/transactions.js";

export async function getTransaction(req, res, next) {
  const owner = req.user.id;
  console.log(owner);
  const userTransactions = await Transactions.find({ owner: owner });
  return res.status(200).json({
    data: userTransactions,
  });
}
