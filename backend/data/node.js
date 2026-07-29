import mongoose from "mongoose";

const habitatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completions: {
    type: [String],
    required: true,
    default: [],
  },
});

const Habit = mongoose.model("Habit", habitatSchema);

export default Habit;