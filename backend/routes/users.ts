import { File } from "buffer";
import { relative } from "path";

const router = require("express").Router();
let User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let refreshTokens: any[] = [];
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req: any, file: File, cb: Function) {
    cb(null, "uploads/");
  },
  filename: function (req: any, file: any, cb: Function) {
    cb(null, req.user._id + ".jpg");
  },
});

const fileFilter = (req: any, file: any, cb: Function) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    return cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 20 },
  fileFilter: fileFilter,
});

async function UserExists(username, email) {
  return await User.find({
    $or: [{ username: username }, { email: email }],
  }).then((user) => {
    if (user.length > 0) {
      return true;
    }
  });
}

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
  const user = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.username }],
  });

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

  // Check if user exists

  const userExists = await UserExists(username, email);

  if (!userExists) {
    const newUser = new User({ username, email, password })
      .save()
      .then(() => res.json({ message: "User added!", statusCode: 200 }))
      .catch((err) =>
        res.status(400).json({ message: "Error: " + err, statusCode: 400 })
      );
  } else {
    return res
      .status(409)
      .json({ message: "Error: User already exists", statusCode: 409 });
  }
});

// upload image to fileSystem
router
  .route("/upload")
  .post(Authenticate, upload.single("profileImage"), async (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Error: No image uploaded", statusCode: 400 });
    }
    if (req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/png") {
      return res
        .status(402)
        .json({ message: "Error: Invalid image type", statusCode: 402 });
    }
    if (req.file.size > 1024 * 1024 * 20) {
      return res
        .status(413)
        .json({ message: "Error: Image size too large", statusCode: 413 });
    }

    let user = await User.findById(req.user._id);

    user.profileImage = req.file.filename;
    await user.save();

    return res.json({
      message: "Image uploaded!",
      statusCode: 200,
    });
  });

// Get user by id
router.route("/").get(Authenticate, (req, res) => {
  User.findById(req.user._id)
    .then((user) =>
      res.json({
        username: user.username,
        email: user.email,
        profileImage: `http://localhost:8008/uploads/${user.profileImage}`,
      })
    )
    .catch((err) => res.status(400).json({ message: "Error: " + err }));
});

// Update each user field

router.route("/update/username").put(Authenticate, async (req, res) => {
  const userExists = await UserExists(req.body.username, "null");
  if (!userExists) {
    User.findById(req.user._id)
      .then((user) => {
        user.username = req.body.username;
        user
          .save()
          .then(() =>
            res.json({ message: "Username updated!", statusCode: 200 })
          )
          .catch((err) =>
            res.status(400).json({ message: "Error: " + err, statusCode: 400 })
          );
      })
      .catch((err) =>
        res.status(400).json({ message: "Error: " + err, statusCode: 400 })
      );
  } else {
    res
      .status(409)
      .json({ message: "Error: User already exists", statusCode: 409 });
  }
});

router.route("/update/email").put(Authenticate, (req, res) => {
  if (!UserExists("", req.body.email)) {
    User.findById(req.user._id)
      .then((user) => {
        user.email = req.body.email;
        user
          .save()
          .then(() => res.json({ message: "Email updated!", statusCode: 200 }))
          .catch((err) =>
            res.status(400).json({ message: "Error: " + err, statusCode: 400 })
          );
      })
      .catch((err) =>
        res.status(400).json({ message: "Error: " + err, statusCode: 400 })
      );
  }

  return res
    .status(409)
    .json({ message: "Error: User already exists", statusCode: 409 });
});

router.route("/update/password").put(Authenticate, async (req, res) => {
  const password = await bcrypt.hash(req.body.password, 10);
  User.findById(req.user._id).then((user) => {
    user.password = password;
    user
      .save()
      .then(() => res.json({ message: "Password updated!", statusCode: 200 }))
      .catch((err) =>
        res.status(400).json({ message: "Error: " + err, statusCode: 400 })
      );
  });
});

export {};

module.exports = router;
