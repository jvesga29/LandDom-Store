const express = require('express');
const productController = require('../Controllers/productController');
const verifyJWT = require('../Middleware/verifyJWT');

const router = express.Router();

router.use(verifyJWT)

router.route('/')
    .get(productController.getAllProducts)
    .post(productController.postProduct)
    .patch(productController.patchProduct)
    .delete(productController.deleteProduct)

module.exports = router;