// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String, default: "https://res.cloudinary.com/duwmrfgn6/image/upload/v1742931342/meepleRent/games/waj73anakadwzivqmd2a.png" }, // URL to avatar image
});

const User = mongoose.model("User", UserSchema);
export default User;