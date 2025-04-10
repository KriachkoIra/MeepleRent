import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: { type: String, default: "https://res.cloudinary.com/duwmrfgn6/image/upload/v1742931468/meepleRent/games/vphy5x365vnkrkkt3m3k.jpg" },
  time: Number,
  difficulty: String,
  minPlayers: Number,
  maxPlayers: Number,
  isAvailable: { type: Boolean, default: true },
  price: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const Game = mongoose.model("Game", GameSchema);
export default Game;