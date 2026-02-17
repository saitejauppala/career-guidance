const mongoose = require('mongoose');

const stepSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    resources: [String], // URLs to resources
    estimatedTime: String // e.g. "2 weeks"
});

const pathwaySchema = mongoose.Schema({
    title: { type: String, required: true }, // e.g. "Full Stack Developer"
    description: String,
    steps: [stepSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Pathway', pathwaySchema);
