const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/call-ml-predict", (req, res) => {
  console.log("Calling ml api");
  const _features = req.body.features;
  axios
    .post("http://127.0.0.1:5000/predict", {
      features: _features,
    })
    .then((mlRes) => {
      console.log("ML API Response: ", mlRes.data);
      res.send(mlRes.data);
    });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
