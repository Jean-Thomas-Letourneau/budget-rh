const Composant = require('../models/composant');

const composantController = {
    async createComposant(req, res) {
        try {
            const composant = await Composant.create(req.body);
            //req.app.get('io').emit('composant_created', composant);
            res.status(201).json(composant);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAllComposants(req, res) {
        try {
            const composants = await Composant.findAll();
            res.json(composants);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getComposantById(req, res) {
        try {
            const composant = await Composant.findByPk(req.params.id);
            if (composant) {
                res.json(composant);
            } else {
                res.status(404).json({ message: 'Composant not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateComposant(req, res) {
        try {
            const composant = await Composant.findByPk(req.params.id);
            if (!composant) {
                return res.status(404).json({ message: 'Composant not found' });
            }
            const updatedComposant = await composant.update(req.body);
            //req.app.get('io').emit('composant_updated', updatedComposant);
            res.json(updatedComposant);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteComposant(req, res) {
        try {
            const composant = await Composant.findByPk(req.params.id);
            if (!composant) {
                return res.status(404).json({ message: 'Composant not found' });
            }
            await composant.destroy();
            //req.app.get('io').emit('composant_deleted', { id: req.params.id });
            res.json({ message: 'Composant deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = composantController;
