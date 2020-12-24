const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

// definisi schema
const categorySchema = new mongoose.Schema({
  name: {
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

module.exports = mongoose.model("Category", categorySchema);
