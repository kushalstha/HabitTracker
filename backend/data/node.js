import mongoose from "mongoose";

const habitatSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  frequency: {
    required: true,
    type: String,
  },
  completions: {
    required: true,
    type: [String],
  }

})

const habit =await mongoose.model("Habit", habitatSchema);
export default habit;