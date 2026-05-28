import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("Database connected");
});
