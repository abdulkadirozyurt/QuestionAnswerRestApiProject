import UserModel from "../models/user.js";

const register = async (req, res, next) => {
  const name = "Abdulkadir Özyurt";
  const email = "abdulkadir.ozyurt@gmail.com";
  const password = "123456";

  //async await
  const user = await UserModel.create({
    // name: name,
    // email: email,
    // password: password,

    name,
    email,
    password,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
};

export { register };
