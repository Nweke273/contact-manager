const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "The name field is required"],
    },
    email: {
      type: String,
      required: [true, "The email field is required"],
    },
    phone: {
      type: String,
      required: [true, "The phone field is required"],
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contacts", contactSchema);
