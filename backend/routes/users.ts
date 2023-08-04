const router = require("express").Router();
let User = require("../models/user.model");

// Get User by username and password
router.route("/").get((req, res) => {
  User.find({ username: req.body.username, password: req.body.password })
    .then((user) => res.json(user))
    .catch((err) =>
      res.status(400).json({ message: "Error: " + err, statusCode: 400 })
    );
});

// Add new user
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({ username, password })
    .save()
    .then(() => res.json({ message: "User added!", statusCode: 200 }))
    .catch((err) =>
      res.status(400).json({ message: "Error: " + err, statusCode: 400 })
    );
});

module.exports = router;

export {};
