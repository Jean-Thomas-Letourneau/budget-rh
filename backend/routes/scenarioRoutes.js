const express = require('express');
const router = express.Router();
const scenarioController = require('../controllers/scenarioController');

router.post('/scenarios', scenarioController.createscenario);
router.get('/scenarios', scenarioController.getAllscenarios);
router.get('/scenarios/:id', scenarioController.getscenarioById);
router.put('/scenarios/:id', scenarioController.updatescenario);
router.delete('/scenarios/:id', scenarioController.deletescenario);
router.post('/scenarios/:id/copy', scenarioController.copyScenarioData);

module.exports = router;
