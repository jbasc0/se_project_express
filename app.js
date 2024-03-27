const express = require("express");

const mongoose = require("mongoose");

const router = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

// Authorisation middleware
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };
  next();
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
