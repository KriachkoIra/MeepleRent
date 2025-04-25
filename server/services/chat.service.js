export const saveMessage = async (message, senderId, recepientId) => {
  chat = await Chat.findOne({
    participants: { $all: [senderId, recepientId] }
  });
  if (!chat) {
    throw new Error("Chat not found");
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
};
