import express from "express";
import { errorTest, register } from "../controllers/authenticationsController.js";

// api/authentications
// bu express.Router aslında bir middleware
const authenticationRouter = express.Router();

authenticationRouter.post("/register", register);

authenticationRouter.get("/error", errorTest);        // error handling deneme amaçlı

export { authenticationRouter };
