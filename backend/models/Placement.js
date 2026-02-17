const mongoose = require('mongoose');

const placementSchema = mongoose.Schema({
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String },
    package: { type: String }, // e.g. "12 LPA"
    eligibility: { type: String },
    deadline: { type: Date },
    status: { type: String, enum: ['open', 'closed', 'ongoing'], default: 'open' },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Placement', placementSchema);
