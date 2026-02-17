const Placement = require('../models/Placement');

// @desc    Get all placements
// @route   GET /api/placements
// @access  Public
const getPlacements = async (req, res) => {
    try {
        const placements = await Placement.find().sort({ createdAt: -1 });
        res.json(placements);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new placement
// @route   POST /api/placements
// @access  Private/Admin
const createPlacement = async (req, res) => {
    const { companyName, role, description, package, eligibility, deadline } = req.body;

    try {
        const placement = new Placement({
            companyName,
            role,
            description,
            package,
            eligibility,
            deadline
        });

        const createdPlacement = await placement.save();

        // Emit socket event for real-time notification
        // Note: io instance needs to be passed or accessible here. 
        // For simplicity, we might attach io to req in server.js or import it if structured differently.
        // Here we will assuming basic REST for now and handle socket in server.js or separate structure.

        res.status(201).json(createdPlacement);
    } catch (error) {
        res.status(400).json({ message: 'Invalid placement data' });
    }
};

// @desc    Update placement status
// @route   PUT /api/placements/:id
// @access  Private/Admin
const updatePlacementStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const placement = await Placement.findById(req.params.id);

        if (placement) {
            placement.status = status;
            const updatedPlacement = await placement.save();
            res.json(updatedPlacement);
        } else {
            res.status(404).json({ message: 'Placement not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getPlacements, createPlacement, updatePlacementStatus };
