import { ObjectId } from "mongodb";
import { url } from "inspector";

const router = require("express").Router();
let Order = require("../models/order.model");
const jwt = require("jsonwebtoken");

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

// Get all orders for logged in user

router.route("/").get(Authenticate, (req, res) => {
  Order.find({ owner: req.user._id })
    .then((orders) => res.json(orders))
    .catch((err) =>
      res.status(400).json({ message: "Error: " + err, statusCode: 400 })
    );


});

// Get order by id

router.route("/:id").get(Authenticate, (req, res) => {
  Order.findById(req.params.id)
    .then((order) => {
      if (order.owner != req.user._id) {
        return res
          .status(400)
          .json({ message: "Error: Unauthorized", statusCode: 400 });
      }
      return res.json(order);
    })
    .catch((err) =>
      res.status(400).json({ message: "Error: " + err, statusCode: 400 })
    );
});

// Add new order

router.route("/add").post(Authenticate, (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const address = req.body.address;
  const phone = req.body.phone;
  const products = req.body.products;
  const amount = req.body.amount;
  const status = req.body.status;
  const shipped = req.body.shipped;
  const owner = req.user._id;

  if (status != "Pending" && status != "Success" && status != "Cancelled") {
    return res
      .status(400)
      .json({ message: "Error: Invalid status", statusCode: 400 });
  }

  if (shipped != "Shipped" && shipped != "Pending") {
    return res
      .status(400)
      .json({ message: "Error: Invalid shipped status", statusCode: 400 });
  }

  const newOrder = new Order({
    name,
    email,
    address,
    phone,
    products,
    amount,
    status,
    shipped,
    owner
  });

  newOrder
    .save()
    .then(() => res.json({ message: "Order added!", statusCode: 200 }))
    .catch((err) =>
      res.status(400).json({ message: "Error: " + err, statusCode: 400 })
    );
});

// Update order

router.route("/update/:id").put(Authenticate, (req, res) => {
  Order.findById(req.params.id)
    .then((order) => {
      order.name = req.body.name;
      order.email = req.body.email;
      order.address = req.body.address;
      order.phone = req.body.phone;
      order.products = req.body.products;
      order.amount = req.body.amount;
      order.status = req.body.status;
      order.shipped = req.body.shipped;

      if (order.owner != req.user._id) {
        return res
          .status(400)
          .json({ message: "Error: Unauthorized", statusCode: 400 });
      }

      order
        .save()
        .then(() => res.json({ message: "Order updated!", statusCode: 200 }))
        .catch((err) =>
          res.status(400).json({ message: "Error: " + err, statusCode: 400 })
        );
    })
    .catch((err) =>
      res.status(400).json({ message: "Error: " + err, statusCode: 400 })
    );
});

// Delete order

router.route("/:id").delete(Authenticate, (req, res) => {
  const id = req.params.id;
  const user = req.user._id;
  Order.findOneAndRemove({ _id: id, owner: user })
    .then(() => {
       return res.json({ message: "Order deleted!", statusCode: 200 });
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ message: "Error: Failed to Delete", statusCode: 400 });
    });
});

module.exports = router;

export {};
