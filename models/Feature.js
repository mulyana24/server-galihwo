const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

// definisi schema
const featureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  itemId: [
    {
      type: ObjectId,
      ref: "Item",
    },
  ],
});

// create model dengan teknologi exports supaya bisa diimport dimana saja

module.exports = mongoose.model("Feature", featureSchema);
