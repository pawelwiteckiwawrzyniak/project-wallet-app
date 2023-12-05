import express from "express";
import { signupUser } from "./controllers/signupUser.js";
import { logoutUser } from "./controllers/logoutUser.js";
import { getUser } from "./controllers/getUser.js";
import { addTransaction } from "./controllers/addTransaction.js";
import { indexCategories } from "./controllers/indexCategories.js";
import { indexCurrency } from "./controllers/indexCurrency.js";
import { authMiddleware } from "./middleware/authToken.js";
import { logInUser } from "./controllers/logInUser.js";

export const router = express.Router();

router.get("/categories", indexCategories);
router.get("/currency", indexCurrency);
router.get("/current", authMiddleware, getUser);

router.post("/transactions", authMiddleware, addTransaction);
router.post("/users/login", logInUser);
router.post("/user/logout", authMiddleware, logoutUser);
router.post("/users/signup", signupUser);
