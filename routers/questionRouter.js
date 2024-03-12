import express from "express";
import { getAllQuestions } from "../controllers/questionsController.js";
// api/questions
const questionRouter = express.Router(); // bu express.Router aslında bir middleware

questionRouter.get("/", getAllQuestions);

export { questionRouter };
