const mongoose = require("mongoose");

// definisi schema
const memberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

// create model dengan teknologi exports supaya bisa diimport dimana saja

module.exports = mongoose.model("Member", memberSchema);
