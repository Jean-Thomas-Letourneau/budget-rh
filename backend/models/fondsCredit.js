const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class FondsCredit extends Model { }

FondsCredit.init({
    nom: DataTypes.STRING,
    type: DataTypes.STRING,
    montant: DataTypes.DECIMAL(10, 2),
    anneeFiscale: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    selected: DataTypes.BOOLEAN,
}, { sequelize, modelName: 'fondsCredit' });

module.exports = FondsCredit;
