const busRoute = require("../model/busRoute.js");
const Bus = require("../model/bus.js");
const Stoppage = require("../model/stoppage.js");

const add = async (req, res) => {
  try {
    const newBusRoute = new busRoute(req.body);
    const result = await newBusRoute.save();
    const bus = await Bus.findByIdAndUpdate(
      req.body.bus,
      {
        route: result._id,
      },
      {
        new: true,
      }
    );
    await bus.save();
    const allStoppage = req.body.stoppage;
    const stoppage = await Promise.all(
      allStoppage.map(async (s) => {
        const stoppage = await Stoppage.findByIdAndUpdate(s.point, {
          $push: {
            buses: bus._id,
          },
        });
        await stoppage.save();
      })
    );
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
const get = async (req, res) => {
  try {
    const busRoutes = await busRoute.find();
    res.status(200).send(busRoutes);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
const getById = async (req, res) => {
  try {
    const busRoute = await busRoute.findById(req.params.id);
    res.status(200).send(busRoute);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
const update = async (req, res) => {
  try {
    await busRoute.findByIdAndUpdate(req.params.id, req.body);
    await busRoute.save();
    res.status(200).send(busRoute);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
const remove = async (req, res) => {
  try {
    await busRoute.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

module.exports = {
  add,
  get,
  getById,
  update,
  remove,
};
