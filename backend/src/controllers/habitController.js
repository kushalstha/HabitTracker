import * as habitModel from "../modules/habitModel.js";

export async function gethabits(req, res) {
  const habits = await habitModel.getAll();
  return res.status(200).json(habits);
}

export async function addHabit(req, res) {
  const habit = req.body;
  await habitModel.addHabit(habit);
  return res.status(201).json("Habit added successfully");
}

export async function updateHabit(req, res) {
  const habitId = req.params.id;
  const updatedHabit = req.body;
  const result = await habitModel.updateHabit(habitId, updatedHabit)
}