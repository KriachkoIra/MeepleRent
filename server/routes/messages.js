import express from "express";
import { sendMessage } from "../controllers/chat.controller.js";

const router = express.Router();

// Send a message in a chat
router.post("/", sendMessage);

export default router;