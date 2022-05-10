const mongoose = require("mongoose");

const validateEmail = function (email) {
  var isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return isEmail.test(email);
};

const StudentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    studentId: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      default: "student",
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      // minlength: 60,
    },
    avatar: {
      type: String,
      default: "no-user.png",
    },
    dob: {
      type: String,
    },
    qr: {
      type: String,
      default: "",
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
