const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categories = Schema({
    name: { type: String, required: true },
    tax: { type: Schema.Types.ObjectId, ref: 'Taxes', required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Categories', Categories);