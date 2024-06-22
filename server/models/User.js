const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    levels: {
        addition: {
            type: Number,
            default: 1
        },
        subtraction: {
            type: Number,
            default: 1
        },
        multiplication: {
            type: Number,
            default: 1
        },
        division: {
            type: Number,
            default: 1
        },
        fractionsDecimalsPercents: {
            type: Number,
            default: 1
        },
        geometryShapes: {
            type: Number,
            default: 1
        }
    }
});

module.exports = mongoose.model('User', UserSchema);
