const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Deduction extends Model { }

Deduction.init({
    typeDeduction: DataTypes.STRING,
    nbSemaines: DataTypes.INTEGER,
    dateDebut: DataTypes.DATE,
    dateFin: DataTypes.DATE,
}, { sequelize, modelName: 'deduction' });

module.exports = Deduction;
