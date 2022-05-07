const mongoose = require("mongoose");

const validateEmail = function (email) {
  var isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return isEmail.test(email);
};

const MemberSchema = new mongoose.Schema(
  {
    key: {
      type: Number,
      default: 1,
    },
    fullname: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Member = mongoose.model("Member", MemberSchema);

module.exports = Member;
