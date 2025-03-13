import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const registerUser = async function (req, res) {
  try {
    const { email, username, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res
        .status(400)
        .json({ message: "User with this email alredy exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword, username });
    const createdUser = await newUser.save();

    try {
      const token = await jwt.sign(
        { id: createdUser._id },
        process.env.JWT_KEY
      );

      res
        .cookie("token", token, {
          secure: true,
        })
        .status(201)
        .json({ id: createdUser._id, username });
    } catch (err) {
      res.status(401).json(err.message);
    }
  } catch (err) {}
};

const loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found." });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(400).json({ message: "Password is incorrect." });
    }

    try {
      const token = await jwt.sign({ id: user._id }, process.env.JWT_KEY);

      res
        .cookie("token", token, {
          secure: true,
        })
        .status(201)
        .json({
          id: user._id,
          email,
          username: user.username,
          avatar: user.avatar,
        });
    } catch (err) {
      throw err;
    }
  } catch (err) {}
};

const logoutUser = function (req, res) {
  res.clearCookie("token");
  req.session = null;
  req.session?.destroy();
  return res.json({ logout: true });
};

const verifyUser = async function (req, res) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json("No token.");
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (err) throw err;
      const user = await User.findById(decoded.id);
      if (!user) throw "No user.";
      return res.json({
        ...decoded,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      });
    });
  } catch (err) {
    res.status(401).json("Invalid token.");
  }
};

export { registerUser, loginUser, logoutUser, verifyUser };
