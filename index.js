import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import participantRoute from "./routes/participant.js";
import homeRoute from "./routes/home.js";
import authRoute from "./routes/auth.js";

dotenv.config();

const app = express();
app.set("view engine", "ejs");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connection Successful!!!"))
  .catch((err) => console.log(err));
app.use(cors());
app.use(express.json());
app.use("/", homeRoute);
app.use("/api/promo", participantRoute);
app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 2000, () => {
  console.log("Server Connected!!!");
});
