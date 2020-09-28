//Se importan las librerias y archivos necesarios
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const db = require("../services/mongo_conection");

//Conexión de a la base de datos
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

//Metodo para la obtención de todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id",getUser, (req, res) => {
  res.json(res.user);
});

router.get("/:email", (req, res) => {});

router.post("/", async (req, res) => {
  user = new User({
    nickname: req.body.nickname,
    password: req.body.password,
    email: req.body.email,
    range: req.body.range,
    image: req.body.image,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message, user : req.body});
  }
});

router.patch("/", getUser,(req, res) => {});

router.delete("/:username",getUser, (req, res) => {});

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
