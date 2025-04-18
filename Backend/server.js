const express = require("express");
const connectDB = require("./db");
const cor = require("cors");
const questionsRoutes = require("./routes/questionsRoutes");
require("dotenv").config();

connectDB();

const app = express();
app.use(express.json());
app.use(cor());

app.use("/questions", questionsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
