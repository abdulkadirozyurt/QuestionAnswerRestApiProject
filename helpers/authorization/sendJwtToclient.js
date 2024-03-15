const sendJwtToClient = (user, res) => {
  // Generate JWT according to UserModel
  const token = user.generateJwtFromUser();

  const { JWT_COOKIE, NODE_ENV } = process.env;

  // Return Response
  return res
    .status(200)
    .cookie("accessToken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      access_Token: token,
      data: {
        name: user.name,
        email: user.email,
      },
    });
};

export default sendJwtToClient;