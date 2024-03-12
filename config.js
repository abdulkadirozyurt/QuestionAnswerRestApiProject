import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = () => {
  mongoose
    .connect(process.env.DB_URI, {
      dbName: "QARestApiDb",
    })
    .then(() => {
      console.log("Database connection established successfully");
    })
    .catch((err) => {
      console.log(`Database connection error: ${err}`);
    });
};

export { dbConfig };
