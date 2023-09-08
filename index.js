const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const UserModel = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json());

const db = process.env.MONGGO_URI;

mongoose.connect(db);

// create a user API

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then((users) => req.json(users))
    .catch((err) => res.json(err));
});

// get all users API

app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// get a single user API

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// update a use API

app.get("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name, email: req.body.email, age: req.body.age }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// delete a user API

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndRemove({ _id: id })
    .then(() => res.json({ message: "User deleted successfully" }))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

/*   



*/
