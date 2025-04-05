const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://ap0696901:admin@cluster0.uaomx.mongodb.net/quizBase?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
