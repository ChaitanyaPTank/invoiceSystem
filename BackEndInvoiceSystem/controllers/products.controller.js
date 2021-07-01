const productsModel = require('../models/products');
const qr = require('qrcode');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productsModel.find()
            .populate({
                'path': 'category',
                'model': 'Categories',
                'select': 'name tax -_id',
                'populate': {
                    'path': 'tax',
                    'populate': 'tax',
                    'select': 'percentage -_id',
                }
            });

        if (!products) {
            throw new Error('could not find any product');
        }
        return res.status(200).send(products);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.addProduct = async (req, res) => {
    try {
        const {
            name,
            category,
            price
        } = req.body;

        console.log(name, category, price)

        const newProdDoc = await productsModel.create({ name, category, price });

        if (!newProdDoc) {
            throw new Error('Could not add a Product');
        }

        return res.status(200).send(newProdDoc);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.sendQr = async (req, res) => {
    try {
        const vpa = '9624224297@paytm';
        const { amount } = req.body;
        const username = 'Chaitanya%20Tank';
        const currencyCode = 'INR';
        const rawURL = `upi://pay?pa=${vpa}&am=${amount}&pn=${username}&cu=${currencyCode}&mode=02`;
        console.log(rawURL);

        let buffer = new Buffer(rawURL);
        console.log(buffer.toString('base64'));
        const base64sign = buffer.toString('base64');
        var url = `upi://pay?pa=${vpa}&am=${amount}&pn=${username}&cu=${currencyCode}&mode=02&sign=${base64sign}`

        const code = await qr.toDataURL(url);
        console.log("logging data", code);
        return res.status(200).send(JSON.stringify(code));
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err.message);
    }
}