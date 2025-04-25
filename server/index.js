// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import authRouter from "./routes/auth.js";
import gamesRouter from "./routes/games.js";
import usersRouter from "./routes/users.js";
import bookingsRouter from "./routes/bookings.js";
import reviewsRouter from "./routes/reviews.js";
import chatsRouter from "./routes/chats.js";
import messagesRouter from "./routes/messages.js";
import { configureCloudinary } from "./cloudinary.js";
import { setupSocket } from "./services/websocket-server.js";

dotenv.config();
configureCloudinary();

const app = express();

const server = setupSocket(app);

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: [process.env.CLIENT_URL || "http://localhost:5173"],
        credentials: true,
    })
);

const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb://127.0.0.1:27017/meepleRentDB")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB error:", err));

app.use("/auth", authRouter);
app.use("/games", gamesRouter);
app.use("/users", usersRouter);
app.use("/bookings", bookingsRouter);
app.use("/reviews", reviewsRouter);
app.use("/chats", chatsRouter);
app.use("/messages", messagesRouter);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));