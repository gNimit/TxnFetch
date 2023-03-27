const express = require('express');
const {getTransactions, getBalance} = require('../services/services');

const router = express.Router();

router.get('/transactions', getTransactions);
router.get('/balance', getBalance);

module.exports = router;