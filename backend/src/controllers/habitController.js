import * as habitModel from "../modules/habitModel.js";

export async function getAll(req, res) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const habits = await habitModel.getAll(userId);
    return res.status(200).json(habits);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function addHabit(req, res) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const newHabit = await habitModel.addHabit(req.body, userId);

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

    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const updated = await habitModel.updateHabit(habitId, updatedHabit, userId);

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

    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const deleted = await habitModel.deleteHabit(habitId, userId);

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