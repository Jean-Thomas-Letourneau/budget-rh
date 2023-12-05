const FondsDebit = require('../models/fondsDebit');

const fondsDebitController = {
    async createFondsDebit(req, res) {
        try {
            const fondsDebit = await FondsDebit.create(req.body);
            //req.app.get('io').emit('fondsDebit_created', fondsDebit);
            res.status(201).json(fondsDebit);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAllFondsDebits(req, res) {
        try {
            const fondsDebits = await FondsDebit.findAll();
            res.json(fondsDebits);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getFondsDebitById(req, res) {
        try {
            const fondsDebit = await FondsDebit.findByPk(req.params.id);
            if (fondsDebit) {
                res.json(fondsDebit);
            } else {
                res.status(404).json({ message: 'FondsDebit not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateFondsDebit(req, res) {
        try {
            const fondsDebit = await FondsDebit.findByPk(req.params.id);
            if (!fondsDebit) {
                return res.status(404).json({ message: 'FondsDebit not found' });
            }
            const updatedFondsDebit = await fondsDebit.update(req.body);
            //req.app.get('io').emit('fondsDebit_updated', updatedFondsDebit);
            res.json(updatedFondsDebit);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteFondsDebit(req, res) {
        try {
            const fondsDebit = await FondsDebit.findByPk(req.params.id);
            if (!fondsDebit) {
                return res.status(404).json({ message: 'FondsDebit not found' });
            }
            await fondsDebit.destroy();
            //req.app.get('io').emit('fondsDebit_deleted', { id: req.params.id });
            res.json({ message: 'FondsDebit deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = fondsDebitController;
