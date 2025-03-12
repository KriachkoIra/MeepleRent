import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  time: Number,
  difficulty: String,
  minPlayers: Number,
  maxPlayers: Number,
  isAvailable: Boolean,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Game = mongoose.model("Game", GameSchema);

export default Game;
