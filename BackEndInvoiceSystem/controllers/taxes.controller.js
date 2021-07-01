const taxesModel = require('../models/taxes');

exports.getTaxes = async (req, res) => {
    try {
        const taxes = await taxesModel.find();
        if (!taxes) {
            throw new Error('No tax model found');
        }
        return res.status(200).send(taxes);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.createTax = async (req, res) => {
    try {
        const {
            percentage
        } = req.body;

        const newTaxDoc = await taxesModel.create({ percentage });
        if (!newTaxDoc) {
            throw new Error('Could not generate new Tax model')
        }
        return res.status(200).send(newTaxDoc);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}