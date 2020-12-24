const mongoose = require("mongoose");

// definisi schema
const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
});

// create model dengan teknologi exports supaya bisa diimport dimana saja

module.exports = mongoose.model("Image", imageSchema);
