const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)

const productSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        productName: {
            type: String,
            required: true
        },
        productPrice: {
            type: String,
            required: true
        },
        productDescription: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        productOffer: {
            type: Number,
            required: false
        },
        createdAt: {
            type: Date,
            default: new Date()
        },
        state: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = Product = mongoose.models.Product || mongoose.model('Product', productSchema);