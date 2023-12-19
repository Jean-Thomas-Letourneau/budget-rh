const express = require('express');
const router = express.Router();
const scenarioController = require('../controllers/scenarioController');

router.post('/scenarios', scenarioController.createScenario);
router.get('/scenarios', scenarioController.getAllScenarios);
router.get('/scenarios/:id', scenarioController.getScenarioById);
router.put('/scenarios/:id', scenarioController.updateScenario);
router.delete('/scenarios/:id', scenarioController.deleteScenario);
router.post('/scenarios/:id/copy', scenarioController.copyScenarioData);

module.exports = router;
