const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: false
        },
        phoneNumber: {
            type: Number,
            required: false
        },
        password: {
            type: String,
            required: true
        },
        roles: {
            type: [String],
            default: ['User']
        },
        createdAt: {
            type: Date,
            default: new Date()
        },
        active: {
            type: Boolean,
            default: true
        }
    }
)
//I can create my own methods to call something
//in the database

// module.exports = mongoose.model('User', userSchema);
module.exports = User = mongoose.models.User || mongoose.model('User', userSchema);
