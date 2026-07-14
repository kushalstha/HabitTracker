import mongoose from "mongoose";
import habit from "./node.js";
import dotenv from "dotenv";

dotenv.config({
  path: './.env',
});

const habits = [
  {
    name: "Drink Water",
    frequency: "daily",
    completions: ["2026-06-27", "2026-06-28", "2026-06-29"],
  },
  {
    name: "Workout",
    frequency: "daily",
    completions: ["2026-06-27", "2026-06-29"],
  },
  {
    name: "Read Book",
    frequency: "daily",
    completions: [
      "2026-06-23", "2026-06-24", "2026-06-25",
      "2026-06-26", "2026-06-27", "2026-06-28", "2026-06-29",
    ],
  },
  {
    name: "Meditate",
    frequency: "daily",
    completions: ["2026-06-27", "2026-06-28", "2026-06-29"],
  },
  {
    name: "Learn a new language",
    frequency: "daily",
    completions: ["2026-06-27", "2026-06-28", "2026-06-29"],
  },
];

const connection = mongoose.connect(process.env.MONGODB_URL);
await habit.deleteMany({})
await habit.insertMany(habits);

export default habits;