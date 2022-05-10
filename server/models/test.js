const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: "Name is required.",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Test = mongoose.model("Test", TestSchema);

module.exports = Test;
