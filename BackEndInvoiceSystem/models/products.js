const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = Schema({
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Categories', required: true },
    price: { type: Number, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Products', Products);