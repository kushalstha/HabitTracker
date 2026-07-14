import habits from "../../data/habit.js";
import habit from "../../data/node.js";
import { ObjectId } from 'mongodb'


export async function getAll() {
  return habit.find();

}

export async function addHabit(newHabit) {
  return habits.push(newHabit);
}

export async function updateHabit(id, updatedHabit) {
  const updateId = new ObjectId(id);

  return habit.findByIdAndUpdate(updateId, updatedHabit, {
    new: true,
    runValidators: true,
  });
}