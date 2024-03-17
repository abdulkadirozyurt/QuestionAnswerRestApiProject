import UserModel from "../models/user.js";
import asyncErrorWrapper from "express-async-handler";
import { CustomError } from "../helpers/error/CustomError.js";
import { sendJwtToClient } from "../helpers/authorization/tokenHelpers.js";
import { comparePassword,validateUserInput} from "../helpers/input/inputHelpers.js";

const register = asyncErrorWrapper(async (req, res, next) => {
    // request body'sinden destructing yöntemi ile bilgileri aldık
  const { name, email, password, role } = req.body;

  const user = await UserModel.create({
    name,
    email,
    password,
    role,
  });

  /**
   * kayıt işlemi bittikten sonra
   * kaydedilen user'ı ve response'u
   * client'a döneriz
   */
  sendJwtToClient(user, res);
});

const login = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!validateUserInput(email, password)) {
    return next(new CustomError("Please check your inputs", 400));
  }

  const user = await UserModel.findOne({ email }).select("+password");
  if (!comparePassword(password, user.password)) {
    return next(new CustomError("Please check your credentials", 400));
  }

  sendJwtToClient(user, res);
});

const getUser = (req, res, next) => {
  res.json({
    success: true,
    data: {
      id: req.user.id,
      name: req.user.name,
    },
  });
};

export { register, getUser, login };
