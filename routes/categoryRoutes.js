const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/isAdmin');
const { isViewer } = require('../middlewares/isViewer');
const { createCategory , getAllCategories , deleteCategory} = require('../controllers/categotyController')
 
router.post('/createCategory', authenticateToken, isAdmin, createCategory) ;
router.get('/getAllCategories', authenticateToken, isViewer, getAllCategories) ;
router.delete('/deleteCategory/:id', authenticateToken, isAdmin, deleteCategory) ;

module.exports = router