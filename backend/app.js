import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import dbConnection from "./src/config/db.js";
import habitRouter from "./src/routes/habitroute.js";
import authRoutes from "./src/routes/authRoutes.js";
import habitRoutes from "./src/routes/habitroute.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(",").map((url) => url.trim()) : []),
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json());

dbConnection();

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(habitRouter);

const PORT = process.env.PORT || 3001;

app.use('/auth',authRoutes);
app.use('/habits',habitRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});