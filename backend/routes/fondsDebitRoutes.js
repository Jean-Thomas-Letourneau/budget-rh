const express = require('express');
const router = express.Router();
const fondsDebitController = require('../controllers/fondsDebitController');

router.post('/fondsDebits', fondsDebitController.createFondsDebit);
router.get('/fondsDebits', fondsDebitController.getAllFondsDebits);
router.get('/fondsDebits/:id', fondsDebitController.getFondsDebitById);
router.put('/fondsDebits/:id', fondsDebitController.updateFondsDebit);
router.delete('/fondsDebits/:id', fondsDebitController.deleteFondsDebit);

module.exports = router;
