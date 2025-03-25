import express from "express";

import {
  getGames,
  addGame,
  deleteGame,
  updateGame, checkAvailability,
} from "../controllers/game.controller.js";
import Game from "../models/Game.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.route("/").get(getGames).post(upload.single("image"), addGame);
router.route("/:id/availability").get(checkAvailability);

router
    .route("/:id")
    .get(getGame, (req, res) => res.json(res.game))
    .patch(getGame, upload.single("image"), updateGame)
    .delete(getGame, deleteGame);

async function getGame(req, res, next) {
  let game;
  try {
    game = await Game.findById(req.params.id).populate("owner");
    if (game == null) return res.status(404).json({ message: "Couldn't find the game." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.game = game;
  next();
}

export default router;
