import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { CustomError } from "../../helpers/error/CustomError.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Storage -> specify save file to where and which name
// fileFilter -> allow which type of files

// const storage = multer.diskStorage({
//   destination: function (req, res, callback) {
//     const rootDirectory = path.dirname(require.main.filename);
//     callback(null, path.join(rootDirectory, "/public/uploads"));
//   },
//   filename: function (req, file, callback) {
//     // File ---- MimeType - image/png

//     const extension = file.mimetype.split("/")[1];
//     req.savedProfileImage = "image_" + req.user.id + "." + extension;
//     callback(null, req.savedProfileImage);
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const rootDirectory = path.resolve(__dirname, "../../public/uploads");
    callback(null, rootDirectory);
  },
  filename: function (req, file, callback) {
    const extension = file.mimetype.split("/")[1];
    req.savedProfileImage = "image_" + req.user.id + "." + extension;
    callback(null, req.savedProfileImage);
  },
});


const fileFilter = (req, file, callback) => {
  let allowedMimeTypes = ["image/jpg", "image/gif", "image/jpeg", "image/png"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(
      new CustomError("Please provide a valid image file", 400),
      false
    );
  }
  return callback(null, true);
};

const profileImageUpload = multer({ storage, fileFilter });

export { profileImageUpload };
