import UserModel from "../models/user.js";

const register = async (req, res, next) => {
  const name = "Hasan Alkan";
  const email = "halkan@gmail.com";
  const password = "12345";  // !!!!!!

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
