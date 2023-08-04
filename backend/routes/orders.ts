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
  const orderItems = req.body.orderItems;
  const shippingAddress = req.body.shippingAddress;
  const paymentMethod = req.body.paymentMethod;
  const totalPrice = req.body.totalPrice;
  const shippingType = req.body.shippingType;
  const shippingPrice = req.body.shippingPrice;
  const notes = req.body.notes;
  const shopOwner = req.body.shopOwner;

  const newOrder = new Order({
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    shippingType,
    shippingPrice,
    notes,
    shopOwner,
  });

  newOrder
    .save()
    .then(() => res.json({ message: "Order added!", statusCode: 200 }))
    .catch((err) =>
      res.status(400).json({ message: "Error: " + err, statusCode: 400 })
    );
});

// Update order

router.route("/update/:id").post((req, res) => {
  Order.findById(req.params.id)
    .then((order) => {
      order.orderItems = req.body.orderItems;
      order.shippingAddress = req.body.shippingAddress;
      order.paymentMethod = req.body.paymentMethod;
      order.totalPrice = req.body.totalPrice;
      order.shippingType = req.body.shippingType;
      order.shippingPrice = req.body.shippingPrice;
      order.notes = req.body.notes;

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
