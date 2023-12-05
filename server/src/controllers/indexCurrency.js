import { Currency } from "../models/currency.js";
import { updateCurrency } from "./updateCurrency.js";

export async function indexCurrency(req, res, next) {
  try {
    await updateCurrency;
    const currency = await Currency.find();
    return res.status(200).json(currency);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
