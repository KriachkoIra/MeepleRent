import express from "express";

import User from "../models/User.js";
import {
  getUserWithGames,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router
  .route("/:id")
  .get(getUser, getUserWithGames)
  .patch(getUser, updateUser)
  .delete(getUser, deleteUser);

async function getUser(req, res, next) {
  let user;

  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Couldn't find user." });
    }
    res.user = user;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  next();
}

export default router;
