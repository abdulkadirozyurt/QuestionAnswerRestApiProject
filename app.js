import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("merhaba express");
});

app.listen(PORT, () => {
  console.log(
    `App started on http://localhost:${PORT} :${process.env.NODE_ENV} `
  );
});
