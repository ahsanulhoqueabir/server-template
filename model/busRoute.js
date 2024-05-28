const mongoose = require("mongoose");
const busRoute = new mongoose.Schema(
  {
    routeName: {
      type: String,
      required: true,
    },
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
    },
    stoppage: [
      {
        point: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Stoppage",
        },
        upTime: {
          type: String,
        },
        downTime: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const BusRoute = mongoose.model("BusRoute", busRoute);
module.exports = BusRoute;
