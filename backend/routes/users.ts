import { relative } from "path";

const router = require("express").Router();
let User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let refreshTokens: any[] = [];

function Authenticate(req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null || token == undefined || token == "null") {
    return res
      .status(401)
      .json({ message: "Error: Unauthorized", statusCode: 401 });
  }

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Error: Forbidden", statusCode: 403 });
      }
      req.user = user;
      next();
    }
  );
}

// Get User by username and password
router.route("/login").post(async (req, res) => {
  const password = req.body.password;
  const user = await User.findOne(
    { username: req.body.username } || { email: req.body.email }
  );

  if (!user) {
    return res
      .status(400)
      .json({ message: "Error: Invalid User Or Password", statusCode: 400 });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    console.log("Invalid password");
    return res
      .status(400)
      .json({ message: "Error: Invalid User Or Password", statusCode: 400 });
  }

  const userT = {
    _id: user._id,
    username: user.username,
  };

  const token = jwt.sign(userT, process.env.TOKEN_SECRET as string, {
    expiresIn: "15s",
  });
  const refreshtoken = jwt.sign(
    userT,
    process.env.REFRESH_TOKEN_SECRET as string
  );

  refreshTokens.push(refreshtoken);

  return res.json({
    message: "User found!",
    statusCode: 200,
    user: user.username,
    token: token,
    expiresIn: 0.25,
    refreshToken: refreshtoken,
  });
});

// token refresh

router.route("/token").post(Authenticate, async (req, res) => {
  const refreshtoken = req.body.refreshToken;
  if (refreshtoken == null) {
    return res
      .status(401)
      .json({ message: "Error: Unauthorized", statusCode: 401 });
  }

  if (!refreshTokens.includes(refreshtoken)) {
    return res
      .status(403)
      .json({ message: "Error: Forbidden", statusCode: 403 });
  }

  jwt.verify(
    refreshtoken,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Error: Forbidden", statusCode: 403 });
      }
      const userT = {
        _id: user._id,
        username: user.username,
      };

      const token = jwt.sign(userT, process.env.TOKEN_SECRET as string, {
        expiresIn: "15s",
      });
      return res.json({
        message: "Token refreshed!",
        statusCode: 200,
        token: token,
        expiresIn: 0.25,
      });
    }
  );
});

// token logout 

router.route("/logout").post(Authenticate, async (req, res) => {
  const refreshtoken = req.body.refreshToken;
  refreshTokens = refreshTokens.filter((token) => token !== refreshtoken);
  return res.json({
    message: "Token removed!",
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
