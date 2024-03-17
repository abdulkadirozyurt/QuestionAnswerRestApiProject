import express from "express";
import {
    register,
    getUser,
    login,
} from "../controllers/authController.js";
import {getAccessToRoute} from "../middlewares/authorization/authMiddleware.js";

// api/authentications
// bu express.Router aslında bir middleware
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login",login);
authRouter.get("/profile", getAccessToRoute, getUser);

export {authRouter};
