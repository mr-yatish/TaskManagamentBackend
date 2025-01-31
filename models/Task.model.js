const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    progress: {
      type: String,
      required: true,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started",
    },
    status: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Date,
      requried: true,
    },
    startfrom: {
      type: Date,
      requried: true,
    },
    endto: {
      type: Date,
      requried: true,
    },
    deleteFlag: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

module.exports = mongoose.model("Task", taskSchema);
