const mongoose = require("mongoose");
const boxSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: {},
      require: true,
    },
    author: {
      type: String,
      default: "Admin",
    },
    image: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
  },
  { timestamp: true }
);
module.exports = mongoose.model("Boxes", boxSchema);
