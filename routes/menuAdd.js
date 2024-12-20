const express = require("express");
const { Menu } = require("../model/sidebar");

const menuRouter = express.Router();

menuRouter.use("/insertMainMenu", (req, res) => {
  const menu = new Menu(req.body);
  menu.save();
  res.send("Main menu created");
});

menuRouter.post("/addSubmenu", async (req, res) => {
  try {
    const { title, insertsubmenus } = req.body;
    if (insertsubmenus.length < 1) {
      res.status(400).send("No thissub menu");
    }

    const menu = await Menu.findOne({ title: title });
  
    if (!menu) {
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
    const data = await Menu.find({});
    res.send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

menuRouter.post("/delete/MainMenu", async (req, res) => {
  const title = req.body.Title;

  const deleted = await Menu.deleteOne({ title: title });
  res.send(req.body);
});

menuRouter.post("/update/MainMenu", async (req, res) => {
  try {
    const { mainMenuName, updateName } = req.body;
    const menu = await Menu.findOne({ title: mainMenuName });

    if (!menu) {
      res.status(404).json({ status: true, message: "No data" });
      return;
    }

    menu.title = updateName;
    await menu.save();
    res.json({
      status: "true",
      message: "update successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "false",
      message: err.message,
    });
  }
});

menuRouter.put("/delete/subMenu", async (req, res) => {

  try{
    const { title, subMenu } = req.body;

    const menu = await Menu.findOne({
      $and: [
        { title: title },
        { submenu: true },
        { "submenuItems.title": subMenu },
      ],
    });
  
    if (!menu) {
      res.json({
        status: "false",
        message: "This " + title + " dont have a submenu",
      });
      return;
    }
    const result = await Menu.updateOne(
      { title: title, submenu: true },
      {
        $pull: {
          submenuItems: { title: subMenu },
        },
      }
    );
  
    if (result.matchedCount) {
      res.json({ status: "true", message: "Deleted successfully" });
    }
  }
  catch(err){
    res.jason({
      "status":"false"
    })
  }
 
});

module.exports = {
  menuRouter,
};
