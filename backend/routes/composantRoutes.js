const express = require('express');
const router = express.Router();
const composantController = require('../controllers/composantController');

router.post('/composants', composantController.createComposant);
router.get('/composants', composantController.getAllComposants);
router.get('/composants/:id', composantController.getComposantById);
router.put('/composants/:id', composantController.updateComposant);
router.delete('/composants/:id', composantController.deleteComposant);

module.exports = router;
