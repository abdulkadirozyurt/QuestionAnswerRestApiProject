
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    place: {type: String},
    title: {type: String},
    about: {type: String},
    website: {type: String},
    blocked: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    profile_image: {type: String, default: "default.jpg"},
    role: {type: String, default: "user", enum: ["user", "admin"]},
    name: {type: String, required: [true, "Please provide a name"]},
    password: {
        type: String,
        minlength: [6, "Password should be at least 6 characters long"],
        select: false,
        required: [true, "Please provide a password"],

    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email",
        ],
    },
});

// userSchema methods
userSchema.methods.generateJwtFromUser = function () {
    const {JWT_SECRET_KEY, JWT_EXPIRE} = process.env;
    const payload = {id: this._id, name: this.name};

    const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: JWT_EXPIRE});

    return token;
};

// KAYIT İŞLEMİNDEN HEMEN ÖNCE ÇALIŞIR
// 1- Eğer parola değiştirilmediyse, bir sonraki middleware'e geç
// 2- Parolayı hashle ve modelde güncelle
// 3- Hashlenmiş parolayı şema üzerinde güncelle
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
