import { CustomError } from "../../helpers/error/CustomError.js";

const customErrorHandler = (err, req, res, next) => {
  // CustomError da bir error olduğu için
  // buraya gelecek, ve burada yakaladık
  let customError = err;
  // console.log(err.name)
  if (err.name === "SyntaxError") {
    customError = new CustomError("Unexpected Syntax", 400);
  }
  if (err.name === "ValidationError") {
    customError = new CustomError(err.message, 400);
  }
  if (err.code === 11000) {
    // Duplicate Key
    customError = new CustomError(
      "Duplicate Key Found : Check Your Input",
      400
    );
  }
  console.log("--ErrorName    ->",customError.name);
  console.log("--ErrorMessage ->",customError.message);
  console.log("--ErrorStatus  ->",customError.status);
  res.status(customError.status || 500).json({
    success: false,
    message: customError.message,
  });
};

export { customErrorHandler };
