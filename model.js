const mongoose = require('mongoose');

const SpinDb = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    checked: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('SpinDb', SpinDb);