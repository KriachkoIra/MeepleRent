import Booking from "../models/Booking.js";
import Game from "../models/Game.js";
import User from "../models/User.js";
import { getUserId } from "./user.controller.js";

const createBooking = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { gameId, startDate, endDate } = req.body;
    if (!gameId || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end || start < new Date()) {
      return res.status(400).json({ error: "Invalid date range" });
    }

    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ error: "Game not found" });
    if (game.owner.toString() === userId) {
      return res.status(400).json({ error: "Cannot book your own game" });
    }

    const overlappingBookings = await Booking.find({
      game: gameId,
      status: { $in: ["pending", "confirmed"] },
      $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
    });
    if (overlappingBookings.length > 0) {
      return res
        .status(400)
        .json({ error: "Game is already booked for this period" });
    }

    // Create booking
    const booking = new Booking({
      game: gameId,
      user: userId,
      startDate: start,
      endDate: end,
      status: "pending",
    });

    await booking.save();
    game.isAvailable = false;
    await game.save();

    return res.status(201).json({
      id: booking._id,
      game: gameId,
      startDate: booking.startDate,
      endDate: booking.endDate,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const bookings = await Booking.find({ user: userId })
      .populate("game", "name image price")
      .populate("user", "username _id")
      .sort({ startDate: 1 });
    return res.json(bookings);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    if (booking.user.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to cancel this booking" });
    }

    booking.status = "cancelled";
    await booking.save();

    const game = await Game.findById(booking.game);
    game.isAvailable = true;
    await game.save();

    return res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const confirmBooking = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    const game = await Game.findById(booking.game);

    if (game.owner.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to confirm this booking" });
    }

    booking.status = "confirmed";
    await booking.save();

    return res.json({ message: "Booking confirmed successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { createBooking, getUserBookings, cancelBooking, confirmBooking };
