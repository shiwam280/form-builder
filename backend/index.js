const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const formRoutes = require("./routes/formRoutes");

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

app.use("/api/forms", formRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("App is running");
});
