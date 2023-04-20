const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// file
const loginRoute = require("./src/routes/loginRoute");
require("dotenv").config();
const port = process.env.PORT || 5001;

// file call
const app = express();

// middle wares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5iwe9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Mongodb connected....");
  })
  .catch((err) => console.log(err.message));

// routing
app.use("/api/login", loginRoute);

// cors error resolve
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Headers : Origin, Content-Type, Accept");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// first route
app.get("/", (req, res) => {
  res.send("This is Project Management System");
});

// Undefined Route Implement
app.use((req, res, next) => {
  res.status(404).json({ error: true, message: "Not Found this route" });
});

//   test
app.listen(port, () => {
  console.log("successfully run by port", port);
});
