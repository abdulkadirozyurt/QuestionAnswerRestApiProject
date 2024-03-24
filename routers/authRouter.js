import express from "express";
import { getAccessToRoute } from "../middlewares/authorization/authMiddleware.js";
import { profileImageUpload } from "../middlewares/libraries/profileImageUpload.js";
import {
    register,
    getUser,
    login,
    logout,
    imageUpload
  } from "../controllers/authController.js";
// api/authentications
// bu express.Router aslında bir middleware
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/profile", getAccessToRoute, getUser);
authRouter.get("/logout", getAccessToRoute, logout);
authRouter.post("/upload", [getAccessToRoute, profileImageUpload.single("profile_image"),imageUpload]);

export { authRouter };
