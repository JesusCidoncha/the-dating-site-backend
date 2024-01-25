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
      type: Schema.Types.ObjectId, // Fixed mongoose.Schema.Types.ObjectId to Schema.Types.ObjectId
      ref: "User",
      required: true, // Fixed misspelling 'require' to 'required'
    },
  },
  {
    timestamps: true,
  }
);

const Dog = model("Dog", dogSchema);

module.exports = Dog;
