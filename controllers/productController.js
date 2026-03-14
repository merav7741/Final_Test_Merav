const Product = require('../models/Product');
const Category = require('../models/Category');
const fs = require('fs');
const path = require('path');
console.log('product controller loaded');

const logProductDeletion = (productId, productTitle) => {
    const logMessage = `${new Date().toISOString()} - Product deleted: ID=${productId}, Title=${productTitle}\n`;
    const logPath = path.join(__dirname, '../logs/product-deletions.log');

    const logsDir = path.dirname(logPath);
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }
    
    fs.appendFileSync(logPath, logMessage);
};

const createProduct = async (req, res, next) => {
    try {
        const { title, price, stock, category } = req.body;
        const product = await Product.create({
            title,
            price,
            stock,
            category
        });
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getProductById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ message: 'missing id parameter' });
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'product not found' });
        res.json({ product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        next(err);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ message: 'missing id parameter' });
        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!product) return res.status(404).json({ message: 'product not found' });
        res.json({ message: 'product updated successfully', product });
    } catch (err) {
        next(err);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        console.log('delete product called - req.params:', req.params);
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'product not found' });

        logProductDeletion(product._id, product.title);
        
        await Product.updateOne({ _id: id }, { $set: { isActive: false } });
        console.log('delete product result:', product);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};




module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};