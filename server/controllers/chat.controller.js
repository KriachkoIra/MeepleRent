import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import { getUserId } from "./user.controller.js";

// Get all chats for the current user
export const getUserChats = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    let chats = await Chat.find({ participants: userId })
      .populate("participants", "_id username avatar")
      .sort({ updatedAt: -1 });

    chats = chats.map(chat => {
      const chatObj = chat.toObject();
      const chatUser = chatObj.participants.find(p => p._id.toString() !== userId.toString());
      return {
        _id: chatObj._id,
        chatUser,
        createdAt: chatObj.createdAt,
        updatedAt: chatObj.updatedAt
      }
    });

    // For each chat, get the last message
    const chatsWithLastMessage = await Promise.all(
      chats.map(async (chat) => {
        const lastMessage = await Message.findOne({ chat: chat._id })
          .sort({ createdAt: -1 })
          .populate("sender", "username");

        return {
          ...chat,
          lastMessage: lastMessage ? {
            text: lastMessage.text,
            sender: lastMessage.sender,
            createdAt: lastMessage.createdAt
          } : null
        };
      })
    );

    return res.json(chatsWithLastMessage);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get messages for a specific chat
export const getChatMessages = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const chatId = req.params.chatId;

    // Check if user is a participant in this chat
    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    if (!chat.participants.includes(userId)) {
      return res.status(403).json({ error: "Not authorized to view this chat" });
    }

    // Get all messages for this chat
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "username avatar")
      .sort({ createdAt: 1 });

    return res.json(messages);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Send a message in a chat
export const sendMessage = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { text, recepientId, chatId } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Message text is required" });
    }

    let chat = null;
    if (chatId) {
      chat = await Chat.findById(chatId);
      if ((!chat || !chat.participants.includes(userId))) {
        return res.status(404).json({ error: "Chat not found" });
      }
    } else {
      const recepient = await User.findById(recepientId);
      if (!recepient) {
        return res.status(404).json({ error: "Recepient not found" });
      }
      chat = await Chat.findOne({
        participants: { $all: [userId, recepientId] }
      });
      if (!chat) {
        chat = new Chat({
          participants: [userId, recepientId]
        });
        await chat.save();
      }
    }

    const newMessage = new Message({
      chat: chat._id,
      sender: userId,
      text: text.trim()
    });

    await newMessage.save();

    // Update the chat's updatedAt timestamp
    chat.updatedAt = new Date();
    await chat.save();

    // Return the populated message
    const populatedMessage = await Message.findById(newMessage._id)
      .populate("sender", "username avatar")
      .populate("chat", "_id");

    return res.status(201).json(populatedMessage);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};