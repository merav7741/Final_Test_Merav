const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/isAdmin');
const { isViewer } = require('../middlewares/isViewer');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");

router.get('/getAllProducts', authenticateToken, isViewer, getAllProducts);
router.get('/getProductById/:id', authenticateToken, isViewer, getProductById);
router.delete('/deleteProduct/:id', authenticateToken, isAdmin, deleteProduct);
router.put('/updateProduct/:id', authenticateToken, isAdmin, updateProduct);
router.post('/createProduct', authenticateToken, isAdmin, createProduct);

module.exports = router;
