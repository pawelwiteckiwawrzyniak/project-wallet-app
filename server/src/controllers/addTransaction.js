import { transactions } from "../models/transactions.js";

export async function addTransaction(req, res, next) {
  try {
    const { type, category, value, description, date } = req.body;
    const ownedBy = req.user.id;
    const newTransaction = await transactions.create({
      type,
      category,
      value,
      description,
      date,
      owner: ownedBy,
    });
    return res.status(201).json({ data: newTransaction });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
