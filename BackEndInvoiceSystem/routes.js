const express = require('express');

// controllers imports here
const categoriesController = require('./controllers/category.controller');
const taxesController = require('./controllers/taxes.controller');
const productsController = require('./controllers/products.controller');
const invoiceController = require('./controllers/invoices.controller');

const router = express.Router();

// categories routes
router.get('/getCategories', categoriesController.getAllCategories);
router.post('/createCategory', categoriesController.createCategory);

// taxes routes
router.get('/getTaxes', taxesController.getTaxes);
router.post('/createTax', taxesController.createTax);

// product routes
router.get('/getProducts', productsController.getAllProducts);
router.post('/addProduct', productsController.addProduct);

// QR routes
router.post('/getQR', productsController.sendQr);

// invoice routes
router.post('/generateInvoice', invoiceController.addInvoice);
router.get('/getInvoice/:invoiceNo', invoiceController.getInvoices);

module.exports = router;