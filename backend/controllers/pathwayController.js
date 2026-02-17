const Pathway = require('../models/Pathway');
const User = require('../models/User');

// @desc    Get all pathways
// @route   GET /api/pathways
// @access  Public
const getPathways = async (req, res) => {
    try {
        const pathways = await Pathway.find().populate('createdBy', 'name');
        res.json(pathways);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new pathway
// @route   POST /api/pathways
// @access  Private/Admin
const createPathway = async (req, res) => {
    const { title, description, steps } = req.body;

    try {
        const pathway = new Pathway({
            title,
            description,
            steps,
            createdBy: req.user._id
        });

        const createdPathway = await pathway.save();
        res.status(201).json(createdPathway);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid pathway data' });
    }
};

// @desc    Get pathway by ID
// @route   GET /api/pathways/:id
// @access  Public
const getPathwayById = async (req, res) => {
    try {
        const pathway = await Pathway.findById(req.params.id);
        if (pathway) {
            res.json(pathway);
        } else {
            res.status(404).json({ message: 'Pathway not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getPathways, createPathway, getPathwayById };
