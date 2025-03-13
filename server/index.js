import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import authRouter from "./routes/auth.js";
import gamesRouter from "./routes/games.js";
import usersRouter from "./routes/users.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb://127.0.0.1:27017/meepleRentDB");

app.use("/auth", authRouter);
app.use("/games", gamesRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
