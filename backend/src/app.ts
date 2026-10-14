import express from "express";
import cors from "cors";

import apiRouter from "./routes/index.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

export const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "API is working",
  });
});

app.use("/api", apiRouter);

app.use(notFoundMiddleware);

app.use(errorMiddleware);