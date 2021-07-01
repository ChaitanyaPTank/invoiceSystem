const categoriesModel = require('../models/categories');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoriesModel.find()
        .populate('tax');
        if (!categories) {
            throw new Error('No categories found');
        }
        return res.status(200).send(categories);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.createCategory = async (req, res) => {
    try {
        const {
            name,
            tax
        } = req.body;

        const newCategory = await categoriesModel.create({ name, tax })

        if (!newCategory) {
            throw new Error('Could not create new Category');
        }

        return res.status(200).send(newCategory);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}