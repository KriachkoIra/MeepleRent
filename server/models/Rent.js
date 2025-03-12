import mongoose from "mongoose";

const RentSchema = new mongoose.Schema({
  rentStart: Date,
  rentEnd: Date,
  status: String, // pending, in rent, returned
  game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
  rentee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Rent = mongoose.model("Rent", RentSchema);

export default Rent;
