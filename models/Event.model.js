const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    time: {
      type: Date,
      default: Date.now
    },
    eventDuration: {
      type: Number,
    },
    address: { type: Schema.Types.ObjectId, ref: 'Address' },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ location: "2dsphere" }); // Added index definition for GeoJSON

const Event = model("Event", eventSchema);

module.exports = Event;
