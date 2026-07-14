import express from "express";
import habits from "./data/habit.js";
import router from "./src/routes/habitroute.js";
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./src/config/db.js";

const app = express();
dotenv.config();


app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(router);

app.use(cors());

await dbConnection();

app.listen(PORT, () => {
  console.log(`Servers is running on port ${PORT}`);
});

