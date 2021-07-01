const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Taxes = Schema({
    percentage: { type: Number, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Taxes', Taxes);