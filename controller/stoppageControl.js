const Stoppage = require("../model/stoppage.js");

const add = async (req, res) => {
  try {
    const stoppage = new Stoppage(req.body);
    await stoppage.save();
    res.status(201).send(stoppage);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const get = async (req, res) => {
  try {
    const stoppage = await Stoppage.find()
      .sort({
        name: 1,
      })
      .populate("buses", {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        route: 0,
      });
    res.status(200).send(stoppage);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const getById = async (req, res) => {
  try {
    const stoppage = await Stoppage.findById(req.params.id);
    if (!stoppage) {
      return res.status(404).send();
    }
    res.status(200).send(stoppage);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

module.exports = {
  add,
  get,
  getById,
};
