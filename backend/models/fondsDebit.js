const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class FondsDebit extends Model { }

FondsDebit.init({
    pourcentage: DataTypes.FLOAT,
    montant: DataTypes.DECIMAL(10, 2),
    selected: DataTypes.BOOLEAN,
}, { sequelize, modelName: 'fondsDebit' });

module.exports = FondsDebit;
