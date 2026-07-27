import * as habitModel from "../modules/habitModel.js";

export async function getAll(req, res) {
  try {
    const habits = await habitModel.getAll();
    return res.status(200).json(habits);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function addHabit(req, res) {
  try {
    const newHabit = await habitModel.addHabit(req.body);

    return res.status(201).json(newHabit);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function updateHabit(req, res) {
  try {
    const habitId = req.params.id;
    const updatedHabit = req.body;

    const updated = await habitModel.updateHabit(
      habitId,
      updatedHabit
    );

    if (!updated) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function deleteHabit(req, res) {
  try {
    const habitId = req.params.id;

    const deleted = await habitModel.deleteHabit(habitId);

    if (!deleted) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    return res.status(200).json({
      message: "Habit deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}