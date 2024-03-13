const customErrorHandler = (err, req, res, next) => {
  console.log("Custom Error Handler ==>",err);

  res.status(400).json({
    success: false,
  });
};





export {customErrorHandler}