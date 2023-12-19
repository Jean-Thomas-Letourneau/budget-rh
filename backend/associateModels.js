const Scenario = require('./models/scenario');
const Employe = require('./models/employe');
const Composant = require('./models/composant');
const FondsDebit = require('./models/fondsDebit');
const Deduction = require('./models/deduction');
const FondsCredit = require('./models/fondsCredit');

const associateModels = () => {
    Scenario.hasMany(Employe, { foreignKey: 'idScenario' });
    Employe.belongsTo(Scenario, { foreignKey: 'idScenario' });

    Employe.hasMany(Composant, { foreignKey: 'idEmploye' });
    Composant.belongsTo(Employe, { foreignKey: 'idEmploye' });

    Composant.hasMany(FondsDebit, { foreignKey: 'idComposant' });
    FondsDebit.belongsTo(Composant, { foreignKey: 'idComposant' });

    FondsDebit.hasOne(Deduction, { foreignKey: 'idFondsDebit' });
    Deduction.belongsTo(FondsDebit, { foreignKey: 'idFondsDebit' });

    Scenario.hasMany(FondsCredit, { foreignKey: 'idScenario' });
    FondsCredit.belongsTo(Scenario, { foreignKey: 'idScenario' });

    FondsCredit.hasMany(FondsDebit, { foreignKey: 'idFondsCredit' });
    FondsDebit.belongsTo(FondsCredit, { foreignKey: 'idFondsCredit' });
};

console.log(Scenario);

module.exports = associateModels;
