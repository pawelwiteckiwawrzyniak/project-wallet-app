import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import { router } from "./routes.js";
import "dotenv/config";

const uriDb =
  "mongodb+srv://LeMichall:maisy12034@cluster0.5gsu6rz.mongodb.net/";
// "mongodb+srv://admin:mWIwzYUSbXhR3Qn5@project-wallet-app.ifoipjf.mongodb.net/db";
const connection = mongoose.connect(uriDb);

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.json());
app.use(morgan(formatsLogger));
app.use(cors());
app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

connection
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful, port 3000");
    });
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
