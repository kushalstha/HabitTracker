import * as AuthModel from "../modules/authModels.js";
import { generateToken } from "../utils/auth.js";

const cookieOptions = {
  httpOnly: true,
  maxAge: 7*24 * 60 * 60 * 1000, // 7 days
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
}

export async function registerUser(req, res) {
  try {
    const user = await AuthModel.register(req.body);

    if (!user) {
      return res.status(400).json({
        message: "User registration failed",
      });
    }

    const token = generateToken(user);
    res.cookie("jwt-token", token, cookieOptions);
    return res.status(201).json({
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await AuthModel.login(email, password);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user);
    res.cookie("jwt-token", token, cookieOptions);
    return res.status(200).json({
      message: "Login successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}