const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { EmployeeModel } = require("../models/employee.model");

const employeeRouter = express.Router();

employeeRouter.use(auth);

//add an employee
employeeRouter.post("/add", async (req, res) => {
  try {
    const { fname, lname, email, department, salary } = req.body;
    const newEmployee = new EmployeeModel({
      fname,
      lname,
      email,
      department,
      salary,
    });
    await newEmployee.save();
    res.status(200).json({ message: "Employee added successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Error ocured while adding an employee!!!" });
  }
});

//get all the employee
employeeRouter.get("/", async (req, res) => {
  try {
    const { page = 1, department, q, order } = req.query;
    const limit = 2;
    const skip = (page - 1) * limit;
    let filter = {};

    if (department) {
      filter.department = department;
    }
    if (q) {
      filter.$or = [{ fname: { $regex: q, $options: "i" } }];
    }

    const sortOptions = {};
    if (order === "asc") {
      sortOptions.salary = 1;
    } else if (order === "desc") {
      sortOptions.salary = -1;
    }

    const employee = await EmployeeModel.find({ ...filter })
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    res.send(employee);
  } catch (err) {
    res.json({ error: err.message });
  }
});


//update employee
employeeRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { fname, lname, email, department, salary } = req.body;
    const employee = await EmployeeModel.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found!!!" });
    }
    if (fname) {
      employee.fname = fname;
    }
    if (lname) {
      employee.lname = lname;
    }
    if (email) {
      employee.email = email;
    }
    if (department) {
      employee.department = department;
    }
    if (salary) {
      employee.salary = salary;
    }
    await employee.save();
    res.status(200).json({ message: "Employee updated successfully!!!" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Error ocured while updating an employee!!!" });
  }
});

//delete an employee
employeeRouter.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(id);
    if (!deletedEmployee) {
      res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Error ocured while deleting an employee!!!" });
  }
});

module.exports = {
  employeeRouter,
};
