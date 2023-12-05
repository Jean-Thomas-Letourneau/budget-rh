const Employe = require('../models/employe');

const employeController = {
    async createEmploye(req, res) {
        try {
            const employe = await Employe.create(req.body);
            //req.app.get('io').emit('employe_created', employe);
            res.status(201).json(employe);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAllEmployes(req, res) {
        try {
            const employes = await Employe.findAll();
            res.json(employes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getEmployeById(req, res) {
        try {
            const employe = await Employe.findByPk(req.params.id);
            if (employe) {
                res.json(employe);
            } else {
                res.status(404).json({ message: 'Employe not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateEmploye(req, res) {
        try {
            const employe = await Employe.findByPk(req.params.id);
            if (!employe) {
                return res.status(404).json({ message: 'Employe not found' });
            }
            const updatedEmploye = await employe.update(req.body);
            //req.app.get('io').emit('employe_updated', updatedEmploye);
            res.json(updatedEmploye);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteEmploye(req, res) {
        try {
            const employe = await Employe.findByPk(req.params.id);
            if (!employe) {
                return res.status(404).json({ message: 'Employe not found' });
            }
            await employe.destroy();
            //req.app.get('io').emit('employe_deleted', { id: req.params.id });
            res.json({ message: 'Employe deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = employeController;
