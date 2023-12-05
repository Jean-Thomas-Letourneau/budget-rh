const FondsCredit = require('../models/fondsCredit');

const fondsCreditController = {
    async createFondsCredit(req, res) {
        try {
            const fondsCredit = await FondsCredit.create(req.body);
            req.app.get('io').emit('fondsCredit_created', fondsCredit);
            res.status(201).json(fondsCredit);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAllFondsCredits(req, res) {
        try {
            const fondsCredits = await FondsCredit.findAll();
            res.json(fondsCredits);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getFondsCreditById(req, res) {
        try {
            const fondsCredit = await FondsCredit.findByPk(req.params.id);
            if (fondsCredit) {
                res.json(fondsCredit);
            } else {
                res.status(404).json({ message: 'FondsCredit not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateFondsCredit(req, res) {
        try {
            const fondsCredit = await FondsCredit.findByPk(req.params.id);
            if (!fondsCredit) {
                return res.status(404).json({ message: 'FondsCredit not found' });
            }
            const updatedFondsCredit = await fondsCredit.update(req.body);
            req.app.get('io').emit('fondsCredit_updated', updatedFondsCredit);
            res.json(updatedFondsCredit);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteFondsCredit(req, res) {
        try {
            const fondsCredit = await FondsCredit.findByPk(req.params.id);
            if (!fondsCredit) {
                return res.status(404).json({ message: 'FondsCredit not found' });
            }
            await fondsCredit.destroy();
            req.app.get('io').emit('fondsCredit_deleted', { id: req.params.id });
            res.json({ message: 'FondsCredit deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = fondsCreditController;
