const mongoose = require("mongoose");
const busSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    bnName: {
      type: String,
    },
    busNumber: {
      type: String,
    },
    photos: [
      {
        type: String,
      },
    ],
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusRoute",
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employe",
    },
    conductor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employe",
    },
    status: {
      type: String,
      default: "active",
    },
    decktype: {
      type: String,
      enum: ["single", "double"],
    },
  },
  {
    timestamps: true,
  }
);
const Bus = mongoose.model("Bus", busSchema);
module.exports = Bus;
