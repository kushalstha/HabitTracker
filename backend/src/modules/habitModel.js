import Habit from "../../data/node.js";

export async function getAll(userId) {
  return Habit.find({ user: userId });
}

export async function addHabit(newHabit, userId) {
  return Habit.create({ ...newHabit, user: userId });
}

export async function updateHabit(id, updatedHabit, userId) {
  return Habit.findOneAndUpdate({ _id: id, user: userId }, updatedHabit, {
    returnDocument: "after",
    runValidators: true,
  });
}

export async function deleteHabit(id, userId) {
  return Habit.findOneAndDelete({ _id: id, user: userId });
}