import { ObjectId } from "mongodb";

const router = require("express").Router();
let Order = require("../models/order.model");

// Get all orders for logged in user

router.route("/").get((req, res) => {
  Order.find()
    .then((orders) => res.json(orders))
    .catch((err) =>
      res.status(400).json({ message: "Error: " + err, statusCode: 400 })
    );
});

// Get order by id

router.route("/:id").get((req, res) => {
  Order.findById(req.params.id)
    .then((order) => res.json(order))
    .catch((err) =>
      res.status(400).json({ message: "Error: " + err, statusCode: 400 })
    );
});

// Add new order

router.route("/add").post((req, res) => {
  
  const name = req.body.name;
  const email = req.body.email;
  const address = req.body.address;
  const phone = req.body.phone;
  const products = req.body.products;
  const amount = req.body.amount;
  const status = req.body.status;
  const shipped = req.body.shipped;

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
  });

  newOrder
    .save()
    .then(() => res.json({ message: "Order added!", statusCode: 200 }))
    .catch((err) =>
      res.status(400).json({ message: "Error: " + err, statusCode: 400 })
    );
});

// Update order

router.route("/update/:id").put((req, res) => {
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

router.route("/:id").delete((req, res) => {
    const id = req.params.id;
  Order.findByIdAndDelete(id)
    .then(() => res.json({ message: "Order deleted!", statusCode: 200 }))
    .catch((err) =>
      res.status(400).json({ message: "Error: " + err, statusCode: 400 })
    );
});

module.exports = router;

export {};
