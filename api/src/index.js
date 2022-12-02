const express = require("express");
const colors = require("colors");
const { getConnection } = require("../config/db");
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();

// =============== database =============

getConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals", require("../routes/GoalRoute"));
app.use("/api/auth", require("../routes/UserRoute"));

app.listen(port, () =>
  console.log(colors.bgCyan.bold(`Server is runnig on port ${port}`))
);
