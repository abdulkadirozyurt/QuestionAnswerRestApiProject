import dotenv from "dotenv";
import { dbConfig } from "./config.js";
import express, { Router } from "express";
import { mainRouter } from "./routers/mainRouter.js";
import { customErrorHandler } from "./middlewares/errors/customErrorHandler.js";

dotenv.config();
dbConfig();
const app = express();
const PORT = process.env.PORT;



app.get("/", (req, res) => {
  res.send("merhaba express");
});


app.use("/api", mainRouter);

// Kendi Error Handler'ımızı yazalım

// app.use((err, req, res, next) => {
//   console.log("Custom Error Handler");
//   res.status(400).json({
//     success: false,
//   });
// });

app.use(customErrorHandler);

app.listen(PORT, () => {
  console.log(
    `App started on http://localhost:${PORT} :${process.env.NODE_ENV} `
  );
});
