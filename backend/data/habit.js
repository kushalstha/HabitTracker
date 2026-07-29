import mongoose from "mongoose";
import bcrypt from "bcrypt";
import habit from "./node.js";
import User from "./user.js";
import dotenv from "dotenv";

dotenv.config({
  path: './.env',
});

const baseHabits = [
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

await mongoose.connect(process.env.MONGODB_URL);

let demoUser = await User.findOne({ email: "demo@example.com" });
if (!demoUser) {
  demoUser = await User.create({
    name: "Demo User",
    email: "demo@example.com",
    password: await bcrypt.hash("demo123456", 10),
    isAdmin: false,
  });
}

await habit.deleteMany({ user: demoUser._id });
await habit.insertMany(
  baseHabits.map((habitItem) => ({ ...habitItem, user: demoUser._id }))
);

export default baseHabits;  