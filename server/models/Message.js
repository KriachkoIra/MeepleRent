import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    type: { type: String, enum: ["text", "booking_request", "booking_confirmation", "booking_cancellation", "handled_booking_request"] },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
