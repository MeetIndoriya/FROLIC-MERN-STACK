const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        required: true
    },
    departmentImage: {
        type: String
    },
    departmentDescription: {
        type: String
    },
    instituteID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'institutes',
        required: true
    },
    departmentCoordinatorID: {
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

module.exports = mongoose.model('departments', departmentSchema);
