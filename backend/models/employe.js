const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Employe extends Model { }

Employe.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    genre: DataTypes.STRING,
    retraitePartielle: DataTypes.BOOLEAN,
    retraiteComplete: DataTypes.BOOLEAN,
}, { sequelize: sequelize, modelName: 'employe' });

module.exports = Employe;
