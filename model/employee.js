const mongoose = require("mongoose");
const employeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    photo: {
      type: String,
    },
    email: {
      type: String,
    },
    role: {
      type: String,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    phone: {
      type: String,
      //   minlength: 10,
      //   maxlength: 11,
    },
    enrolment: {
      type: String,
      //   enum: ["permanent", "indentured", "adhoc"],
    },
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
    },
  },
  {
    timestamps: true,
  }
);
const Employe = mongoose.model("Employe", employeSchema);
module.exports = Employe;
