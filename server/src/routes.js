import express from "express";
import { signupUser } from "./controllers/signupUser.js";
import { logoutUser } from "./controllers/logoutUser.js";
import { getUser } from "./controllers/getUser.js";
import { addTransaction } from "./controllers/addTransaction.js";
import { indexCategories } from "./controllers/indexCategories.js";
import { indexCurrency } from "./controllers/indexCurrency.js";
import { authMiddleware } from "./middleware/authToken.js";
import { logInUser } from "./controllers/logInUser.js";
import { deleteTransaction } from "./controllers/deleteTransaction.js";
import { updateTransaction } from "./controllers/updateTransaction.js";
import { getTransaction } from "./controllers/getTransaction.js";

export const router = express.Router();

router.get("/categories", indexCategories);
router.get("/currency", indexCurrency);
router.get("/current", authMiddleware, getUser);
router.get("/transactions", authMiddleware, getTransaction);

router.post("/transactions", authMiddleware, addTransaction);
router.post("/users/login", logInUser);
router.post("/user/logout", authMiddleware, logoutUser);
router.post("/users/signup", signupUser);

router.patch("/transactions/:transactionId", authMiddleware, updateTransaction);

router.delete(
  "/transactions/:transactionId",
  authMiddleware,
  deleteTransaction
);
