import express from "express";
import { authenticationRoute } from "./authenticationRouter";
import { questionRoute } from "./questionRouter";

const router = express.Router();

router.use("/authentications", authenticationRoute);
router.use("/questions", questionRoute);

export { mainRouter };
