import axios from "axios";
import { Currency } from "../models/currency.js";

export async function updateCurrencyJob(job) {
  try {
    const { data } = await axios.get(
      "http://api.nbp.pl/api/exchangerates/tables/C/"
    );
    await Currency.deleteMany();
    const updatedData = data[0].rates;
    await Currency.insertMany(updatedData);
    console.log("Currency updated at ", new Date());
  } catch (error) {
    return error;
  }
}
