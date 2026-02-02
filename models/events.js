const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventTagline: {
        type: String
    },
    eventImage: {
        type: String
    },
    eventDescription: {
        type: String
    },
    groupMinParticipants: {
        type: Number,
        required: true
    },
    groupMaxParticipants: {
        type: Number,
        required: true
    },
    eventFees: {
        type: Number,
        default: 0
    },
    eventFirstPrice: {
        type: String
    },
    eventSecondPrice: {
        type: String
    },
    eventThirdPrice: {
        type: String
    },
    departmentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'departments',
        required: true
    },
    eventCoordinatorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    eventMainStudentCoordinatorName: {
        type: String
    },
    eventMainStudentCoordinatorPhone: {
        type: String
    },
    eventMainStudentCoordinatorEmail: {
        type: String
    },
    eventLocation: {
        type: String
    },
    maxGroupsAllowed: {
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

module.exports = mongoose.model('events', eventSchema);
