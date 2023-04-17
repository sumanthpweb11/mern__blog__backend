import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import {
  errorResponserHandler,
  invalidPathHandler,
} from "./middleware/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";

// dotenv.config();
config({
  path: "./config/config.env",
});

const app = express();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};
// Built in Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Routes
app.use("/api/users", userRoutes);

// Error Middleware
app.use(invalidPathHandler);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
