const Deduction = require('../models/deduction');

const deductionController = {
    async createDeduction(req, res) {
        try {
            const deduction = await Deduction.create(req.body);
            req.app.get('io').emit('deduction_created', deduction);
            res.status(201).json(deduction);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAllDeductions(req, res) {
        try {
            const deductions = await Deduction.findAll();
            res.json(deductions);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getDeductionById(req, res) {
        try {
            const deduction = await Deduction.findByPk(req.params.id);
            if (deduction) {
                res.json(deduction);
            } else {
                res.status(404).json({ message: 'Deduction not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateDeduction(req, res) {
        try {
            const deduction = await Deduction.findByPk(req.params.id);
            if (!deduction) {
                return res.status(404).json({ message: 'Deduction not found' });
            }
            const updatedDeduction = await deduction.update(req.body);
            req.app.get('io').emit('deduction_updated', updatedDeduction);
            res.json(updatedDeduction);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteDeduction(req, res) {
        try {
            const deduction = await Deduction.findByPk(req.params.id);
            if (!deduction) {
                return res.status(404).json({ message: 'Deduction not found' });
            }
            await deduction.destroy();
            req.app.get('io').emit('deduction_deleted', { id: req.params.id });
            res.json({ message: 'Deduction deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = deductionController;
