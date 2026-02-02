const mongoose = require('mongoose');

const eventWiseWinnerSchema = new mongoose.Schema({
    eventID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events',
        required: true
    },
    groupID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups',
        required: true
    },
    sequence: {
        type: Number,
        required: true
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

module.exports = mongoose.model('eventwisewinners', eventWiseWinnerSchema);
