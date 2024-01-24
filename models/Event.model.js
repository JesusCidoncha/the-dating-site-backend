const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true
    },
    time: {
      timestamps: true

    },
    eventDuration:{   
    timestamps: true

    },
    location: {
      type: {
          enum: ['Point'],
          required: true
      },
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Dog = model("Dog", eventSchema);

module.exports = Dog;
