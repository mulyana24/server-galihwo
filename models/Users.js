const mongoose = require("mongoose");

// package bcryptjs untuk mengacak password
const bcrypt = require("bcryptjs");

// definisi schema
const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// generate password
usersSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

// create model dengan teknologi exports supaya bisa diimport dimana saja

module.exports = mongoose.model("Users", usersSchema);
