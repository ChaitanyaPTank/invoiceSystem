const mongoose = require('mongoose');
// const mongodbAutoIncrement = require('mongodb-autoincrement');
const Schema = mongoose.Schema;


const Invoices = new Schema({
  invoiceNo: Number,
  items: [{ type: String, ref: 'products' }],
  total: Number,
  customerName: String
}, {
  timstamps: true
});

// mongodbAutoIncrement.mongoosePlugin(Invoices, { field: 'invoiceNo', step: 1 });
// Invoices.plugin(mongodbAutoIncrement.mongoosePlugin, { field: 'invoiceNo', step: 1 });

module.exports = mongoose.model('invoices', Invoices);