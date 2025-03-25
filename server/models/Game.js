// models/Game.js
import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: { type: String, default: "https://res.cloudinary.com/duwmrfgn6/image/upload/v1742931468/meepleRent/games/vphy5x365vnkrkkt3m3k.jpg" },
  time: Number,
  difficulty: String,
  minPlayers: Number,
  maxPlayers: Number,
  isAvailable: Boolean,
  price: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Game = mongoose.model("Game", GameSchema);
export default Game;