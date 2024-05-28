const Employee = require("../model/employee.js");

const add = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const get = async (req, res) => {
  try {
    const employee = await Employee.find(
      {},
      {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }
    ).populate("bus", {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      driver: 0,
    });
    res.status(200).send(employee);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const getById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).send();
    }
    res.status(200).send(employee);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};
const updatebyId = async (req, res) => {
  try {
    const user = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};
const modify = async (req, res) => {
  try {
    const all = await Employee.find();
    const newData = all.map((p) => {
      if (p.role === "Driver") {
        p.role = "driver";
      }
      if (p.enrolment === "Permanent") {
        p.enrolment = "permanent";
      }
      if (p.enrolment === "Adhoc") {
        p.enrolment = "adhoc";
      }
      if (p.enrolment === "Contract") {
        p.enrolment = "contract";
      }
      if (p.enrolment === null) {
        p.enrolment = "contract";
      }
      return p.save();
    });
    res.send({
      message: "Data modified successfully",
      data: newData,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
module.exports = {
  add,
  get,
  getById,
  modify,
  updatebyId,
};
