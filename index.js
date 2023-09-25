const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.route");
require("dotenv").config();
const cors = require("cors");
const { employeeRouter } = require("./routes/employee.route");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/employees", employeeRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Server running at port 8080");
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
    console.log("Something went wrong");
  }
});
