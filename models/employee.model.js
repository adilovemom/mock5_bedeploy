const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: String,
    department: {
      type: String,
      enum: ["Tech", "Marketing", "Operations"],
      required: true,
    },
    salary: Number,
  },
  {
    versionKey: false,
  }
);

const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports = {
  EmployeeModel,
};
