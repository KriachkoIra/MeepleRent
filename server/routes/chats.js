import express from "express";
import {
  getUserChats,
  getChatMessages,
  sendMessage,
} from "../controllers/chat.controller.js";

const router = express.Router();

// Get all chats for the current user
router.get("/", getUserChats);


// Get messages for a specific chat
router.get("/:chatId/messages", getChatMessages);

export default router; 