const Category = require('../models/Category')
const Product = require('../models/Product');
console.log('category controller loaded');


const createCategory = async (req, res ,next) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllCategories = async (req, res ,next) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const category = await Category.findById(id);
        if (!category) return res.status(404).json({ message: 'category not found' });
        const isActiveCategory = await Product.findOne({ category: id, isActive: true });
        if (isActiveCategory) return res.status(400).json({ message: 'cannot delete category with active products' });
        await Category.updateOne({ _id: id }, { $set: { isActive: false } });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
module.exports = { createCategory , getAllCategories , deleteCategory};