const fs = require('fs');
const path = require('path');

class ProductController {
    constructor() {
        this.productsFilePath = path.join(__dirname, '../data/products.json');
    }

    async getProductById(req, res) {
        try {
            const productId = parseInt(req.params.id, 10);
            const products = JSON.parse(fs.readFileSync(this.productsFilePath, 'utf8'));
            const product = products.find(p => p.id === productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ProductController;