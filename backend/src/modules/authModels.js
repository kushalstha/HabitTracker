import User from "../../data/user.js";
import Habit from "../../data/node.js";
import bcrypt from "bcrypt";

export async function register(userDetails) {
  const hashedPassword = await bcrypt.hash(userDetails.password, 10);

  const user = await User.create({
    name: userDetails.name,
    email: userDetails.email,
    password: hashedPassword,
    isAdmin: userDetails.isAdmin,
  });

  const defaultHabits = [
    {
      name: "Drink Water",
      frequency: "daily",
      completions: ["2026-06-27", "2026-06-28", "2026-06-29"],
      user: user._id,
    },
    {
      name: "Workout",
      frequency: "daily",
      completions: ["2026-06-27", "2026-06-29"],
      user: user._id,
    },
    {
      name: "Read Book",
      frequency: "daily",
      completions: [
        "2026-06-23", "2026-06-24", "2026-06-25",
        "2026-06-26", "2026-06-27", "2026-06-28", "2026-06-29",
      ],
      user: user._id,
    },
    {
      name: "Meditate",
      frequency: "daily",
      completions: ["2026-06-27", "2026-06-28", "2026-06-29"],
      user: user._id,
    },
    {
      name: "Learn a new language",
      frequency: "daily",
      completions: ["2026-06-27", "2026-06-28", "2026-06-29"],
      user: user._id,
    },
  ];

  await Habit.insertMany(defaultHabits);

  return user;
}

export async function login(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);

  return isValid ? user : null;
}