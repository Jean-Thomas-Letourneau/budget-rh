const express = require('express');
const router = express.Router();
const employeController = require('../controllers/employeController');

router.post('/employes', employeController.createEmploye);
router.get('/employes', employeController.getAllEmployes);
router.get('/employes/:id', employeController.getEmployeById);
router.put('/employes/:id', employeController.updateEmploye);
router.delete('/employes/:id', employeController.deleteEmploye);

module.exports = router;
