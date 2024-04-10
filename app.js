const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes");
const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
