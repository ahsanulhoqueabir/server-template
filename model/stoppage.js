const mongoose = require("mongoose");
const stoppageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    location: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
    buses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus",
      },
    ],
    photos: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
const Stoppage = mongoose.model("Stoppage", stoppageSchema);
module.exports = Stoppage;
