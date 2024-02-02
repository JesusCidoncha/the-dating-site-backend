const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            unique: true,
            required: [true, "First Name is required"],
            trim: true
        },
        lastName: {
            type: String,
            unique: true,
            required: [true, "Last Name is required"],
            trim: true
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, "Email is required"],
            unique: true,
        },
        passwordHash: {
            type: String,
            required: [true, "HashPassword is required"],
            trim: true,
        },
        socialMedia: {
            type: String,
            enum: ['Instagram', 'Meta', 'X', 'Linkedin']
        },
        birthday: {
            type: Date,
            required: [true, 'Age is required'],
        },
        address: { type: Schema.Types.ObjectId, ref: 'Address' },
        civilStatus: {
            type: String,
            enum: ['single', 'married', 'just for fun']
        },
        events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
        dogs: { type: Schema.Types.ObjectId, ref: 'Dog' },
    },
    {
        timestamps: true,
    }
);

const User = model('User', userSchema);

module.exports = User;
