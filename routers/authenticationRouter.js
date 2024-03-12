import express from "express";
import { register } from "../controllers/authenticationsController.js";

// api/authentications
// bu express.Router aslında bir middleware
const authenticationRouter = express.Router();

authenticationRouter.post("/register", register);

export { authenticationRouter };
