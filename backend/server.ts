// Server Start up

// Importing the required modules use require

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");

require("dotenv").config();

// Creating the express server

const app = express();
const port = process.env.PORT || 8008;



// Middlewares

app.use(cors());
app.use('/uploads', express.static("uploads"));
app.use(express.json());

// Connecting to the database

const uri = process.env.ATLAS_URI;
mongoose.connect(uri as string, {});

// Connection to the database

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Importing the routes

const usersRouter = require("./routes/users");
const ordersRouter = require("./routes/orders");

// Using the routes

app.use("/users", usersRouter);
app.use("/orders", ordersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
