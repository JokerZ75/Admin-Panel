import { relative } from "path";

const router = require("express").Router();
let User = require("../models/user.model");
const bcrypt = require("bcrypt");

// Get User by username and password
router.route("/").post(async (req, res) => {
  const password =  req.body.password;
  const user = await User.findOne(
    { username: req.body.username } || { email: req.body.email }
  );

  if (!user) {
    return res
      .status(400)
      .json({ message: "Error: User not found", statusCode: 400 });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    console.log("Invalid password");
    return res
      .status(400)
      .json({ message: "Error: Invalid password", statusCode: 400 });
  }

  return res.json({
    message: "User found!",
    statusCode: 200,
  });
});


// Add new user
router.route("/add").post(async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 10);

  const newUser = new User({ username, email, password })
    .save()
    .then(() => res.json({ message: "User added!", statusCode: 200 }))
    .catch((err) =>
      res.status(400).json({ message: "Error: " + err, statusCode: 400 })
    );
});

module.exports = router;

export {};
