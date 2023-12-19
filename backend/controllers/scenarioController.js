const ScenarioModel = require('../models/scenario');
const EmployeModel = require('../models/employe');
const ComposantModel = require('../models/composant');
const FondsDebitModel = require('../models/fondsDebit');
const DeductionModel = require('../models/deduction');
const FondsCreditModel = require('../models/fondsCredit');

const sequelize = require('../database'); // Make sure this path is correct

const scenarioController = {
    async createScenario(req, res) {
        try {
            const scenario = await ScenarioModel.create(req.body);
            res.status(201).json(scenario);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAllScenarios(req, res) {
        try {
            const scenarios = await ScenarioModel.findAll();
            res.json(scenarios);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getScenarioById(req, res) {
        try {
            const scenario = await ScenarioModel.findByPk(req.params.id);
            if (scenario) {
                res.json(scenario);
            } else {
                res.status(404).json({ message: 'Scenario not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateScenario(req, res) {
        try {
            const scenario = await ScenarioModel.findByPk(req.params.id);
            if (!scenario) {
                return res.status(404).json({ message: 'Scenario not found' });
            }
            const updatedScenario = await scenario.update(req.body);
            res.json(updatedScenario);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteScenario(req, res) {
        try {
            const scenario = await ScenarioModel.findByPk(req.params.id);
            if (!scenario) {
                return res.status(404).json({ message: 'Scenario not found' });
            }
            await scenario.destroy();
            res.json({ message: 'Scenario deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async copyScenarioData(req, res) {
        const { id } = req.params; // ID of the original Scenario to copy from
        const newScenarioData = req.body; // Data for the new Scenario

        try {
            const result = await sequelize.transaction(async (t) => {
                // Create the new Scenario
                const newScenario = await ScenarioModel.create(newScenarioData, { transaction: t });

                // Copy employes and their related data
                const employes = await EmployeModel.findAll({ where: { idScenario: id }, transaction: t });
                for (const employe of employes) {
                    const { id, ...employeData } = employe.dataValues;
                    const newEmploye = await EmployeModel.create({ ...employeData, idScenario: newScenario.id }, { transaction: t });

                    // Copy composants related to this employe
                    const composants = await ComposantModel.findAll({ where: { idEmploye: employe.id }, transaction: t });
                    for (const composant of composants) {
                        const { id, ...composantData } = composant.dataValues;
                        const newComposant = await ComposantModel.create({ ...composantData, idEmploye: newEmploye.id }, { transaction: t });

                        // Copy fondsDebits related to each composant
                        const fondsDebits = await FondsDebitModel.findAll({ where: { idComposant: composant.id }, transaction: t });
                        for (const fondsDebit of fondsDebits) {
                            const { id, ...fondsDebitData } = fondsDebit.dataValues;
                            const newFondsDebit = await FondsDebitModel.create({ ...fondsDebitData, idComposant: newComposant.id }, { transaction: t });

                            // Copy deductions related to each fondsDebit
                            const deductions = await DeductionModel.findAll({ where: { idFondsDebit: fondsDebit.id }, transaction: t });
                            for (const deduction of deductions) {
                                const { id, ...deductionData } = deduction.dataValues;
                                await DeductionModel.create({ ...deductionData, idFondsDebit: newFondsDebit.id }, { transaction: t });
                            }
                        }
                    }
                }

                // Copy fondsCredits related to the original scenario
                const fondsCredits = await FondsCreditModel.findAll({ where: { idScenario: id }, transaction: t });
                for (const fondsCredit of fondsCredits) {
                    const { id, ...fondsCreditData } = fondsCredit.dataValues;
                    await FondsCreditModel.create({ ...fondsCreditData, idScenario: newScenario.id }, { transaction: t });
                }

                return newScenario;
            });

            res.status(201).send(result);
        } catch (error) {
            console.error('Error copying Scenario data:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }


};

module.exports = scenarioController;
