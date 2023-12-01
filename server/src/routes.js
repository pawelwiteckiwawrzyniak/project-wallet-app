import express from "express";
import { hello } from "./controllers/test.js";
import { getTest } from "./controllers/getTest.js";

export const router = express.Router();

router.post("/hello", hello);

router.get("/test", getTest);
