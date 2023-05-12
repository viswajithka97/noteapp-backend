const mongoose = require('mongoose');

const productScheme = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter the product name"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 10,
        },
        price: {
            type: String,
            required: false
        }
    }, {
    timestamps: true,
}
)


const Product = mongoose.model('Product', productScheme);

module.exports = Product;