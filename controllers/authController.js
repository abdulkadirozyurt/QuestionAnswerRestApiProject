import UserModel from "../models/user.js";
import asyncErrorWrapper from "express-async-handler";
import { sendJwtToClient } from "../helpers/authorization/tokenHelpers.js";

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

  /**
   * kayıt işlemi bittikten sonra
   * kaydedilen user'ı ve response'u
   * client'a döneriz
   */
  sendJwtToClient(user, res);
});

const getUser = (req, res, next) => {
  res.json({
    success: true,
    data:{
      id:req.user.id,
      name:req.user.name
    },
  });
};

export { register, getUser };
