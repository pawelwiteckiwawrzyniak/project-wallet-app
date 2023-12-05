import express from "express";
import { hello } from "./controllers/test.js";
import { getTest } from "./controllers/getTest.js";
import { signupUser } from "./controllers/signupUser.js";
import { logoutUser } from "./controllers/logoutUser.js";
import { getUser } from "./controllers/getUser.js";
import { addTransaction } from "./controllers/addTransaction.js";
import { indexCategories } from "./controllers/indexCategories.js";
import { indexCurrency } from "./controllers/indexCurrency.js";
import { authMiddleware } from "./auth/tokenAuth.js";
import { logInUser } from "./controllers/logInUser.js";

export const router = express.Router();

router.post("/hello", hello);
router.post("/register", signupUser);
router.get("/categories", indexCategories);
router.get("/test", getTest);
router.get("/currency", indexCurrency);
router.post("/auth/sign-in", logInUser);
// Potrzeba authentication middleware
router.get("/logout", authMiddleware, logoutUser);
router.get("/current", authMiddleware, getUser);
router.post("/transactions", authMiddleware, addTransaction);
