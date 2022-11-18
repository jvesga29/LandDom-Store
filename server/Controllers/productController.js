const Product = require('../models/productModel');
const User = require('../Models/userModel')

const getAllProducts = async (req, res) => {
    // Get all products from MongoDB
    const products = await Product.find().lean()

    // If no products 
    if (!products?.length) {
        return res.status(400).json({ message: 'No products found' })
    }

    const productsUser = await Promise.all(products.map(async (product) => {
        const user = await User.findById(product.user).lean().exec()
        return { ...product, username: user.username }
    }))

    res.json(productsUser)
}
const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const postProduct = async (req, res) => {
    const { user, productName, productPrice, productDescription, stock } = req.body

    // Confirm data
    if (!user || !productName || typeof productPrice !== 'number' || !productDescription || typeof amount !== 'number' ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if have much product with the same title
    const duplicate = await Product.findOne({ productName }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Sorry are much of this product' })
    }

    // Create and store new product 
    const product = await Product.create({ user, productName, productPrice, productDescription, stock })

    if (product) { //created 
        res.status(201).json({ message: `New product added` })
    } else {
        res.status(400).json({ message: 'Invalid product data received' })
    }
}

const patchProduct = async (req, res) => {
    const { id, user, productName } = req.body

    // Confirm data 
    if (!id || !user) {
        return res.status(400).json({ message: 'The fields are required' })
    }

    // Does the product exist to update?
    const product = await User.findById(id).exec()

    if (!product) {
        return res.status(400).json({ message: 'product not found' })
    }

    // Check for duplicate 
    const duplicate = await Product.findOne({ productName }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Sorry duplicate product name' })
    }

    product.user = user
    product.productName = productName

    const updatedProduct = await product.save()

    res.json({ message: `${updatedProduct.productName} updated` })
}

const deleteProduct = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'product ID Required' })
    }

    // Does the user still have products?
    const product = await Product.findById(id).lean().exec()
    
    if (!product) {
        return res.status(400).json({ message: 'User note found' })
    }

    // Does the user exist to delete?
    const result = await Product.deleteOne()

    const reply = `Product ${result.productName} with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllProducts,
    getProduct,
    postProduct,
    patchProduct,
    deleteProduct
}