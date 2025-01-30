const fetch = require('node-fetch');

class BidController {
    async getProduct(req, res) {
        try {
            const productId = req.params.id;
            const response = await fetch(`http://localhost:3000/api/products/${productId}`);
            const product = await response.json();
            if (response.status !== 200) {
                return res.status(response.status).json({ message: product.message });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = BidController;