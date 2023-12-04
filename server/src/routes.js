import express from "express";
import { hello } from "./controllers/test.js";
import { getTest } from "./controllers/getTest.js";
import { signupUser } from "./controllers/signupUser.js";
import { logoutUser } from "./controllers/logoutUser.js";
import { getUser } from "./controllers/getUser.js";
import { addTransaction } from "./controllers/addTransaction.js";

export const router = express.Router();

router.post("/hello", hello);
router.post("/register", signupUser);

router.get("/test", getTest);

// Potrzeba authentication middleware
router.get("/logout", logoutUser);
router.get("/current", getUser);
router.post("/transactions", addTransaction);
