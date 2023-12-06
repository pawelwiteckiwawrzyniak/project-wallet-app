import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import { router } from "./routes.js";
import "dotenv/config";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const connection = mongoose.connect(process.env.MONGO_DB);

const formatsLogger = "dev";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Wallet-App MERN with Swagger",
      version: "1.0.0",
      description:
        "Wallet application made with MERN and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes.js"],
};

const specs = swaggerJsdoc(options);

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
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
