const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the Book model to whatever makes sense in this case
const dogSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    picture: {
      type: String,
      required: [true, "Picture is required."],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required."],
    },
    breed: {
      type: String,
      required: [true, "Breed is required."],
    },
    status: {
      type: String,
      required: [true, "Status is required."],
      enum: ["Single", "Married", "Looking to breed"],
    },
    size: {
      type: String,
      required: [true, "Size is required."],
      enum: ["big", "medium", "small"],
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Dog = model("Dog", dogSchema);

module.exports = Dog;
