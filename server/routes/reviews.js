import express from "express";
import { createReview, getGameReviews, deleteReview } from "../controllers/review.controller.js";

const router = express.Router();

router.route("/").post(createReview);
router.route("/game/:id").get(getGameReviews);
router.route("/:id").delete(deleteReview);

export default router;