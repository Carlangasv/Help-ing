const express = require("express");
const router = express.Router();
const User = require("../models/user");
const db = require("../services/mongo_conection");

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id",getUser, (req, res) => {
  res.send(res.user.nickname);
});

router.get("/:email", (req, res) => {});

router.post("/", async (req, res) => {
  user = new User({
    nickname: req.body.nickname.toString(),
    password: req.body.password.toString(),
    email: req.body.email.toString(),
    range: req.body.range,
    image: req.body.image.toString(),
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message, user : req.body});
  }
});

router.patch("/", (req, res) => {});

router.delete("/:username", (req, res) => {});

async function getUser(req, res, next){
    let user 
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user
  next()
};
module.exports = router;
