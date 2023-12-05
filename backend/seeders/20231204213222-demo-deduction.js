module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Deductions', [
      { typeDeduction: 'Health', nbSemaines: 52, dateDebut: new Date(), dateFin: new Date(), idFondsDebit: 1, createdAt: new Date(), updatedAt: new Date() },
      { typeDeduction: 'Pension', nbSemaines: 52, dateDebut: new Date(), dateFin: new Date(), idFondsDebit: 2, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Deductions', null, {});
  }
};
