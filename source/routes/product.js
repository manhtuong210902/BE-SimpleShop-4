const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.c')
const {  isNotAuthenticated } = require('../middlewares/auth')

router.get('/cart', isNotAuthenticated, productController.showCart)
router.get('/get/:id', productController.getPro)
router.get('/:catId', isNotAuthenticated, productController.show)


module.exports = router