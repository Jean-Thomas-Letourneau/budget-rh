const scenario = require('../models/scenario');

const scenarioController = {
    async createscenario(req, res) {
        try {
            const scenario = await scenario.create(req.body);
            //req.app.get('io').emit('scenario_created', scenario);
            res.status(201).json(scenario);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAllscenarios(req, res) {
        try {
            const scenarios = await scenario.findAll();
            res.json(scenarios);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getscenarioById(req, res) {
        try {
            const scenario = await scenario.findByPk(req.params.id);
            if (scenario) {
                res.json(scenario);
            } else {
                res.status(404).json({ message: 'scenario not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updatescenario(req, res) {
        try {
            const scenario = await scenario.findByPk(req.params.id);
            if (!scenario) {
                return res.status(404).json({ message: 'scenario not found' });
            }
            const updatedscenario = await scenario.update(req.body);
            //req.app.get('io').emit('scenario_updated', updatedscenario);
            res.json(updatedscenario);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deletescenario(req, res) {
        try {
            const scenario = await scenario.findByPk(req.params.id);
            if (!scenario) {
                return res.status(404).json({ message: 'scenario not found' });
            }
            await scenario.destroy();
            //req.app.get('io').emit('scenario_deleted', { id: req.params.id });
            res.json({ message: 'scenario deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async copyScenarioData(req, res) {
        const { id } = req.params; // ID of the scenario to copy from
        const newScenarioData = req.body; // Data for the new scenario

        try {
            const result = await sequelize.transaction(async (t) => {
                // Create the new scenario
                const newScenario = await Scenario.create(newScenarioData, { transaction: t });

                // Copy employes
                const employes = await Employe.findAll({ where: { idScenario: id }, transaction: t });
                for (const employe of employes) {
                    await Employe.create({ ...employe.dataValues, idScenario: newScenario.id }, { transaction: t });
                }

                // Copy composants
                const composants = await Composant.findAll({ where: { idScenario: id }, transaction: t });
                for (const composant of composants) {
                    await Composant.create({ ...composant.dataValues, idScenario: newScenario.id }, { transaction: t });
                }

                // Copy fondsCredits
                const fondsCredits = await FondsCredit.findAll({ where: { idScenario: id }, transaction: t });
                for (const fondsCredit of fondsCredits) {
                    await FondsCredit.create({ ...fondsCredit.dataValues, idScenario: newScenario.id }, { transaction: t });
                }

                // Copy fondsDebits
                const fondsDebits = await FondsDebit.findAll({ where: { idScenario: id }, transaction: t });
                for (const fondsDebit of fondsDebits) {
                    await FondsDebit.create({ ...fondsDebit.dataValues, idScenario: newScenario.id }, { transaction: t });
                }

                // Copy deductions
                const deductions = await Deduction.findAll({ where: { idScenario: id }, transaction: t });
                for (const deduction of deductions) {
                    await Deduction.create({ ...deduction.dataValues, idScenario: newScenario.id }, { transaction: t });
                }

                // Repeat similar process for any other related models

                return newScenario;
            });

            res.status(201).send(result);
        } catch (error) {
            console.error('Error copying scenario data:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }
};

module.exports = scenarioController;
