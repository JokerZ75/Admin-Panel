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
