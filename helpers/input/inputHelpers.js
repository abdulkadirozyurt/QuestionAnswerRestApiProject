import bcrypt from "bcrypt";

/**
 * Kullanıcı, email veya password
 * göndermiş mi göndermemiş mi
 * kontrol ederiz
 */

const validateUserInput = (email, password) => {
  return email && password;
};

/**
 *
 * @param {*} password
 * @param {*} hashedPassword
 * @returns girilen parola ile hash'lenmiş parolayı karşılaştırır,
 * boolean bir değer döndürür
 */


const comparePassword = (password, hashedPassword) => {
  const passwordMatch =  bcrypt.compareSync(password, hashedPassword);
  if (!passwordMatch) {
    return false
  }
  else{
    return true
  }
};










export { validateUserInput, comparePassword };
