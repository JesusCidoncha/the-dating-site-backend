const { Schema, model } = require("mongoose");

const addresSchema = new Schema(
    {
        city: {
            type: String,
            required: [true, "Name is required."],
            trim: true
        },
        street: {
            type: String,
            trim: true
        },
        houseNumbre: {
            type: String,
            trim: true
        }
    },
);

const Address = model("Address", addresSchema);

module.exports = Address;
