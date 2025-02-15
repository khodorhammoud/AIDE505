const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

/* 
id
firstName
lastName
email
*/
let userData = [];

// get all users
// get user by id
// create user
// update user
// delete user

app.post("/users", (req, res) => {
  const sentData = req.body;
  if (
    !sentData.id ||
    !sentData.firstName ||
    !sentData.lastName ||
    !sentData.email
  ) {
    res.status(400).send("Please provide all the required fields");
  } else {
    userData.push(sentData);
    res.status(201).send("User created successfully");
  }
});

app.get("/users", (req, res) => {
  res.status(200).send(userData);
});

app.put("/users/:id", (req, res) => {
  const sentData = req.body;
  const id = req.params.id;
  console.log(id);
  const user = userData.find((user) => user.id == id);
  if (!user) {
    res.status(404).send("User not found");
  } else {
    if (sentData.firstName) {
      user.firstName = sentData.firstName;
    }
    if (sentData.lastName) {
      user.lastName = sentData.lastName;
    }
    if (sentData.email) {
      user.email = sentData.email;
    }
    res.status(200).send("User updated successfully");
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = userData.find((user) => user.id == id);
  if (!user) {
    res.status(404).send("User not found");
  } else {
    userData = userData.filter((user) => user.id != id);
    res.status(200).send("User deleted successfully");
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = userData.find((user) => user.id == id);
  if (!user) {
    res.status(404).send("User not found");
  } else {
    res.status(200).send(user);
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
