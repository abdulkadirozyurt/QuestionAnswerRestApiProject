import express from "express";
import { getAccessToRoute } from "../middlewares/authorization/authMiddleware.js";
import { register, getUser, login, logout } from "../controllers/authController.js";
// api/authentications
// bu express.Router aslında bir middleware
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/profile", getAccessToRoute, getUser);
authRouter.get("/logout", getAccessToRoute, logout);

export { authRouter };
