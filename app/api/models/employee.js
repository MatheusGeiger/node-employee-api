const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    participation: { type: Number, required: true },
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false }
});

module.exports = mongoose.model('Employee', employeeSchema);