const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Deduction extends Model { }

Deduction.init({
    typeDeduction: DataTypes.STRING,
    nbSemaines: DataTypes.INTEGER,
    dateDebut: DataTypes.DATE,
    dateFin: DataTypes.DATE,
    selected: DataTypes.BOOLEAN,
}, { sequelize, modelName: 'deduction' });

module.exports = Deduction;
