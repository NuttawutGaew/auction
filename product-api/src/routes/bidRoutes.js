const express = require('express');
const BidController = require('../controllers/bidController');

const router = express.Router();
const bidController = new BidController();

router.get('/bids/:id', (req, res) => bidController.getProduct(req, res));

module.exports = router;