import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "This email already exists"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  password: {
    type: String,
    minlength: [6, "Password should be at least 6 characters long"],
    select: false,
    required: [true, "Please provide a password"],
    select: false, // This will not return the password when we query the user
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
  about: {
    type: String,
  },
  place: {
    type: String,
  },
  website: {
    type: String,
  },
  profile_image: {
    type: String,
    default: "default.jpg",
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});

// pre hook: kaydetmeden hemen önce çalışır
userSchema.pre("save", function (next) {

  // Eğer parola değiştirilmediyse, bir sonraki middleware'e geç
  if (!this.isModified("password")) return next(); 
  
  // Parolayı hashle ve modelde güncelle
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    // Hashlenmiş parolayı şema üzerinde güncelle
    this.password = hash;

    next();
  });
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
