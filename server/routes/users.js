const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post('/', async (req, res) => {
    const { name, age } = req.body;

    const defaultLevels = {
        addition: 1,
        subtraction: 1,
        multiplication: 1,
        division: 1,
        fractionsDecimalsPercents: 1,
        geometryShapes: 1
    };

    const defaultPoints = {
        addition: 0,
        subtraction: 0,
        multiplication: 0,
        division: 0,
        fractionsDecimalsPercents: 0,
        geometryShapes: 0
    };


    try {
        let user = await User.findOne({ name });

        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        user = new User({
            name,
            age,
            levels: defaultLevels,
            points: defaultPoints
        });

        await user.save();

        res.send('User registered');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
router.get('/:name', async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.name });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
module.exports = router;
