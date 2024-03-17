/**
 * Bunu, token üretip
 * client'a göndermek için yardımcı bir metot
 * olarak oluşturduk
 * mesela login ve register'da cookie'ye gönderip kaydedeceğiz,
 * işlemleri tekrarlamamak için burda tek parça halinde yazdık
 * istediğimiz yerde kullanabiliriz
 */
const sendJwtToClient = (user, res) => {
  // Generate JWT according to UserModel
  const token = user.generateJwtFromUser();

  const { JWT_COOKIE, NODE_ENV } = process.env;

  // Return Response
  return res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      secure: NODE_ENV === "development" ? false : true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
    })
    .json({
      success: true,
      access_token: token,
      data: {
        name: user.name,
        email: user.email,
      },
    });
};
("");

/**
 * Token, headers'a yerleştirilmiş mi
 * yerleştirilmemiş mi
 */
const isTokenIncluded = (req) => {
  return (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer: ")
  );
};

/**
 *
 *
 *
 * detaches token which is in authorization headers
 * @param {*} req
 * @returns  access_token
 */
const getAccessTokenFromHeader = (req) => {
  const authorization = req.headers.authorization; //     [0]       [1]
  const access_token = authorization.split(" ")[1]; // Bearer: {{access_token}}
  return access_token;
};

export { sendJwtToClient, isTokenIncluded, getAccessTokenFromHeader };
