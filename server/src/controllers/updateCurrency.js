import axios from "axios";
import { Currency } from "../models/currency.js";

export async function updateCurrency(req, res, next) {
  try {
    const { data } = await axios.get(
      "http://api.nbp.pl/api/exchangerates/tables/C/"
    );
    console.log(data);
    await Currency.deleteMany();
    const updatedData = data[0].rates;
    const updatedCurrencies = await Currency.insertMany(updatedData);
    res.status(200).json({
      description: "Updated currency database",
      data: { updatedCurrencies },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
