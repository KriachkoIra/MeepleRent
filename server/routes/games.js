import express from "express";

import {
  getGames,
  addGame,
  deleteGame,
  updateGame,
} from "../controllers/game.controller.js";
import Game from "../models/Game.js";

const router = express.Router();

router.route("/").get(getGames).post(addGame);

router
  .route("/:id")
  .get(getGame, (req, res) => {
    res.json(res.game);
  })
  .patch(getGame, updateGame)
  .delete(getGame, deleteGame);

async function getGame(req, res, next) {
  let game;

  try {
    game = await Game.findById(req.params.id).populate("owner");
    if (game == null) {
      return res.status(404).json({ message: "Couldn't find the game." });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.game = game;
  next();
}

export default router;
