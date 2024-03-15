import UserModel from "../models/user.js";
import asyncErrorWrapper from "express-async-handler";
import { CustomError } from "../helpers/error/CustomError.js";

const register = asyncErrorWrapper(async (req, res, next) => {
  /**
   *
   */

  // request body'sinden destructing yöntemi ile bilgileri aldık
  const { name, email, password, role } = req.body;

  const user = await UserModel.create({
    name,
    email,
    password,
    role,
  });

  const token = user.generateJwtFromUser();
console.log(token)
  res.status(200).json({
    success: true,
    data: user,
  });
});

const errorTest = (req, res, next) => {
  // ex: question does not exists
  return next(new TypeError("Type Error", 400));

  // return next(new Error("Bir hata oluştu")); // express bunu kendi kendine yakalayabilir çünkü senkron kod
};

export { register, errorTest };
