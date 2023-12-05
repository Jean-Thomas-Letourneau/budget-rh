const express = require('express');
const router = express.Router();
const fondsCreditController = require('../controllers/fondsCreditController');

router.post('/fondsCredits', fondsCreditController.createFondsCredit);
router.get('/fondsCredits', fondsCreditController.getAllFondsCredits);
router.get('/fondsCredits/:id', fondsCreditController.getFondsCreditById);
router.put('/fondsCredits/:id', fondsCreditController.updateFondsCredit);
router.delete('/fondsCredits/:id', fondsCreditController.deleteFondsCredit);

module.exports = router;
