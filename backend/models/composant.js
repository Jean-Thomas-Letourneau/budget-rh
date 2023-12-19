const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Composant extends Model { }

Composant.init({
    titre: DataTypes.STRING,
    dateDebut: DataTypes.DATE,
    dateFin: DataTypes.DATE,
    dateAnniv: DataTypes.DATE,
    groupe: DataTypes.STRING,
    niveau: DataTypes.INTEGER,
    echelon: DataTypes.STRING,
    bilingue: DataTypes.BOOLEAN,
    salaire: DataTypes.DECIMAL(10, 2),
    selected: DataTypes.BOOLEAN,
}, { sequelize, modelName: 'composant' });

module.exports = Composant;
