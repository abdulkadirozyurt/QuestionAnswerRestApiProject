import express, { Router } from "express";
import dotenv from "dotenv";
import { mainRouter } from "./routers/mainRouter";

dotenv.config();
const app = express();
const PORT = process.env.PORT;


//--------------------------

app.get("/", (req, res) => {
  res.send("merhaba express");
});
//--------------------------


app.use("/api", mainRouter);

app.listen(PORT, () => {
  console.log(
    `App started on http://localhost:${PORT} :${process.env.NODE_ENV} `
  );
});
