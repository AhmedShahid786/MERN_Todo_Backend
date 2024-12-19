import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    createdBy: { type: mongoose.Types.ObjectId, required: true },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const taskModel = mongoose.model("task", taskSchema);
