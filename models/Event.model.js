const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true
    },
    time: {
      type: Date, // Fixed timestamps definition
      default: Date.now
    },
    eventDuration: {
      type: Number // Assuming this is the duration in minutes or something similar
    },
    location: { type: [Number], index: { type: '2dsphere', sparse: true } },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ location: "2dsphere" }); // Added index definition for GeoJSON

const Event = model("Event", eventSchema);

module.exports = Event;
