const express = require('express');
const {getTransactions, getBalance} = require('../services/services');

const router = express.Router();

router.get('/', getApiDoc);
router.get('/transactions/:address', getTransactions);
router.get('/balance/:address', getBalance);

module.exports = router;
