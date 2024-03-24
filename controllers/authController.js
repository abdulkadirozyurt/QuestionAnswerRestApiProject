import UserModel from "../models/user.js";
import asyncErrorWrapper from "express-async-handler";
import { CustomError } from "../helpers/error/CustomError.js";
import { sendJwtToClient } from "../helpers/authorization/tokenHelpers.js";
import {
  comparePassword,
  validateUserInput,
} from "../helpers/input/inputHelpers.js";

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

/**
 * Logout işleminde
 * token'ları environment ve cookiden
 * silmemiz gerekiyor.
 */
const logout = asyncErrorWrapper(async (req, res, next) => {
  const { NODE_ENV } = process.env;

  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === "developlent" ? false : true,
    })
    .json({
      success: true,
      message: "Logout successfully",
    });
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

const imageUpload = asyncErrorWrapper(async (req, res, next) => {
  //image upload success

  const user = await UserModel.findByIdAndUpdate(
    req.user.id,
    {
      "profile_image": req.savedProfileImage
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Image upload successfully",
    data: user,
  });
});

export { register, getUser, login, logout, imageUpload };
