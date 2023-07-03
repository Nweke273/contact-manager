const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username field cannot be empty"],
    },
    email: {
      type: String,
      required: [true, "Email field cannot be empty"],
      unique: [true, "Email address already exist"],
    },
    password: {
      type: String,
      required: [true, "Password field cannot be empty"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
