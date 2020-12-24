const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

// definisi schema
const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isPopular: {
    type: Boolean,
  },
  itemId: [
    {
      type: ObjectId,
      ref: "Item",
    },
  ],
});

// create model dengan teknologi exports supaya bisa diimport dimana saja

module.exports = mongoose.model("Activity", activitySchema);
