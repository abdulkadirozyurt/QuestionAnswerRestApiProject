import express from "express";
// api/authentications
const authenticationRouter = express.Router(); // bu express.Router aslında bir middleware

authenticationRouter.get("/", (req, res) => {
  res.send("Authentication Home Page");
});

authenticationRouter.get("/register", (req, res) => {
  res.send("Authentication Register Page");
});

export { authenticationRouter };
