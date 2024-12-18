const express = require("express");
const { Menu } = require("../model/sidebar");

const menuRouter = express.Router();

menuRouter.use("/insertMainMenu", (req, res) => {
  const menu = new Menu(req.body);
  menu.save();
  res.send("Main menu created")
});

menuRouter.post("/addSubmenu", async (req, res) => {
  try {
    const { title, insertsubmenus } = req.body;

    if (insertsubmenus.length < 1) {
      res.status(400).send("No thissub menu");
    }

    const menu = await Menu.findOne({ title: title });
    if (menu.length < 1) {
      res.status(400).send("No this menu");
    }

    menu.submenu = true;

    menu.submenuItems.push(...insertsubmenus);  
    const updated = await menu.save();
    if (updated) {
      res.status(200).send(updated);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});


menuRouter.get("/showMenu", async (req, res) => {
  try {
   const data= await Menu.find({})
     res.send(data)
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = {
  menuRouter,
};
