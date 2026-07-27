import Habit from "../../data/node.js";

export async function getAll() {
  return Habit.find();
}

export async function addHabit(newHabit) {
  return Habit.create(newHabit);
}

export async function updateHabit(id, updatedHabit) {
  return Habit.findByIdAndUpdate(id, updatedHabit, {
    returnDocument: "after",
    runValidators: true,
  });
}

export async function deleteHabit(id) {
  return Habit.findByIdAndDelete(id);
}