const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    eventID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events',
        required: true
    },
    isPaymentDone: {
        type: Boolean,
        default: false
    },
    isPresent: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date
    },
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = mongoose.model('groups', groupSchema);
