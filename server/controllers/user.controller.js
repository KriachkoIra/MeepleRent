import User from "../models/User.js";
import Game from "../models/Game.js";
import jwt from "jsonwebtoken";
import { cloudinary } from "../cloudinary.js";

const getUserId = function (req) {
  const token = req.cookies?.token;
  const decoded = jwt.decode(token);
  return decoded?.id;
};

const getUserWithGames = async function (req, res) {
  try {
    const games = await Game.find({ owner: req.params.id });
    const userWithGames = {
      ...res.user.toObject(),
      games,
    };
    return res.json(userWithGames);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

const updateUser = async function (req, res) {
  try {
    const user = res.user;
    if (!user) return res.status(401).json({ error: "User not found." });

    const userId = getUserId(req);
    if (user._id.toString() !== userId)
      return res.status(401).json({ error: "User is not the owner of this account." });

    // Handle avatar upload
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: "meepleRent/avatars" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
        ).end(req.file.buffer);
      });
      user.avatar = result.secure_url;
    }
    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;
    await user.save();
    return res.json({ message: "User data updated successfully", avatar: user.avatar });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

const deleteUser = async function (req, res) {
  try {
    const user = res.user;

    if (!user) return res.status(401).json({ error: "User not found." });

    const userId = getUserId(req);
    if (user._id.toString() !== userId)
      return res
        .status(401)
        .json({ error: "User is not the owner of this account." });

    await Game.deleteMany({ owner: userId });
    await User.deleteOne(res.user);
    return res.json({ message: "Successfully deleted." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { getUserId, getUserWithGames, updateUser, deleteUser };
