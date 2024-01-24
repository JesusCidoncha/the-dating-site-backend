const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
    {
        firstName: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
        },
        hashPassword: {
            type: String,
            required: true,
            trim: true,
        },
        socialMedia: {
            type: String,
            enum: ['Instagram', 'Meta', 'X', 'Linkedin']
        },
        age: {
            type: Number,
            required: true,
        },
        location: {
            type: {
                enum: ['Point'],
                required: true
            },
        },
        civilStatus: {
            type: String,
            enum: ['Single', 'Married', 'Just for fun', 'Not-sure']
        },
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
)

const User = model('User', userSchema)

module.exports = User
