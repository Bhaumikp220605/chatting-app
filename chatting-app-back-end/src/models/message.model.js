const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    },
    messages: [{
        content: {
            type: String,
            required: true
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    }]
}, { timestamps: true });

const Messages = mongoose.model('Message', messageSchema);

module.exports = Messages;