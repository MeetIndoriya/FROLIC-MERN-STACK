const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
    instituteName: {
        type: String,
        required: true
    },
    instituteImage: {
        type: String
    },
    instituteDescription: {
        type: String
    },
    instituteCoordinatorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
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

module.exports = mongoose.model('institutes', instituteSchema);
