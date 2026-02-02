const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    participantName: {
        type: String,
        required: true
    },
    participantEnrollmentNumber: {
        type: String,
        required: true
    },
    participantInstituteName: {
        type: String
    },
    participantCity: {
        type: String
    },
    participantMobile: {
        type: String
    },
    participantEmail: {
        type: String
    },
    isGroupLeader: {
        type: Boolean,
        default: false
    },
    groupID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups',
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

module.exports = mongoose.model('participants', participantSchema);
