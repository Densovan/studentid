const mongoose = require('mongoose');

const validateEmail = function (email) {
  var isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return isEmail.test(email);
};

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: 'user',
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
    password: {
      type: String,
      required: true,
      minlength: 60,
    },
    avatar: {
      type: String,
      default: 'no-user.png',
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
