import User from "../models/User.js";
import jwt from "jsonwebtoken";

const getUserId = function (req) {
  const token = req.cookies?.token;
  const decoded = jwt.decode(token);
  return decoded?.id;
};

export { getUserId };
