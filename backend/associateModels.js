const Employe = require('./models/employe');
const Composant = require('./models/composant');
const FondsDebit = require('./models/fondsDebit');
const Deduction = require('./models/deduction');
const FondsCredit = require('./models/fondsCredit');

const associateModels = () => {
    Employe.hasMany(Composant, { foreignKey: 'idEmploye' });
    Composant.belongsTo(Employe, { foreignKey: 'idEmploye' });

    Composant.hasMany(FondsDebit, { foreignKey: 'idComposant' });
    FondsDebit.belongsTo(Composant, { foreignKey: 'idComposant' });

    FondsDebit.hasOne(Deduction, { foreignKey: 'idFondsDebit' });
    Deduction.belongsTo(FondsDebit, { foreignKey: 'idFondsDebit' });

    FondsCredit.hasMany(FondsDebit, { foreignKey: 'idFondsCredit' });
    FondsDebit.belongsTo(FondsCredit, { foreignKey: 'idFondsCredit' });
};

module.exports = associateModels;
