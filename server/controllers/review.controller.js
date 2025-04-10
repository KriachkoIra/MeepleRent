import Review from "../models/Review.js";
import Game from "../models/Game.js";
import Booking from "../models/Booking.js";
import { getUserId } from "./user.controller.js";

const createReview = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const gameId = req.params.id;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ error: "Game not found" });

    const hasBooked = await Booking.findOne({
      game: gameId,
      user: userId,
      status: "confirmed",
    });
    if (!hasBooked) {
      return res
        .status(403)
        .json({ error: "You can only review games you have rented" });
    }

    const existingReview = await Review.findOne({ game: gameId, user: userId });
    if (existingReview) {
      return res
        .status(400)
        .json({ error: "You have already reviewed this game" });
    }

    const review = new Review({
      game: gameId,
      user: userId,
      rating,
      comment,
    });

    await review.save();
    game.reviews.push(review._id);
    await game.save();

    return res.status(201).json({
      id: review._id,
      rating,
      comment,
      game: gameId,
      user: userId,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getGameReviews = async (req, res) => {
  try {
    const gameId = req.params.id;
    const reviews = await Review.find({ game: gameId })
      .populate("user", "username avatar")
      .sort({ createdAt: -1 });

    return res.json(reviews);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });

    if (review.user.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You can only delete your own reviews" });
    }

    await Review.findByIdAndDelete(review._id);

    const game = await Game.findById(review.game);
    game.reviews = game.reviews.filter(
      (id) => id.toString() !== review._id.toString()
    );
    await game.save();

    return res.json({ message: "Review deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { createReview, getGameReviews, deleteReview };
