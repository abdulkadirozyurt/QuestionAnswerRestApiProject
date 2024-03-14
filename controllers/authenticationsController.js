import UserModel from "../models/user.js";
import { CustomError } from "../helpers/error/CustomError.js";

const register = async (req, res, next) => {
  const name = "Hasan Alkan";
  const email = "halkan@gmail.com";
  const password = "12345"; // !!!!!! validation error

  try {
    const user = await UserModel.create({
      name,
      email,
      password,
    });
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

const errorTest = (req, res, next) => {
  
  // ex: question does not exists
  return next(new TypeError("Type Error", 400));








  
  // return next(new Error("Bir hata oluştu")); // express bunu kendi kendine yakalayabilir çünkü senkron kod
};

export { register, errorTest };
