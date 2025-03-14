const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    }
}, { timestamps: true });


const User = mongoose.model("User", UserSchema);

module.exports = User;