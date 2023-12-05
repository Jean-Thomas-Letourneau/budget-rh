const express = require('express');
const router = express.Router();
const deductionController = require('../controllers/deductionController');

router.post('/deductions', deductionController.createDeduction);
router.get('/deductions', deductionController.getAllDeductions);
router.get('/deductions/:id', deductionController.getDeductionById);
router.put('/deductions/:id', deductionController.updateDeduction);
router.delete('/deductions/:id', deductionController.deleteDeduction);

module.exports = router;
