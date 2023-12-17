const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const catSchema = new Schema(
  {
    name: { type: String },
    age: { type: Number },

    images: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cat", catSchema);
