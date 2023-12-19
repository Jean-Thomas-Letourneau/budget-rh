const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Scenario extends Model { }

Scenario.init({
    anneeFiscale: DataTypes.STRING,
    nom: DataTypes.STRING,
    description: DataTypes.STRING,
    simulation: DataTypes.BOOLEAN,
}, { sequelize: sequelize, modelName: 'scenario' });

module.exports = Scenario;
