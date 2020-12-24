const mongoose = require("mongoose");

// definisi schema
const bankSchema = new mongoose.Schema({
  nameBank: {
    type: String,
    required: true,
  },
  nomorRekening: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

// create model dengan teknologi exports supaya bisa diimport dimana saja

module.exports = mongoose.model("Bank", bankSchema);
