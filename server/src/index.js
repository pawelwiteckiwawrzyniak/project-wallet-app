import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import { router } from "./routes.js";
import "dotenv/config";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const connection = mongoose.connect(process.env.MONGO_DB);

const app = express();
const formatsLogger = "dev";

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

/* const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Wallet-App Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:5173",
      },
    ],
  },
  apis: ["./routes.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
); */

connection
  .then(() => {
    app.listen(5173, () => {
      console.log("Database connection successful, port 5173");
    });
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
