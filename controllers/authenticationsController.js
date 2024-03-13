import UserModel from "../models/user.js";

const register = async (req, res, next) => {
  const name = "Hasan Alkan";
  const email = "halkan@gmail.com";
  const password = "12345"; // !!!!!! validation error

  // //async await
  // const user = await UserModel.create({
  //   // name: name,
  //   // email: email,
  //   // password: password,

  //   name,
  //   email,
  //   password,
  // });

  // res.status(200).json({
  //   success: true,
  //   data: user,
  // });

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
    return next(error)
  }
};

const errorTest = (req, res, next) => {
  // some codes

  throw new Error("Bir hata oluştu"); // express bunu kendi kendine yakalayabilir çünkü senkron kod

  //some codes
};

export { register, errorTest };
