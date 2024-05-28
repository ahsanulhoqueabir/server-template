const Bus = require("../model/bus.js");
const Employe = require("../model/employee.js");
const add = async (req, res) => {
  try {
    const bus = new Bus(req.body);
    const newBus = await bus.save();
    const user = await Employe.findByIdAndUpdate(
      req.body.driver,
      {
        bus: newBus._id,
      },
      {
        new: true,
      }
    );
    user.save();

    res.status(201).send(bus);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const get = async (req, res) => {
  try {
    const bus = await Bus.find(
      {},
      {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }
    )
      .populate("driver", {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        bus: 0,
      })
      // .sort({
      //   name: 1,
      // })
      .populate({
        path: "route",
        select: "-createdAt -updatedAt -__v",
        populate: {
          path: "stoppage.point",
          select: "-createdAt -updatedAt -__v -buses",
        },
      });
    res.status(200).send(bus);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const getById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id, {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    })
      .populate("driver", {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        bus: 0,
      })
      .sort({
        name: 1,
      })
      .populate({
        path: "route",
        select: "-createdAt -updatedAt -__v",
        populate: {
          path: "stoppage",
          populate: {
            path: "point",
            select: "-createdAt -updatedAt -__v -buses",
            // populate: {
            //   path: "buses",
            //   select:
            //     "-createdAt -updatedAt -__v -photos -driver -route -_id -busNumber -status",
            // },
          },
        },
      });
    if (!bus) {
      return res.status(404).send();
    }
    res.status(200).send(bus);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const busInfo = async (req, res) => {
  try {
    const allbus = await Bus.find(
      {
        status: "active",
      },
      {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        driver: 0,
        route: 0,
      }
    ).sort({
      name: 1,
    });
    res.status(200).send(allbus);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports = {
  add,
  get,
  getById,
  busInfo,
};
