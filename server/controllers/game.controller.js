import Game from "../models/Game.js";
import { getUserId } from "./user.controller.js";

const getGames = async function (req, res) {
  try {
    let query = {};

    // Filtering
    if (req.query.price) {
      query.price = { $lte: Number(req.query.price) };
    }
    if (req.query.difficulty) {
      query.difficulty = req.query.difficulty;
    }
    if (req.query.minPlayers && req.query.maxPlayers) {
      query.$and = [
        { minPlayers: { $lte: Number(req.query.minPlayers) } },
        { maxPlayers: { $gte: Number(req.query.maxPlayers) } },
      ];
    }

    let sortOptions = {};
    if (req.query.sortBy) {
      const sortField = req.query.sortBy;
      const sortOrder = req.query.order === "desc" ? -1 : 1;
      sortOptions[sortField] = sortOrder;
    }

    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" };
    }

    const games = await Game.find(query).sort(sortOptions);

    return res.json(games);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const deleteGame = async function (req, res) {
  try {
    const userId = getUserId(req);

    if (res.game.owner._id.toString() !== userId)
      return res
          .status(401)
          .json({ error: "User is not the owner of this game." });

    await Game.deleteOne(res.game);
    return res.json({ message: "Successfully deleted." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const addGame = async function (req, res) {
  try {
    const { name, description, time, difficulty, minPlayers, maxPlayers, price } =
        req.body;
        console.log(req);
    const owner = getUserId(req);

    if (!owner)
      return res.status(401).json({ error: "Needs user authorization." });

    const game = new Game({
      name,
      description,
      time,
      difficulty,
      minPlayers,
      maxPlayers,
      owner,
      isAvailable: true,
      price,
    });

    const createdGame = await game.save();
    return res.json({ id: createdGame._id, name: createdGame.name });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

const updateGame = async function (req, res) {
  try {
    const game = res.game;

    if (!game) return res.status(401).json({ error: "Game not found." });

    const userId = getUserId(req);
    if (res.game.owner._id.toString() !== userId)
      return res
          .status(401)
          .json({ error: "User is not the owner of this game." });

    game.name = req.body.name || game.name;
    game.description = req.body.description || game.description;
    game.time = req.body.time || game.time;
    game.difficulty = req.body.difficulty || game.difficulty;
    game.minPlayers = req.body.minPlayers || game.minPlayers;
    game.maxPlayers = req.body.maxPlayers || game.maxPlayers;
    game.price = req.body.price || game.price;

    await game.save();
    return res.json({ message: "Game updated successfully" });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

export { getGames, addGame, deleteGame, updateGame };
