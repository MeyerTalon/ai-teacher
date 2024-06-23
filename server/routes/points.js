const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route    POST api/points/update
// @desc     Update user points
// @access   Public
router.post('/update', async (req, res) => {
    const { name, module, correct } = req.body;

    try {
        let user = await User.findOne({ name });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'User not found' }] });
        }

        if (correct) {
            user.points[module] += 5; // Add points for correct answer
        } else {
            user.points[module] -= 2; // Subtract points for wrong answer
        }

        // Check if user should be promoted to next level
        if (user.points[module] >= 100) {
            user.levels[module] += 1;
            user.points[module] = 0; // Reset points after promotion
        }

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
