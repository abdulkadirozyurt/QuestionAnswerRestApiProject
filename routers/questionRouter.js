import express from "express";
// api/questions
const questionRouter = express.Router(); // bu express.Router aslında bir middleware

questionRouter.get("/", (req, res) => {
  res.send("Question Home Page");
});

questionRouter.get("/delete", (req, res) => {
  res.send("Questions Delete Page");
});

export { questionRouter };
