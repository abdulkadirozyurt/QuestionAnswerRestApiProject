import UserModel from "../models/user.js";
import asyncErrorWrapper from "express-async-handler";
import { CustomError } from "../helpers/error/CustomError.js";
import sendJwtToClient from "../helpers/authorization/sendJwttoclient.js";

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

  sendJwtToClient(user,res);
  
});

const errorTest = (req, res, next) => {
  // ex: question does not exists
  return next(new TypeError("Type Error", 400));

  // return next(new Error("Bir hata oluştu")); // express bunu kendi kendine yakalayabilir çünkü senkron kod
};

export { register, errorTest };
