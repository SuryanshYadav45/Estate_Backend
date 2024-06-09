const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    prodname: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    imageurls: {
        type: [String],
        required: true,
    },
    userid: {
        type: String,
        required: true,
    }
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text' });

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
