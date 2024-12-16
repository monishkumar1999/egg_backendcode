const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  submenu: { type: Boolean, default: false },
  submenuItems: [
    {
      title: { type: String},
    },
  ],
});

const Menu=mongoose.model("Menu",schema)

module.exports={
    Menu
}