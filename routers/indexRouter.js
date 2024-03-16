import express from "express";
import { authRouter } from "./authRouter.js";
import { questionRouter } from "./questionRouter.js";


const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/questions", questionRouter);

export {indexRouter} ;
