const express = require("express");
const connectDB = require('./db')
require("dotenv").config();

connectDB()

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
