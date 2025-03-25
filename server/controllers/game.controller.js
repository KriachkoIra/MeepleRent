import Game from "../models/Game.js";
import { getUserId } from "./user.controller.js";
import { cloudinary } from "../cloudinary.js";
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
    const { name, description, time, difficulty, minPlayers, maxPlayers, price } = req.body;
    const owner = getUserId(req);

    if (!owner) return res.status(401).json({ error: "Needs user authorization." });

    let imageUrl = "https://res.cloudinary.com/duwmrfgn6/image/upload/v1742931468/meepleRent/games/vphy5x365vnkrkkt3m3k.jpg";
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: "meepleRent/games" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
        ).end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    } else {
      console.log("No file uploaded, using default image");
    }

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
      image: imageUrl,
    });

    const createdGame = await game.save();
    return res.json({ id: createdGame._id, name: createdGame.name, image: createdGame.image });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

const updateGame = async function (req, res) {
  try {
    const game = res.game;
    if (!game) return res.status(401).json({ error: "Game not found." });

    const userId = getUserId(req);
    if (game.owner._id.toString() !== userId)
      return res.status(401).json({ error: "User is not the owner of this game." });

    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
          { folder: "meepleRent/games" },
          (error, result) => {
            if (error) throw error;
            game.image = result.secure_url;
          }
      ).end(req.file.buffer);
    }

    game.name = req.body.name || game.name;
    game.description = req.body.description || game.description;
    game.time = req.body.time || game.time;
    game.difficulty = req.body.difficulty || game.difficulty;
    game.minPlayers = req.body.minPlayers || game.minPlayers;
    game.maxPlayers = req.body.maxPlayers || game.maxPlayers;
    game.price = req.body.price || game.price;

    await game.save();
    return res.json({ message: "Game updated successfully", image: game.image });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

const checkAvailability = async (req, res) => {
  try {
    const gameId = req.params.id;
    const bookings = await Booking.find({
      game: gameId,
      status: { $in: ["pending", "confirmed"] },
    });
    return res.json({ bookings, isAvailable: bookings.length === 0 });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
export { getGames, addGame, deleteGame, updateGame, checkAvailability };