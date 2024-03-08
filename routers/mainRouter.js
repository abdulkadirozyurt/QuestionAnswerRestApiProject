import express from "express";
import { authenticationRouter } from "./authenticationRouter.js";
import { questionRouter } from "./questionRouter.js";


const mainRouter = express.Router();

mainRouter.use("/authentications", authenticationRouter);
mainRouter.use("/questions", questionRouter);

export {mainRouter} ;
