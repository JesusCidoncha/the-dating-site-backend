const { Schema, model } = require("mongoose");

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
    civilStatus: {
      type: String,
      required: [true, "Status is required."],
      enum: ["single", "married", "looking to breed"],
    },
    size: {
      type: String,
      required: [true, "Size is required."],
      enum: ["big", "medium", "small"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

const Dog = model("Dog", dogSchema);

module.exports = Dog;
