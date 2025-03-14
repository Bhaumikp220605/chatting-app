const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    groupIcon: {
        type: String,
        default: 'https://www.shutterstock.com/image-vector/group-icon-trendy-modern-placeholder-260nw-1656177520.jpg'
    },
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;